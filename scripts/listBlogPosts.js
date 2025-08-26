// Script para ver entradas actuales de blog
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

async function listPosts() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Conectado a MongoDB')
    
    const posts = await BlogPost.find({}).sort({ createdAt: -1 })
    console.log(`\n📝 Total de entradas: ${posts.length}`)
    
    posts.forEach((post, i) => {
      console.log(`\n${i+1}. "${post.title}"`)
      console.log(`   Slug: ${post.slug}`)
      console.log(`   Estado: ${post.status}`)
      console.log(`   Fecha: ${post.createdAt}`)
      console.log(`   Excerpt: ${post.excerpt.substring(0, 100)}...`)
    })
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await mongoose.disconnect()
    console.log('\nDesconectado de MongoDB')
  }
}

listPosts()
