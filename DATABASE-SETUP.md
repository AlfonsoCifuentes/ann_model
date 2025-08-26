# Guía de Configuración Completa de la Base de Datos

## 🚀 Instrucciones para Ana

### 1. Configuración de Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```bash
# Database - Reemplaza con tus datos reales
MONGODB_URI=mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/ann_model?retryWrites=true&w=majority

# Cloudinary (para subir fotos) - Configura tu cuenta en cloudinary.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret

# URLs del sitio
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com

# Información de contacto
CONTACT_EMAIL=contact@ananicoleta.com
PRESS_EMAIL=press@ananicoleta.com

# Redes sociales
INSTAGRAM_URL=https://instagram.com/ann__siedad.7
```

### 2. Configuración de Cloudinary

1. Ve a [cloudinary.com](https://cloudinary.com) y crea una cuenta gratuita
2. En el dashboard, encontrarás:
   - **Cloud Name**: Cópialo a `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - **API Key**: Cópialo a `CLOUDINARY_API_KEY`
   - **API Secret**: Cópialo a `CLOUDINARY_API_SECRET`
3. Ve a Settings > Upload > Upload presets
4. Crea un nuevo preset llamado `ann_model_photos` con modo "Unsigned"

### 3. Inicializar la Base de Datos

Ejecuta estos comandos en orden:

```bash
# 1. Instalar dependencias
npm install

# 2. Verificar e inicializar la base de datos con fotos de ejemplo
node scripts/checkAndPopulateDB.js

# 3. Iniciar el servidor de desarrollo
npm run dev
```

### 4. Verificar Funcionalidad

1. **Página principal**: Ve a http://localhost:3000
   - Deberías ver el carrusel del hero con 5 fotos
   - La sección "Trabajos Recientes" debería mostrar colecciones

2. **Panel de admin**: Ve a http://localhost:3000/admin
   - **Subir Fotos**: Prueba subir una nueva foto
   - **Hero Principal**: Gestiona las 5 fotos del carrusel
   - **Trabajos Destacados**: Marca trabajos para mostrar en inicio
   - **Galería General**: Ve todas tus fotos

3. **Portfolio**: Ve a http://localhost:3000/portfolio
   - Deberías ver todas las colecciones organizadas

## 🔧 Funcionalidades del Admin

### Subir Fotos
- Selecciona múltiples fotos (hasta 10MB cada una)
- Asigna título y descripción
- **IMPORTANTE**: Usa el mismo "Nombre del trabajo" para agrupar fotos
  - Ejemplo: "Editorial-Vogue-2024" para todas las fotos de esa sesión
- Selecciona la categoría correcta

### Gestionar Hero Principal
- Selecciona exactamente 5 fotos para el carrusel principal
- Estas fotos rotan automáticamente cada 5 segundos
- Son lo primero que ven los visitantes

### Trabajos Destacados
- Marca máximo 2 colecciones como "destacadas"
- Aparecen en la sección "Trabajos Recientes" de la página principal

### Categorías Disponibles
- **Editorial**: Sesiones editoriales y artísticas
- **Fashion/Moda**: Trabajos de moda y pasarela
- **Retrato**: Retratos y headshots
- **Comercial**: Trabajos comerciales y publicitarios
- **Estudio**: Sesiones en estudio
- **Lifestyle**: Fotografía de estilo de vida

## 🎯 Tips para Organizar Fotos

### Nombres de Trabajos Sugeridos:
- `editorial-vogue-2024`
- `commercial-zara-spring`
- `portrait-studio-session`
- `fashion-week-madrid-2024`
- `body-paint-artistic`

### Estructura Recomendada:
1. **Hero (5 fotos)**: Tus mejores fotos que representen tu estilo
2. **Destacados (2 colecciones)**: Trabajos recientes o importantes
3. **Portfolio general**: Todas tus fotos organizadas por colecciones

## 🚨 Solución de Problemas

### Error de conexión a la base de datos
- Verifica que `MONGODB_URI` sea correcta
- Asegúrate de que tu IP esté en la whitelist de MongoDB

### Las fotos no se suben
- Verifica la configuración de Cloudinary
- Comprueba que el preset `ann_model_photos` exista y sea "Unsigned"

### Las fotos no aparecen en el sitio
- Ve al admin y verifica que las fotos tengan `status: active`
- Comprueba que estén en la categoría correcta

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12 > Console)
2. Verifica que todas las variables de entorno estén configuradas
3. Ejecuta `node scripts/checkAndPopulateDB.js` para ver estadísticas de la BD
