// Script para insertar datos de ejemplo en MongoDB
// Ejecutar con: node scripts/seedBlog.js

const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

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
  timestamps: true
})

// Middleware para generar slug automáticamente
BlogPostSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
  next()
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

const samplePost = {
  title: 'Detrás de Cámaras: Sesión Editorial en Barcelona',
  excerpt: 'Un vistazo a mi reciente sesión de fotografía editorial en las hermosas calles de Barcelona, explorando la fusión entre arquitectura clásica y moda contemporánea.',
  content: `Barcelona siempre ha sido una de mis ciudades favoritas para trabajar. La mezcla única de arquitectura gótica y modernista proporciona un telón de fondo incomparable para la fotografía de moda.

En esta sesión, trabajamos con diseños contemporáneos que contrastaban bellamente con los elementos históricos de la ciudad. El equipo de producción fue excepcional, y logramos capturar la esencia tanto de la moda moderna como del patrimonio arquitectónico de Barcelona.

## El Proceso Creativo

La preparación para esta sesión comenzó semanas antes. Estudiamos la luz en diferentes momentos del día, exploramos ubicaciones icónicas y menos conocidas, y desarrollamos una paleta de colores que complementara tanto los diseños como el entorno urbano.

### Ubicaciones Destacadas

- **El Barrio Gótico**: Sus calles estrechas y fachadas históricas proporcionaron intimidad y drama
- **Park Güell**: La arquitectura de Gaudí ofreció un contraste vibrante y orgánico
- **El Born**: Perfecto para capturar la energía contemporánea de la ciudad

## Reflexiones

Esta experiencia me recordó por qué amo tanto mi trabajo. Cada sesión es una oportunidad de contar una historia, de crear arte que trasciende las tendencias y captura algo eterno.

La moda y la arquitectura comparten muchos principios: ambas se tratan de forma, función y belleza. En Barcelona, estos elementos se fusionan naturalmente, creando un escenario perfecto para la expresión artística.`,
  image: '/photos/editorial_1.jpg',
  slug: 'detras-de-camaras-sesion-editorial-en-barcelona',
  status: 'published',
  featured: true,
  tags: ['editorial', 'barcelona', 'moda', 'fotografía'],
  readTime: '5 min de lectura'
}

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Conectado a MongoDB')
    
    // Limpiar posts existentes (opcional)
    await BlogPost.deleteMany({})
    console.log('Posts existentes eliminados')
    
    // Insertar post de ejemplo
    const post = new BlogPost(samplePost)
    await post.save()
    
    console.log('Post de ejemplo insertado exitosamente')
    console.log('Título:', post.title)
    console.log('Slug:', post.slug)
    console.log('ID:', post._id)
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Desconectado de MongoDB')
  }
}

seedDatabase()
