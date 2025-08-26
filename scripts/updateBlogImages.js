// Script para actualizar las imágenes de las entradas de blog
const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const BlogPostSchema = new mongoose.Schema({
  title: String,
  excerpt: String,
  content: String,
  image: String,
  slug: String,
  status: String,
  author: String,
  tags: [String],
  readTime: String,
  views: Number,
  featured: Boolean
}, {
  timestamps: true
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

const imageUpdates = [
  {
    titlePattern: 'Street Body Painting',
    newImage: '/photos/otras/street_body_paint-1.jpg'
  },
  {
    titlePattern: 'Sesión Classy',
    newImage: '/photos/otras/classy-1.jpg'
  },
  {
    titlePattern: 'Maquillaje Artístico',
    newImage: '/photos/otras/make-up_close_up-1.JPG'
  }
]

async function updateBlogImages() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Conectado a MongoDB')
    
    console.log('📝 Actualizando imágenes de entradas de blog...\n')
    
    for (const update of imageUpdates) {
      try {
        const post = await BlogPost.findOne({ 
          title: { $regex: update.titlePattern, $options: 'i' } 
        })
        
        if (post) {
          const oldImage = post.image
          post.image = update.newImage
          await post.save()
          
          console.log(`✅ "${post.title}"`)
          console.log(`   Imagen anterior: ${oldImage}`)
          console.log(`   Imagen nueva: ${update.newImage}\n`)
        } else {
          console.log(`❌ No se encontró entrada con patrón: ${update.titlePattern}\n`)
        }
      } catch (error) {
        console.error(`❌ Error actualizando entrada con patrón "${update.titlePattern}":`, error.message)
      }
    }
    
    // Mostrar todas las entradas actualizadas
    const allPosts = await BlogPost.find({}).sort({ createdAt: -1 })
    console.log(`📊 Resumen de entradas actualizadas:`)
    allPosts.forEach(post => {
      console.log(`   - "${post.title}"`)
      console.log(`     Imagen: ${post.image}`)
    })
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await mongoose.disconnect()
    console.log('\nDesconectado de MongoDB')
  }
}

updateBlogImages()
