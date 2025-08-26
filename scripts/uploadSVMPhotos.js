require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const { v2: cloudinary } = require('cloudinary')

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Verificar configuración de Cloudinary
console.log('🔧 Verificando configuración de Cloudinary...');
console.log('Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? 'Configurado' : 'NO CONFIGURADO');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? 'Configurado' : 'NO CONFIGURADO');

if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('❌ ERROR: Faltan variables de entorno de Cloudinary');
  process.exit(1);
}

// Schema de Photo
const photoSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  title: String,
  description: String,
  imageUrl: { type: String, required: true },
  workCollection: String,
  category: String,
  tags: [String],
  featured: { type: Boolean, default: false },
  isHero: { type: Boolean, default: false },
  portfolioSection: { type: String, default: 'portfolio' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  order: { type: Number, default: 0 },
  uploadDate: { type: Date, default: Date.now }
}, {
  timestamps: true
})

const Photo = mongoose.model('Photo', photoSchema)

// Función para categorizar fotos SVM
function categorizePhoto(filename) {
  const name = filename.toLowerCase()
  
  // Determinar workCollection basado en el número SVM
  const svmNumber = filename.match(/SVM(\d+)/)?.[1]
  let workCollection = `Serie SVM ${svmNumber}`
  
  // Categorizar por rangos de números (puedes ajustar estos rangos según tus necesidades)
  if (svmNumber) {
    const num = parseInt(svmNumber)
    if (num >= 5601 && num <= 5630) {
      workCollection = 'Sesión Editorial Primavera'
    } else if (num >= 5631 && num <= 5660) {
      workCollection = 'Retrato Profesional'
    } else if (num >= 5661 && num <= 5690) {
      workCollection = 'Moda Contemporánea'
    } else if (num >= 5691 && num <= 5720) {
      workCollection = 'Sesión Artística'
    } else if (num >= 5721 && num <= 5750) {
      workCollection = 'Portfolio Principal'
    }
  }
  
  return {
    category: 'portfolio',
    workCollection,
    tags: ['professional', 'portfolio', 'ana-nicoleta'],
    portfolioSection: 'portfolio'
  }
}

function generateTitle(filename) {
  const svmNumber = filename.match(/SVM(\d+)/)?.[1]
  return `Foto Profesional SVM${svmNumber}`
}

function generateDescription(filename) {
  const svmNumber = filename.match(/SVM(\d+)/)?.[1]
  return `Fotografía profesional de portfolio - Serie SVM${svmNumber}`
}

async function uploadToCloudinary(filePath, filename) {
  try {
    console.log(`📤 Subiendo ${filename} a Cloudinary...`)
    
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'ana-nicoleta-portfolio',
      public_id: filename.split('.')[0],
      resource_type: 'image',
      transformation: [
        { quality: 'auto:best' },
        { fetch_format: 'auto' }
      ]
    })
    
    console.log(`✅ ${filename} subida exitosamente a Cloudinary`)
    return result.secure_url
  } catch (error) {
    console.error(`❌ Error subiendo ${filename}:`, error)
    throw error
  }
}

async function savePhotoToDB(filename, imageUrl) {
  try {
    // Verificar si ya existe
    const existingPhoto = await Photo.findOne({ filename })
    if (existingPhoto) {
      console.log(`⚠️  ${filename} ya existe en la base de datos, actualizando...`)
      existingPhoto.imageUrl = imageUrl
      existingPhoto.status = 'active'
      await existingPhoto.save()
      return existingPhoto
    }

    const photoData = categorizePhoto(filename)
    
    const newPhoto = new Photo({
      filename,
      title: generateTitle(filename),
      description: generateDescription(filename),
      imageUrl,
      workCollection: photoData.workCollection,
      category: photoData.category,
      tags: photoData.tags,
      portfolioSection: photoData.portfolioSection,
      status: 'active',
      uploadDate: new Date()
    })

    await newPhoto.save()
    console.log(`✅ ${filename} guardada en la base de datos`)
    return newPhoto
  } catch (error) {
    console.error(`❌ Error guardando ${filename} en DB:`, error)
    throw error
  }
}

async function uploadSVMPhotos() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Conectado a MongoDB')
    
    const photosDir = path.join(__dirname, '..', 'public', 'photos')
    console.log(`📂 Buscando fotos SVM en: ${photosDir}`)
    
    const files = fs.readdirSync(photosDir)
    
    // Filtrar solo archivos SVM*.jpg
    const svmFiles = files.filter(file => 
      file.match(/^SVM.*\.jpg$/i)
    )
    
    console.log(`📸 Encontradas ${svmFiles.length} fotos SVM para subir:`)
    svmFiles.forEach(file => console.log(`   - ${file}`))
    
    for (const filename of svmFiles) {
      const filePath = path.join(photosDir, filename)
      
      try {
        // Subir a Cloudinary
        const imageUrl = await uploadToCloudinary(filePath, filename)
        
        // Guardar en MongoDB
        await savePhotoToDB(filename, imageUrl)
        
        console.log(`🎉 ${filename} procesada exitosamente`)
        
        // Pequeña pausa para evitar rate limiting
        await new Promise(resolve => setTimeout(resolve, 500))
        
      } catch (error) {
        console.error(`❌ Error procesando ${filename}:`, error)
      }
    }
    
    console.log('🎯 ¡Proceso completado! Todas las fotos SVM han sido subidas.')
    
  } catch (error) {
    console.error('❌ Error general:', error)
  } finally {
    await mongoose.disconnect()
    console.log('📡 Desconectado de MongoDB')
  }
}

// Ejecutar el script
uploadSVMPhotos()
