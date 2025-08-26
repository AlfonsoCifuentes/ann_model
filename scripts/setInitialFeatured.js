const { MongoClient } = require('mongodb')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://alfonicif:CMMtmwB8XxWXp9CJ@cluster0.vbmqn.mongodb.net/portfolio_ana_nicoleta?retryWrites=true&w=majority&appName=Cluster0'

async function setInitialFeaturedCollections() {
  const client = new MongoClient(MONGODB_URI)
  
  try {
    await client.connect()
    console.log('Conectado a MongoDB')
    
    const db = client.db('portfolio_ana_nicoleta')
    const collection = db.collection('photos')
    
    // Marcar las colecciones predeterminadas como destacadas
    const targetCollections = ['elegancia-clasica', 'body-paint-japones']
    
    for (const collectionId of targetCollections) {
      const result = await collection.updateMany(
        { 
          workCollection: collectionId,
          status: 'active'
        },
        { 
          $set: { featuredInHome: true }
        }
      )
      
      console.log(`✅ Colección "${collectionId}": ${result.modifiedCount} fotos marcadas como destacadas`)
    }
    
    // Verificar el resultado
    const featuredPhotos = await collection.find({ 
      featuredInHome: true,
      status: 'active'
    }).toArray()
    
    console.log(`\n📊 Total de fotos destacadas: ${featuredPhotos.length}`)
    
    // Agrupar por colección para mostrar resumen
    const collectionCounts = {}
    featuredPhotos.forEach(photo => {
      if (photo.workCollection) {
        collectionCounts[photo.workCollection] = (collectionCounts[photo.workCollection] || 0) + 1
      }
    })
    
    console.log('\n📋 Resumen por colección:')
    Object.entries(collectionCounts).forEach(([collection, count]) => {
      console.log(`   ${collection}: ${count} fotos`)
    })
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await client.close()
    console.log('\n🔌 Conexión cerrada')
  }
}

// Ejecutar el script
setInitialFeaturedCollections()
