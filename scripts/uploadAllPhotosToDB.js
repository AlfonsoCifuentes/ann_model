const mongoose = require('mongoose');
const fs = require('fs');
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

// Función para conectar a MongoDB
async function connectDB() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ann_model';
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB:', MONGODB_URI);
    return true;
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    return false;
  }
}

// Función para generar URL de Cloudinary
function generateCloudinaryURL(filename) {
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
  
  if (name.includes('natural')) {
    return {
      title: 'Retrato Natural',
      description: 'Fotografía natural capturando la esencia y autenticidad del momento',
      workCollection: 'Retratos Naturales',
      category: 'portrait',
      tags: ['natural', 'authentic', 'portrait'],
      portfolioSection: 'portfolio'
    };
  }
  
  if (name.includes('classic')) {
    return {
      title: 'Estilo Clásico',
      description: 'Fotografía con estética clásica y elegante',
      workCollection: 'Estilo Clásico',
      category: 'portrait',
      tags: ['classic', 'elegant', 'timeless'],
      portfolioSection: 'portfolio'
    };
  }
  
  // Categorías generales basadas en patrones del nombre
  if (name.includes('portrait') || name.includes('retrato')) {
    return {
      title: `Retrato Profesional`,
      description: 'Retrato profesional capturando personalidad y expresión',
      workCollection: 'Retratos',
      category: 'portrait',
      tags: ['portrait', 'professional'],
      portfolioSection: 'portfolio'
    };
  }
  
  if (name.includes('fashion') || name.includes('moda')) {
    return {
      title: 'Fotografía de Moda',
      description: 'Sesión de moda destacando estilo y tendencias',
      workCollection: 'Moda',
      category: 'fashion',
      tags: ['fashion', 'style', 'trend'],
      portfolioSection: 'portfolio'
    };
  }
  
  // Fallback genérico
  return {
    title: filename.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '').replace(/[-_]/g, ' '),
    description: 'Fotografía profesional de portfolio',
    workCollection: 'Colección General',
    category: 'portfolio',
    tags: ['photography', 'professional'],
    portfolioSection: 'portfolio'
  };
}

// Función principal para subir todas las fotos
async function uploadAllPhotos() {
  console.log('🚀 Iniciando carga masiva de fotos...');
  
  const connected = await connectDB();
  if (!connected) {
    console.log('❌ No se pudo conectar a la base de datos');
    return;
  }
  
  // Directorio de fotos origen
  const sourceDir = path.join(__dirname, '..', 'src', 'app', 'photos', 'otras');
  const destDir = path.join(__dirname, '..', 'public', 'photos');
  
  try {
    // Leer todas las fotos del directorio
    const allFiles = fs.readdirSync(sourceDir);
    const photoFiles = allFiles.filter(file => 
      /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(file)
    );
    
    console.log(`📸 Encontradas ${photoFiles.length} fotos para procesar:`);
    photoFiles.forEach((file, index) => {
      console.log(`   ${index + 1}. ${file}`);
    });
    
    let uploadedCount = 0;
    let skippedCount = 0;
    let copiedCount = 0;
    
    for (const filename of photoFiles) {
      try {
        console.log(`\n📤 Procesando: ${filename}`);
        
        // Copiar archivo a public/photos si no existe
        const sourcePath = path.join(sourceDir, filename);
        const destPath = path.join(destDir, filename);
        
        if (!fs.existsSync(destPath)) {
          fs.copyFileSync(sourcePath, destPath);
          console.log(`📋 Copiado a public/photos: ${filename}`);
          copiedCount++;
        } else {
          console.log(`📁 Ya existe en public: ${filename}`);
        }
        
        // Verificar si ya existe en la base de datos
        const existingPhoto = await Photo.findOne({ filename });
        
        if (existingPhoto) {
          console.log(`⏭️  Ya existe en BD: ${filename}`);
          skippedCount++;
          continue;
        }
        
        // Generar metadatos específicos
        const metadata = generatePhotoMetadata(filename);
        
        // Crear nueva entrada en la base de datos
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
          order: uploadedCount,
          featured: false,
          altText: metadata.title,
          metadata: {
            originalName: filename,
            mimeType: filename.toLowerCase().match(/\.(jpg|jpeg)$/i) ? 'image/jpeg' : 'image/png',
            uploadedBy: 'batch_upload',
            uploadDate: new Date()
          }
        });
        
        await newPhoto.save();
        console.log(`✅ Guardado en BD: ${filename} -> "${metadata.title}" (${metadata.workCollection})`);
        uploadedCount++;
        
      } catch (error) {
        console.error(`❌ Error procesando ${filename}:`, error.message);
      }
    }
    
    console.log('\n🎉 RESUMEN FINAL:');
    console.log(`📸 Total fotos encontradas: ${photoFiles.length}`);
    console.log(`📋 Archivos copiados a public: ${copiedCount}`);
    console.log(`✅ Fotos subidas a BD: ${uploadedCount}`);
    console.log(`⏭️  Fotos omitidas (ya existían): ${skippedCount}`);
    
    // Verificar estado final de la base de datos
    const totalPhotos = await Photo.countDocuments();
    const activePhotos = await Photo.countDocuments({ status: 'active' });
    
    console.log(`\n📊 ESTADO DE LA BASE DE DATOS:`);
    console.log(`   Total fotos en BD: ${totalPhotos}`);
    console.log(`   Fotos activas: ${activePhotos}`);
    
    // Mostrar algunas fotos agregadas
    const recentPhotos = await Photo.find({ status: 'active' })
      .sort({ 'metadata.uploadDate': -1 })
      .limit(5)
      .select('filename title workCollection');
    
    console.log(`\n📋 Últimas fotos agregadas:`);
    recentPhotos.forEach((photo, index) => {
      console.log(`   ${index + 1}. ${photo.filename} -> "${photo.title}" (${photo.workCollection})`);
    });
    
  } catch (error) {
    console.error('❌ Error durante el proceso:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Desconectado de MongoDB');
  }
}

// Ejecutar el script
uploadAllPhotos();
