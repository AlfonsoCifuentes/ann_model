import mongoose from 'mongoose'

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    maxlength: [200, 'El título no puede exceder 200 caracteres']
  },
  excerpt: {
    type: String,
    required: [true, 'El resumen es obligatorio'],
    trim: true,
    maxlength: [500, 'El resumen no puede exceder 500 caracteres']
  },
  content: {
    type: String,
    required: [true, 'El contenido es obligatorio'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'La imagen es obligatoria'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  author: {
    type: String,
    default: 'Ana Nicoleta'
  },
  tags: [{
    type: String,
    trim: true
  }],
  readTime: {
    type: String,
    default: '5 min de lectura'
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Esto añade createdAt y updatedAt automáticamente
})

// Middleware para generar slug automáticamente
BlogPostSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remover caracteres especiales
      .replace(/[\s_-]+/g, '-') // Reemplazar espacios y guiones bajos con guiones
      .replace(/^-+|-+$/g, '') // Remover guiones al inicio y final
  }
  next()
})

// Método para calcular tiempo de lectura
BlogPostSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    const wordsPerMinute = 200
    const words = this.content.split(' ').length
    const readTimeMinutes = Math.ceil(words / wordsPerMinute)
    this.readTime = `${readTimeMinutes} min de lectura`
  }
  next()
})

// Índices para optimizar consultas
BlogPostSchema.index({ status: 1, createdAt: -1 })
BlogPostSchema.index({ slug: 1 })
BlogPostSchema.index({ featured: 1 })

export default mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema)
