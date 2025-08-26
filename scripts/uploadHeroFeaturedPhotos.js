// Script para subir exactamente las mismas fotos usadas en Hero y Destacados
// Ejecutar: node scripts/uploadHeroFeaturedPhotos.js

const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// Definir el esquema Photo
const photoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String },
  imageUrl: { type: String },
  category: { type: String },
  workCollection: { type: String },
  portfolioSection: { 
    type: String, 
    enum: ['Editorial', 'Fashion', 'Retrato', 'Comercial', 'Estudio', 'Lifestyle'],
    default: 'Editorial'
  },
  status: { type: String, enum: ['active', 'archived'], default: 'active' },
  isHero: { type: Boolean, default: false },
  featuredInHome: { type: Boolean, default: false },
  altText: { type: String },
  tags: [{ type: String }],
  photographer: { type: String },
  location: { type: String },
  shootDate: { type: Date },
  uploadDate: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
})

const Photo = mongoose.models.Photo || mongoose.model('Photo', photoSchema)

// EXACTAMENTE las mismas fotos que están siendo usadas en el código
const heroPhotosToUpload = [
  {
    title: 'Hero Principal 1',
    description: 'Foto principal del carrusel hero - elegancia y profesionalismo',
    url: '/photos/SVM05701.jpg',
    imageUrl: '/photos/SVM05701.jpg',
    category: 'editorial',
    workCollection: 'hero-principal',
    portfolioSection: 'Editorial',
    isHero: true,
    featuredInHome: false,
    status: 'active',
    altText: 'Ana Nicoleta - Hero principal elegancia',
    tags: ['hero', 'editorial', 'principal', 'elegancia'],
    photographer: 'Professional Studio',
    location: 'Madrid, España'
  },
  {
    title: 'Hero Principal 2',
    description: 'Segunda foto del carrusel hero - estilo y sofisticación',
    url: '/photos/SVM05720.jpg',
    imageUrl: '/photos/SVM05720.jpg',
    category: 'editorial',
    workCollection: 'hero-principal',
    portfolioSection: 'Editorial',
    isHero: true,
    featuredInHome: false,
    status: 'active',
    altText: 'Ana Nicoleta - Hero estilo y sofisticación',
    tags: ['hero', 'editorial', 'estilo', 'sofisticación'],
    photographer: 'Professional Studio',
    location: 'Madrid, España'
  },
  {
    title: 'Hero Principal 3',
    description: 'Tercera foto del carrusel hero - expresión artística',
    url: '/photos/SVM05728.jpg',
    imageUrl: '/photos/SVM05728.jpg',
    category: 'editorial',
    workCollection: 'hero-principal',
    portfolioSection: 'Editorial',
    isHero: true,
    featuredInHome: false,
    status: 'active',
    altText: 'Ana Nicoleta - Hero expresión artística',
    tags: ['hero', 'editorial', 'artístico', 'expresión'],
    photographer: 'Professional Studio',
    location: 'Madrid, España'
  },
  {
    title: 'Hero Principal 4',
    description: 'Cuarta foto del carrusel hero - versatilidad profesional',
    url: '/photos/SVM05734.jpg',
    imageUrl: '/photos/SVM05734.jpg',
    category: 'editorial',
    workCollection: 'hero-principal',
    portfolioSection: 'Editorial',
    isHero: true,
    featuredInHome: false,
    status: 'active',
    altText: 'Ana Nicoleta - Hero versatilidad profesional',
    tags: ['hero', 'editorial', 'versatilidad', 'profesional'],
    photographer: 'Professional Studio',
    location: 'Madrid, España'
  },
  {
    title: 'Hero Principal 5',
    description: 'Quinta foto del carrusel hero - elegancia contemporánea',
    url: '/photos/SVM05741.jpg',
    imageUrl: '/photos/SVM05741.jpg',
    category: 'editorial',
    workCollection: 'hero-principal',
    portfolioSection: 'Editorial',
    isHero: true,
    featuredInHome: false,
    status: 'active',
    altText: 'Ana Nicoleta - Hero elegancia contemporánea',
    tags: ['hero', 'editorial', 'contemporáneo', 'elegancia'],
    photographer: 'Professional Studio',
    location: 'Madrid, España'
  }
]

// Fotos destacadas exactas del código
const featuredPhotosToUpload = [
  {
    title: 'Editorial Elegance',
    description: 'Sesión editorial de elegancia clásica destacada en portfolio',
    url: '/photos/SVM05701.jpg',
    imageUrl: '/photos/SVM05701.jpg',
    category: 'editorial',
    workCollection: 'editorial-elegance-2024',
    portfolioSection: 'Editorial',
    isHero: false,
    featuredInHome: true,
    status: 'active',
    altText: 'Ana Nicoleta - Editorial Elegance',
    tags: ['editorial', 'elegancia', 'destacado', 'clásico'],
    photographer: 'Professional Studio',
    location: 'Madrid, España'
  },
  {
    title: 'Fashion Portrait',
    description: 'Retrato de moda profesional para portfolio destacado',
    url: '/photos/SVM05620.jpg',
    imageUrl: '/photos/SVM05620.jpg',
    category: 'retrato',
    workCollection: 'fashion-portrait-session',
    portfolioSection: 'Retrato',
    isHero: false,
    featuredInHome: true,
    status: 'active',
    altText: 'Ana Nicoleta - Fashion Portrait',
    tags: ['retrato', 'moda', 'destacado', 'profesional'],
    photographer: 'Professional Studio',
    location: 'Madrid, España'
  },
  {
    title: 'Artistic Vision',
    description: 'Visión artística contemporánea para colección destacada',
    url: '/photos/SVM05631.jpg',
    imageUrl: '/photos/SVM05631.jpg',
    category: 'arte',
    workCollection: 'artistic-vision-collection',
    portfolioSection: 'Editorial',
    isHero: false,
    featuredInHome: true,
    status: 'active',
    altText: 'Ana Nicoleta - Artistic Vision',
    tags: ['arte', 'visión', 'destacado', 'contemporáneo'],
    photographer: 'Professional Studio',
    location: 'Madrid, España'
  },
  {
    title: 'Contemporary Style',
    description: 'Estilo contemporáneo para sesión de moda destacada',
    url: '/photos/SVM05660.jpg',
    imageUrl: '/photos/SVM05660.jpg',
    category: 'moda',
    workCollection: 'contemporary-style-shoot',
    portfolioSection: 'Fashion',
    isHero: false,
    featuredInHome: true,
    status: 'active',
    altText: 'Ana Nicoleta - Contemporary Style',
    tags: ['moda', 'contemporáneo', 'destacado', 'estilo'],
    photographer: 'Professional Studio',
    location: 'Madrid, España'
  }
]

// Función para conectar a MongoDB
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Conectado a MongoDB')
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error)
    process.exit(1)
  }
}

// Función para desconectar
async function disconnectDB() {
  try {
    await mongoose.disconnect()
    console.log('🔌 Desconectado de MongoDB')
  } catch (error) {
    console.error('❌ Error desconectando:', error)
  }
}

async function uploadHeroAndFeaturedPhotos() {
  await connectDB()
  
  try {
    console.log('🎭 Subiendo fotos EXACTAS del Hero y Destacados...\n')
    
    // 1. Limpiar fotos hero y featured existentes
    console.log('🧹 Limpiando fotos hero y featured existentes...')
    await Photo.updateMany({ isHero: true }, { isHero: false })
    await Photo.updateMany({ featuredInHome: true }, { featuredInHome: false })
    console.log('✅ Limpieza completada\n')
    
    // 2. Subir fotos del Hero
    console.log('🎭 Subiendo 5 fotos del Hero Principal...')
    for (let i = 0; i < heroPhotosToUpload.length; i++) {
      const heroPhoto = heroPhotosToUpload[i]
      
      // Verificar si ya existe
      const existingHero = await Photo.findOne({ 
        $or: [
          { url: heroPhoto.url },
          { imageUrl: heroPhoto.imageUrl }
        ]
      })
      
      if (existingHero) {
        // Actualizar foto existente
        await Photo.findByIdAndUpdate(existingHero._id, {
          ...heroPhoto,
          updatedAt: new Date()
        })
        console.log(`   ✅ Actualizada: ${heroPhoto.title}`)
      } else {
        // Crear nueva foto
        await Photo.create(heroPhoto)
        console.log(`   ✅ Creada: ${heroPhoto.title}`)
      }
    }
    
    // 3. Subir fotos Destacadas
    console.log('\n⭐ Subiendo 4 fotos Destacadas...')
    for (let i = 0; i < featuredPhotosToUpload.length; i++) {
      const featuredPhoto = featuredPhotosToUpload[i]
      
      // Verificar si ya existe
      const existingFeatured = await Photo.findOne({ 
        $or: [
          { url: featuredPhoto.url },
          { imageUrl: featuredPhoto.imageUrl }
        ]
      })
      
      if (existingFeatured) {
        // Actualizar foto existente
        await Photo.findByIdAndUpdate(existingFeatured._id, {
          ...featuredPhoto,
          updatedAt: new Date()
        })
        console.log(`   ✅ Actualizada: ${featuredPhoto.title}`)
      } else {
        // Crear nueva foto
        await Photo.create(featuredPhoto)
        console.log(`   ✅ Creada: ${featuredPhoto.title}`)
      }
    }
    
    // 4. Verificar resultados
    console.log('\n📊 Verificando resultados...')
    const heroCount = await Photo.countDocuments({ isHero: true })
    const featuredCount = await Photo.countDocuments({ featuredInHome: true })
    const totalCount = await Photo.countDocuments({ status: 'active' })
    
    console.log(`   - Fotos Hero: ${heroCount}/5`)
    console.log(`   - Fotos Destacadas: ${featuredCount}`)
    console.log(`   - Total fotos activas: ${totalCount}`)
    
    // 5. Listar las fotos subidas
    console.log('\n🎭 FOTOS HERO CONFIGURADAS:')
    const heroPhotos = await Photo.find({ isHero: true }).sort({ title: 1 })
    heroPhotos.forEach((photo, index) => {
      console.log(`   ${index + 1}. ${photo.title} - ${photo.url}`)
    })
    
    console.log('\n⭐ FOTOS DESTACADAS CONFIGURADAS:')
    const featuredPhotos = await Photo.find({ featuredInHome: true }).sort({ title: 1 })
    featuredPhotos.forEach((photo, index) => {
      console.log(`   ${index + 1}. ${photo.title} - ${photo.url}`)
    })
    
    console.log('\n🎉 ¡CONFIGURACIÓN COMPLETADA!')
    console.log('   Las fotos del Hero y Destacados están exactamente como en el código.')
    console.log('   Ahora tu sitio web mostrará estas fotos específicas.')
    console.log('\n🌐 URLs para probar:')
    console.log('   - Sitio principal: http://localhost:3000')
    console.log('   - Panel admin: http://localhost:3000/admin')
    console.log('   - Portfolio: http://localhost:3000/portfolio')
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await disconnectDB()
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  uploadHeroAndFeaturedPhotos()
}

module.exports = { uploadHeroAndFeaturedPhotos }
