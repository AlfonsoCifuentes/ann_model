'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Componente de partícula individual
const Particle = ({ index }) => {
  const randomX = Math.random() * 100
  const randomY = Math.random() * 100
  const randomDelay = Math.random() * 2
  const randomDuration = 3 + Math.random() * 4
  const randomSize = 4 + Math.random() * 12 // Aumenté el tamaño: antes era 2-8, ahora 4-16

  return (
    <motion.div
      className="absolute rounded-full opacity-0"
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
        width: `${randomSize}px`,
        height: `${randomSize}px`,
        background: `radial-gradient(circle, rgba(255,165,0,0.9) 0%, rgba(255,140,0,0.7) 50%, rgba(255,69,0,0.5) 100%)`,
        boxShadow: `0 0 ${randomSize * 3}px rgba(255,165,0,0.6), 0 0 ${randomSize * 6}px rgba(255,140,0,0.4)`,
      }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0.5, 1.2, 0.8, 1],
        y: [0, -20, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

// Componente de texto animado
const AnimatedText = () => {
  return (
    <div className="text-center space-y-4">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-white mb-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        ANA NICOLETA
      </motion.h1>
      
      <motion.p
        className="text-xl md:text-2xl text-white/80 font-light tracking-wider"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        MODEL PORTFOLIO
      </motion.p>
      
      <motion.div
        className="flex justify-center space-x-2 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-white rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

const LoadingScreen = ({ isLoading }) => {
  console.log('LoadingScreen rendered with isLoading:', isLoading) // Debug
  
  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1, ease: "easeInOut" }
          }}
        >
          {/* Partículas de fondo */}
          <div className="absolute inset-0">
            {Array.from({ length: 120 }, (_, i) => (
              <Particle key={i} index={i} />
            ))}
          </div>
          
          {/* Efecto de ondas de luz */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(255,140,0,0.2) 0%, transparent 50%)`
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Contenido principal */}
          <div className="relative z-10">
            <AnimatedText />
          </div>
          
          {/* Efecto de brillo adicional */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
