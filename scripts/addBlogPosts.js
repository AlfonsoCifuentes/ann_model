// Script para agregar entradas de blog sin eliminar las existentes
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

const samplePosts = [
  {
    title: 'Mi Viaje en la Fotografía de Moda',
    excerpt: 'Desde mis primeros pasos en el mundo de la fotografía hasta convertirme en una fotógrafa profesional de moda. Una reflexión sobre el camino recorrido.',
    content: `Comenzar en el mundo de la fotografía de moda no fue fácil. Como muchos artistas, mi camino estuvo lleno de desafíos, aprendizajes y momentos de crecimiento personal y profesional.

## Los Primeros Pasos

Todo comenzó con una cámara prestada y una pasión inmensa por capturar la belleza en todas sus formas. Recuerdo mis primeras sesiones, llenas de nervios pero también de una emoción indescriptible.

### Desafíos Iniciales

- **Construir un portafolio**: Sin experiencia previa, cada sesión era una oportunidad de oro
- **Encontrar mi estilo**: Experimentar con diferentes técnicas hasta encontrar mi voz única
- **Networking**: Conectar con modelos, diseñadores y otros profesionales del sector

## El Momento de Inflexión

Mi primera colaboración con una revista local cambió todo. No solo me dio visibilidad, sino que me confirmó que estaba en el camino correcto.

## Reflexiones

Hoy, después de años en esta industria, puedo decir que cada sesión sigue siendo una aventura. La moda evoluciona, la tecnología avanza, pero la esencia de capturar la belleza y contar historias a través de la imagen permanece constante.`,
    image: '/photos/portrait_1.jpg',
    slug: 'mi-viaje-en-la-fotografia-de-moda',
    status: 'published',
    featured: false,
    tags: ['carrera', 'fotografía', 'moda', 'personal'],
    readTime: '4 min de lectura'
  },
  {
    title: 'Tendencias de Fotografía para 2025',
    excerpt: 'Un análisis de las tendencias emergentes en fotografía de moda y retrato que están definiendo el panorama visual de este año.',
    content: `El mundo de la fotografía está en constante evolución, y 2025 no es la excepción. Este año ha traído consigo nuevas tendencias que están redefiniendo cómo vemos y creamos imágenes en el ámbito de la moda y el retrato.

## Tendencias Principales

### 1. Fotografía Sostenible
La conciencia ambiental está influyendo en nuestras decisiones creativas. Desde la elección de locaciones locales hasta el uso de luz natural, la sostenibilidad es clave.

### 2. Autenticidad y Naturalidad
Menos retoque digital, más belleza natural. Los clientes buscan imágenes que reflejen autenticidad y diversidad real.

### 3. Colores Vibrantes
2025 es el año de los colores audaces. Paletas saturadas que contrastan con fondos minimalistas están dominando las campañas.

### 4. Tecnología Híbrida
La combinación de fotografía tradicional con elementos digitales está creando nuevas posibilidades narrativas.

## Mi Perspectiva

Como fotógrafa, abrazo estas tendencias mientras mantengo mi estilo personal. La clave está en evolucionar sin perder la esencia que hace único nuestro trabajo.

## Consejos para Fotógrafos

- Experimenta con nuevas técnicas pero mantén tu identidad visual
- Escucha a tus clientes pero no comprometas tu visión artística
- Invierte en formación continua y nuevas herramientas
- Construye relaciones auténticas en la industria`,
    image: '/photos/fashion_model_1.jpg',
    slug: 'tendencias-fotografia-2025',
    status: 'published',
    featured: true,
    tags: ['tendencias', '2025', 'moda', 'técnicas'],
    readTime: '6 min de lectura'
  },
  {
    title: 'Técnicas de Iluminación para Retratos',
    excerpt: 'Guía completa sobre las técnicas de iluminación más efectivas para crear retratos impactantes y profesionales.',
    content: `La iluminación es el alma de la fotografía. En el retrato, dominar las técnicas de iluminación marca la diferencia entre una imagen amateur y una obra profesional.

## Fundamentos de la Iluminación

### La Luz Principal
Es la fuente de luz más importante y define el estado de ánimo de la imagen. Su posición determina las sombras y la forma del rostro.

### Luz de Relleno
Suaviza las sombras creadas por la luz principal. No debe competir con ella, sino complementarla.

### Luz de Fondo
Separa al sujeto del fondo y añade profundidad a la imagen.

## Esquemas de Iluminación Clásicos

### 1. Rembrandt Lighting
Caracterizada por un triángulo de luz en la mejilla sombreada. Perfecta para retratos dramáticos.

### 2. Butterfly Lighting
La luz principal se coloca directamente frente al sujeto y por encima. Ideal para retratos de belleza.

### 3. Split Lighting
Divide el rostro en dos mitades: una iluminada y otra en sombra. Muy efectiva para crear drama.

### 4. Loop Lighting
La sombra de la nariz forma un pequeño bucle en la mejilla. Versátil y favorecedora.

## Consejos Prácticos

- **Observa la luz natural**: Es la mejor maestra para entender cómo funciona la iluminación
- **Experimenta con modifiers**: Softboxes, reflectores y difusores pueden transformar completamente una imagen
- **Considera el color**: La temperatura de color afecta el estado de ánimo de la foto
- **Practica con un modelo**: Cada rostro es diferente y requiere ajustes específicos

## Mi Experiencia

Después de años experimentando, he aprendido que la mejor iluminación es aquella que sirve a la historia que quieres contar. No hay reglas absolutas, solo principios que nos guían hacia la imagen perfecta.`,
    image: '/photos/studio_1.jpg',
    slug: 'tecnicas-iluminacion-retratos',
    status: 'published',
    featured: false,
    tags: ['técnicas', 'iluminación', 'retratos', 'tutorial'],
    readTime: '8 min de lectura'
  }
]

async function addBlogPosts() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Conectado a MongoDB')
    
    let addedCount = 0
    let skippedCount = 0
    
    for (const postData of samplePosts) {
      try {
        // Verificar si ya existe un post con este slug
        const existing = await BlogPost.findOne({ slug: postData.slug })
        
        if (existing) {
          console.log(`Post "${postData.title}" ya existe, omitiendo...`)
          skippedCount++
        } else {
          const post = new BlogPost(postData)
          await post.save()
          console.log(`✅ Post "${postData.title}" agregado exitosamente`)
          console.log(`   Slug: ${post.slug}`)
          console.log(`   ID: ${post._id}`)
          addedCount++
        }
      } catch (error) {
        console.error(`❌ Error agregando "${postData.title}":`, error.message)
      }
    }
    
    console.log(`\n📊 Resumen:`)
    console.log(`   Posts agregados: ${addedCount}`)
    console.log(`   Posts omitidos: ${skippedCount}`)
    
    // Mostrar todos los posts actuales
    const allPosts = await BlogPost.find({}).sort({ createdAt: -1 })
    console.log(`\n📝 Total de posts en la base de datos: ${allPosts.length}`)
    allPosts.forEach(post => {
      console.log(`   - ${post.title} (${post.status})`)
    })
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await mongoose.disconnect()
    console.log('\nDesconectado de MongoDB')
  }
}

addBlogPosts()
