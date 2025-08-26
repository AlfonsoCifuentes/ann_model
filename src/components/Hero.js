'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import OptimizedImage from './OptimizedImage'

// Función para calcular la edad
const calculateAge = (birthDate) => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

// Componente de partícula flotante elegante
const FashionParticle = ({ delay = 0, size = 'small', position }) => {
  const sizeClasses = {
    small: 'w-1 h-1',
    medium: 'w-2 h-2',
    large: 'w-3 h-3'
  }
  
  return (
    <motion.div
      className={`absolute ${sizeClasses[size]} bg-fashion-rose/20 rounded-full`}
      style={{
        left: `${position.left}%`,
        top: `${position.top}%`
      }}
      animate={{
        x: [0, 60, 120, 80, 0],
        y: [0, -40, -80, -120, -160],
        opacity: [0, 0.3, 0.6, 0.3, 0],
        scale: [0.5, 1, 1.2, 0.8, 0.5]
      }}
      transition={{
        duration: 12,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

// Componente de brillo sutil
const SubtleGlow = ({ className = "", color = "rose" }) => {
  const glowColors = {
    rose: 'bg-fashion-rose/10',
    gold: 'bg-fashion-gold/10',
    champagne: 'bg-fashion-champagne/10'
  }
  
  return (
    <motion.div
      className={`absolute ${glowColors[color]} rounded-full blur-3xl ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentAge, setCurrentAge] = useState(calculateAge('2001-11-01'))
  const [isMounted, setIsMounted] = useState(false)

  // Posiciones fijas para las partículas para evitar hydration mismatch
  const particlePositions = [
    { left: 10, top: 20 }, { left: 85, top: 15 }, { left: 30, top: 80 },
    { left: 70, top: 60 }, { left: 15, top: 75 }, { left: 90, top: 85 },
    { left: 45, top: 25 }, { left: 75, top: 35 }, { left: 25, top: 90 },
    { left: 60, top: 10 }, { left: 20, top: 45 }, { left: 80, top: 70 },
    { left: 35, top: 55 }, { left: 65, top: 80 }, { left: 50, top: 65 },
    { left: 5, top: 30 }, { left: 95, top: 40 }, { left: 40, top: 5 },
    { left: 55, top: 95 }, { left: 12, top: 50 }, { left: 88, top: 25 },
    { left: 42, top: 75 }, { left: 72, top: 45 }, { left: 28, top: 35 },
    { left: 58, top: 85 }
  ]
  
  const modelDescriptions = [
    "Elegancia Natural",
    "Versatilidad Única", 
    "Presencia Cautivadora",
    "Estilo Refinado"
  ]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % modelDescriptions.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [modelDescriptions.length])

  useEffect(() => {
    // Actualizar edad cada día
    const updateAge = () => {
      setCurrentAge(calculateAge('2001-11-01'))
    }
    
    const interval = setInterval(updateAge, 24 * 60 * 60 * 1000) // Cada 24 horas
    updateAge() // Ejecutar inmediatamente
    
    return () => clearInterval(interval)
  }, [])

  if (!isMounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-fashion-bg via-fashion-bg-secondary to-fashion-bg-tertiary" />
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-8 py-20">
          <div className="text-center lg:text-left">
            <div className="animate-pulse">
              <div className="h-20 bg-fashion-rose/20 rounded mb-6"></div>
              <div className="h-6 bg-fashion-platinum/20 rounded mb-4"></div>
              <div className="h-8 bg-fashion-gold/20 rounded mb-8"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo elegante con gradientes de moda */}
      <div className="absolute inset-0 bg-gradient-to-br from-fashion-bg via-fashion-bg-secondary to-fashion-bg-tertiary" />
      
      {/* Sistema de partículas elegante */}
      <div className="absolute inset-0">
        {particlePositions.map((position, i) => (
          <FashionParticle 
            key={i}
            delay={i * 0.5} 
            size={i % 3 === 0 ? 'large' : i % 2 === 0 ? 'medium' : 'small'}
            position={position}
          />
        ))}
      </div>

      {/* Efectos de iluminación ambiental */}
      <SubtleGlow className="top-1/4 left-1/4 w-96 h-96" color="rose" />
      <SubtleGlow className="bottom-1/3 right-1/4 w-80 h-80" color="gold" />
      <SubtleGlow className="top-1/2 right-1/3 w-72 h-72" color="champagne" />

      {/* Contenedor principal con estilo luxury */}
      <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-8 py-20">
        {/* Contenido de texto */}
        <motion.div 
          className="text-center lg:text-left"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className="text-luxury-hero mb-6">
            Ana Nicoleta
            <br />
            <span className="text-luxury-elegant">de Pedro Sanchez</span>
          </h1>
          
          <motion.p 
            className="text-luxury-subtitle mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Modelo Profesional • {currentAge} años • Madrid
          </motion.p>
          
          <div className="text-luxury-elegant mb-8">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentTextIndex}
                className="block text-luxury-glow"
                initial={{ opacity: 0, y: 30, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -30, rotateX: -45 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {modelDescriptions[currentTextIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.p 
            className="text-luxury-body mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          >
            Modelo profesional con origen rumano, especializada en moda contemporánea y sesiones fotográficas de alta calidad. 
            Experiencia en pasarelas, campañas publicitarias y fotografía editorial.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          >
            <button className="btn-fashion btn-fashion-primary group">
              <span className="relative z-10">Ver Portfolio</span>
            </button>
            
            <button className="btn-fashion btn-fashion-secondary group">
              <span className="relative z-10">Contactar</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Imagen featured de Ana Nicoleta */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        >
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-2xl bg-gradient-to-br from-black/80 via-fashion-bg/90 to-fashion-mauve/20 border border-fashion-gold/30 backdrop-blur-xl">
            <OptimizedImage
              src="/photos/SVM05701.jpg"
              alt="Ana Nicoleta - Professional Model"
              className="w-full h-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
              objectFit="cover"
              priority={true}
              quality={85}
            />
          </div>
          
          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="luxury-card text-center p-4">
              <h3 className="text-fashion-gold text-sm font-semibold uppercase tracking-wider mb-1">Altura</h3>
              <p className="text-luxury-body text-xl font-light">1,65m</p>
            </div>
            
            <div className="luxury-card text-center p-4">
              <h3 className="text-fashion-gold text-sm font-semibold uppercase tracking-wider mb-1">Ojos</h3>
              <p className="text-luxury-body text-xl font-light">Verdes</p>
            </div>
            
            <div className="luxury-card text-center p-4">
              <h3 className="text-fashion-gold text-sm font-semibold uppercase tracking-wider mb-1">Cabello</h3>
              <p className="text-luxury-body text-xl font-light">Roble</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Indicador de scroll elegante */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-12 border-2 border-fashion-rose/50 rounded-full flex justify-center relative">
          <motion.div 
            className="w-1 h-4 bg-fashion-rose rounded-full mt-2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
