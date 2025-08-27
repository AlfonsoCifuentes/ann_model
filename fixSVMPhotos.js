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
  order: { type: Number, default: 0 }
}, { timestamps: true })

const Photo = mongoose.models.Photo || mongoose.model('Photo', PhotoSchema)

async function fixSVMPhotos() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Conectado a MongoDB Atlas')

    // Buscar todas las fotos SVM
    const svmPhotos = await Photo.find({
      imageUrl: { $regex: /\/photos\/SVM/i }
    })

    console.log(`📊 Total fotos SVM encontradas: ${svmPhotos.length}`)
    
    // Mostrar distribución por sección
    const bySections = {}
    const byCollections = {}
    svmPhotos.forEach(photo => {
      bySections[photo.portfolioSection] = (bySections[photo.portfolioSection] || 0) + 1
      byCollections[photo.workCollection] = (byCollections[photo.workCollection] || 0) + 1
    })
    
    console.log('📊 Por sección:', bySections)
    console.log('📊 Por colección:', byCollections)

    // Actualizar todas las fotos SVM para que estén en portfolio y en polaroids-vintage
    const updateResult = await Photo.updateMany(
      { imageUrl: { $regex: /\/photos\/SVM/i } },
      { 
        $set: { 
          portfolioSection: 'portfolio',
          workCollection: 'polaroids-vintage',
          status: 'active'
        }
      }
    )

    console.log(`✅ Actualizadas ${updateResult.modifiedCount} fotos SVM`)

    // Buscar fotos de Body Paint Japonés
    const bodyPaintPhotos = await Photo.find({
      $or: [
        { workCollection: { $regex: /japones/i } },
        { workCollection: { $regex: /japonés/i } },
        { title: { $regex: /japonés/i } },
        { title: { $regex: /japones/i } }
      ]
    })

    console.log(`📊 Fotos Body Paint Japonés: ${bodyPaintPhotos.length}`)
    bodyPaintPhotos.forEach(photo => {
      console.log(`  - ${photo.title} (${photo.workCollection}) - ${photo.portfolioSection}`)
    })

  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Desconectado')
  }
}

fixSVMPhotos()
