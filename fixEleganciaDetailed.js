// Script para corregir específicamente la colección "Elegancia Clsica" de moda
import mongoose from 'mongoose'
import Photo from './src/models/Photo.js'

const MONGODB_URI = 'mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/ann_model?retryWrites=true&w=majority&appName=Cluster0'

async function fixEleganciaClassicaModa() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Conectado a MongoDB')

    // Buscar específicamente fotos de categoría "moda" con problemas de "clsica"
    const photosWithWrongSpelling = await Photo.find({
      $and: [
        { category: 'moda' },
        {
          $or: [
            { title: { $regex: /clsica/i } },
            { description: { $regex: /clsica/i } },
            { portfolioSection: { $regex: /clsica/i } }
          ]
        }
      ]
    })

    console.log(`Encontradas ${photosWithWrongSpelling.length} fotos de moda con "clsica"`)

    // También buscar cualquier foto que contenga "clsica" sin importar la categoría
    const allPhotosWithWrongSpelling = await Photo.find({
      $or: [
        { title: { $regex: /clsica/i } },
        { description: { $regex: /clsica/i } },
        { portfolioSection: { $regex: /clsica/i } }
      ]
    })

    console.log(`Encontradas ${allPhotosWithWrongSpelling.length} fotos en total con "clsica"`)

    for (const photo of allPhotosWithWrongSpelling) {
      let updated = false
      console.log(`\nRevisando foto: ${photo.title}`)
      console.log(`Categoría: ${photo.category}`)
      console.log(`PortfolioSection: ${photo.portfolioSection}`)

      if (photo.title && photo.title.match(/clsica/i)) {
        const oldTitle = photo.title
        photo.title = photo.title.replace(/clsica/gi, 'clásica')
        console.log(`  Título: "${oldTitle}" → "${photo.title}"`)
        updated = true
      }

      if (photo.description && photo.description.match(/clsica/i)) {
        const oldDescription = photo.description
        photo.description = photo.description.replace(/clsica/gi, 'clásica')
        console.log(`  Descripción: "${oldDescription}" → "${photo.description}"`)
        updated = true
      }

      if (photo.portfolioSection && photo.portfolioSection.match(/clsica/i)) {
        const oldSection = photo.portfolioSection
        photo.portfolioSection = photo.portfolioSection.replace(/clsica/gi, 'clásica')
        console.log(`  Sección: "${oldSection}" → "${photo.portfolioSection}"`)
        updated = true
      }

      if (updated) {
        await photo.save()
        console.log(`  ✅ Foto actualizada`)
      } else {
        console.log(`  ℹ️ No necesita cambios`)
      }
    }

    console.log('\n=== Corrección completada ===')
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await mongoose.disconnect()
  }
}

fixEleganciaClassicaModa()
