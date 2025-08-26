/**
 * SIMPLE CLOUDINARY THUMBNAIL UPDATER
 * Actualiza todas las fotos en MongoDB para incluir URLs optimizadas de Cloudinary
 */

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// Esquema simplificado de Photo
const PhotoSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  thumbnails: {
    small: String,
    medium: String,
    large: String
  }
});

const Photo = mongoose.model('Photo', PhotoSchema);

// Generar URLs de Cloudinary optimizadas
function generateCloudinaryThumbnails(originalUrl) {
  if (!originalUrl.includes('cloudinary.com')) {
    console.log(`❌ URL no es de Cloudinary: ${originalUrl}`);
    return null;
  }
  
  try {
    // Extraer public_id de la URL de Cloudinary
    const urlParts = originalUrl.split('/');
    const uploadIndex = urlParts.findIndex(part => part === 'upload');
    if (uploadIndex === -1) {
      console.log(`❌ No se encontró 'upload' en URL: ${originalUrl}`);
      return null;
    }
    
    const publicIdWithExtension = urlParts.slice(uploadIndex + 2).join('/');
    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");
    const baseUrl = urlParts.slice(0, uploadIndex + 1).join('/');
    
    console.log(`✅ Procesando: ${publicId}`);
    
    return {
      small: `${baseUrl}/c_fill,w_200,h_267,q_60,f_auto/${publicId}`,
      medium: `${baseUrl}/c_fill,w_400,h_533,q_75,f_auto/${publicId}`,
      large: `${baseUrl}/c_fill,w_800,h_1067,q_85,f_auto/${publicId}`
    };
  } catch (error) {
    console.error(`❌ Error procesando URL ${originalUrl}:`, error);
    return null;
  }
}

async function updatePhotoThumbnails() {
  try {
    console.log('🚀 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');
    
    // Obtener todas las fotos
    console.log('📊 Obteniendo todas las fotos...');
    const photos = await Photo.find({});
    console.log(`📸 Encontradas ${photos.length} fotos en total`);
    
    let updated = 0;
    let cloudinaryPhotos = 0;
    let localPhotos = 0;
    let errors = 0;
    
    for (const photo of photos) {
      try {
        if (photo.imageUrl.includes('cloudinary.com')) {
          cloudinaryPhotos++;
          
          // Generar thumbnails de Cloudinary
          const thumbnails = generateCloudinaryThumbnails(photo.imageUrl);
          
          if (thumbnails) {
            // Actualizar en MongoDB
            await Photo.findByIdAndUpdate(photo._id, {
              $set: { thumbnails }
            });
            updated++;
            console.log(`📝 Actualizada: ${photo.title || 'Sin título'}`);
          } else {
            errors++;
          }
        } else {
          localPhotos++;
          console.log(`📁 Foto local (no procesada): ${photo.imageUrl}`);
        }
      } catch (error) {
        errors++;
        console.error(`❌ Error procesando foto ${photo._id}:`, error);
      }
    }
    
    console.log('\n🎉 ¡Proceso completado!');
    console.log('📊 Estadísticas finales:');
    console.log(`   • Total de fotos: ${photos.length}`);
    console.log(`   • Fotos de Cloudinary: ${cloudinaryPhotos}`);
    console.log(`   • Fotos locales: ${localPhotos}`);
    console.log(`   • Actualizadas con thumbnails: ${updated}`);
    console.log(`   • Errores: ${errors}`);
    
    await mongoose.disconnect();
    console.log('👋 Desconectado de MongoDB');
    
  } catch (error) {
    console.error('💥 Error fatal:', error);
    process.exit(1);
  }
}

// Ejecutar
updatePhotoThumbnails();
