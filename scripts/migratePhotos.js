// Script para migrar fotos existentes a MongoDB
// Ejecutar con: node scripts/migratePhotos.js

const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

const MONGODB_URI = 'mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const PhotoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    maxlength: [200, 'El título no puede exceder 200 caracteres']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  imageUrl: {
    type: String,
    required: [true, 'La URL de la imagen es obligatoria'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    enum: ['editorial', 'fashion', 'portrait', 'commercial', 'studio', 'lifestyle'],
    default: 'portrait'
  },
  tags: [{
    type: String,
    trim: true
  }],
  featured: {
    type: Boolean,
    default: false
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
  location: {
    type: String,
    trim: true
  },
  shootDate: {
    type: Date
  },
  photographer: {
    type: String,
    trim: true
  },
  altText: {
    type: String,
    trim: true,
    maxlength: [150, 'El texto alternativo no puede exceder 150 caracteres']
  }
}, {
  timestamps: true
})

const Photo = mongoose.model('Photo', PhotoSchema)

// Datos de las fotos existentes con categorización
const photosData = [
  // Fotos editoriales
  { file: 'editorial_1.jpg', category: 'editorial', title: 'Sesión Editorial Barcelona', description: 'Fotografía editorial en las calles de Barcelona', featured: true, portfolioSection: 'portfolio' },
  { file: 'editorial_2.jpg', category: 'editorial', title: 'Editorial de Moda', description: 'Sesión editorial de alta moda', portfolioSection: 'portfolio' },
  
  // Fotos de moda
  { file: 'fashion_model_1.jpg', category: 'fashion', title: 'Moda Contemporánea', description: 'Fotografía de moda contemporánea', portfolioSection: 'portfolio' },
  { file: 'fashion_model_2.jpg', category: 'fashion', title: 'Estilo Urbano', description: 'Sesión de moda urbana', portfolioSection: 'portfolio' },
  { file: 'fashion_model_3.jpg', category: 'fashion', title: 'Alta Costura', description: 'Sesión de alta costura', portfolioSection: 'portfolio' },
  { file: 'model1.jpg', category: 'fashion', title: 'Retrato de Moda', description: 'Retrato profesional de moda', portfolioSection: 'hero' },
  
  // Retratos
  { file: 'portrait_1.jpg', category: 'portrait', title: 'Retrato Artístico', description: 'Retrato artístico profesional', portfolioSection: 'about' },
  { file: 'portrait_2.jpg', category: 'portrait', title: 'Retrato Natural', description: 'Retrato con luz natural', portfolioSection: 'portfolio' },
  
  // Fotos de estudio
  { file: 'studio_1.jpg', category: 'studio', title: 'Sesión de Estudio', description: 'Fotografía de estudio profesional', portfolioSection: 'portfolio' },
  { file: 'studio_2.jpg', category: 'studio', title: 'Iluminación de Estudio', description: 'Trabajo con iluminación profesional', portfolioSection: 'portfolio' },
  
  // Serie SVM (Sesión profesional)
  { file: 'SVM05601(1).jpg', category: 'editorial', title: 'Sesión SVM - Look 1', description: 'Sesión profesional SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05620.jpg', category: 'portrait', title: 'Sesión SVM - Retrato', description: 'Retrato de la sesión SVM', featured: true, portfolioSection: 'portfolio' },
  { file: 'SVM05626.jpg', category: 'editorial', title: 'Sesión SVM - Editorial 1', description: 'Fotografía editorial de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05628.jpg', category: 'editorial', title: 'Sesión SVM - Editorial 2', description: 'Fotografía editorial de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05631.jpg', category: 'fashion', title: 'Sesión SVM - Moda 1', description: 'Fotografía de moda de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05633.jpg', category: 'fashion', title: 'Sesión SVM - Moda 2', description: 'Fotografía de moda de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05637.jpg', category: 'portrait', title: 'Sesión SVM - Retrato 2', description: 'Retrato artístico de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05640.jpg', category: 'editorial', title: 'Sesión SVM - Editorial 3', description: 'Fotografía editorial de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05646.jpg', category: 'fashion', title: 'Sesión SVM - Moda 3', description: 'Fotografía de moda de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05651.jpg', category: 'portrait', title: 'Sesión SVM - Retrato 3', description: 'Retrato profesional de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05660.jpg', category: 'editorial', title: 'Sesión SVM - Editorial 4', description: 'Fotografía editorial de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05665.jpg', category: 'fashion', title: 'Sesión SVM - Moda 4', description: 'Fotografía de moda de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05670.jpg', category: 'portrait', title: 'Sesión SVM - Retrato 4', description: 'Retrato de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05675.jpg', category: 'editorial', title: 'Sesión SVM - Editorial 5', description: 'Fotografía editorial de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05678.jpg', category: 'fashion', title: 'Sesión SVM - Moda 5', description: 'Fotografía de moda de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05701.jpg', category: 'portrait', title: 'Sesión SVM - Retrato 5', description: 'Retrato artístico de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05702.jpg', category: 'editorial', title: 'Sesión SVM - Editorial 6', description: 'Fotografía editorial de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05706.jpg', category: 'fashion', title: 'Sesión SVM - Moda 6', description: 'Fotografía de moda de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05709.jpg', category: 'portrait', title: 'Sesión SVM - Retrato 6', description: 'Retrato de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05711.jpg', category: 'editorial', title: 'Sesión SVM - Editorial 7', description: 'Fotografía editorial de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05716.jpg', category: 'fashion', title: 'Sesión SVM - Moda 7', description: 'Fotografía de moda de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05718.jpg', category: 'portrait', title: 'Sesión SVM - Retrato 7', description: 'Retrato profesional de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05719.jpg', category: 'editorial', title: 'Sesión SVM - Editorial 8', description: 'Fotografía editorial de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05720.jpg', category: 'fashion', title: 'Sesión SVM - Moda 8', description: 'Fotografía de moda de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05722.jpg', category: 'portrait', title: 'Sesión SVM - Retrato 8', description: 'Retrato de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05724.jpg', category: 'editorial', title: 'Sesión SVM - Editorial 9', description: 'Fotografía editorial de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05728.jpg', category: 'fashion', title: 'Sesión SVM - Moda 9', description: 'Fotografía de moda de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05729.jpg', category: 'portrait', title: 'Sesión SVM - Retrato 9', description: 'Retrato artístico de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05734.jpg', category: 'editorial', title: 'Sesión SVM - Editorial 10', description: 'Fotografía editorial de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05736.jpg', category: 'fashion', title: 'Sesión SVM - Moda 10', description: 'Fotografía de moda de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05737.jpg', category: 'portrait', title: 'Sesión SVM - Retrato 10', description: 'Retrato final de la sesión SVM', portfolioSection: 'portfolio' },
  { file: 'SVM05741.jpg', category: 'editorial', title: 'Sesión SVM - Editorial Final', description: 'Fotografía editorial final de la sesión SVM', portfolioSection: 'portfolio' }
]

async function migratePhotos() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Conectado a MongoDB')
    
    // Limpiar fotos existentes (opcional)
    await Photo.deleteMany({})
    console.log('Fotos existentes eliminadas')
    
    let insertedCount = 0
    
    for (let i = 0; i < photosData.length; i++) {
      const photoData = photosData[i]
      
      const photo = new Photo({
        title: photoData.title,
        description: photoData.description,
        imageUrl: `/photos/${photoData.file}`,
        category: photoData.category,
        featured: photoData.featured || false,
        portfolioSection: photoData.portfolioSection,
        altText: photoData.title,
        order: i,
        tags: [photoData.category, 'ana-nicoleta', 'professional'],
        metadata: {
          originalName: photoData.file,
          uploadedBy: 'Ana Nicoleta',
          mimeType: 'image/jpeg'
        }
      })
      
      await photo.save()
      insertedCount++
      
      if (insertedCount % 10 === 0) {
        console.log(`${insertedCount} fotos insertadas...`)
      }
    }
    
    console.log(`Migración completada: ${insertedCount} fotos insertadas`)
    
    // Mostrar estadísticas
    const stats = await Photo.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          featured: { $sum: { $cond: ['$featured', 1, 0] } }
        }
      }
    ])
    
    console.log('\nEstadísticas por categoría:')
    stats.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} fotos (${stat.featured} destacadas)`)
    })
    
  } catch (error) {
    console.error('Error en la migración:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Desconectado de MongoDB')
  }
}

migratePhotos()
