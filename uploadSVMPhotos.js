const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

// Configuración de conexión a MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ann_model'

// Esquema de Photo
const PhotoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true
  },
  thumbnails: {
    small: String,
    medium: String,
    large: String
  },
  category: {
    type: String,
    required: true,
    enum: ['editorial', 'fashion', 'portrait', 'commercial', 'studio', 'lifestyle'],
    default: 'portrait'
  },
  tags: [String],
  featured: {
    type: Boolean,
    default: false
  },
  featuredInHome: {
    type: Boolean,
    default: false
  },
  isHero: {
    type: Boolean,
    default: false
  },
  workCollection: {
    type: String,
    trim: true
  },
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
  order: {
    type: Number,
    default: 0
  },
  metadata: {
    originalName: String,
    size: Number,
    mimeType: String,
    uploadedBy: {
      type: String,
      default: 'Ana Nicoleta'
    }
  },
  location: String,
  shootDate: Date,
  photographer: String,
  altText: String
}, {
  timestamps: true
})

const Photo = mongoose.model('Photo', PhotoSchema)

async function uploadSVMPhotos() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Conectado a MongoDB')

    // Obtener lista de archivos SVM de la carpeta photos
    const photosDir = path.join(__dirname, 'public', 'photos')
    const files = fs.readdirSync(photosDir)
    const svmFiles = files.filter(file => 
      file.toUpperCase().startsWith('SVM') && 
      /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(file)
    )

    console.log(`📁 Encontrados ${svmFiles.length} archivos SVM en la carpeta:`)
    svmFiles.forEach(file => console.log(`  - ${file}`))

    // Verificar cuáles ya existen en la BD
    const existingPhotos = await Photo.find({
      imageUrl: { $regex: /SVM/, $options: 'i' }
    })
    
    const existingUrls = new Set(existingPhotos.map(photo => {
      const fileName = photo.imageUrl.split('/').pop()
      return fileName
    }))

    console.log(`\\n📊 Ya existen ${existingPhotos.length} fotos SVM en la BD:`)
    existingUrls.forEach(url => console.log(`  - ${url}`))

    // Identificar archivos faltantes
    const missingFiles = svmFiles.filter(file => !existingUrls.has(file))
    
    if (missingFiles.length === 0) {
      console.log('\\n✅ Todas las fotos SVM ya están en la base de datos')
      return
    }

    console.log(`\\n📤 Subiendo ${missingFiles.length} fotos SVM faltantes:`)

    // Crear documentos para las fotos faltantes
    const photosToInsert = missingFiles.map((file, index) => ({
      title: `Sesión SVM ${file.replace(/\.(jpg|jpeg|png)/i, '')}`,
      description: 'Fotografía profesional de portfolio - Colección SVM',
      imageUrl: `/photos/${file}`,
      category: 'portrait',
      workCollection: 'polaroids-vintage',
      portfolioSection: 'portfolio',
      status: 'active',
      order: 1000 + index, // Orden alto para que aparezcan al final
      altText: `Fotografía profesional ${file}`,
      metadata: {
        originalName: file,
        uploadedBy: 'Sistema - Migración SVM'
      }
    }))

    // Insertar en la base de datos
    const result = await Photo.insertMany(photosToInsert)
    
    console.log(`\\n✅ Subidas ${result.length} fotos SVM exitosamente`)
    
    // Mostrar resumen final
    const totalSVMPhotos = await Photo.countDocuments({
      imageUrl: { $regex: /SVM/, $options: 'i' }
    })
    
    console.log(`\\n📊 RESUMEN FINAL:`)
    console.log(`  - Total archivos SVM en carpeta: ${svmFiles.length}`)
    console.log(`  - Total fotos SVM en BD: ${totalSVMPhotos}`)
    console.log(`  - Fotos recién subidas: ${result.length}`)

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await mongoose.disconnect()
    console.log('\\n🔌 Desconectado de MongoDB')
  }
}

uploadSVMPhotos()
