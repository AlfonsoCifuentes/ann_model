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

// Función para categorizar fotos SVM por número
function categorizeSVMPhoto(filename) {
  const number = filename.match(/SVM(\d+)/)?.[1];
  if (!number) return 'Studio';
  
  const num = parseInt(number);
  
  if (num >= 5601 && num <= 5640) {
    return 'Editorial';
  } else if (num >= 5641 && num <= 5680) {
    return 'Moda';
  } else if (num >= 5681 && num <= 5720) {
    return 'Retrato';
  } else if (num >= 5721 && num <= 5760) {
    return 'Body Paint';
  } else {
    return 'Studio';
  }
}

// Función para generar título descriptivo
function generateSVMTitle(filename, category) {
  const number = filename.match(/SVM(\d+)/)?.[1] || '0000';
  
  const titles = {
    'Editorial': `Sesión Editorial SVM${number}`,
    'Moda': `Look de Moda SVM${number}`,
    'Retrato': `Retrato Profesional SVM${number}`,
    'Body Paint': `Arte Corporal SVM${number}`,
    'Studio': `Sesión de Estudio SVM${number}`
  };
  
  return titles[category] || `Fotografía Profesional SVM${number}`;
}

// Función para generar descripción
function generateSVMDescription(filename, category) {
  const descriptions = {
    'Editorial': 'Fotografía editorial de alta calidad que captura elegancia y sofisticación en cada toma.',
    'Moda': 'Sesión de moda que destaca las últimas tendencias con un estilo único y profesional.',
    'Retrato': 'Retrato profesional que revela la personalidad y esencia del sujeto con técnica impecable.',
    'Body Paint': 'Arte corporal creativo que combina fotografía y pintura para crear obras visuales únicas.',
    'Studio': 'Fotografía de estudio profesional con iluminación controlada y composición cuidadosa.'
  };
  
  return descriptions[category] || 'Fotografía profesional de alta calidad.';
}

// Función principal para subir fotos SVM
async function uploadSVMPhotos() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Directorio de fotos
    const photosDir = path.join(__dirname, '..', 'public', 'photos');
    console.log(`📂 Buscando fotos SVM en: ${photosDir}`);

    // Leer archivos del directorio
    const files = fs.readdirSync(photosDir);
    const svmFiles = files.filter(file => 
      file.startsWith('SVM') && 
      file.toLowerCase().endsWith('.jpg')
    );

    console.log(`📸 Encontradas ${svmFiles.length} fotos SVM para subir:`);
    svmFiles.forEach(file => console.log(`   - ${file}`));

    let uploaded = 0;
    let skipped = 0;
    let errors = 0;

    for (const filename of svmFiles) {
      try {
        console.log(`📤 Procesando ${filename}...`);

        // Verificar si ya existe
        const existingPhoto = await Photo.findOne({ filename });
        if (existingPhoto) {
          console.log(`⏭️  ${filename} ya existe en la base de datos`);
          skipped++;
          continue;
        }

        // Categorizar la foto
        const category = categorizeSVMPhoto(filename);
        const workCollection = category;
        
        // Generar título y descripción
        const title = generateSVMTitle(filename, category);
        const description = generateSVMDescription(filename, category);
        
        // Crear URL de imagen (ruta relativa desde public)
        const imageUrl = `/photos/${filename}`;
        
        // Determinar tags basados en la categoría
        const tags = [category.toLowerCase(), 'svm', 'professional', 'portfolio'];
        
        // Crear objeto de foto
        const photoData = {
          filename,
          title,
          description,
          imageUrl,
          workCollection,
          category,
          tags,
          portfolioSection: 'portfolio',
          status: 'active',
          order: parseInt(filename.match(/\d+/)?.[0] || '0'),
          featured: false,
          altText: title,
          metadata: {
            originalName: filename,
            mimeType: 'image/jpeg',
            uploadedBy: 'system',
            uploadDate: new Date()
          }
        };

        // Guardar en la base de datos
        const photo = new Photo(photoData);
        await photo.save();
        
        console.log(`✅ ${filename} subida exitosamente como ${category}`);
        uploaded++;

      } catch (error) {
        console.error(`❌ Error procesando ${filename}:`, error.message);
        errors++;
      }
    }

    console.log(`\n🎯 ¡Proceso completado!`);
    console.log(`📊 Resumen:`);
    console.log(`   - Subidas: ${uploaded}`);
    console.log(`   - Ya existían: ${skipped}`);
    console.log(`   - Errores: ${errors}`);
    console.log(`   - Total procesadas: ${uploaded + skipped + errors}`);

  } catch (error) {
    console.error('❌ Error durante el proceso:', error);
  } finally {
    // Desconectar de MongoDB
    await mongoose.disconnect();
    console.log('📡 Desconectado de MongoDB');
  }
}

// Ejecutar el script
uploadSVMPhotos();
