const fs = require('fs')
const path = require('path')
const FormData = require('form-data')
const { default: fetch } = require('node-fetch')

async function uploadPhotosToAPI() {
  const photosDir = path.join(__dirname, '..', 'src', 'app', 'photos', 'otras')
  console.log(`📂 Buscando fotos en: ${photosDir}`)
  
  try {
    const files = fs.readdirSync(photosDir)
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    )
    
    console.log(`📸 Encontradas ${imageFiles.length} fotos para subir`)
    
    for (const filename of imageFiles) {
      const filePath = path.join(photosDir, filename)
      
      try {
        console.log(`📤 Subiendo ${filename}...`)
        
        // Crear FormData para el upload
        const formData = new FormData()
        formData.append('photos', fs.createReadStream(filePath))
        
        // Subir usando la API del proyecto
        const response = await fetch('http://localhost:3001/api/photos/upload', {
          method: 'POST',
          body: formData,
        })
        
        const result = await response.json()
        
        if (result.success) {
          console.log(`✅ ${filename} subida exitosamente`)
        } else {
          console.error(`❌ Error subiendo ${filename}:`, result.error)
        }
        
      } catch (error) {
        console.error(`❌ Error procesando ${filename}:`, error)
      }
    }
    
    console.log('🎯 ¡Proceso completado!')
    
  } catch (error) {
    console.error('❌ Error general:', error)
  }
}

// Ejecutar el script
uploadPhotosToAPI()
