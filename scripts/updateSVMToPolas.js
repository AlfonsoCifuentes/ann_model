const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

// Schema de Photo
const photoSchema = new mongoose.Schema({
  filename: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  workCollection: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String],
  portfolioSection: { type: String, default: 'portfolio' },
  status: { type: String, default: 'active' },
  order: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  altText: String,
  metadata: {
    originalName: String,
    mimeType: String,
    uploadedBy: String,
    uploadDate: { type: Date, default: Date.now }
  }
}, {
  timestamps: true
});

const Photo = mongoose.model('Photo', photoSchema);

// Función para actualizar fotos SVM a categoría Polas
async function updateSVMToPolas() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Buscar todas las fotos SVM
    const svmPhotos = await Photo.find({ 
      filename: { $regex: /^SVM\d+/, $options: 'i' } 
    });

    console.log(`📸 Encontradas ${svmPhotos.length} fotos SVM para actualizar`);

    let updated = 0;

    for (const photo of svmPhotos) {
      try {
        // Actualizar a categoría Polas
        const updatedPhoto = await Photo.findByIdAndUpdate(
          photo._id,
          {
            workCollection: 'Polas',
            category: 'Polas',
            title: `Pola ${photo.filename.replace('.jpg', '').replace('SVM', '')}`,
            description: 'Fotografía polaroid natural estilo profesional del mundo de la moda.',
            tags: ['polas', 'natural', 'moda', 'profesional', 'portfolio'],
            altText: `Pola ${photo.filename.replace('.jpg', '').replace('SVM', '')}`
          },
          { new: true }
        );

        console.log(`✅ ${photo.filename} actualizada a categoría Polas`);
        updated++;

      } catch (error) {
        console.error(`❌ Error actualizando ${photo.filename}:`, error.message);
      }
    }

    console.log(`\n🎯 ¡Actualización completada!`);
    console.log(`📊 Fotos actualizadas: ${updated} de ${svmPhotos.length}`);

  } catch (error) {
    console.error('❌ Error durante la actualización:', error);
  } finally {
    // Desconectar de MongoDB
    await mongoose.disconnect();
    console.log('📡 Desconectado de MongoDB');
  }
}

// Ejecutar el script
updateSVMToPolas();
