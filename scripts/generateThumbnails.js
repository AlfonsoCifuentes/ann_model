/**
 * THUMBNAIL GENERATOR SCRIPT
 * Genera thumbnails automáticamente usando transformaciones de Cloudinary
 * O redimensiona imágenes locales si no están en Cloudinary
 */

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

// Configuración de tamaños de thumbnails
const THUMBNAIL_SIZES = {
  small: { width: 150, height: 200, quality: 60 },
  medium: { width: 400, height: 500, quality: 70 },
  large: { width: 800, height: 1000, quality: 80 }
};

// Generar URLs de Cloudinary optimizadas
function generateCloudinaryThumbnails(originalUrl) {
  if (!originalUrl.includes('cloudinary.com')) {
    return null;
  }
  
  // Extraer public_id de la URL de Cloudinary
  const urlParts = originalUrl.split('/');
  const uploadIndex = urlParts.findIndex(part => part === 'upload');
  if (uploadIndex === -1) return null;
  
  const publicId = urlParts.slice(uploadIndex + 2).join('/').replace(/\.[^/.]+$/, "");
  const baseUrl = urlParts.slice(0, uploadIndex + 1).join('/');
  
  return {
    small: `${baseUrl}/c_fill,w_150,h_200,q_60,f_auto/${publicId}`,
    medium: `${baseUrl}/c_fill,w_400,h_500,q_70,f_auto/${publicId}`,
    large: `${baseUrl}/c_fill,w_800,h_1000,q_80,f_auto/${publicId}`
  };
}

// Generar thumbnails locales usando Sharp
async function generateLocalThumbnails(imagePath, outputDir) {
  const thumbnails = {};
  const filename = path.basename(imagePath, path.extname(imagePath));
  
  for (const [size, config] of Object.entries(THUMBNAIL_SIZES)) {
    const outputPath = path.join(outputDir, `${filename}_${size}.jpg`);
    
    try {
      await sharp(imagePath)
        .resize(config.width, config.height, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: config.quality, progressive: true })
        .toFile(outputPath);
      
      thumbnails[size] = `/photos/thumbnails/${path.basename(outputPath)}`;
    } catch (error) {
      console.error(`Error generando thumbnail ${size} para ${imagePath}:`, error);
    }
  }
  
  return thumbnails;
}

// Función principal para procesar todas las fotos
async function generateAllThumbnails() {
  try {
    console.log('🖼️  Iniciando generación de thumbnails...');
    
    // Conectar a MongoDB
    const mongoose = require('mongoose');
    require('dotenv').config({ path: '../.env.local' });
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Importar modelo Photo (CommonJS)
    const Photo = mongoose.model('Photo', require('../src/models/Photo').default?.schema || new mongoose.Schema({
      title: String,
      imageUrl: String,
      thumbnails: {
        small: String,
        medium: String,
        large: String
      }
    }));
    
    // Obtener todas las fotos sin thumbnails
    const photos = await Photo.find({
      $or: [
        { thumbnails: { $exists: false } },
        { 'thumbnails.small': { $exists: false } }
      ]
    });
    
    console.log(`📊 Encontradas ${photos.length} fotos para procesar`);
    
    // Crear directorio de thumbnails si no existe
    const thumbnailDir = path.join(process.cwd(), 'public', 'photos', 'thumbnails');
    try {
      await fs.mkdir(thumbnailDir, { recursive: true });
    } catch (error) {
      // El directorio ya existe
    }
    
    let processed = 0;
    let cloudinaryCount = 0;
    let localCount = 0;
    
    for (const photo of photos) {
      try {
        let thumbnails;
        
        // Intentar generar thumbnails de Cloudinary primero
        thumbnails = generateCloudinaryThumbnails(photo.imageUrl);
        
        if (thumbnails) {
          cloudinaryCount++;
          console.log(`☁️  Cloudinary thumbnails para: ${photo.title}`);
        } else if (photo.imageUrl.startsWith('/photos/')) {
          // Imagen local - generar thumbnails con Sharp
          const imagePath = path.join(process.cwd(), 'public', photo.imageUrl);
          
          try {
            await fs.access(imagePath);
            thumbnails = await generateLocalThumbnails(imagePath, thumbnailDir);
            localCount++;
            console.log(`🖥️  Thumbnails locales para: ${photo.title}`);
          } catch (error) {
            console.warn(`⚠️  No se encontró imagen local: ${imagePath}`);
            continue;
          }
        } else {
          console.warn(`⚠️  URL no reconocida: ${photo.imageUrl}`);
          continue;
        }
        
        // Actualizar documento en MongoDB
        if (thumbnails) {
          await Photo.findByIdAndUpdate(photo._id, {
            $set: { thumbnails }
          });
          processed++;
          
          if (processed % 10 === 0) {
            console.log(`📈 Procesadas ${processed}/${photos.length} fotos...`);
          }
        }
        
      } catch (error) {
        console.error(`❌ Error procesando ${photo.title}:`, error);
      }
    }
    
    console.log('\n✅ Generación de thumbnails completada!');
    console.log(`📊 Estadísticas:
    - Total procesadas: ${processed}
    - Cloudinary: ${cloudinaryCount}
    - Locales: ${localCount}
    - Errores: ${photos.length - processed}`);
    
    await mongoose.disconnect();
    
  } catch (error) {
    console.error('❌ Error en generación de thumbnails:', error);
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  generateAllThumbnails();
}

module.exports = { generateAllThumbnails, generateCloudinaryThumbnails, generateLocalThumbnails };
