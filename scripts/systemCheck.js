#!/usr/bin/env node
// Script de verificación del sistema
// Ejecutar: node scripts/systemCheck.js

const fs = require('fs')
const path = require('path')

console.log('🔍 VERIFICACIÓN DEL SISTEMA ANA NICOLETA\n')

// 1. Verificar archivos críticos
const criticalFiles = [
  'src/app/layout.js',
  'src/app/page.js',
  'src/app/admin/page.js',
  'src/components/MainLayout.js',
  'src/components/Navbar.js',
  'src/components/PhotoUpload.js',
  'src/components/EnhancedHero.js',
  'src/lib/mongodb.js',
  'src/models/Photo.js',
  'src/app/api/photos/route.js'
]

console.log('📁 Verificando archivos críticos...')
criticalFiles.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`   ${exists ? '✅' : '❌'} ${file}`)
})

// 2. Verificar variables de entorno
console.log('\n🔧 Verificando configuración...')
const requiredEnvVars = [
  'MONGODB_URI',
  'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME'
]

const hasEnvFile = fs.existsSync('.env.local')
console.log(`   ${hasEnvFile ? '✅' : '⚠️'} .env.local ${hasEnvFile ? 'existe' : 'no encontrado'}`)

if (hasEnvFile) {
  const envContent = fs.readFileSync('.env.local', 'utf8')
  requiredEnvVars.forEach(envVar => {
    const exists = envContent.includes(envVar)
    console.log(`   ${exists ? '✅' : '❌'} ${envVar}`)
  })
}

// 3. Verificar package.json
console.log('\n📦 Verificando dependencias...')
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

const requiredDeps = [
  'next',
  'react',
  'mongoose',
  'framer-motion',
  'lucide-react'
]

requiredDeps.forEach(dep => {
  const exists = packageJson.dependencies[dep] || packageJson.devDependencies[dep]
  console.log(`   ${exists ? '✅' : '❌'} ${dep}`)
})

// 4. Verificar fotos públicas
console.log('\n🖼️ Verificando fotos de ejemplo...')
const photosDir = 'public/photos'
if (fs.existsSync(photosDir)) {
  const photos = fs.readdirSync(photosDir).filter(f => f.endsWith('.jpg'))
  console.log(`   ✅ ${photos.length} fotos encontradas en public/photos/`)
  
  const heroPhotos = [
    'SVM05701.jpg',
    'SVM05620.jpg', 
    'SVM05631.jpg',
    'SVM05670.jpg',
    'SVM05675.jpg'
  ]
  
  heroPhotos.forEach(photo => {
    const exists = photos.includes(photo)
    console.log(`   ${exists ? '✅' : '⚠️'} ${photo} ${exists ? '' : '(foto del hero no encontrada)'}`)
  })
} else {
  console.log('   ❌ Directorio public/photos/ no encontrado')
}

// 5. Verificar scripts
console.log('\n🔧 Scripts disponibles...')
const scripts = packageJson.scripts || {}
const importantScripts = ['dev', 'build', 'start']

importantScripts.forEach(script => {
  const exists = scripts[script]
  console.log(`   ${exists ? '✅' : '❌'} npm run ${script}`)
})

// 6. Verificar APIs
console.log('\n🌐 Verificando rutas de API...')
const apiRoutes = [
  'src/app/api/photos/route.js',
  'src/app/api/photos/featured/route.js',
  'src/app/api/photos/hero/route.js'
]

apiRoutes.forEach(route => {
  const exists = fs.existsSync(route)
  console.log(`   ${exists ? '✅' : '❌'} ${route}`)
})

console.log('\n📋 RESUMEN:')
console.log('   Para iniciar el proyecto:')
console.log('   1. Configura .env.local con tus datos')
console.log('   2. Ejecuta: npm install')
console.log('   3. Ejecuta: node scripts/checkAndPopulateDB.js')
console.log('   4. Ejecuta: npm run dev')
console.log('   5. Ve a http://localhost:3000')
console.log('\n   Panel de admin: http://localhost:3000/admin')
console.log('   Portfolio: http://localhost:3000/portfolio')

console.log('\n✨ ¡Sistema verificado!')
