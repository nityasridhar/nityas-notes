const items = [
    /* 22>*/
    { id: 1, title: "Accelerando", author: "Charles Stross", category: ["Books","Bookshelf"], cover: "https://m.media-amazon.com/images/I/51978vBJLyL.jpg", spineColor: "#1a0a05", notes: "xyz" },
    
    { id: 13, title: "In the Mood for Love", author: "Wong Kar-Wai", category: ["Movies","Bookshelf"], cover: "https://m.media-amazon.com/images/I/91+V2AunifL._AC_UY436_FMwebp_QL65_.jpg", spineColor: "#8b0000", notes: "xyz" },
    { id: 21, type: "lamp", title: "Akari Lamp", author: "Isamu Noguchi", category: ["Bookshelf"], cover: "images/v2lamp.png", notes: "" },

    { id: 10, title: "The Tinkerings of Robert Noyce", author: "Tom Wolfe", category: ["Papers","Bookshelf"], cover: "https://esquire.blob.core.windows.net/esquire19831201thumbnails/Spreads/0x600/176.jpg", spineColor: "#2a2a2a", notes: "xyz" },
    
    { id: 2, title: "Bubbles and the End of Stagnation", author: "Byrne Hobart and Tobias Huber", category: ["Books","Bookshelf"], cover: "https://m.media-amazon.com/images/I/41GCdF4CmAL.jpg", spineColor: "#4a1942", notes: "xyz" },
    
    { id: 14, title: "Tenet", author: "Christopher Nolan", category: ["Movies","Bookshelf"], cover: "https://m.media-amazon.com/images/I/81eNWOyO4FL._AC_UY436_FMwebp_QL65_.jpg", spineColor: "#1a3a5c", notes: "xyz" },
    { id: 20, type: "painting", title: "Reader", author: "Simon LeClerc", category: ["Bookshelf"], cover: "https://i.imgur.com/rUxGR8O.jpg", spineColor: "#1a1a1a", notes: "xyz" },
    { id: 12, title: "Marty Supreme", author: "Josh Safdie", category: ["Movies","Bookshelf"], cover: "https://m.media-amazon.com/images/I/81wNksmqCBL._AC_UY436_FMwebp_QL65_.jpg", spineColor: "#8b2942", notes: "xyz" },

    { id: 3, title: "A Psalm for the Wild Built", author: "Becky Chambers", category: ["Books","Bookshelf"], cover: "https://m.media-amazon.com/images/I/91+7TFTHmDS._SL1500_.jpg", spineColor: "#2d4a35", notes: "xyz" },
    
    { id: 11, title: "Strategic Wealth Accumulation Under Transformative AI expectations", author: "Caleb Maresca", category: ["Papers","Bookshelf"], cover: "https://res.cloudinary.com/cea/image/upload/f_auto,q_auto/v1/mirroredImages/7ab87a77938a0804c6942b342ad938d20a31a2806f42cf5b935ef8fc0b10aa9b/arcempfg0kv7lgsoji5m", spineColor: "#d4a574", notes: "xyz" },
    
    { id: 15, title: "Midsommar", author: "Ari Aster", category: ["Movies","Bookshelf"], cover: "https://m.media-amazon.com/images/I/81ya-oBGcbL._AC_UY436_FMwebp_QL65_.jpg", spineColor: "#5a7a32", notes: "xyz" },
    
    { id: 4, title: "The Weight of Glory", author: "C.S. Lewis", category: ["Books","Bookshelf"], cover: "https://m.media-amazon.com/images/I/81ip7E3aihL._SL1500_.jpg", spineColor: "#1a1a1a", notes: "xyz" },

    { id: 16, title: "Spirited Away", author: "Miyazaki", category: ["Movies","Bookshelf"], cover: "https://m.media-amazon.com/images/I/81yCVQUS5hL._AC_UY436_FMwebp_QL65_.jpg", spineColor: "#8b2942", notes: "xyz" },
    
    { id: 6, title: "Hidden Valley Road", author: "Robert Kolker", category: ["Books","Bookshelf"], cover: "https://m.media-amazon.com/images/I/81+i2LgzZkL._SL1500_.jpg", spineColor: "#8b7355", notes: "xyz" },
    
    { id: 12, title: "Welcome to the Era of Experience", author: "David Silver, Richard Sutton", category: ["Papers","Bookshelf"], cover: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*HFSnTAhd-EvhYXCsS-gMbA.png", spineColor: "#4a90c2", notes: "xyz" },
    
    { id: 17, title: "Before Sunrise", author: "Richard Linklater", category: ["Movies","Bookshelf"], cover: "https://s3.amazonaws.com/nightjarprod/content/uploads/sites/130/2024/05/12175221/kf1Jb1c2JAOqjuzA3H4oDM263uB1.jpg", spineColor: "#c4956a", notes: "xyz" },
    
    { id: 7, title: "The Making and Maintenance of Open Source Software", author: "Nadia Eghbal", category: ["Books","Bookshelf"], cover: "https://m.media-amazon.com/images/I/71BQ5MWd0bL._SL1500_.jpg", spineColor: "#c84c1c", notes: "xyz" },
    
    { id: 18, title: "Bugonia", author: "Yorgos Lanthimos", category: ["Movies","Bookshelf"], cover: "https://snworksceo.imgix.net/cds/ea8bd23a-f73f-47bb-840f-8761324fbe18.sized-1000x1000.jpg?w=1000&dpr=2", spineColor: "#d4845a", notes: "xyz" },
    
    { id: 8, title: "Obviously Awesome", author: "April Dunford", category: ["Books","Bookshelf"], cover: "https://m.media-amazon.com/images/I/81wuyYN4oEL._SL1500_.jpg", spineColor: "#e85d04", notes: "xyz" },
    
    { id: 19, title: "Get Out", author: "Jordan Peele", category: ["Movies","Bookshelf"], cover: "https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_FMjpg_UX1000_.jpg", spineColor: "#1a1a1a", notes: "xyz" },
    
    { id: 9, title: "Ogilvy on Advertising", author: "David Ogilvy", category: ["Books","Bookshelf"], cover: "https://m.media-amazon.com/images/I/818+Pxhl+LL._SY522_.jpg", spineColor: "#1a1a1a", notes: "xyz" },

];