// Script para corregir la ortografía de "Elegancia Clásica" en la base de datos
import mongoose from 'mongoose'
import Photo from '../src/models/Photo.js'

const MONGODB_URI = 'mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/ann_model?retryWrites=true&w=majority&appName=Cluster0'

async function fixEleganciaClassica() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Conectado a MongoDB')

    // Buscar y corregir títulos
    const photosWithWrongTitle = await Photo.find({
      $or: [
        { title: /clsica/i },
        { description: /clsica/i },
        { category: /clsica/i },
        { portfolioSection: /clsica/i }
      ]
    })

    console.log(`Encontradas ${photosWithWrongTitle.length} fotos con "clsica"`)

    for (const photo of photosWithWrongTitle) {
      let updated = false

      if (photo.title && photo.title.includes('clsica')) {
        photo.title = photo.title.replace(/clsica/g, 'clásica')
        updated = true
      }

      if (photo.description && photo.description.includes('clsica')) {
        photo.description = photo.description.replace(/clsica/g, 'clásica')
        updated = true
      }

      if (photo.category && photo.category.includes('clsica')) {
        photo.category = photo.category.replace(/clsica/g, 'clásica')
        updated = true
      }

      if (photo.portfolioSection && photo.portfolioSection.includes('clsica')) {
        photo.portfolioSection = photo.portfolioSection.replace(/clsica/g, 'clásica')
        updated = true
      }

      if (updated) {
        await photo.save()
        console.log(`Actualizada foto: ${photo.title}`)
      }
    }

    console.log('Corrección completada')
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await mongoose.disconnect()
  }
}

fixEleganciaClassica()
