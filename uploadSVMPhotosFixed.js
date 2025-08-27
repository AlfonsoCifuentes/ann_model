require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

// Importar el modelo Photo
const PhotoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, trim: true, maxlength: 500 },
  imageUrl: { type: String, required: true, trim: true },
  thumbnails: {
    small: { type: String, trim: true },
    medium: { type: String, trim: true },
    large: { type: String, trim: true }
  },
  category: {
    type: String,
    required: true,
    enum: ['editorial', 'fashion', 'portrait', 'commercial', 'studio', 'lifestyle'],
    default: 'portrait'
  },
  tags: [{ type: String, trim: true }],
  featured: { type: Boolean, default: false },
  featuredInHome: { type: Boolean, default: false },
  isHero: { type: Boolean, default: false },
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
  metadata: {
    originalName: String,
    size: Number,
    mimeType: String,
    uploadedBy: { type: String, default: 'Ana Nicoleta' }
  },
  location: { type: String, trim: true },
  shootDate: { type: Date },
  photographer: { type: String, trim: true },
  altText: { type: String, trim: true, maxlength: 150 }
}, { timestamps: true })

const Photo = mongoose.models.Photo || mongoose.model('Photo', PhotoSchema)

async function uploadSVMPhotos() {
  try {
    console.log('Conectando a MongoDB Atlas...')
    console.log('URI:', process.env.MONGODB_URI ? 'Configurado' : 'NO CONFIGURADO')
    
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Conectado a MongoDB Atlas')

    // Obtener todas las fotos existentes
    const existingPhotos = await Photo.find({})
    const existingUrls = new Set(existingPhotos.map(p => p.imageUrl))
    console.log(`📊 Fotos existentes en BD: ${existingPhotos.length}`)

    // Leer todas las fotos SVM de la carpeta
    const photosDir = path.join(__dirname, 'public', 'photos')
    const allFiles = fs.readdirSync(photosDir)
    const svmFiles = allFiles.filter(file => 
      file.toUpperCase().startsWith('SVM') && 
      (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png'))
    )

    console.log(`📁 Archivos SVM encontrados: ${svmFiles.length}`)
    console.log('Archivos SVM:', svmFiles.slice(0, 10), svmFiles.length > 10 ? '...' : '')

    // Filtrar solo las que no están en la BD
    const newSVMPhotos = svmFiles.filter(file => {
      const imageUrl = `/photos/${file}`
      return !existingUrls.has(imageUrl)
    })

    console.log(`🆕 Fotos SVM nuevas a subir: ${newSVMPhotos.length}`)

    if (newSVMPhotos.length === 0) {
      console.log('✅ Todas las fotos SVM ya están en la base de datos')
      return
    }

    // Crear documentos para las fotos nuevas
    const photosToInsert = newSVMPhotos.map((file, index) => ({
      title: `${file.replace(/\.(jpg|jpeg|png)$/i, '')} - Polas`,
      description: 'Fotografía de estudio profesional - Colección Polas',
      imageUrl: `/photos/${file}`,
      category: 'portrait',
      workCollection: 'polaroids-vintage',
      portfolioSection: 'portfolio',
      status: 'active',
      order: index + 1000, // Orden alto para que aparezcan al final
      metadata: {
        originalName: file,
        uploadedBy: 'Sistema automático'
      },
      altText: `Fotografía profesional ${file.replace(/\.(jpg|jpeg|png)$/i, '')}`,
      tags: ['polas', 'studio', 'portrait']
    }))

    // Insertar en la base de datos
    console.log('📤 Insertando fotos en la base de datos...')
    const result = await Photo.insertMany(photosToInsert)
    console.log(`✅ ${result.length} fotos SVM subidas exitosamente`)

    // Verificar el resultado
    const totalSVMInDB = await Photo.countDocuments({
      imageUrl: { $regex: /\/photos\/SVM/i }
    })
    console.log(`📊 Total de fotos SVM en BD después de la subida: ${totalSVMInDB}`)

  } catch (error) {
    console.error('❌ Error:', error.message)
    if (error.code === 8000) {
      console.error('💡 Problema de autenticación con MongoDB Atlas')
    }
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Desconectado de MongoDB')
  }
}

uploadSVMPhotos()
