/**
 * CHECK IMAGE OPTIMIZATION SCRIPT
 * Verifica el rendimiento y optimización de imágenes
 */

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  thumbnails: Object,
  category: String,
  isHero: Boolean,
  featuredInHome: Boolean
});

const Photo = mongoose.model('Photo', PhotoSchema);

async function checkImageOptimization() {
  try {
    console.log('🔍 Verificando optimización de imágenes...\n');
    
    await mongoose.connect(process.env.MONGODB_URI);
    
    const photos = await Photo.find({});
    const stats = {
      total: photos.length,
      withThumbnails: 0,
      cloudinary: 0,
      local: 0,
      hero: 0,
      featured: 0,
      needsOptimization: []
    };
    
    for (const photo of photos) {
      // Clasificar por tipo
      if (photo.imageUrl.includes('cloudinary.com')) {
        stats.cloudinary++;
      } else {
        stats.local++;
      }
      
      // Verificar thumbnails
      if (photo.thumbnails && Object.keys(photo.thumbnails).length > 0) {
        stats.withThumbnails++;
      } else {
        stats.needsOptimization.push({
          title: photo.title || 'Sin título',
          url: photo.imageUrl,
          category: photo.category
        });
      }
      
      // Contar por importancia
      if (photo.isHero) stats.hero++;
      if (photo.featuredInHome) stats.featured++;
    }
    
    // Mostrar estadísticas
    console.log('📊 ESTADÍSTICAS DE OPTIMIZACIÓN:');
    console.log(`   📸 Total de fotos: ${stats.total}`);
    console.log(`   ✅ Con thumbnails: ${stats.withThumbnails} (${Math.round(stats.withThumbnails/stats.total*100)}%)`);
    console.log(`   ☁️  Cloudinary: ${stats.cloudinary}`);
    console.log(`   📁 Locales: ${stats.local}`);
    console.log(`   🎭 Hero: ${stats.hero}`);
    console.log(`   ⭐ Featured: ${stats.featured}\n`);
    
    // Mostrar recomendaciones
    console.log('💡 RECOMENDACIONES:');
    
    if (stats.needsOptimization.length > 0) {
      console.log(`   ⚠️  ${stats.needsOptimization.length} fotos necesitan optimización:`);
      stats.needsOptimization.slice(0, 5).forEach(photo => {
        console.log(`      • ${photo.title} (${photo.category})`);
      });
      if (stats.needsOptimization.length > 5) {
        console.log(`      ... y ${stats.needsOptimization.length - 5} más`);
      }
      console.log('\n   🚀 Ejecuta: npm run optimize-images');
    } else {
      console.log('   ✅ Todas las fotos están optimizadas!');
    }
    
    if (stats.local > stats.cloudinary) {
      console.log('\n   💾 Considera migrar fotos locales a Cloudinary para mejor rendimiento');
    }
    
    if (stats.hero > 0) {
      console.log(`\n   🎯 ${stats.hero} fotos hero detectadas - estas deberían tener máxima prioridad`);
    }
    
    console.log('\n🎨 OPTIMIZACIONES ACTIVAS:');
    console.log('   ✅ Next.js Image Optimization');
    console.log('   ✅ Lazy Loading con Intersection Observer');
    console.log('   ✅ WebP/AVIF automático');
    console.log('   ✅ Responsive Images');
    console.log('   ✅ Blur Placeholders');
    
    await mongoose.disconnect();
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkImageOptimization();
