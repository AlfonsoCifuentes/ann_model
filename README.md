# 🌟 Ana Nicoleta - Portfolio Profesional

Portfolio web profesional para modelo y actriz Ana Nicoleta de Pedro Sanchez. Sitio web moderno con gestión de contenido, galería de fotos, blog personal y panel de administración completo.

## ✨ Características Principales

### 🎭 Para Visitantes
- **Hero Dinámico**: Carrusel de 5 fotos que rotan automáticamente
- **Portfolio Organizado**: Fotos agrupadas por trabajos/sesiones
- **Galería Responsive**: Optimizada para móvil y desktop
- **Blog Personal**: Artículos y experiencias
- **Información Profesional**: Contacto, prensa, booking

### 🔧 Para Ana (Panel Admin)
- **Subida de Fotos**: Upload directo a Cloudinary con organización automática
- **Gestión del Hero**: Selecciona las 5 fotos principales del carrusel
- **Trabajos Destacados**: Marca colecciones para mostrar en inicio
- **Galería Completa**: Vista y gestión de todas las fotos
- **Blog Management**: Crear, editar y publicar artículos
- **Control Total**: Administración completa desde una interfaz intuitiva

## 🚀 Configuración Rápida

### 1. Clonar e Instalar
```bash
git clone [url-del-repositorio]
cd ann_model
npm install
```

### 2. Configurar Variables de Entorno
Crea `.env.local` con:
```bash
# Base de datos
MONGODB_URI=tu-url-de-mongodb

# Cloudinary (para fotos)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret

# URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Inicializar Base de Datos
```bash
# Verificar sistema
node scripts/systemCheck.js

# Poblar con fotos de ejemplo
node scripts/checkAndPopulateDB.js

# Iniciar desarrollo
npm run dev
```

### 4. Acceder
- **Sitio**: http://localhost:3000
- **Admin**: http://localhost:3000/admin
- **Portfolio**: http://localhost:3000/portfolio

## 📱 Características Técnicas

### Frontend
- **Next.js 14**: Framework React con App Router
- **Tailwind CSS**: Diseño responsive y moderno
- **Framer Motion**: Animaciones fluidas y profesionales
- **Responsive Design**: Optimizado para todos los dispositivos

### Backend
- **MongoDB**: Base de datos NoSQL escalable
- **Cloudinary**: Gestión y optimización de imágenes
- **API Routes**: Endpoints RESTful para todas las operaciones

### Admin Panel
- **Upload Masivo**: Sube múltiples fotos simultáneamente
- **Organización Automática**: Agrupa fotos por nombre de trabajo
- **Gestión Visual**: Interfaz intuitiva con previsualización
- **Estados**: Control de visibilidad y featured status

## 🎨 Estructura del Portfolio

### Organización de Fotos
```
Hero Principal (5 fotos)
├── Rotan automáticamente cada 5 segundos
└── Seleccionables desde el admin

Trabajos Destacados (máximo 2)
├── Aparecen en "Trabajos Recientes"
└── Promocionan trabajos importantes

Portfolio Completo
├── Agrupado por workCollection
├── Categorías: Editorial, Fashion, Retrato, Comercial, Estudio, Lifestyle
└── Navegable por categorías
```

### Categorías Disponibles
- **Editorial**: Sesiones artísticas y editoriales
- **Fashion**: Moda y pasarela
- **Retrato**: Headshots y retratos profesionales
- **Comercial**: Trabajos publicitarios
- **Estudio**: Sesiones en estudio
- **Lifestyle**: Fotografía de estilo de vida

## 🛠️ Guías de Uso

### Para Ana - Subir Nuevo Trabajo
1. Ve al **Panel Admin** → **Subir Fotos**
2. Selecciona todas las fotos de la sesión
3. **Importante**: Usa el mismo "Nombre del trabajo" para todas
   - Ejemplo: `Editorial-Vogue-2024`
4. Asigna categoría y descripción
5. Las fotos se agrupan automáticamente en el portfolio

### Gestionar Hero Principal
1. **Hero Principal** → **Seleccionar Fotos para el Hero**
2. Haz clic en las fotos que quieres agregar
3. Máximo 5 fotos (las mejores que representen tu estilo)
4. Se muestran en el carrusel principal del sitio

### Destacar Trabajos
1. **Trabajos Destacados** → Busca la colección
2. Clic en "Destacar" (máximo 2 trabajos)
3. Aparecerán en "Trabajos Recientes" en la página principal

## 📂 Estructura del Proyecto

```
src/
├── app/                    # Páginas principales
│   ├── admin/             # Panel de administración
│   ├── portfolio/         # Galería de trabajos
│   ├── blog/              # Blog personal
│   └── api/               # Endpoints de API
├── components/            # Componentes reutilizables
│   ├── PhotoUpload.js     # Subida de fotos
│   ├── PhotoGallery.js    # Galería responsive
│   ├── EnhancedHero.js    # Hero con carrusel
│   └── Navbar.js          # Navegación principal
├── lib/                   # Configuración
│   └── mongodb.js         # Conexión a BD
└── models/                # Modelos de datos
    └── Photo.js           # Esquema de fotos
```

## 🔒 Seguridad y Rendimiento

- **Optimización de Imágenes**: Cloudinary maneja compresión automática
- **Responsive Images**: Carga adaptativa según dispositivo
- **Lazy Loading**: Carga progresiva para mejor rendimiento
- **SEO Optimizado**: Meta tags y estructura semántica
- **Accesibilidad**: Alt texts y navegación por teclado

## 🌐 Deployment

### Vercel (Recomendado)
```bash
npm run build
# Conectar repositorio con Vercel
# Configurar variables de entorno en Vercel dashboard
```

### Variables de Entorno en Producción
Configurar en el dashboard de hosting:
- `MONGODB_URI`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `NEXT_PUBLIC_BASE_URL`

## 📞 Soporte

### Archivos de Ayuda
- [`DATABASE-SETUP.md`](./DATABASE-SETUP.md) - Configuración completa de la base de datos
- [`IMPLEMENTATION-SUMMARY.md`](./IMPLEMENTATION-SUMMARY.md) - Resumen técnico del proyecto

### Scripts Útiles
```bash
node scripts/systemCheck.js        # Verificar configuración
node scripts/checkAndPopulateDB.js # Inicializar base de datos
npm run dev                        # Desarrollo
npm run build                      # Compilar para producción
```

### Troubleshooting
1. **Fotos no se suben**: Verifica configuración de Cloudinary
2. **Error de BD**: Comprueba `MONGODB_URI` y conexión
3. **Fotos no aparecen**: Verifica que tengan `status: active`

---

**Desarrollado para Ana Nicoleta de Pedro Sanchez**  
Portfolio profesional con gestión de contenido completa y diseño responsive moderno.
- **Transiciones suaves** con animaciones Framer Motion
- **Diseño responsive** adaptado a todos los dispositivos
- **Posicionamiento optimizado** para cada imagen

### 🎨 **Diseño Profesional**
- **Tipografía elegante** con Inter y Playfair Display
- **Paleta de colores sofisticada** en tonos tierra y negro
- **Animaciones fluidas** y microinteracciones
- **Layout limpio** enfocado en el contenido visual

### 🌐 **Multiidioma**
- **Español** e **Inglés**
- **Cambio dinámico** de idioma
- **Contenido localizado** para ambos mercados

### 📱 **Navegación Intuitiva**
- **Sidebar lateral** elegante y funcional
- **Menú móvil** optimizado para touch
- **Indicadores visuales** de sección activa
- **Scroll suave** entre secciones

---

## 🔐 Sistema de Administración

### 👩‍💼 **Panel de Control Profesional**
El sitio incluye un sistema completo de administración para que Ana Nicoleta y su agente puedan gestionar el contenido de forma autónoma.

#### 🚀 **Funcionalidades Admin:**

```
📸 SUBIDA DE FOTOS
├── 📤 Drag & drop intuitivo
├── 🏷️ Categorización automática
├── ✏️ Metadatos personalizables
├── 🖼️ Vista previa en tiempo real
└── 📁 Organización por proyectos

🛡️ AUTENTICACIÓN SEGURA
├── 🔑 Login protegido
├── 👤 Roles de usuario (Modelo/Agente)
├── 🔒 Sesiones persistentes
└── 🚪 Logout seguro

⚙️ CONFIGURACIÓN
├── 👤 Gestión de perfil
├── 🔐 Cambio de contraseñas
├── 📊 Dashboard de actividad
└── 🎛️ Configuraciones del sitio
```

#### 🔑 **Credenciales de Acceso:**
```bash
# Modelo Principal
Email: ana@nicoleta.com
Password: ana2024

# Agente
Email: agent@nicoleta.com  
Password: agent2024
```

---

## 🛠️ Tecnologías Utilizadas

<div align="center">

| Frontend | Desarrollo | Diseño | Deploy |
|----------|------------|--------|--------|
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white) | ![VS Code](https://img.shields.io/badge/VS_Code-0078D4?style=flat&logo=visual%20studio%20code&logoColor=white) | ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=figma&logoColor=white) | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) |
| ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) | ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) | ![Adobe](https://img.shields.io/badge/Adobe-FF0000?style=flat&logo=adobe&logoColor=white) | ![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white) |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) | | |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white) | ![npm](https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white) | | |

</div>

### 🔧 **Stack Técnico Detallado:**
```javascript
// Frontend Framework
Next.js 14 (App Router)
React 18 (Hooks & Context)

// Styling & Animations  
TailwindCSS (Utility-first)
Framer Motion (Smooth animations)

// Icons & Assets
Lucide React (Modern icons)
Next/Image (Optimized images)

// State Management
React Context (Auth & Language)
Local Storage (Persistence)

// Development
ESLint (Code quality)
Prettier (Code formatting)
```

---

## 🚀 Instalación y Desarrollo

### 📋 **Prerrequisitos**
```bash
Node.js >= 18.0.0
npm >= 9.0.0
Git
```

### ⚡ **Instalación Rápida**
```bash
# 1. Clonar el repositorio
git clone https://github.com/AlfonsoCifuentes/ann_model.git
cd ann_model

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en navegador
# http://localhost:3000
```

### 📁 **Estructura del Proyecto**
```
ann_model/
├── 📁 src/
│   ├── 📁 app/                 # App Router (Next.js 14)
│   │   ├── 📁 admin/          # Panel de administración
│   │   ├── 📁 about/          # Página sobre mí
│   │   ├── 📁 portfolio/      # Galería de trabajos
│   │   └── 📄 layout.js       # Layout principal
│   │
│   ├── 📁 components/         # Componentes reutilizables
│   │   ├── 📄 EnhancedHero.js # Hero principal
│   │   ├── 📄 LoginForm.js    # Sistema de login
│   │   ├── 📄 PhotoUpload.js  # Subida de fotos
│   │   └── 📄 Sidebar.js      # Navegación lateral
│   │
│   ├── 📁 contexts/           # Context API
│   │   ├── 📄 AuthContext.js  # Autenticación
│   │   └── 📄 LanguageContext.js # Multiidioma
│   │
│   └── 📁 styles/             # Estilos globales
│
├── 📁 public/                 # Assets públicos
│   ├── 📁 photos/            # Galería de fotos
│   └── 📁 icons/             # Iconos y favicons
│
└── 📁 content/                # Contenido estático
    ├── 📁 portfolio/         # Descripciones de trabajos
    └── 📁 press/             # Notas de prensa
```

---

## 🎯 Funcionalidades por Sección

### 🏠 **Página Principal**
- ✅ Hero dinámico con 5 fotos rotativas
- ✅ Información profesional destacada
- ✅ Call-to-actions estratégicos
- ✅ Scroll indicators elegantes

### 👤 **Sobre Mí**
- ✅ Biografía profesional
- ✅ Experiencia y logros
- ✅ Información de contacto
- ✅ Timeline de carrera

### 📸 **Portfolio**
- ✅ Galería por categorías
- ✅ Lightbox profesional
- ✅ Filtros dinámicos
- ✅ Metadatos de proyectos

### 📞 **Contacto**
- ✅ Formulario de contacto
- ✅ Información de representación
- ✅ Redes sociales
- ✅ Disponibilidad geográfica

---

## 🌐 SEO y Performance

### 📈 **Optimizaciones Implementadas**
```bash
✅ Meta tags dinámicos
✅ Open Graph completo
✅ Structured data (JSON-LD)
✅ Sitemap automático
✅ Robots.txt optimizado
✅ Image optimization (Next/Image)
✅ Lazy loading automático
✅ Core Web Vitals optimized
```

### 🎯 **Métricas Objetivo**
- **Performance:** 95+ (Lighthouse)
- **SEO:** 100 (Lighthouse)  
- **Accessibility:** 95+ (Lighthouse)
- **Best Practices:** 100 (Lighthouse)

---

## 🚀 Deploy y Producción

### 🌐 **Vercel (Recomendado)**
```bash
# Deploy automático desde GitHub
1. Conectar repositorio con Vercel
2. Configurar variables de entorno
3. Deploy automático en cada push
```

### ⚙️ **Variables de Entorno**
```env
# Opcional: Analytics
NEXT_PUBLIC_ANALYTICS_DOMAIN=tu-dominio.com

# Opcional: Configuraciones adicionales  
NEXT_PUBLIC_CONTACT_EMAIL=contact@ananicoleta.com
```

---

## 👨‍💻 Contribución

### 🤝 **¿Cómo Contribuir?**
1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Abre** un Pull Request

### 📝 **Estándares de Código**
- ✅ Usar ESLint y Prettier
- ✅ Comentarios en español
- ✅ Componentes funcionales con hooks
- ✅ Props destructuring
- ✅ Nombres descriptivos

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT** - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

---

## 📞 Contacto

<div align="center">

**Ana Nicoleta** - Modelo y Actriz Profesional

[![Email](https://img.shields.io/badge/Email-contact@ananicoleta.com-red?style=for-the-badge&logo=gmail)](mailto:contact@ananicoleta.com)
[![Instagram](https://img.shields.io/badge/Instagram-@ana__nicoleta-purple?style=for-the-badge&logo=instagram)](https://instagram.com/ann__siedad.7)
[![Portfolio](https://img.shields.io/badge/Portfolio-ananicoleta.com-orange?style=for-the-badge&logo=safari)](https://ana-nicoleta.vercel.app)

---

**Desarrollado con ❤️ por [Alfonso Cifuentes](https://github.com/AlfonsoCifuentes)**

⭐ **¡No olvides dar una estrella si te gusta el proyecto!** ⭐

</div>

