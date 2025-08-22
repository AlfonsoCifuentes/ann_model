'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

// Traducciones
const translations = {
  es: {
    // Navigation
    home: 'Inicio',
    about: 'Acerca de',
    portfolio: 'Portafolio',
    contact: 'Contacto',
    prints: 'Impresiones',
    blog: 'Blog',
    
    // Common
    loading: 'Cargando...',
    viewMore: 'Ver más',
    contactMe: 'Contáctame',
    backToTop: 'Volver arriba',
    
    // Home
    heroTitle: 'Ana Nicoleta',
    heroSubtitle: 'Modelo y Actriz Profesional',
    heroDescription: 'Aportando elegancia, sofisticación y versatilidad a proyectos editoriales, de moda y comerciales en todo el mundo',
    photographerCredit: 'FOT: Marc Stevens',
    
    // About
    aboutTitle: 'Acerca de',
    aboutDescription: 'Soy Ana Nicoleta, modelo y actriz profesional con pasión por el arte, la moda y la expresión creativa.',
    professionalDetails: 'Detalles Profesionales',
    experience: 'Experiencia',
    location: 'Ubicación',
    height: 'Altura',
    eyes: 'Ojos',
    hair: 'Cabello',
    shoe: 'Calzado',
    green: 'Verdes',
    darkBrown: 'Castaño Oscuro',
    editorialPhotography: 'Fotografía Editorial',
    runwayShows: 'Desfiles de Moda',
    commercialCampaigns: 'Campañas Comerciales',
    actingProjects: 'Proyectos de Actuación',
    internationalWork: 'Trabajo Internacional',
    basedInSpain: 'Con base en España',
    availableWorldwide: 'Disponible mundialmente',
    fluentLanguages: 'Fluido en Español e Inglés',
    recentWork: 'Trabajo Reciente',
    viewFullPortfolio: 'Ver Portafolio Completo',
    yearsExperience: 'Años de Experiencia',
    photoshoots: 'Sesiones Fotográficas',
    collaborations: 'Colaboraciones',
    countries: 'Países',
    
    // Portfolio
    portfolioTitle: 'Portafolio',
    portfolioDescription: 'Una colección completa de mi trabajo en fotografía editorial, moda, comercial y sesiones de retratos artísticos.',
    editorial: 'Editorial',
    editorialDescription: 'Fotografía editorial de alta moda para revistas y publicaciones',
    fashion: 'Moda',
    fashionDescription: 'Fotografía comercial de moda y campañas de lifestyle',
    portrait: 'Retrato',
    portraitDescription: 'Fotografía personal y artística de retratos',
    browseComplete: 'Explora mi colección completa de portafolio',
    discussProject: 'Discutir Proyecto',
    
    // Contact
    contactTitle: 'Contacto',
    contactDescription: 'Ponte en contacto conmigo para oportunidades de colaboración, proyectos de modelaje o consultas profesionales.',
    getInTouch: 'Ponte en Contacto',
    name: 'Nombre',
    email: 'Email',
    subject: 'Asunto',
    message: 'Mensaje',
    sendMessage: 'Enviar Mensaje',
    services: 'Servicios',
    modelingServices: 'Servicios de Modelaje',
    editorialWork: 'Trabajo Editorial',
    fashionCampaigns: 'Campañas de Moda',
    commercialProjects: 'Proyectos Comerciales',
    portraitSessions: 'Sesiones de Retrato',
    
    // Prints
    printsTitle: 'Impresiones',
    printsDescription: 'Impresiones de alta calidad y edición limitada de mis sesiones fotográficas profesionales.',
    editorialCollection: 'Colección Editorial',
    editorialCollectionDesc: 'Impresiones de edición limitada de sesiones editoriales profesionales',
    fashionSeries: 'Serie de Moda',
    fashionSeriesDesc: 'Selección curada de impresiones de fotografía de moda',
    portraitCollection: 'Colección de Retratos',
    portraitCollectionDesc: 'Fotografía íntima y artística de retratos',
    fromPrice: 'Desde',
    viewCollection: 'Ver Colección',
    printInformation: 'Información de Impresiones',
    qualityMaterials: 'Calidad y Materiales',
    sizingPricing: 'Tamaños y Precios',
    museumQuality: '• Papel de archivo de calidad museo',
    professionalInks: '• Tintas pigmentadas profesionales',
    acidFree: '• Materiales libres de ácido y lignina',
    uvResistant: '• Recubrimiento resistente a UV',
    handSigned: '• Firmado y numerado a mano',
    inquireAboutPrints: 'Consultar sobre Impresiones',
    
    // Blog
    blogTitle: 'Blog',
    blogDescription: 'Perspectivas detrás de escena, consejos de modelaje y reflexiones personales de mi trayectoria en la industria de la moda.',
    featuredPost: 'Artículo Destacado',
    readMore: 'Leer Más',
    stayUpdated: 'Mantente Actualizado',
    newsletterDescription: 'Suscríbete para recibir actualizaciones sobre nuevos artículos del blog, próximos proyectos y contenido tras bambalinas.',
    enterEmail: 'Ingresa tu email',
    subscribe: 'Suscribirse',
    
    // 404
    pageNotFound: 'Página No Encontrada',
    pageNotFoundDesc: 'La página que buscas no existe o ha sido movida.',
    returnHome: 'Volver al Inicio',
    
    // Footer
    followMe: 'Sígueme',
    copyright: '© 2024 Ana Nicoleta. Todos los derechos reservados.',
    
    // Additional
    viewPrints: 'Ver Impresiones',
    discussProject: 'Discutir Proyecto',
    allWork: 'Todo el Trabajo',
    quickLinks: 'Enlaces Rápidos',
    
    // Language Toggle
    language: 'Idioma',
    spanish: 'Español',
    english: 'English'
  },
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    portfolio: 'Portfolio',
    contact: 'Contact',
    prints: 'Prints',
    blog: 'Blog',
    
    // Common
    loading: 'Loading...',
    viewMore: 'View More',
    contactMe: 'Contact Me',
    backToTop: 'Back to Top',
    
    // Home
    heroTitle: 'Ana Nicoleta',
    heroSubtitle: 'Professional Model & Actress',
    heroDescription: 'Bringing elegance, sophistication and versatility to editorial, fashion and commercial projects worldwide',
    photographerCredit: 'PH: Marc Stevens',
    
    // About
    aboutTitle: 'About',
    aboutDescription: 'I am Ana Nicoleta, a professional model and actress with a passion for art, fashion, and creative expression.',
    professionalDetails: 'Professional Details',
    experience: 'Experience',
    location: 'Location',
    height: 'Height',
    eyes: 'Eyes',
    hair: 'Hair',
    shoe: 'Shoe',
    green: 'Green',
    darkBrown: 'Dark Brown',
    editorialPhotography: 'Editorial Photography',
    runwayShows: 'Runway Shows',
    commercialCampaigns: 'Commercial Campaigns',
    actingProjects: 'Acting Projects',
    internationalWork: 'International Work',
    basedInSpain: 'Based in Spain',
    availableWorldwide: 'Available worldwide',
    fluentLanguages: 'Fluent in Spanish & English',
    recentWork: 'Recent Work',
    viewFullPortfolio: 'View Full Portfolio',
    yearsExperience: 'Years Experience',
    photoshoots: 'Photoshoots',
    collaborations: 'Collaborations',
    countries: 'Countries',
    
    // Portfolio
    portfolioTitle: 'Portfolio',
    portfolioDescription: 'A comprehensive collection of my work across editorial, fashion, commercial photography, and artistic portrait sessions.',
    editorial: 'Editorial',
    editorialDescription: 'High fashion editorial photography for magazines and publications',
    fashion: 'Fashion',
    fashionDescription: 'Commercial fashion photography and lifestyle campaigns',
    portrait: 'Portrait',
    portraitDescription: 'Personal and artistic portrait photography',
    browseComplete: 'Browse through my complete portfolio collection',
    discussProject: 'Discuss Project',
    
    // Contact
    contactTitle: 'Contact',
    contactDescription: 'Get in touch with me for collaboration opportunities, modeling projects, or professional inquiries.',
    getInTouch: 'Get in Touch',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    sendMessage: 'Send Message',
    services: 'Services',
    modelingServices: 'Modeling Services',
    editorialWork: 'Editorial Work',
    fashionCampaigns: 'Fashion Campaigns',
    commercialProjects: 'Commercial Projects',
    portraitSessions: 'Portrait Sessions',
    
    // Prints
    printsTitle: 'Prints',
    printsDescription: 'High-quality, limited edition prints from my professional photography sessions.',
    editorialCollection: 'Editorial Collection',
    editorialCollectionDesc: 'Limited edition prints from professional editorial shoots',
    fashionSeries: 'Fashion Series',
    fashionSeriesDesc: 'Curated selection of fashion photography prints',
    portraitCollection: 'Portrait Collection',
    portraitCollectionDesc: 'Intimate and artistic portrait photography',
    fromPrice: 'From',
    viewCollection: 'View Collection',
    printInformation: 'Print Information',
    qualityMaterials: 'Quality & Materials',
    sizingPricing: 'Sizes & Pricing',
    museumQuality: '• Museum-quality archival paper',
    professionalInks: '• Professional pigment inks',
    acidFree: '• Acid-free and lignin-free materials',
    uvResistant: '• UV-resistant coating',
    handSigned: '• Hand-signed and numbered',
    inquireAboutPrints: 'Inquire About Prints',
    
    // Blog
    blogTitle: 'Blog',
    blogDescription: 'Behind the scenes insights, modeling tips, and personal reflections from my journey in the fashion industry.',
    featuredPost: 'Featured Post',
    readMore: 'Read More',
    stayUpdated: 'Stay Updated',
    newsletterDescription: 'Subscribe to receive updates about new blog posts, upcoming projects, and behind-the-scenes content.',
    enterEmail: 'Enter your email',
    subscribe: 'Subscribe',
    
    // 404
    pageNotFound: 'Page Not Found',
    pageNotFoundDesc: 'The page you\'re looking for doesn\'t exist or has been moved.',
    returnHome: 'Return Home',
    
    // Footer
    followMe: 'Follow Me',
    copyright: '© 2024 Ana Nicoleta. All rights reserved.',
    
    // Additional
    viewPrints: 'View Prints',
    discussProject: 'Discuss Project',
    allWork: 'All Work',
    quickLinks: 'Quick Links',
    
    // Language Toggle
    language: 'Language',
    spanish: 'Español',
    english: 'English'
  }
}

// Context
const LanguageContext = createContext()

// Hook para usar el contexto
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Provider
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es') // Español por defecto
  
  useEffect(() => {
    // Cargar idioma guardado en localStorage
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage && ['es', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])
  
  const toggleLanguage = () => {
    const newLanguage = language === 'es' ? 'en' : 'es'
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }
  
  const t = (key) => {
    return translations[language][key] || key
  }
  
  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    translations: translations[language]
  }
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
