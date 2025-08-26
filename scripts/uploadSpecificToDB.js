// Cargar variables de entorno
require('dotenv').config({ path: '.env.local' });

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Definir el schema del modelo Photo
const photoSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  title: String,
  description: String,
  imageUrl: { type: String, required: true },
  workCollection: String,
  category: String,
  tags: [String],
  featured: { type: Boolean, default: false },
  isHero: { type: Boolean, default: false },
  portfolioSection: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  order: { type: Number, default: 0 },
  altText: String,
  metadata: {
    originalName: String,
    mimeType: String,
    uploadedBy: String
  }
}, {
  timestamps: true
});

const Photo = mongoose.model('Photo', photoSchema);

// Función para conectar a MongoDB
async function connectDB() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ann-model-portfolio';
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');
    return true;
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    return false;
  }
}

// Función para generar URLs de Cloudinary simuladas (usando URLs locales por ahora)
function generateCloudinaryURL(filename) {
  // Por ahora usamos URLs locales, pero en producción sería una URL de Cloudinary
  return `/photos/${filename}`;
}

// Función para generar metadatos basados en el nombre del archivo
function generatePhotoMetadata(filename) {
  const name = filename.toLowerCase();
  
  if (name.includes('bodypaint_tree')) {
    const num = name.includes('-1') ? 'I' : 'II';
    return {
      title: `Body Paint Tree Art ${num}`,
      description: 'Sesión artística de body paint en entorno natural, fusionando arte corporal con la naturaleza',
      workCollection: 'Body Paint Artístico',
      category: 'editorial',
      tags: ['body-paint', 'artistic', 'editorial', 'nature', 'tree'],
      portfolioSection: 'portfolio'
    };
  }
  
  if (name.includes('classy')) {
    const num = name.match(/-(\d+)/)?.[1] || '1';
    return {
      title: `Elegancia Clásica ${num}`,
      description: 'Retrato elegante capturando sofisticación y clase natural',
      workCollection: 'Elegancia Clásica',
      category: 'fashion',
      tags: ['classy', 'elegant', 'fashion', 'sophisticated'],
      portfolioSection: 'portfolio'
    };
  }
  
  if (name.includes('makeup2-portrait') || name.includes('make-up_close_up')) {
    return {
      title: 'Retrato con Maquillaje Profesional',
      description: 'Trabajo de maquillaje artístico destacando técnicas profesionales y creatividad',
      workCollection: 'Maquillaje Profesional',
      category: 'portrait',
      tags: ['makeup', 'portrait', 'professional', 'beauty'],
      portfolioSection: 'portfolio'
    };
  }
  
  if (name.includes('japanese_body_paint')) {
    const num = name.includes('-1') ? 'I' : 'II';
    return {
      title: `Body Paint Japonés ${num}`,
      description: 'Arte corporal inspirado en la cultura japonesa, combinando tradición y modernidad',
      workCollection: 'Body Paint Japonés',
      category: 'editorial',
      tags: ['body-paint', 'japanese', 'cultural', 'artistic'],
      portfolioSection: 'portfolio'
    };
  }
  
  if (name.includes('street_body_paint')) {
    const num = name.match(/-(\d+)/)?.[1] || '1';
    return {
      title: `Body Paint Urbano ${num}`,
      description: 'Body paint en entorno urbano, contrastando arte corporal con arquitectura moderna',
      workCollection: 'Body Paint Urbano',
      category: 'editorial',
      tags: ['body-paint', 'urban', 'street', 'artistic'],
      portfolioSection: 'portfolio'
    };
  }
  
  if (name.includes('polas')) {
    const num = name.match(/(\d+)$/)?.[1] || '1';
    return {
      title: `Polas ${num}`,
      description: 'Fotografía instantánea con estética vintage y espontánea',
      workCollection: 'Polas',
      category: 'portrait',
      tags: ['polaroid', 'vintage', 'instant', 'candid'],
      portfolioSection: 'portfolio'
    };
  }
  
  return {
    title: filename.replace(/\.(jpg|jpeg|png|JPG)$/i, '').replace(/[-_]/g, ' '),
    description: 'Fotografía profesional de portfolio',
    workCollection: 'Colección General',
    category: 'portfolio',
    tags: ['photography', 'professional'],
    portfolioSection: 'portfolio'
  };
}

// Función principal para subir fotos específicas
async function uploadSpecificPhotos() {
  console.log('🚀 Iniciando proceso de subida de fotos específicas...');
  
  const connected = await connectDB();
  if (!connected) {
    console.log('❌ No se pudo conectar a la base de datos');
    return;
  }
  
  const specificPhotos = [
    'bodypaint_tree-2.JPG',
    'classy-3.jpg', 
    'makeup2-portrait1.jpg'
  ];
  
  const photosDir = path.join(__dirname, '..', 'public', 'photos');
  
  try {
    for (const filename of specificPhotos) {
      const filePath = path.join(photosDir, filename);
      
      // Verificar que el archivo existe
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Archivo no encontrado: ${filename}`);
        continue;
      }
      
      console.log(`📤 Procesando ${filename}...`);
      
      // Verificar si ya existe en la base de datos
      const existingPhoto = await Photo.findOne({ filename });
      
      if (existingPhoto) {
        console.log(`⚠️  ${filename} ya existe en la base de datos, actualizando...`);
        const metadata = generatePhotoMetadata(filename);
        
        existingPhoto.title = metadata.title;
        existingPhoto.description = metadata.description;
        existingPhoto.workCollection = metadata.workCollection;
        existingPhoto.category = metadata.category;
        existingPhoto.tags = metadata.tags;
        existingPhoto.portfolioSection = metadata.portfolioSection;
        existingPhoto.status = 'active';
        existingPhoto.imageUrl = generateCloudinaryURL(filename);
        
        await existingPhoto.save();
        console.log(`✅ ${filename} actualizada exitosamente`);
      } else {
        // Crear nueva entrada
        const metadata = generatePhotoMetadata(filename);
        
        const newPhoto = new Photo({
          filename,
          title: metadata.title,
          description: metadata.description,
          imageUrl: generateCloudinaryURL(filename),
          workCollection: metadata.workCollection,
          category: metadata.category,
          tags: metadata.tags,
          portfolioSection: metadata.portfolioSection,
          status: 'active',
          order: 0,
          altText: metadata.title,
          metadata: {
            originalName: filename,
            mimeType: filename.toLowerCase().endsWith('.jpg') || filename.toLowerCase().endsWith('.jpeg') ? 'image/jpeg' : 'image/png',
            uploadedBy: 'admin'
          }
        });
        
        await newPhoto.save();
        console.log(`✅ ${filename} guardada exitosamente en la base de datos`);
      }
    }
    
    console.log('🎉 ¡Proceso completado! Verificando base de datos...');
    
    // Verificar que las fotos están en la base de datos
    const uploadedPhotos = await Photo.find({ 
      filename: { $in: specificPhotos },
      status: 'active'
    });
    
    console.log('\n📋 Fotos en la base de datos:');
    uploadedPhotos.forEach(photo => {
      console.log(`- ${photo.filename} -> ${photo.title} (${photo.workCollection})`);
    });
    
  } catch (error) {
    console.error('❌ Error durante el proceso:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📡 Desconectado de MongoDB');
  }
}

// Ejecutar el script
uploadSpecificPhotos();
