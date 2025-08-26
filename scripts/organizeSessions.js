const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  category: String,
  portfolioSection: String,
  featured: Boolean,
  status: String,
  workCollection: String, // Nuevo campo para agrupar fotos
  order: Number
});

const Photo = mongoose.model('Photo', photoSchema);

async function organizePhotoSessions() {
  try {
    await mongoose.connect('mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/');
    
    console.log('🎨 Organizando sesiones de fotos...');
    
    // Sesión de fotos classy
    const classyPhotos = await Photo.find({ 
      imageUrl: { $regex: 'classy-' } 
    });
    
    console.log(`\n📸 Sesión "Elegancia Clásica": ${classyPhotos.length} fotos`);
    
    for (let i = 0; i < classyPhotos.length; i++) {
      const photo = classyPhotos[i];
      await Photo.updateOne(
        { _id: photo._id },
        {
          $set: {
            workCollection: 'sesion-elegancia-clasica',
            title: `Elegancia Clásica ${i + 1}`,
            description: 'Sesión de fotos con estilo elegante y sofisticado',
            category: 'portrait',
            portfolioSection: 'portfolio',
            order: i + 1
          }
        }
      );
      
      console.log(`✅ ${photo.imageUrl.split('/').pop()} → "Elegancia Clásica ${i + 1}"`);
    }
    
    // Sesión de body paint japonés
    const japanesePhotos = await Photo.find({ 
      imageUrl: { $regex: 'japanese_body_paint' } 
    });
    
    console.log(`\n🎭 Sesión "Body Paint Estilo Japonés": ${japanesePhotos.length} fotos`);
    
    for (let i = 0; i < japanesePhotos.length; i++) {
      const photo = japanesePhotos[i];
      await Photo.updateOne(
        { _id: photo._id },
        {
          $set: {
            workCollection: 'body-paint-japones',
            title: `Body Paint Japonés ${i + 1}`,
            description: 'Arte corporal inspirado en la cultura japonesa',
            category: 'editorial',
            portfolioSection: 'portfolio',
            featured: true, // Marcar como destacadas
            order: i + 1
          }
        }
      );
      
      console.log(`✅ ${photo.imageUrl.split('/').pop()} → "Body Paint Japonés ${i + 1}"`);
    }
    
    // Verificar el resultado
    console.log('\n📊 Resumen de sesiones:');
    
    const eleganciaCount = await Photo.countDocuments({ workCollection: 'sesion-elegancia-clasica' });
    const bodyPaintCount = await Photo.countDocuments({ workCollection: 'body-paint-japones' });
    
    console.log(`🎭 Elegancia Clásica: ${eleganciaCount} fotos`);
    console.log(`🎨 Body Paint Japonés: ${bodyPaintCount} fotos`);
    
    mongoose.connection.close();
    console.log('\n✨ Sesiones organizadas exitosamente');
    
  } catch (error) {
    console.error('❌ Error:', error);
    mongoose.connection.close();
  }
}

organizePhotoSessions();
