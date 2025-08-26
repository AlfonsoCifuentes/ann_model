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

async function organizeAllPhotoSessions() {
  try {
    await mongoose.connect('mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/');
    
    console.log('🎨 Organizando todas las fotos en trabajos temáticos...\n');
    
    // 1. Body Paint Árbol (bodypaint_tree)
    const treeBodyPaint = await Photo.find({ 
      imageUrl: { $regex: 'bodypaint_tree' },
      workCollection: { $exists: false }
    });
    
    if (treeBodyPaint.length > 0) {
      console.log(`🌳 Trabajo: "Body Paint Natural" - ${treeBodyPaint.length} fotos`);
      for (let i = 0; i < treeBodyPaint.length; i++) {
        await Photo.updateOne(
          { _id: treeBodyPaint[i]._id },
          {
            $set: {
              workCollection: 'body-paint-natural',
              title: `Body Paint Natural ${i + 1}`,
              description: 'Arte corporal en armonía con la naturaleza',
              category: 'editorial',
              portfolioSection: 'portfolio',
              featured: i === 0, // Solo la primera como destacada
              order: i + 1
            }
          }
        );
        console.log(`  ✅ ${treeBodyPaint[i].imageUrl.split('/').pop()} → "Body Paint Natural ${i + 1}"`);
      }
    }
    
    // 2. Street Body Paint (street_body_paint)
    const streetBodyPaint = await Photo.find({ 
      imageUrl: { $regex: 'street_body_paint' },
      workCollection: { $exists: false }
    });
    
    if (streetBodyPaint.length > 0) {
      console.log(`\n🏙️ Trabajo: "Body Paint Urbano" - ${streetBodyPaint.length} fotos`);
      for (let i = 0; i < streetBodyPaint.length; i++) {
        await Photo.updateOne(
          { _id: streetBodyPaint[i]._id },
          {
            $set: {
              workCollection: 'body-paint-urbano',
              title: `Body Paint Urbano ${i + 1}`,
              description: 'Arte corporal en el entorno urbano contemporáneo',
              category: 'editorial',
              portfolioSection: 'portfolio',
              featured: i === 0, // Solo la primera como destacada
              order: i + 1
            }
          }
        );
        console.log(`  ✅ ${streetBodyPaint[i].imageUrl.split('/').pop()} → "Body Paint Urbano ${i + 1}"`);
      }
    }
    
    // 3. Make-up Close Up (make-up_close_up y makeup2-portrait)
    const makeupPhotos = await Photo.find({ 
      $or: [
        { imageUrl: { $regex: 'make-up_close_up' } },
        { imageUrl: { $regex: 'makeup2-portrait' } }
      ],
      workCollection: { $exists: false }
    });
    
    if (makeupPhotos.length > 0) {
      console.log(`\n💄 Trabajo: "Maquillaje Artístico" - ${makeupPhotos.length} fotos`);
      for (let i = 0; i < makeupPhotos.length; i++) {
        await Photo.updateOne(
          { _id: makeupPhotos[i]._id },
          {
            $set: {
              workCollection: 'maquillaje-artistico',
              title: `Maquillaje Artístico ${i + 1}`,
              description: 'Técnicas avanzadas de maquillaje y beauty',
              category: 'portrait',
              portfolioSection: 'portfolio',
              featured: i === 0, // Solo la primera como destacada
              order: i + 1
            }
          }
        );
        console.log(`  ✅ ${makeupPhotos[i].imageUrl.split('/').pop()} → "Maquillaje Artístico ${i + 1}"`);
      }
    }
    
    // 4. Polaroids Ana (PolasAna)
    const polaroidPhotos = await Photo.find({ 
      imageUrl: { $regex: 'PolasAna' },
      workCollection: { $exists: false }
    });
    
    if (polaroidPhotos.length > 0) {
      console.log(`\n📸 Trabajo: "Polas" - ${polaroidPhotos.length} fotos`);
      for (let i = 0; i < polaroidPhotos.length; i++) {
        await Photo.updateOne(
          { _id: polaroidPhotos[i]._id },
          {
            $set: {
              workCollection: 'polaroids-vintage',
              title: `Polas ${i + 1}`,
              description: 'Sesión con estética retro y formato polas',
              category: 'fashion',
              portfolioSection: 'portfolio',
              featured: i === 0, // Solo la primera como destacada
              order: i + 1
            }
          }
        );
        console.log(`  ✅ ${polaroidPhotos[i].imageUrl.split('/').pop()} → "Polas ${i + 1}"`);
      }
    }
    
    // 5. Crear un trabajo con algunas fotos SVM existentes como "Sesión Profesional"
    const professionalPhotos = await Photo.find({ 
      imageUrl: { $regex: 'SVM05(701|720|722|728|734)' },
      workCollection: { $exists: false }
    });
    
    if (professionalPhotos.length > 0) {
      console.log(`\n👑 Trabajo: "Sesión Profesional" - ${professionalPhotos.length} fotos`);
      for (let i = 0; i < professionalPhotos.length; i++) {
        await Photo.updateOne(
          { _id: professionalPhotos[i]._id },
          {
            $set: {
              workCollection: 'sesion-profesional',
              title: `Sesión Profesional ${i + 1}`,
              description: 'Portfolio profesional con técnica avanzada',
              category: 'commercial',
              portfolioSection: 'portfolio',
              featured: false, // No destacadas para no tocar el hero
              order: i + 1
            }
          }
        );
        console.log(`  ✅ ${professionalPhotos[i].imageUrl.split('/').pop()} → "Sesión Profesional ${i + 1}"`);
      }
    }
    
    // Verificar el resultado final
    console.log('\n📊 RESUMEN DE TRABAJOS CREADOS:');
    
    const collections = [
      { name: 'body-paint-natural', title: '🌳 Body Paint Natural' },
      { name: 'body-paint-urbano', title: '🏙️ Body Paint Urbano' },
      { name: 'body-paint-japones', title: '🎭 Body Paint Japonés' },
      { name: 'maquillaje-artistico', title: '💄 Maquillaje Artístico' },
      { name: 'polaroids-vintage', title: '📸 Polas' },
      { name: 'sesion-elegancia-clasica', title: '👗 Elegancia Clásica' },
      { name: 'sesion-profesional', title: '👑 Sesión Profesional' }
    ];
    
    for (const collection of collections) {
      const count = await Photo.countDocuments({ workCollection: collection.name });
      if (count > 0) {
        console.log(`${collection.title}: ${count} fotos`);
      }
    }
    
    const totalWorked = await Photo.countDocuments({ workCollection: { $exists: true } });
    const totalPhotos = await Photo.countDocuments();
    
    console.log(`\n✨ Total organizadas: ${totalWorked}/${totalPhotos} fotos`);
    console.log('🎯 Trabajos recientes creados y listos para mostrar');
    
    mongoose.connection.close();
    
  } catch (error) {
    console.error('❌ Error:', error);
    mongoose.connection.close();
  }
}

organizeAllPhotoSessions();
