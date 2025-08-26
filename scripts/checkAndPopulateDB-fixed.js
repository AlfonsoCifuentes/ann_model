// Script para verificar y poblar la base de datos con fotos iniciales
// Ejecutar: node scripts/checkAndPopulateDB.js

const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// Definir el esquema Photo directamente aquí para Node.js
const photoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String },
  imageUrl: { type: String },
  category: { type: String },
  workCollection: { type: String },
  portfolioSection: { 
    type: String, 
    enum: ['Editorial', 'Fashion', 'Retrato', 'Comercial', 'Estudio', 'Lifestyle', 'hero', 'portfolio'],
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

// Crear el modelo
const Photo = mongoose.models.Photo || mongoose.model('Photo', photoSchema)

const initialPhotos = [
  {
    title: 'Editorial Elegancia 1',
    description: 'Sesión de estudio con iluminación profesional',
    url: '/photos/SVM05701.jpg',
    category: 'editorial',
    workCollection: 'elegancia-clasica',
    portfolioSection: 'Editorial',
    isHero: true,
    featuredInHome: false,
    status: 'active',
    altText: 'Ana Nicoleta - Editorial elegancia clásica',
    tags: ['editorial', 'estudio', 'elegancia']
  },
  {
    title: 'Editorial Elegancia 2', 
    description: 'Retrato artístico en estudio',
    url: '/photos/SVM05620.jpg',
    category: 'editorial',
    workCollection: 'elegancia-clasica',
    portfolioSection: 'Editorial',
    isHero: true,
    featuredInHome: false,
    status: 'active',
    altText: 'Ana Nicoleta - Retrato editorial',
    tags: ['editorial', 'retrato', 'estudio']
  },
  {
    title: 'Editorial Elegancia 3',
    description: 'Pose elegante con vestuario clásico',
    url: '/photos/SVM05631.jpg',
    category: 'editorial',
    workCollection: 'elegancia-clasica',
    portfolioSection: 'Editorial',
    isHero: true,
    featuredInHome: true,
    status: 'active',
    altText: 'Ana Nicoleta - Elegancia clásica',
    tags: ['editorial', 'elegancia', 'clásico']
  },
  {
    title: 'Editorial Elegancia 4',
    description: 'Sesión con iluminación dramática',
    url: '/photos/SVM05670.jpg',
    category: 'editorial',
    workCollection: 'elegancia-clasica',
    portfolioSection: 'Editorial',
    isHero: true,
    featuredInHome: false,
    status: 'active',
    altText: 'Ana Nicoleta - Iluminación dramática',
    tags: ['editorial', 'dramático', 'iluminación']
  },
  {
    title: 'Editorial Elegancia 5',
    description: 'Retrato final de la sesión',
    url: '/photos/SVM05675.jpg',
    category: 'editorial',
    workCollection: 'elegancia-clasica',
    portfolioSection: 'Editorial',
    isHero: true,
    featuredInHome: false,
    status: 'active',
    altText: 'Ana Nicoleta - Retrato final',
    tags: ['editorial', 'retrato', 'final']
  },
  // Fotos del Portfolio
  {
    title: 'Fashion Collection 1',
    description: 'Sesión de moda contemporánea',
    url: '/photos/SVM05678.jpg',
    category: 'fashion',
    workCollection: 'moda-contemporanea',
    portfolioSection: 'Fashion',
    isHero: false,
    featuredInHome: true,
    status: 'active',
    altText: 'Ana Nicoleta - Moda contemporánea',
    tags: ['fashion', 'contemporáneo', 'moda']
  },
  {
    title: 'Fashion Collection 2',
    description: 'Estilo urbano y moderno',
    url: '/photos/SVM05702.jpg',
    category: 'fashion',
    workCollection: 'moda-contemporanea',
    portfolioSection: 'Fashion',
    isHero: false,
    featuredInHome: false,
    status: 'active',
    altText: 'Ana Nicoleta - Estilo urbano',
    tags: ['fashion', 'urbano', 'moderno']
  },
  {
    title: 'Retrato Profesional 1',
    description: 'Headshot profesional para casting',
    url: '/photos/SVM05706.jpg',
    category: 'retrato',
    workCollection: 'headshots-profesionales',
    portfolioSection: 'Retrato',
    isHero: false,
    featuredInHome: false,
    status: 'active',
    altText: 'Ana Nicoleta - Headshot profesional',
    tags: ['retrato', 'profesional', 'casting']
  },
  {
    title: 'Retrato Profesional 2',
    description: 'Expresión natural y profesional',
    url: '/photos/SVM05709.jpg',
    category: 'retrato',
    workCollection: 'headshots-profesionales',
    portfolioSection: 'Retrato',
    isHero: false,
    featuredInHome: false,
    status: 'active',
    altText: 'Ana Nicoleta - Expresión natural',
    tags: ['retrato', 'natural', 'profesional']
  },
  {
    title: 'Estudio Creativo 1',
    description: 'Sesión de estudio con concepto artístico',
    url: '/photos/SVM05711.jpg',
    category: 'estudio',
    workCollection: 'sesion-estudio-creativo',
    portfolioSection: 'Estudio',
    isHero: false,
    featuredInHome: false,
    status: 'active',
    altText: 'Ana Nicoleta - Estudio creativo',
    tags: ['estudio', 'creativo', 'artístico']
  }
]

// Función para conectar a MongoDB
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
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

async function checkAndPopulateDB() {
  await connectDB()
  
  try {
    // Verificar si ya hay fotos en la base de datos
    const existingPhotos = await Photo.find({})
    console.log(`📸 Fotos existentes en la BD: ${existingPhotos.length}`)
    
    if (existingPhotos.length === 0) {
      console.log('💡 No hay fotos. Poblando la base de datos...')
      
      // Insertar fotos iniciales
      const insertedPhotos = await Photo.insertMany(initialPhotos)
      console.log(`✅ ${insertedPhotos.length} fotos insertadas correctamente`)
      
      // Mostrar estadísticas
      const heroPhotos = await Photo.find({ isHero: true })
      const portfolioPhotos = await Photo.find({ isHero: false })
      const featuredPhotos = await Photo.find({ featuredInHome: true })
      
      console.log('\n📊 Estadísticas:')
      console.log(`   - Fotos del Hero: ${heroPhotos.length}`)
      console.log(`   - Fotos del Portfolio: ${portfolioPhotos.length}`)
      console.log(`   - Fotos Destacadas: ${featuredPhotos.length}`)
      
    } else {
      console.log('✅ La base de datos ya contiene fotos.')
      
      // Mostrar estadísticas actuales
      const heroPhotos = await Photo.find({ isHero: true })
      const featuredPhotos = await Photo.find({ featuredInHome: true })
      const activePhotos = await Photo.find({ status: 'active' })
      
      console.log('\n📊 Estadísticas actuales:')
      console.log(`   - Total de fotos: ${existingPhotos.length}`)
      console.log(`   - Fotos activas: ${activePhotos.length}`)
      console.log(`   - Fotos del Hero: ${heroPhotos.length}`)
      console.log(`   - Fotos Destacadas: ${featuredPhotos.length}`)
      
      // Mostrar colecciones
      const collections = await Photo.distinct('workCollection')
      console.log(`   - Colecciones: ${collections.length}`)
      collections.forEach(collection => {
        console.log(`     * ${collection}`)
      })
    }
    
    console.log('\n🎯 Tu sitio está listo:')
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
  checkAndPopulateDB()
}

module.exports = { checkAndPopulateDB }
