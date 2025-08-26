const mongoose = require('mongoose');
require('dotenv').config();

// Importar el modelo de Photo
const Photo = require('../src/models/Photo');

async function checkPhotosForCategories() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🔗 Conectado a MongoDB');

    // Obtener todas las fotos activas
    const photos = await Photo.find({ status: 'active' }).lean();
    
    console.log('\n📋 ANÁLISIS DE FOTOS PARA CATEGORÍAS:\n');
    
    // Buscar fotos de Editorial
    console.log('🎭 FOTOGRAFÍA EDITORIAL:');
    const editorialPhotos = photos.filter(photo => 
      (photo.filename && (
        photo.filename.toLowerCase().includes('editorial') ||
        photo.filename.toLowerCase().includes('magazine') ||
        photo.filename.toLowerCase().includes('publication') ||
        photo.filename.toLowerCase().includes('vogue') ||
        photo.filename.toLowerCase().includes('fashion')
      )) ||
      (photo.tags && photo.tags.some(tag => 
        tag.toLowerCase().includes('editorial') ||
        tag.toLowerCase().includes('magazine') ||
        tag.toLowerCase().includes('publication') ||
        tag.toLowerCase().includes('vogue')
      )) ||
      (photo.workCollection && (
        photo.workCollection.toLowerCase().includes('editorial') ||
        photo.workCollection.toLowerCase().includes('magazine') ||
        photo.workCollection.toLowerCase().includes('vogue')
      ))
    );
    
    editorialPhotos.forEach(photo => {
      console.log(`   📸 ${photo.filename} - Collection: ${photo.workCollection}`);
    });
    
    // Buscar fotos de Moda
    console.log('\n👗 FOTOGRAFÍA DE MODA:');
    const fashionPhotos = photos.filter(photo => 
      (photo.filename && (
        photo.filename.toLowerCase().includes('runway') ||
        photo.filename.toLowerCase().includes('fashion') ||
        photo.filename.toLowerCase().includes('moda') ||
        photo.filename.toLowerCase().includes('milan') ||
        photo.filename.toLowerCase().includes('desfile') ||
        photo.filename.toLowerCase().includes('catwalk')
      )) ||
      (photo.tags && photo.tags.some(tag => 
        tag.toLowerCase().includes('runway') ||
        tag.toLowerCase().includes('fashion') ||
        tag.toLowerCase().includes('moda') ||
        tag.toLowerCase().includes('milan') ||
        tag.toLowerCase().includes('desfile')
      )) ||
      (photo.workCollection && (
        photo.workCollection.toLowerCase().includes('runway') ||
        photo.workCollection.toLowerCase().includes('fashion') ||
        photo.workCollection.toLowerCase().includes('moda') ||
        photo.workCollection.toLowerCase().includes('milan')
      ))
    );
    
    fashionPhotos.forEach(photo => {
      console.log(`   👗 ${photo.filename} - Collection: ${photo.workCollection}`);
    });
    
    // Buscar fotos de Retrato
    console.log('\n👤 RETRATO:');
    const portraitPhotos = photos.filter(photo => 
      (photo.filename && (
        photo.filename.toLowerCase().includes('portrait') ||
        photo.filename.toLowerCase().includes('retrato') ||
        photo.filename.toLowerCase().includes('headshot') ||
        photo.filename.toLowerCase().includes('close') ||
        photo.filename.toLowerCase().includes('face')
      )) ||
      (photo.tags && photo.tags.some(tag => 
        tag.toLowerCase().includes('portrait') ||
        tag.toLowerCase().includes('retrato') ||
        tag.toLowerCase().includes('headshot') ||
        tag.toLowerCase().includes('close')
      )) ||
      (photo.workCollection && (
        photo.workCollection.toLowerCase().includes('portrait') ||
        photo.workCollection.toLowerCase().includes('retrato') ||
        photo.workCollection.toLowerCase().includes('headshot')
      ))
    );
    
    portraitPhotos.forEach(photo => {
      console.log(`   👤 ${photo.filename} - Collection: ${photo.workCollection}`);
    });
    
    console.log('\n📊 RESUMEN:');
    console.log(`🎭 Editorial: ${editorialPhotos.length} fotos`);
    console.log(`👗 Moda: ${fashionPhotos.length} fotos`);
    console.log(`👤 Retrato: ${portraitPhotos.length} fotos`);
    
    if (editorialPhotos.length > 0) {
      console.log(`\n✅ MEJOR OPCIÓN EDITORIAL: ${editorialPhotos[0].filename}`);
    }
    if (fashionPhotos.length > 0) {
      console.log(`✅ MEJOR OPCIÓN MODA: ${fashionPhotos[0].filename}`);
    }
    if (portraitPhotos.length > 0) {
      console.log(`✅ MEJOR OPCIÓN RETRATO: ${portraitPhotos[0].filename}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Desconectado de MongoDB');
  }
}

checkPhotosForCategories();
