const fetch = require('node-fetch');

async function checkCollections() {
  try {
    const response = await fetch('http://localhost:3001/api/photos?portfolioSection=portfolio&status=active');
    const data = await response.json();
    
    if (data.success) {
      const collections = new Map();
      data.data.forEach(photo => {
        if (photo.workCollection) {
          if (!collections.has(photo.workCollection)) {
            collections.set(photo.workCollection, []);
          }
          collections.get(photo.workCollection).push({
            title: photo.title,
            imageUrl: photo.imageUrl
          });
        }
      });
      
      collections.forEach((photos, collectionId) => {
        console.log(`\n=== ${collectionId} ===`);
        photos.forEach((photo, idx) => {
          console.log(`  ${idx + 1}. ${photo.title} - ${photo.imageUrl?.substring(0, 60)}...`);
        });
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkCollections();
