import mongoose from 'mongoose'

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
  thumbnails: {
    small: {
      type: String,
      trim: true
    },
    medium: {
      type: String,
      trim: true
    },
    large: {
      type: String,
      trim: true
    }
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

// Índices para optimizar consultas
PhotoSchema.index({ category: 1, status: 1, createdAt: -1 })
PhotoSchema.index({ featured: 1 })
PhotoSchema.index({ featuredInHome: 1 })
PhotoSchema.index({ isHero: 1 })
PhotoSchema.index({ workCollection: 1 })
PhotoSchema.index({ portfolioSection: 1 })
PhotoSchema.index({ tags: 1 })

// Método virtual para obtener URL completa si es necesario
PhotoSchema.virtual('fullImageUrl').get(function() {
  return this.imageUrl.startsWith('http') ? this.imageUrl : `${process.env.NEXT_PUBLIC_BASE_URL || ''}${this.imageUrl}`
})

// Configurar para incluir virtuals en JSON
PhotoSchema.set('toJSON', { virtuals: true })

export default mongoose.models.Photo || mongoose.model('Photo', PhotoSchema)
