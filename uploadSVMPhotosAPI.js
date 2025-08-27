const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function uploadSVMPhotosViaAPI() {
  try {
    console.log('🚀 Iniciando subida de fotos SVM via API...');
    
    // Obtener lista de archivos SVM de la carpeta photos
    const photosDir = path.join(__dirname, 'public', 'photos');
    const files = fs.readdirSync(photosDir);
    const svmFiles = files.filter(file => 
      file.toUpperCase().startsWith('SVM') && 
      /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(file)
    );

    console.log(`📁 Encontrados ${svmFiles.length} archivos SVM en la carpeta:`);
    svmFiles.forEach(file => console.log(`  - ${file}`));

    // Obtener fotos existentes de la API
    const existingResponse = await fetch('http://localhost:3001/api/photos?portfolioSection=portfolio&status=active');
    const existingData = await existingResponse.json();
    
    if (!existingData.success) {
      throw new Error('Error al obtener fotos existentes');
    }

    const existingUrls = new Set();
    existingData.data.forEach(photo => {
      const fileName = photo.imageUrl.split('/').pop();
      if (fileName && fileName.toUpperCase().startsWith('SVM')) {
        existingUrls.add(fileName);
      }
    });

    console.log(`\\n📊 Ya existen ${existingUrls.size} fotos SVM en la BD:`);
    Array.from(existingUrls).forEach(url => console.log(`  - ${url}`));

    // Identificar archivos faltantes
    const missingFiles = svmFiles.filter(file => !existingUrls.has(file));
    
    if (missingFiles.length === 0) {
      console.log('\\n✅ Todas las fotos SVM ya están en la base de datos');
      return;
    }

    console.log(`\\n📤 Subiendo ${missingFiles.length} fotos SVM faltantes:`);

    // Subir cada foto faltante
    let uploaded = 0;
    for (const file of missingFiles) {
      try {
        const photoData = {
          title: `Sesión SVM ${file.replace(/\.(jpg|jpeg|png)/i, '')}`,
          description: 'Fotografía profesional de portfolio - Colección SVM',
          imageUrl: `/photos/${file}`,
          category: 'portrait',
          workCollection: 'polaroids-vintage',
          portfolioSection: 'portfolio',
          status: 'active',
          order: 1000 + uploaded,
          altText: `Fotografía profesional ${file}`,
          metadata: {
            originalName: file,
            uploadedBy: 'Sistema - Migración SVM'
          }
        };

        const response = await fetch('http://localhost:3001/api/photos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(photoData)
        });

        const result = await response.json();
        
        if (result.success) {
          console.log(`  ✅ ${file} - Subido exitosamente`);
          uploaded++;
        } else {
          console.log(`  ❌ ${file} - Error: ${result.message}`);
        }
        
        // Pequeña pausa para no sobrecargar la API
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.log(`  ❌ ${file} - Error: ${error.message}`);
      }
    }

    console.log(`\\n✅ Proceso completado: ${uploaded}/${missingFiles.length} fotos subidas`);
    
    // Verificar total final
    const finalResponse = await fetch('http://localhost:3001/api/photos?portfolioSection=portfolio&status=active');
    const finalData = await finalResponse.json();
    
    if (finalData.success) {
      const totalSVMPhotos = finalData.data.filter(photo => {
        const fileName = photo.imageUrl.split('/').pop();
        return fileName && fileName.toUpperCase().startsWith('SVM');
      }).length;
      
      console.log(`\\n📊 RESUMEN FINAL:`);
      console.log(`  - Total archivos SVM en carpeta: ${svmFiles.length}`);
      console.log(`  - Total fotos SVM en BD: ${totalSVMPhotos}`);
      console.log(`  - Fotos recién subidas: ${uploaded}`);
    }

  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
}

uploadSVMPhotosViaAPI();
