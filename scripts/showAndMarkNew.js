const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  imageUrl: String,
  category: String,
  featured: Boolean,
  portfolioSection: String
});

const Photo = mongoose.model('Photo', photoSchema);

async function showNewPhotos() {
  try {
    await mongoose.connect('mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/');
    
    const newPhotos = await Photo.find({ imageUrl: { $regex: '/photos/otras/' } });
    console.log('📸 Fotos nuevas en la base de datos:');
    
    newPhotos.forEach((photo, index) => {
      const filename = photo.imageUrl.split('/').pop();
      console.log(`${index + 1}. ${filename} (${photo.category})`);
    });
    
    // Marcar algunas como destacadas usando los nombres reales
    const photosToFeature = newPhotos.slice(0, 5); // Primeras 5 fotos
    
    console.log('\n⭐ Marcando como destacadas...');
    for (const photo of photosToFeature) {
      await Photo.updateOne(
        { _id: photo._id },
        { 
          $set: { 
            featured: true,
            portfolioSection: 'highlights'
          } 
        }
      );
      
      const filename = photo.imageUrl.split('/').pop();
      console.log(`✅ ${filename} marcada como destacada`);
    }
    
    mongoose.connection.close();
    console.log('\n✨ Listo! Las fotos nuevas ya están disponibles en la galería');
    
  } catch (error) {
    console.error('❌ Error:', error);
    mongoose.connection.close();
  }
}

showNewPhotos();
