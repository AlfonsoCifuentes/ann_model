// Script para configurar contenido inicial destacado
// Este script ayuda a Ana a configurar las primeras colecciones destacadas

const setupInitialContent = async () => {
  console.log('🎨 Configurando contenido inicial para Ana...')
  
  try {
    // 1. Obtener todas las fotos disponibles
    console.log('📸 Obteniendo fotos disponibles...')
    const photosResponse = await fetch('/api/photos?status=active')
    const photosResult = await photosResponse.json()
    
    if (!photosResult.success) {
      throw new Error('No se pudieron obtener las fotos')
    }
    
    const photos = photosResult.data
    console.log(`✅ Se encontraron ${photos.length} fotos activas`)
    
    // 2. Agrupar fotos por colección
    const collections = {}
    photos.forEach(photo => {
      if (photo.workCollection) {
        if (!collections[photo.workCollection]) {
          collections[photo.workCollection] = []
        }
        collections[photo.workCollection].push(photo)
      }
    })
    
    const collectionNames = Object.keys(collections)
    console.log(`📁 Se encontraron ${collectionNames.length} colecciones:`, collectionNames)
    
    // 3. Marcar las 3 primeras colecciones como destacadas automáticamente
    if (collectionNames.length > 0) {
      const collectionsToFeature = collectionNames.slice(0, 3)
      
      for (const collectionName of collectionsToFeature) {
        const photosInCollection = collections[collectionName]
        const photoIds = photosInCollection.map(p => p._id)
        
        console.log(`⭐ Marcando colección "${collectionName}" como destacada (${photoIds.length} fotos)`)
        
        const response = await fetch('/api/photos/featured', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            collectionName,
            featured: true
          })
        })
        
        const result = await response.json()
        if (result.success) {
          console.log(`✅ Colección "${collectionName}" marcada como destacada`)
        } else {
          console.log(`❌ Error al marcar colección "${collectionName}":`, result.error)
        }
      }
    }
    
    // 4. Establecer las primeras 5 fotos como hero automáticamente
    if (photos.length > 0) {
      const heroPhotos = photos.slice(0, 5)
      const heroPhotoIds = heroPhotos.map(p => p._id)
      
      console.log(`🏆 Estableciendo ${heroPhotos.length} fotos como hero`)
      
      const response = await fetch('/api/photos/hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          photoIds: heroPhotoIds
        })
      })
      
      const result = await response.json()
      if (result.success) {
        console.log(`✅ ${heroPhotos.length} fotos establecidas como hero`)
      } else {
        console.log(`❌ Error al establecer fotos hero:`, result.error)
      }
    }
    
    console.log('\n🎉 ¡Configuración inicial completada!')
    console.log('\n📋 Resumen:')
    console.log(`   • ${collectionNames.length} colecciones encontradas`)
    console.log(`   • ${Math.min(3, collectionNames.length)} colecciones marcadas como destacadas`)
    console.log(`   • ${Math.min(5, photos.length)} fotos establecidas como hero`)
    console.log('\n💡 Ana ahora puede gestionar este contenido desde el panel de administración')
    
  } catch (error) {
    console.error('❌ Error durante la configuración inicial:', error)
    console.log('\n🔧 Soluciones posibles:')
    console.log('   • Verificar que el servidor esté ejecutándose')
    console.log('   • Verificar que la base de datos esté conectada')
    console.log('   • Verificar que existan fotos en la base de datos')
  }
}

// Ejecutar si se llama directamente
if (typeof window !== 'undefined') {
  // En el navegador, ejecutar al cargar
  window.setupInitialContent = setupInitialContent
  console.log('🛠️  Script de configuración inicial cargado')
  console.log('💻 Para ejecutar, usa: setupInitialContent()')
} else {
  // En Node.js, ejecutar directamente
  setupInitialContent()
}

export default setupInitialContent
