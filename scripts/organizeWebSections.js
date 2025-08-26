const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  category: String,
  portfolioSection: String,
  featured: Boolean,
  status: String,
  workCollection: String,
  order: Number
});

const Photo = mongoose.model('Photo', photoSchema);

async function organizeWebSections() {
  try {
    await mongoose.connect('mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/');
    
    console.log('🎨 Organizando secciones del sitio web...\n');
    
    // 1. HERO - Mantener las fotos actuales (no tocar como solicitaste)
    console.log('🖼️ HERO - Manteniendo fotos actuales');
    const heroPhotos = await Photo.countDocuments({ portfolioSection: 'hero' });
    console.log(`   Fotos en hero: ${heroPhotos}`);
    
    // 2. PORTFOLIO HIGHLIGHTS - Mezcla de trabajos destacados
    console.log('\n⭐ PORTFOLIO HIGHLIGHTS - Configurando trabajos destacados');
    
    // Resetear highlights actuales
    await Photo.updateMany(
      { portfolioSection: 'highlights' },
      { $set: { portfolioSection: 'portfolio' } }
    );
    
    // Seleccionar una foto destacada de cada trabajo para highlights
    const workCollections = [
      'body-paint-japones',
      'elegancia-clasica', 
      'maquillaje-artistico',
      'body-paint-urbano',
      'polaroids-vintage',
      'body-paint-natural'
    ];
    
    for (const collection of workCollections) {
      await Photo.updateOne(
        { workCollection: collection, order: 1 }, // Primera foto de cada colección
        { 
          $set: { 
            portfolioSection: 'highlights',
            featured: true 
          } 
        }
      );
    }
    
    const highlightsCount = await Photo.countDocuments({ portfolioSection: 'highlights' });
    console.log(`   Fotos en highlights: ${highlightsCount}`);
    
    // 3. ABOUT PAGE - Fotos profesionales elegantes
    console.log('\n👤 ABOUT PAGE - Asignando fotos profesionales');
    
    // Usar fotos de elegancia clásica y sesión profesional para About
    await Photo.updateMany(
      { 
        $or: [
          { workCollection: 'sesion-elegancia-clasica' },
          { imageUrl: { $regex: 'SVM05(620|631|675|736)' } } // Fotos más elegantes
        ]
      },
      { $set: { portfolioSection: 'about' } }
    );
    
    const aboutCount = await Photo.countDocuments({ portfolioSection: 'about' });
    console.log(`   Fotos para About: ${aboutCount}`);
    
    // 4. PORTFOLIO MAIN - Todas las colecciones organizadas
    console.log('\n📁 PORTFOLIO MAIN - Organizando trabajos por categorías');
    
    // Editorial: Body paint (todos los tipos)
    await Photo.updateMany(
      { 
        workCollection: { 
          $in: ['body-paint-japones', 'body-paint-urbano', 'body-paint-natural'] 
        }
      },
      { 
        $set: { 
          category: 'editorial',
          portfolioSection: 'portfolio'
        } 
      }
    );
    
    // Fashion: Polas y fotos comerciales
    await Photo.updateMany(
      { 
        $or: [
          { workCollection: 'polaroids-vintage' },
          { workCollection: 'sesion-profesional' }
        ]
      },
      { 
        $set: { 
          category: 'fashion',
          portfolioSection: 'portfolio'
        } 
      }
    );
    
    // Portrait: Elegancia y maquillaje
    await Photo.updateMany(
      { 
        $or: [
          { workCollection: 'elegancia-clasica' },
          { workCollection: 'maquillaje-artistico' }
        ]
      },
      { 
        $set: { 
          category: 'portrait',
          portfolioSection: 'portfolio'
        } 
      }
    );
    
    // 5. PRESS SECTION - Fotos más impactantes para prensa
    console.log('\n📰 PRESS SECTION - Seleccionando fotos para prensa');
    
    const pressPhotos = [
      'japanese_body_paint-1.JPG',
      'street_body_paint-1.jpg',
      'classy-1.jpg',
      'make-up_close_up-1.JPG'
    ];
    
    for (const photoName of pressPhotos) {
      await Photo.updateOne(
        { imageUrl: { $regex: photoName } },
        { $set: { portfolioSection: 'press' } }
      );
    }
    
    const pressCount = await Photo.countDocuments({ portfolioSection: 'press' });
    console.log(`   Fotos para Press: ${pressCount}`);
    
    // 6. REEL/VIDEO - Fotos dinámicas para thumbnails de video
    console.log('\n🎬 REEL SECTION - Asignando thumbnails para videos');
    
    const reelPhotos = [
      'street_body_paint-2.jpeg',
      'bodypaint_tree-1.JPG',
      'PolasAna03031.jpg'
    ];
    
    for (const photoName of reelPhotos) {
      await Photo.updateOne(
        { imageUrl: { $regex: photoName } },
        { $set: { portfolioSection: 'reel' } }
      );
    }
    
    const reelCount = await Photo.countDocuments({ portfolioSection: 'reel' });
    console.log(`   Fotos para Reel: ${reelCount}`);
    
    // 7. Reportar estadísticas finales
    console.log('\n📊 DISTRIBUCIÓN FINAL POR SECCIONES:');
    
    const sections = [
      'hero', 'highlights', 'portfolio', 'about', 'press', 'reel'
    ];
    
    for (const section of sections) {
      const count = await Photo.countDocuments({ portfolioSection: section });
      const emoji = section === 'hero' ? '🖼️' :
                   section === 'highlights' ? '⭐' :
                   section === 'portfolio' ? '📁' :
                   section === 'about' ? '👤' :
                   section === 'press' ? '📰' :
                   section === 'reel' ? '🎬' : '📸';
      console.log(`${emoji} ${section.toUpperCase()}: ${count} fotos`);
    }
    
    // 8. Estadísticas por categorías
    console.log('\n🎨 DISTRIBUCIÓN POR CATEGORÍAS:');
    const categories = await Photo.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    categories.forEach(cat => {
      const emoji = cat._id === 'editorial' ? '🎭' :
                   cat._id === 'fashion' ? '👗' :
                   cat._id === 'portrait' ? '👤' :
                   cat._id === 'commercial' ? '💼' : '📸';
      console.log(`${emoji} ${cat._id}: ${cat.count} fotos`);
    });
    
    console.log('\n✨ Sitio web completamente organizado y optimizado');
    console.log('🎯 Cada sección ahora muestra contenido específico y relevante');
    
    mongoose.connection.close();
    
  } catch (error) {
    console.error('❌ Error:', error);
    mongoose.connection.close();
  }
}

organizeWebSections();
