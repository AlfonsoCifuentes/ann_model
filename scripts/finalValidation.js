/**
 * VALIDACIÓN FINAL COMPLETA
 * Script de verificación integral del sitio web de Ana Nicoleta
 * Verifica todas las funcionalidades críticas y reporta el estado
 */

const fs = require('fs').promises;
const path = require('path');

// Colores para output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const printHeader = (title) => {
  log('\n' + '═'.repeat(60), 'cyan');
  log(`  ${title}`, 'bright');
  log('═'.repeat(60), 'cyan');
};

const printSubHeader = (title) => {
  log(`\n${title}`, 'blue');
  log('─'.repeat(40), 'blue');
};

// Verificaciones del proyecto
const validationChecks = {
  
  // 1. Estructura de archivos críticos
  async checkProjectStructure() {
    printSubHeader('🏗️  ESTRUCTURA DEL PROYECTO');
    
    const criticalFiles = [
      'package.json',
      'next.config.js',
      'tailwind.config.js',
      '.env.example',
      'src/app/layout.js',
      'src/app/page.js',
      'src/app/admin/page.js',
      'src/components/PhotoUpload.js',
      'src/components/EnhancedHero.js',
      'src/models/Photo.js',
      'src/lib/mongodb.js'
    ];
    
    const results = [];
    
    for (const file of criticalFiles) {
      try {
        await fs.access(file);
        results.push(`✅ ${file}`);
      } catch (error) {
        results.push(`❌ ${file} - FALTA`);
      }
    }
    
    results.forEach(result => log(result));
    return results;
  },
  
  // 2. Verificar APIs
  async checkAPIRoutes() {
    printSubHeader('🔌 RUTAS DE API');
    
    const apiRoutes = [
      'src/app/api/photos/route.js',
      'src/app/api/photos/hero/route.js',
      'src/app/api/photos/featured/route.js',
      'src/app/api/photos/[id]/route.js'
    ];
    
    const results = [];
    
    for (const route of apiRoutes) {
      try {
        const content = await fs.readFile(route, 'utf8');
        
        // Verificar que contenga funciones HTTP básicas
        const hasGET = content.includes('export async function GET');
        const hasPOST = content.includes('export async function POST') || !route.includes('[id]');
        
        if (hasGET && hasPOST) {
          results.push(`✅ ${route} - Completa`);
        } else {
          results.push(`⚠️  ${route} - Funciones faltantes`);
        }
      } catch (error) {
        results.push(`❌ ${route} - No existe`);
      }
    }
    
    results.forEach(result => log(result));
    return results;
  },
  
  // 3. Verificar componentes admin
  async checkAdminComponents() {
    printSubHeader('👩‍💼 COMPONENTES ADMIN');
    
    const adminComponents = [
      'src/app/admin/page.js',
      'src/components/PhotoUpload.js',
      'src/components/admin/HeroManager.js',
      'src/components/admin/FeaturedManager.js',
      'src/components/admin/PhotoManager.js'
    ];
    
    const results = [];
    
    for (const component of adminComponents) {
      try {
        const content = await fs.readFile(component, 'utf8');
        
        // Verificar funcionalidad clave
        const checks = {
          'PhotoUpload.js': ['Cloudinary', 'workCollection', 'handleSubmit'],
          'HeroManager.js': ['hero', 'setAsHero'],
          'FeaturedManager.js': ['featured', 'toggleFeatured'],
          'PhotoManager.js': ['photos', 'deletePhoto'],
          'page.js': ['admin', 'PhotoUpload']
        };
        
        const fileName = path.basename(component);
        const requiredFeatures = checks[fileName] || [];
        
        const hasFeatures = requiredFeatures.every(feature => 
          content.toLowerCase().includes(feature.toLowerCase())
        );
        
        if (hasFeatures) {
          results.push(`✅ ${component} - Funcional`);
        } else {
          results.push(`⚠️  ${component} - Revisar funcionalidades`);
        }
      } catch (error) {
        results.push(`❌ ${component} - No existe`);
      }
    }
    
    results.forEach(result => log(result));
    return results;
  },
  
  // 4. Verificar estilos y diseño
  async checkStyling() {
    printSubHeader('🎨 SISTEMA DE ESTILOS');
    
    const results = [];
    
    try {
      // Verificar globals.css
      const globalCSS = await fs.readFile('src/app/globals.css', 'utf8');
      
      const cssChecks = [
        { name: 'Variables de color', pattern: '--fashion-' },
        { name: 'Fuentes tipográficas', pattern: 'font-family' },
        { name: 'Clases responsive', pattern: '@media' },
        { name: 'Animaciones', pattern: '@keyframes' }
      ];
      
      cssChecks.forEach(check => {
        if (globalCSS.includes(check.pattern)) {
          results.push(`✅ ${check.name} - Configurado`);
        } else {
          results.push(`❌ ${check.name} - Falta`);
        }
      });
      
      // Verificar tailwind.config.js
      const tailwindConfig = await fs.readFile('tailwind.config.js', 'utf8');
      if (tailwindConfig.includes('extend')) {
        results.push(`✅ Tailwind personalizado - Configurado`);
      } else {
        results.push(`⚠️  Tailwind personalizado - Revisar`);
      }
      
    } catch (error) {
      results.push(`❌ Error verificando estilos: ${error.message}`);
    }
    
    results.forEach(result => log(result));
    return results;
  },
  
  // 5. Verificar configuración de entorno
  async checkEnvironmentConfig() {
    printSubHeader('⚙️  CONFIGURACIÓN DE ENTORNO');
    
    const results = [];
    
    try {
      // Verificar .env.example
      const envExample = await fs.readFile('.env.example', 'utf8');
      
      const requiredVars = [
        'MONGODB_URI',
        'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
        'CLOUDINARY_API_KEY',
        'CLOUDINARY_API_SECRET',
        'NEXT_PUBLIC_BASE_URL'
      ];
      
      requiredVars.forEach(varName => {
        if (envExample.includes(varName)) {
          results.push(`✅ ${varName} - Documentado`);
        } else {
          results.push(`❌ ${varName} - Falta en .env.example`);
        }
      });
      
      // Verificar next.config.js
      const nextConfig = await fs.readFile('next.config.js', 'utf8');
      if (nextConfig.includes('images') && nextConfig.includes('cloudinary')) {
        results.push(`✅ Configuración de imágenes - OK`);
      } else {
        results.push(`⚠️  Configuración de imágenes - Revisar`);
      }
      
    } catch (error) {
      results.push(`❌ Error verificando configuración: ${error.message}`);
    }
    
    results.forEach(result => log(result));
    return results;
  },
  
  // 6. Verificar scripts auxiliares
  async checkUtilityScripts() {
    printSubHeader('🔧 SCRIPTS DE UTILIDAD');
    
    const scripts = [
      'scripts/systemCheck.js',
      'scripts/checkAndPopulateDB.js',
      'scripts/finalValidation.js'
    ];
    
    const results = [];
    
    for (const script of scripts) {
      try {
        await fs.access(script);
        results.push(`✅ ${script}`);
      } catch (error) {
        results.push(`❌ ${script} - No existe`);
      }
    }
    
    results.forEach(result => log(result));
    return results;
  },
  
  // 7. Verificar documentación
  async checkDocumentation() {
    printSubHeader('📚 DOCUMENTACIÓN');
    
    const docs = [
      'README.md',
      'DATABASE-SETUP.md',
      'IMPLEMENTATION-SUMMARY.md',
      '.env.example'
    ];
    
    const results = [];
    
    for (const doc of docs) {
      try {
        const content = await fs.readFile(doc, 'utf8');
        if (content.length > 500) { // Documentación sustancial
          results.push(`✅ ${doc} - Completa (${Math.round(content.length/1000)}KB)`);
        } else {
          results.push(`⚠️  ${doc} - Muy breve`);
        }
      } catch (error) {
        results.push(`❌ ${doc} - No existe`);
      }
    }
    
    results.forEach(result => log(result));
    return results;
  }
};

// Función principal
async function runCompleteValidation() {
  try {
    printHeader('🔍 VALIDACIÓN COMPLETA - PORTFOLIO ANA NICOLETA');
    
    log('Ejecutando auditoría integral del sitio web...', 'yellow');
    
    const allResults = [];
    
    // Ejecutar todas las verificaciones
    allResults.push(await validationChecks.checkProjectStructure());
    allResults.push(await validationChecks.checkAPIRoutes());
    allResults.push(await validationChecks.checkAdminComponents());
    allResults.push(await validationChecks.checkStyling());
    allResults.push(await validationChecks.checkEnvironmentConfig());
    allResults.push(await validationChecks.checkUtilityScripts());
    allResults.push(await validationChecks.checkDocumentation());
    
    // Resumen final
    printHeader('📊 RESUMEN DE VALIDACIÓN');
    
    let totalChecks = 0;
    let passedChecks = 0;
    let warningChecks = 0;
    let failedChecks = 0;
    
    allResults.flat().forEach(result => {
      totalChecks++;
      if (result.includes('✅')) passedChecks++;
      else if (result.includes('⚠️')) warningChecks++;
      else if (result.includes('❌')) failedChecks++;
    });
    
    log(`\n📈 ESTADÍSTICAS:`, 'bright');
    log(`   Total verificaciones: ${totalChecks}`, 'cyan');
    log(`   ✅ Pasadas: ${passedChecks} (${Math.round(passedChecks/totalChecks*100)}%)`, 'green');
    log(`   ⚠️  Advertencias: ${warningChecks} (${Math.round(warningChecks/totalChecks*100)}%)`, 'yellow');
    log(`   ❌ Fallidas: ${failedChecks} (${Math.round(failedChecks/totalChecks*100)}%)`, 'red');
    
    // Estado general
    if (failedChecks === 0 && warningChecks <= 2) {
      log(`\n🎉 ESTADO: EXCELENTE - Sitio listo para producción`, 'green');
    } else if (failedChecks <= 2) {
      log(`\n✅ ESTADO: BUENO - Algunas mejoras menores`, 'yellow');
    } else {
      log(`\n⚠️  ESTADO: NECESITA ATENCIÓN - Varios elementos requieren corrección`, 'red');
    }
    
    // Recomendaciones finales
    printSubHeader('💡 PRÓXIMOS PASOS RECOMENDADOS');
    
    log('1. Configurar variables de entorno (.env.local)');
    log('2. Ejecutar: node scripts/systemCheck.js');
    log('3. Poblar base de datos: node scripts/checkAndPopulateDB.js');
    log('4. Probar funcionalidad de admin en: http://localhost:3000/admin');
    log('5. Verificar responsive design en móviles');
    log('6. Configurar Cloudinary para subida de fotos');
    log('7. Desplegar a producción (Vercel)');
    
    log(`\n🌟 ¡Portfolio de Ana Nicoleta auditado completamente!`, 'bright');
    
  } catch (error) {
    log(`\n❌ Error durante validación: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  runCompleteValidation();
}

module.exports = { runCompleteValidation, validationChecks };
