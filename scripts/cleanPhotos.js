const mongoose = require('mongoose');

// Definir el schema directamente en el script
const photoSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  imageUrl: { type: String, required: true },
  alt: { type: String, required: true },
  category: { type: String, required: true },
  portfolioSection: String,
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  metadata: {
    width: Number,
    height: Number,
    size: Number
  }
}, {
  timestamps: true
});

const Photo = mongoose.model('Photo', photoSchema);

// Conectar a MongoDB
mongoose.connect('mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/')
  .then(async () => {
    console.log('Conectado a MongoDB');
    
    // Obtener todas las fotos actuales
    const allPhotos = await Photo.find({});
    console.log(`\nFotos actuales en BD: ${allPhotos.length}`);
    
    // Mostrar estructura de la primera foto para debug
    if (allPhotos.length > 0) {
      console.log('\nEstructura de la primera foto:');
      console.log(JSON.stringify(allPhotos[0], null, 2));
    }
    
    // Mostrar todas las fotos
    allPhotos.forEach((photo, index) => {
      console.log(`${index + 1}. ${photo.filename || photo.imageUrl || 'Sin nombre'} (${photo.category})`);
    });
    
    // Identificar fotos placeholder (las que no son de Ana Nicoleta)
    const placeholderPhotos = allPhotos.filter(photo => {
      const imageUrl = photo.imageUrl.toLowerCase();
      return imageUrl.includes('editorial_') || 
             imageUrl.includes('fashion_model_') || 
             imageUrl.includes('portrait_') || 
             imageUrl.includes('studio_') ||
             imageUrl.includes('model1.jpg');
    });
    
    console.log(`\nFotos placeholder encontradas: ${placeholderPhotos.length}`);
    placeholderPhotos.forEach(photo => {
      console.log(`- ${photo.imageUrl}`);
    });
    
    // Eliminar fotos placeholder
    if (placeholderPhotos.length > 0) {
      const placeholderIds = placeholderPhotos.map(photo => photo._id);
      const deleteResult = await Photo.deleteMany({ _id: { $in: placeholderIds } });
      console.log(`\nFotos placeholder eliminadas: ${deleteResult.deletedCount}`);
    }
    
    // Mostrar fotos restantes (solo de Ana Nicoleta)
    const remainingPhotos = await Photo.find({});
    console.log(`\nFotos restantes (Ana Nicoleta): ${remainingPhotos.length}`);
    remainingPhotos.forEach((photo, index) => {
      console.log(`${index + 1}. ${photo.imageUrl} (${photo.category})`);
    });
    
    // Marcar algunas fotos como destacadas para hero y highlights
    const heroPhotos = [
      '/photos/SVM05701.jpg',
      '/photos/SVM05720.jpg', 
      '/photos/SVM05728.jpg',
      '/photos/SVM05734.jpg',
      '/photos/SVM05741.jpg'
    ];
    
    const highlightPhotos = [
      '/photos/SVM05701.jpg',
      '/photos/SVM05620.jpg',
      '/photos/SVM05631.jpg',
      '/photos/SVM05660.jpg',
      '/photos/SVM05675.jpg',
      '/photos/SVM05706.jpg',
      '/photos/SVM05722.jpg',
      '/photos/SVM05736.jpg'
    ];
    
    // Actualizar fotos para hero
    for (const imageUrl of heroPhotos) {
      await Photo.updateOne(
        { imageUrl },
        { 
          $set: { 
            portfolioSection: 'hero',
            featured: true 
          } 
        }
      );
    }
    
    // Actualizar fotos para highlights
    for (const imageUrl of highlightPhotos) {
      await Photo.updateOne(
        { imageUrl },
        { 
          $set: { 
            featured: true,
            portfolioSection: imageUrl === '/photos/SVM05701.jpg' ? 'hero' : 'highlights'
          } 
        }
      );
    }
    
    console.log(`\nFotos marcadas como destacadas: ${new Set([...heroPhotos, ...highlightPhotos]).size}`);
    
    mongoose.connection.close();
    console.log('\nLimpieza completada exitosamente');
  })
  .catch(err => {
    console.error('Error:', err);
    mongoose.connection.close();
  });
