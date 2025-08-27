// Script para verificar el estado general de la base de datos
import mongoose from 'mongoose'
import Photo from './src/models/Photo.js'

const MONGODB_URI = 'mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/ann_model?retryWrites=true&w=majority&appName=Cluster0'

async function checkDatabase() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Conectado a MongoDB')

    // Contar total de fotos
    const totalPhotos = await Photo.countDocuments()
    console.log(`Total de fotos en la DB: ${totalPhotos}`)

    if (totalPhotos > 0) {
      // Obtener algunas fotos de muestra
      const samplePhotos = await Photo.find().limit(3)
      console.log('\n=== Fotos de muestra ===')
      samplePhotos.forEach((photo, index) => {
        console.log(`\n${index + 1}. ${photo.title}`)
        console.log(`   Categoría: ${photo.category}`)
        console.log(`   WorkCollection: ${photo.workCollection}`)
      })

      // Obtener todas las categorías únicas
      const categories = await Photo.distinct('category')
      console.log('\n=== Categorías encontradas ===')
      categories.forEach(cat => console.log(`- ${cat}`))

      // Obtener todas las workCollection únicas
      const collections = await Photo.distinct('workCollection')
      console.log('\n=== WorkCollections encontradas ===')
      collections.forEach(col => console.log(`- ${col}`))
    }

  } catch (error) {
    console.error('Error al conectar o consultar la DB:', error)
  } finally {
    await mongoose.disconnect()
  }
}

checkDatabase()
