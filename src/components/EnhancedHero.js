'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function EnhancedHero() {
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [heroImages, setHeroImages] = useState([])
  const [loading, setLoading] = useState(true)

  // Cargar imágenes del hero desde la base de datos
  useEffect(() => {
    fetchHeroImages()
  }, [])

  const fetchHeroImages = async () => {
    try {
      const response = await fetch('/api/photos?isHero=true&status=active&limit=5')
      const result = await response.json()
      
      if (result.success && result.data.length > 0) {
        const imageUrls = result.data.map(photo => photo.url || photo.imageUrl)
        setHeroImages(imageUrls)
      } else {
        // Fallback a imágenes por defecto si no hay imágenes en la BD
        setHeroImages([
          '/photos/SVM05701.jpg',
          '/photos/SVM05720.jpg',
          '/photos/SVM05728.jpg',
          '/photos/SVM05734.jpg',
          '/photos/SVM05741.jpg'
        ])
      }
    } catch (error) {
      console.error('Error fetching hero images:', error)
      // Fallback en caso de error
      setHeroImages([
        '/photos/SVM05701.jpg',
        '/photos/SVM05720.jpg',
        '/photos/SVM05728.jpg',
        '/photos/SVM05734.jpg',
        '/photos/SVM05741.jpg'
      ])
    } finally {
      setLoading(false)
    }
  }

  // Slideshow automático
  useEffect(() => {
    if (heroImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [heroImages.length])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: { duration: 0.8 }
    }
  }

  if (loading) {
    return (
      <div className="relative min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Cargando...</div>
      </div>
    )
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      
      {/* Background Images */}
      <div className="absolute inset-0 transform scale-110 translate-x-[5%]">
        <AnimatePresence mode="popLayout">
          {heroImages.length > 0 && (
            <motion.div
              key={currentImageIndex}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                src={heroImages[currentImageIndex]}
                alt="Ana Nicoleta - Professional Portfolio"
                fill
                className={`object-cover ${
                  currentImageIndex === heroImages.length - 1 ? 'object-center' : 
                  currentImageIndex === 3 ? 'object-[center_25%]' : 
                  'object-top'
                }`}
                priority
                quality={95}
                sizes="100vw"
              />
              {/* Overlay para mejorar contraste - Reducido */}
              <div className="absolute inset-0 bg-black/15" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Overlay gradiente mejorado para legibilidad - Reducido */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-transparent portrait:bg-gradient-to-b portrait:from-black/30 portrait:via-black/20 portrait:to-black/30" />
        
        {/* Overlay adicional en el área del texto - Reducido */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/25 via-transparent to-black/30 portrait:from-black/20 portrait:via-black/10 portrait:to-black/25" />
      </div>

      {/* Contenido Principal - Centrado en móvil, izquierda en desktop */}
      <div className="relative z-10 min-h-screen flex items-center justify-center portrait:justify-center landscape:md:justify-start">
        <div className="w-full max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="text-center portrait:text-center landscape:md:text-left text-white w-full portrait:flex portrait:flex-col portrait:items-center landscape:md:block"
          >
          
            {/* Título y Apellidos en el mismo contenedor para mismo ancho */}
            <motion.div 
              variants={itemVariants}
              className="mb-6 inline-block portrait:mx-auto landscape:md:mx-0 portrait:text-center landscape:md:text-left"
            >
              {/* Título Principal */}
              <h1 className="font-inter text-4xl md:text-6xl lg:text-7xl font-light tracking-widest mb-2 text-white">
                ANA<span className="font-inter font-bold">NICOLETA</span>
              </h1>
              
              {/* Apellidos - centrados debajo del título */}
              <p 
                className="font-inter text-base md:text-xl lg:text-2xl font-thin text-white/80 uppercase text-center"
                style={{ 
                  letterSpacing: '0.65em',
                  transform: 'scaleX(1.05)'
                }}
              >
                DE PEDRO SANCHEZ
              </p>
            </motion.div>
            
            {/* Subtítulo - Alineado con el título */}
            <motion.p 
              variants={itemVariants}
              className="font-inter text-lg md:text-xl font-light tracking-wider mb-4 text-white/90 uppercase"
            >
              {t('heroSubtitle')}
            </motion.p>
            
            {/* Descripción - Centrada en móvil, limitada al ancho en desktop */}
            <motion.p 
              variants={itemVariants}
              className="font-inter text-base md:text-lg font-light max-w-lg mb-12 text-white/80 leading-relaxed tracking-wide portrait:mx-auto landscape:md:mx-0"
            >
              {t('heroDescription')}
            </motion.p>
            
            {/* Botones CTA - Centrados en móvil, alineados en desktop */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-16 portrait:justify-center portrait:items-center landscape:md:justify-start landscape:md:items-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="btn-fashion btn-fashion-dark font-inter"
                >
                  Contáctame
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/portfolio"
                  className="btn-fashion btn-fashion-primary font-inter"
                >
                  Ver Portfolio
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Controles de Fotos - Centrados en móvil, alineados en desktop */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-4 mb-8 portrait:justify-center landscape:md:justify-start"
            >
              <div className="flex gap-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentImageIndex === index ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
            
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <span className="font-inter text-xs font-light tracking-widest mb-2 opacity-80 uppercase">Scroll</span>
          <ChevronDown size={20} className="opacity-60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
