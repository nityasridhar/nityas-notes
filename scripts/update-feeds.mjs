import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const feedsPath = join(rootDir, "data", "feeds.json");
const outputPath = join(rootDir, "data", "feed-items.json");
const maxItemsPerFeed = 12;
const maxTotalItems = 80;

const feeds = JSON.parse(await readFile(feedsPath, "utf8"));

function decodeXml(value = "") {
  const namedEntities = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: "\"",
  };

  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity) => {
      if (entity.startsWith("#x")) {
        return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
      }
      if (entity.startsWith("#")) {
        return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
      }
      return namedEntities[entity] ?? match;
    })
    .trim();
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractTag(xml, tagName) {
  const tag = escapeRegex(tagName);
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeXml(match[1]) : "";
}

function extractFirstTag(xml, tagNames) {
  for (const tagName of tagNames) {
    const value = extractTag(xml, tagName);
    if (value) return value;
  }
  return "";
}

function extractAtomLink(entry) {
  const links = [...entry.matchAll(/<link\b([^>]*)>/gi)];
  const alternate = links.find(([, attrs]) => !/rel=["']?(self|hub)["']?/i.test(attrs));
  const attrs = alternate?.[1] ?? links[0]?.[1] ?? "";
  const href = attrs.match(/\bhref=["']([^"']+)["']/i);
  return href ? decodeXml(href[1]) : "";
}

function stripHtml(value = "") {
  return decodeXml(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(value, maxLength = 260) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 3).trim()}...`;
}

function normalizeDate(value) {
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? null : new Date(timestamp).toISOString();
}

async function fetchText(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(url, {
      headers: {
        accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
        "user-agent": "nityasnotes-reading-page/1.0",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

function parseRssItems(xml, feed) {
  const blocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];

  return blocks.map((block) => {
    const rawSummary = extractFirstTag(block, ["description", "content:encoded"]);

    return {
      sourceTitle: feed.title,
      sourceUrl: feed.siteUrl,
      sourceFeedUrl: feed.url,
      category: feed.category,
      title: stripHtml(extractTag(block, "title")),
      url: extractTag(block, "link") || extractTag(block, "guid"),
      author: stripHtml(extractFirstTag(block, ["dc:creator", "author"])),
      publishedAt: normalizeDate(extractFirstTag(block, ["pubDate", "dc:date", "published", "updated"])),
      summary: truncate(stripHtml(rawSummary)),
    };
  });
}

function parseAtomItems(xml, feed) {
  const blocks = xml.match(/<entry\b[\s\S]*?<\/entry>/gi) ?? [];

  return blocks.map((block) => {
    const rawSummary = extractFirstTag(block, ["summary", "content"]);
    const authorBlock = extractTag(block, "author");

    return {
      sourceTitle: feed.title,
      sourceUrl: feed.siteUrl,
      sourceFeedUrl: feed.url,
      category: feed.category,
      title: stripHtml(extractTag(block, "title")),
      url: extractAtomLink(block) || extractTag(block, "id"),
      author: stripHtml(extractTag(authorBlock, "name")),
      publishedAt: normalizeDate(extractFirstTag(block, ["published", "updated"])),
      summary: truncate(stripHtml(rawSummary)),
    };
  });
}

function parseFeed(xml, feed) {
  const items = parseRssItems(xml, feed);
  if (items.length) return items;
  return parseAtomItems(xml, feed);
}

const seen = new Set();
const allItems = [];
const errors = [];

for (const feed of feeds) {
  try {
    const xml = await fetchText(feed.url);
    const parsed = parseFeed(xml, feed)
      .filter((item) => item.title && item.url)
      .slice(0, maxItemsPerFeed);

    for (const item of parsed) {
      const key = item.url || `${item.sourceTitle}:${item.title}`;
      if (seen.has(key)) continue;
      seen.add(key);
      allItems.push(item);
    }
  } catch (error) {
    errors.push({
      feed: feed.title,
      url: feed.url,
      message: error.message,
    });
  }
}

allItems.sort((a, b) => {
  const aTime = a.publishedAt ? Date.parse(a.publishedAt) : 0;
  const bTime = b.publishedAt ? Date.parse(b.publishedAt) : 0;
  return bTime - aTime;
});

const output = {
  generatedAt: new Date().toISOString(),
  feeds,
  errors,
  items: allItems.slice(0, maxTotalItems),
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`);

console.log(`Wrote ${output.items.length} feed items to ${outputPath}`);
if (errors.length) {
  console.warn(`Skipped ${errors.length} feed(s):`);
  for (const error of errors) {
    console.warn(`- ${error.feed}: ${error.message}`);
  }
}
