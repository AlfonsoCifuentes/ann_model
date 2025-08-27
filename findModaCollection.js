// Script para encontrar exactamente qué workCollection tiene la foto de moda
import mongoose from 'mongoose'
import Photo from './src/models/Photo.js'

const MONGODB_URI = 'mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/ann_model?retryWrites=true&w=majority&appName=Cluster0'

async function findModaCollection() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Conectado a MongoDB')

    // Buscar todas las fotos de categoría "moda"
    const modaPhotos = await Photo.find({ category: 'moda' })
    
    console.log(`Encontradas ${modaPhotos.length} fotos de categoría moda:`)
    
    modaPhotos.forEach((photo, index) => {
      console.log(`\n--- Foto ${index + 1} ---`)
      console.log(`ID: ${photo._id}`)
      console.log(`Título: ${photo.title}`)
      console.log(`Descripción: ${photo.description}`)
      console.log(`WorkCollection: ${photo.workCollection}`)
      console.log(`PortfolioSection: ${photo.portfolioSection}`)
      console.log(`Categoría: ${photo.category}`)
      console.log(`Tags: ${photo.tags}`)
    })

    // Buscar todas las workCollection únicas
    const allCollections = await Photo.distinct('workCollection')
    console.log('\n=== Todas las workCollection en la DB ===')
    allCollections.forEach(collection => {
      console.log(`- ${collection}`)
    })

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await mongoose.disconnect()
  }
}

findModaCollection()
