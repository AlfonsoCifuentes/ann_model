const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  imageUrl: String,
  portfolioSection: String,
  featured: Boolean
});

const Photo = mongoose.model('Photo', photoSchema);

async function restoreHeroPhotos() {
  try {
    await mongoose.connect('mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/');
    
    console.log('🔄 Restaurando las fotos originales del hero...');
    
    // Primero, quitar portfolioSection=hero de todas las fotos
    await Photo.updateMany(
      { portfolioSection: 'hero' },
      { $set: { portfolioSection: 'portfolio' } }
    );
    
    // Restaurar las 5 fotos originales del hero que estaban perfectamente encuadradas
    const originalHeroPhotos = [
      '/photos/SVM05701.jpg',
      '/photos/SVM05720.jpg', 
      '/photos/SVM05728.jpg',
      '/photos/SVM05734.jpg',
      '/photos/SVM05741.jpg'
    ];
    
    console.log('📸 Restaurando fotos originales del hero:');
    
    for (const imageUrl of originalHeroPhotos) {
      const result = await Photo.updateOne(
        { imageUrl },
        { 
          $set: { 
            portfolioSection: 'hero',
            featured: true 
          } 
        }
      );
      
      const filename = imageUrl.split('/').pop();
      if (result.matchedCount > 0) {
        console.log(`✅ ${filename} restaurada en hero`);
      } else {
        console.log(`⚠️  ${filename} no encontrada`);
      }
    }
    
    // Verificar el resultado
    const heroCount = await Photo.countDocuments({ portfolioSection: 'hero' });
    console.log(`\n🖼️ Hero restaurado con ${heroCount} fotos`);
    
    // Mostrar las fotos del hero
    const heroPhotos = await Photo.find({ portfolioSection: 'hero' }).select('imageUrl');
    console.log('\n📋 Fotos actuales en el hero:');
    heroPhotos.forEach((photo, index) => {
      const filename = photo.imageUrl.split('/').pop();
      console.log(`${index + 1}. ${filename}`);
    });
    
    mongoose.connection.close();
    console.log('\n✅ Hero completamente restaurado a su estado original');
    
  } catch (error) {
    console.error('❌ Error:', error);
    mongoose.connection.close();
  }
}

restoreHeroPhotos();
