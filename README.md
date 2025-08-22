# 🌟 Ana Nicoleta - Portfolio Profesional

<div align="center">

![Ana Nicoleta](https://img.shields.io/badge/Modelo-Profesional-orange?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

*Portfolio digital elegante y sofisticado para modelo y actriz profesional*

[🌐 Ver Demo](https://ana-nicoleta.vercel.app) • [📸 Portfolio](#características) • [👩‍💼 Admin](#sistema-de-administración)

</div>

---

## 📖 Descripción

**Ana Nicoleta Portfolio** es una plataforma web premium diseñada específicamente para mostrar el trabajo profesional de una modelo y actriz internacional. Con un diseño minimalista y elegante, el sitio combina funcionalidad avanzada con una estética sofisticada que refleja la calidad del trabajo artístico.

### 🎯 Objetivo
Crear una presencia digital profesional que destaque la versatilidad y elegancia de Ana Nicoleta en proyectos editoriales, comerciales, pasarela y actuación.

---

## ✨ Características Principales

### 🖼️ **Galería Visual Impactante**
- **Hero dinámico** con slideshow automático de 5 fotos profesionales
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

