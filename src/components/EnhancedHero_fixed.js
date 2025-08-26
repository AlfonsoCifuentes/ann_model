'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, ChevronDown } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const heroImages = [
  '/photos/SVM05701.jpg',
  '/photos/SVM05720.jpg',
  '/photos/SVM05728.jpg',
  '/photos/SVM05734.jpg',
  '/photos/SVM05741.jpg'
]

export default function EnhancedHero({ collections = [] }) {
  console.log('🎭 EnhancedHero renderizando con collections:', collections.length)
  
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVideoMode, setIsVideoMode] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Slideshow automático
  useEffect(() => {
    if (!isVideoMode) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isVideoMode])

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
      scale: 1,
      transition: { duration: 1.2, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: { duration: 0.8 }
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      
      {/* Background Images */}
      <div className="absolute inset-0 transform scale-110 translate-x-[5%]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImageIndex]}
              alt="Ana Nicoleta - Professional Portfolio"
              fill
              className="object-cover object-top"
              priority
              quality={95}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 via-transparent to-black/60" />
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="text-left text-white"
          >
          
            {/* Título */}
            <motion.div 
              variants={itemVariants}
              className="mb-6 inline-block"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-widest mb-2 text-white">
                ANA<span className="font-bold">NICOLETA</span>
              </h1>
              
              <p 
                className="font-sans text-base md:text-xl lg:text-2xl font-thin text-white/80 uppercase text-center"
                style={{ 
                  letterSpacing: '0.2em',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                DE PEDRO SANCHEZ
              </p>
            </motion.div>

            {/* Subtítulo */}
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 mb-4">
                MODELO Y ACTRIZ PROFESIONAL
              </h2>
              <p className="text-base md:text-lg text-white/70 max-w-2xl leading-relaxed">
                Aportando elegancia, sofisticación y versatilidad a proyectos
                editoriales, de moda y comerciales en todo el mundo
              </p>
            </motion.div>

            {/* Botones */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                  CONTÁCTAME
                </motion.button>
              </Link>
              
              <Link href="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  VIEW PORTFOLIO
                </motion.button>
              </Link>
            </motion.div>

            {/* Control de Video/Reel */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-4 mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVideoMode(!isVideoMode)}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                {isVideoMode ? <Pause size={16} /> : <Play size={16} />}
                <span className="text-sm font-light tracking-wider uppercase">REEL</span>
              </motion.button>
              
              {/* Indicadores de imagen */}
              <div className="flex gap-2">
                {heroImages.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              variants={itemVariants}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/60"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center"
              >
                <span className="text-xs font-light tracking-widest uppercase mb-2">Scroll</span>
                <ChevronDown size={20} className="opacity-60" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Photographer Credits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 right-8 text-white/60"
      >
        <p className="font-inter text-xs font-light tracking-widest uppercase">
          PH: Marc Stevens
        </p>
      </motion.div>
    </section>
  )
}
