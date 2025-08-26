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

// Fotos específicas para servicios
const servicePhotos = [
  {
    filename: 'bodypaint_tree-2.JPG',
    title: 'Body Paint Artístico en Árbol',
    description: 'Fotografía editorial de body paint artístico con elementos naturales.',
    workCollection: 'Body Paint',
    category: 'Editorial',
    tags: ['body paint', 'editorial', 'arte', 'naturaleza']
  },
  {
    filename: 'classy-3.jpg',
    title: 'Look Elegante de Moda',
    description: 'Fotografía de moda elegante con estilo clásico y sofisticado.',
    workCollection: 'Moda',
    category: 'Fashion',
    tags: ['moda', 'elegante', 'classy', 'fashion']
  },
  {
    filename: 'makeup2-portrait1.jpg',
    title: 'Retrato con Maquillaje Artístico',
    description: 'Retrato profesional destacando técnicas de maquillaje artístico.',
    workCollection: 'Retrato',
    category: 'Portrait',
    tags: ['retrato', 'maquillaje', 'portrait', 'beauty']
  }
];

async function addServicePhotos() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    let added = 0;
    let existing = 0;

    for (const photoData of servicePhotos) {
      try {
        // Verificar si ya existe
        const existingPhoto = await Photo.findOne({ filename: photoData.filename });
        
        if (existingPhoto) {
          console.log(`⏭️  ${photoData.filename} ya existe en la base de datos`);
          existing++;
          continue;
        }

        // Crear objeto completo de foto
        const completePhotoData = {
          ...photoData,
          imageUrl: `/photos/${photoData.filename}`,
          portfolioSection: 'portfolio',
          status: 'active',
          order: 0,
          featured: false,
          altText: photoData.title,
          metadata: {
            originalName: photoData.filename,
            mimeType: 'image/jpeg',
            uploadedBy: 'system',
            uploadDate: new Date()
          }
        };

        // Guardar en la base de datos
        const photo = new Photo(completePhotoData);
        await photo.save();
        
        console.log(`✅ ${photoData.filename} añadida exitosamente`);
        added++;

      } catch (error) {
        console.error(`❌ Error procesando ${photoData.filename}:`, error.message);
      }
    }

    console.log(`\n🎯 ¡Proceso completado!`);
    console.log(`📊 Resumen:`);
    console.log(`   - Añadidas: ${added}`);
    console.log(`   - Ya existían: ${existing}`);
    console.log(`   - Total procesadas: ${added + existing}`);

  } catch (error) {
    console.error('❌ Error durante el proceso:', error);
  } finally {
    // Desconectar de MongoDB
    await mongoose.disconnect();
    console.log('📡 Desconectado de MongoDB');
  }
}

// Ejecutar el script
addServicePhotos();
