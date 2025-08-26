const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  category: String,
  portfolioSection: String,
  featured: Boolean,
  status: String
});

const Photo = mongoose.model('Photo', photoSchema);

async function markFeaturedPhotos() {
  try {
    await mongoose.connect('mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/');
    
    console.log('🔍 Verificando fotos en la base de datos...');
    
    const totalPhotos = await Photo.countDocuments();
    console.log(`Total fotos: ${totalPhotos}`);
    
    const newPhotos = await Photo.find({ imageUrl: { $regex: '/photos/otras/' } });
    console.log(`Fotos nuevas encontradas: ${newPhotos.length}`);
    
    if (newPhotos.length === 0) {
      console.log('❌ No se encontraron fotos nuevas. Ejecutando script de carga...');
      mongoose.connection.close();
      return;
    }
    
    // Marcar algunas fotos como destacadas para highlights
    const photosToFeature = [
      'goth1.jpg',
      'natural1.jpg', 
      'natural3.jpg',
      'portrait5.jpg',
      'portrait7.jpg'
    ];
    
    console.log('\n⭐ Marcando fotos como destacadas...');
    for (const filename of photosToFeature) {
      const updated = await Photo.updateOne(
        { imageUrl: `/photos/otras/${filename}` },
        { 
          $set: { 
            featured: true,
            portfolioSection: 'highlights'
          } 
        }
      );
      
      if (updated.matchedCount > 0) {
        console.log(`✅ ${filename} marcada como destacada`);
      } else {
        console.log(`⚠️  ${filename} no encontrada`);
      }
    }
    
    console.log('\n📊 Estado final:');
    const featured = await Photo.countDocuments({ featured: true });
    const highlights = await Photo.countDocuments({ portfolioSection: 'highlights' });
    
    console.log(`Fotos destacadas total: ${featured}`);
    console.log(`Fotos en highlights: ${highlights}`);
    
    mongoose.connection.close();
    console.log('\n✨ Proceso completado');
    
  } catch (error) {
    console.error('❌ Error:', error);
    mongoose.connection.close();
  }
}

markFeaturedPhotos();
