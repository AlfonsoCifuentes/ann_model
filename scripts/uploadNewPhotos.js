const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Definir el schema
const photoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String],
  featured: { type: Boolean, default: false },
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

// Función para categorizar automáticamente según el nombre del archivo
function categorizePhoto(filename) {
  const name = filename.toLowerCase();
  
  if (name.includes('bodypaint') || name.includes('body_paint')) {
    return {
      category: 'editorial',
      tags: ['body-paint', 'artistic', 'editorial', 'ana-nicoleta'],
      portfolioSection: 'portfolio'
    };
  }
  
  if (name.includes('classy')) {
    return {
      category: 'portrait',
      tags: ['portrait', 'elegant', 'classy', 'ana-nicoleta'],
      portfolioSection: 'portfolio'
    };
  }
  
  if (name.includes('japanese')) {
    return {
      category: 'editorial',
      tags: ['editorial', 'japanese', 'cultural', 'body-paint', 'ana-nicoleta'],
      portfolioSection: 'portfolio'
    };
  }
  
  if (name.includes('makeup') || name.includes('make-up')) {
    return {
      category: 'portrait',
      tags: ['makeup', 'beauty', 'portrait', 'close-up', 'ana-nicoleta'],
      portfolioSection: 'portfolio'
    };
  }
  
  if (name.includes('street')) {
    return {
      category: 'lifestyle',
      tags: ['street', 'urban', 'lifestyle', 'body-paint', 'ana-nicoleta'],
      portfolioSection: 'portfolio'
    };
  }
  
  if (name.includes('polas')) {
    return {
      category: 'fashion',
      tags: ['polaroid', 'fashion', 'vintage', 'ana-nicoleta'],
      portfolioSection: 'portfolio'
    };
  }
  
  // Por defecto
  return {
    category: 'portrait',
    tags: ['ana-nicoleta', 'professional'],
    portfolioSection: 'portfolio'
  };
}

// Función para generar títulos descriptivos
function generateTitle(filename) {
  const name = filename.toLowerCase().replace(/\.(jpg|jpeg|png)$/i, '');
  
  if (name.includes('bodypaint_tree')) {
    return name.includes('-1') ? 'Body Paint Natural - Árbol I' : 'Body Paint Natural - Árbol II';
  }
  
  if (name.includes('classy')) {
    const num = name.match(/-(\d+)/)?.[1] || '1';
    return `Elegancia Clásica ${num}`;
  }
  
  if (name.includes('japanese_body_paint')) {
    return name.includes('-1') ? 'Body Paint Japonés I' : 'Body Paint Japonés II';
  }
  
  if (name.includes('make-up_close_up')) {
    return 'Maquillaje Artístico - Close Up';
  }
  
  if (name.includes('makeup2-portrait')) {
    return 'Retrato con Maquillaje Profesional';
  }
  
  if (name.includes('street_body_paint')) {
    const num = name.match(/-(\d+)/)?.[1] || '1';
    return `Body Paint Urbano ${num}`;
  }
  
  if (name.includes('polas')) {
    const num = name.match(/(\d+)$/)?.[1] || '1';
    return `Polas Session ${num}`;
  }
  
  return filename.replace(/\.(jpg|jpeg|png)$/i, '').replace(/[-_]/g, ' ');
}

// Función para generar descripciones
function generateDescription(filename, category) {
  const name = filename.toLowerCase();
  
  if (name.includes('bodypaint') && name.includes('tree')) {
    return 'Sesión artística de body paint en entorno natural, fusionando arte corporal con la naturaleza';
  }
  
  if (name.includes('classy')) {
    return 'Retrato elegante capturando la sofisticación y clase natural';
  }
  
  if (name.includes('japanese_body_paint')) {
    return 'Arte corporal inspirado en la cultura japonesa, combinando tradición y modernidad';
  }
  
  if (name.includes('makeup') || name.includes('make-up')) {
    return 'Trabajo de maquillaje artístico destacando técnicas profesionales y creatividad';
  }
  
  if (name.includes('street')) {
    return 'Body paint en entorno urbano, contrastando arte corporal con arquitectura moderna';
  }
  
  if (name.includes('polas')) {
    return 'Sesión con estética polas, capturando momentos auténticos y naturales';
  }
  
  return `Fotografía profesional de ${category} para portfolio de Ana Nicoleta`;
}

// Función principal
async function uploadNewPhotos() {
  try {
    await mongoose.connect('mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/');
    console.log('🔗 Conectado a MongoDB');
    
    const photosDir = 'G:\\Proyectos\\Webdev\\ann_model\\src\\app\\photos\\otras';
    const files = fs.readdirSync(photosDir);
    
    console.log(`📁 Encontradas ${files.length} fotos nuevas:`);
    files.forEach(file => console.log(`   - ${file}`));
    
    let uploadCount = 0;
    let featuredCount = 0;
    
    for (const filename of files) {
      // Verificar si ya existe
      const existingPhoto = await Photo.findOne({ 
        'metadata.originalName': filename 
      });
      
      if (existingPhoto) {
        console.log(`⚠️  Foto ya existe: ${filename}`);
        continue;
      }
      
      // Determinar si debe ser destacada (las primeras 4 fotos de cada categoría)
      const { category, tags, portfolioSection } = categorizePhoto(filename);
      const existingInCategory = await Photo.countDocuments({ category, featured: true });
      const shouldBeFeatured = existingInCategory < 3; // Máximo 3 destacadas por categoría
      
      const photoData = {
        title: generateTitle(filename),
        description: generateDescription(filename, category),
        imageUrl: `/photos/otras/${filename}`,
        category,
        tags,
        featured: shouldBeFeatured,
        portfolioSection,
        status: 'active',
        order: uploadCount,
        altText: generateTitle(filename),
        metadata: {
          originalName: filename,
          mimeType: filename.toLowerCase().endsWith('.jpg') || filename.toLowerCase().endsWith('.jpeg') ? 'image/jpeg' : 'image/png',
          uploadedBy: 'Ana Nicoleta'
        }
      };
      
      await Photo.create(photoData);
      uploadCount++;
      
      if (shouldBeFeatured) {
        featuredCount++;
      }
      
      console.log(`✅ Subida: ${filename} (${category}${shouldBeFeatured ? ' - DESTACADA' : ''})`);
    }
    
    // Estadísticas finales
    console.log(`\n📊 RESUMEN DE CARGA:`);
    console.log(`   ✨ Fotos subidas: ${uploadCount}`);
    console.log(`   ⭐ Fotos destacadas: ${featuredCount}`);
    
    // Mostrar distribución por categorías
    console.log(`\n📋 DISTRIBUCIÓN ACTUALIZADA:`);
    const categories = await Photo.aggregate([
      { $group: { _id: '$category', total: { $sum: 1 }, featured: { $sum: { $cond: ['$featured', 1, 0] } } } },
      { $sort: { total: -1 } }
    ]);
    
    categories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.total} fotos (${cat.featured} destacadas)`);
    });
    
    const totalPhotos = await Photo.countDocuments();
    console.log(`\n🎯 Total en BD: ${totalPhotos} fotos`);
    
    mongoose.connection.close();
    console.log('\n🚀 ¡Carga completada exitosamente!');
    
  } catch (error) {
    console.error('❌ Error:', error);
    mongoose.connection.close();
  }
}

uploadNewPhotos();
