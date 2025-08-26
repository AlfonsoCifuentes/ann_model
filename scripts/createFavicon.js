// Script para generar favicon.ico desde SVG
const fs = require('fs');

// Crear el contenido del SVG optimizado para favicon
const faviconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" fill="#000000"/>
  <text x="9" y="22" font-family="Arial, sans-serif" font-size="14" font-weight="300" fill="#ffffff" text-anchor="middle">A</text>
  <text x="23" y="22" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">N</text>
</svg>`;

// Guardar la versión del favicon
fs.writeFileSync('./public/favicon-32x32.svg', faviconSVG);

console.log('✅ Favicon SVG 32x32 creado exitosamente');
console.log('📁 Archivo guardado en: ./public/favicon-32x32.svg');

// También crear una versión para los iconos de diferentes tamaños
const icon16SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
  <rect width="16" height="16" fill="#000000"/>
  <text x="4.5" y="11" font-family="Arial, sans-serif" font-size="7" font-weight="300" fill="#ffffff" text-anchor="middle">A</text>
  <text x="11.5" y="11" font-family="Arial, sans-serif" font-size="7" font-weight="700" fill="#ffffff" text-anchor="middle">N</text>
</svg>`;

fs.writeFileSync('./public/favicon-16x16.svg', icon16SVG);

console.log('✅ Favicon SVG 16x16 creado exitosamente');
console.log('📁 Archivo guardado en: ./public/favicon-16x16.svg');

console.log('\n🎯 Favicons personalizados de Ana Nicoleta creados:');
console.log('   - A (normal) + N (negrita) sobre fondo negro');
console.log('   - Optimizados para diferentes tamaños');
console.log('   - Listos para usar en la web');
