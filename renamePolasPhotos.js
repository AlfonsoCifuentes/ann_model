require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const PhotoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, trim: true, maxlength: 500 },
  imageUrl: { type: String, required: true, trim: true },
  category: {
    type: String,
    required: true,
    enum: ['editorial', 'fashion', 'portrait', 'commercial', 'studio', 'lifestyle'],
    default: 'portrait'
  },
  workCollection: { type: String, trim: true },
  portfolioSection: {
    type: String,
    enum: ['hero', 'portfolio', 'about', 'press'],
    default: 'portfolio'
  },
  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active'
  },
  order: { type: Number, default: 0 },
  altText: { type: String, trim: true, maxlength: 150 }
}, { timestamps: true })

const Photo = mongoose.models.Photo || mongoose.model('Photo', PhotoSchema)

async function renamePolasPhotos() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Conectado a MongoDB Atlas')

    // Buscar todas las fotos de la colección Polas
    const polasPhotos = await Photo.find({
      workCollection: 'polaroids-vintage'
    }).sort({ order: 1, createdAt: 1 }) // Ordenar por order y fecha de creación

    console.log(`📊 Fotos de Polas encontradas: ${polasPhotos.length}`)

    if (polasPhotos.length === 0) {
      console.log('❌ No se encontraron fotos en la colección Polas')
      return
    }

    // Renombrar cada foto con numeración secuencial
    const updatePromises = polasPhotos.map(async (photo, index) => {
      const newNumber = String(index + 1).padStart(3, '0') // 001, 002, 003...
      const newTitle = `Pola ${newNumber}`
      const newAltText = `Fotografía profesional Pola ${newNumber}`
      
      return Photo.findByIdAndUpdate(photo._id, {
        $set: {
          title: newTitle,
          altText: newAltText,
          order: index + 1 // También actualizar el order para mantener secuencia
        }
      })
    })

    console.log('📝 Renombrando fotos...')
    await Promise.all(updatePromises)

    console.log('✅ Todas las fotos de Polas han sido renombradas exitosamente')
    console.log(`📋 Formato: "Pola 001" hasta "Pola ${String(polasPhotos.length).padStart(3, '0')}"`)

    // Verificar algunos ejemplos del resultado
    const sampledPhotos = await Photo.find({
      workCollection: 'polaroids-vintage'
    }).sort({ order: 1 }).limit(5)

    console.log('\n📸 Primeras 5 fotos renombradas:')
    sampledPhotos.forEach(photo => {
      console.log(`  ${photo.title} (order: ${photo.order})`)
    })

  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Desconectado de MongoDB')
  }
}

renamePolasPhotos()
