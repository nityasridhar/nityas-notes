import { useState } from 'react';

// Sample content data - replace with your actual items
const items = [
  { id: 1, title: "AI Predictions 2026", author: "Jane Smith", category: "2026", cover: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=300&h=400&fit=crop" },
  { id: 2, title: "The Future of Work", author: "Tech Weekly", category: "2026", cover: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=400&fit=crop" },
];

const categories = ["2026", "Movies", "Papers", "Books", "Blogs"];

export default function BookStore() {
  const [selectedCategory, setSelectedCategory] = useState("2026");
  
  // Filter items by selected category
  const filteredItems = items.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="px-8 py-6 bg-white border-b border-gray-100">
        <h1 className="text-xl font-medium tracking-tight text-gray-900">
          Your Book Co.
        </h1>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-48 p-8 shrink-0">
          <nav className="space-y-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`block text-sm transition-colors ${
                  selectedCategory === category 
                    ? 'text-gray-900 font-medium' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Grid */}
        <main className="flex-1 p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                className="group cursor-pointer"
              >
                {/* Cover Image */}
                <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                  <img 
                    src={item.cover} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Item Info - Hidden by default, shown on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500">{item.author}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}