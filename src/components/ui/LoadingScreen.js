'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState(0)

  const loadingTexts = [
    'Cargando elegancia...',
    'Preparando portafolio...',
    'Montando el escenario...',
    'Casi listo...'
  ]

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => setIsLoading(false), 800)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)

    // Change loading text
    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length)
    }, 1000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: 'blur(10px)'
          }}
          transition={{ 
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="fixed inset-0 z-[9999] bg-fashion-bg flex items-center justify-center"
        >
          <div className="text-center">
            
            {/* Logo/Brand */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="mb-12"
            >
              <h1 className="font-inter text-4xl md:text-5xl font-light tracking-widest text-fashion-fg">
                ANA<span className="font-bold">NICOLETA</span>
              </h1>
              <p 
                className="font-inter text-sm font-thin text-fashion-fg-muted uppercase text-center mt-1"
                style={{ 
                  letterSpacing: '0.3em',
                  transform: 'scaleX(1.05)'
                }}
              >
                DE PEDRO SANCHEZ
              </p>
              <p className="font-inter text-sm font-light tracking-wider mt-2 text-fashion-fg-muted uppercase">
                Model & Actress
              </p>
              <div className="w-32 h-px bg-fashion-border mx-auto mt-4" />
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '200px', opacity: 1 }}
              transition={{ 
                duration: 0.6,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative h-px bg-fashion-border mx-auto mb-8"
            >
              <motion.div
                className="absolute top-0 left-0 h-full bg-fashion-rose"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut'
                }}
              />
            </motion.div>

            {/* Loading Text */}
            <motion.div
              className="h-6 font-inter font-light text-sm text-fashion-fg-muted tracking-wider"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentText}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {loadingTexts[currentText]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Progress Percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 font-inter font-light text-xs text-fashion-fg-subtle tracking-wider"
            >
              {Math.round(progress)}%
            </motion.div>

            {/* Animated Dots */}
            <div className="flex justify-center mt-8 space-x-1">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-fashion-border rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                />
              ))}
            </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Alternative minimal loader
export function MinimalLoader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <div className="relative">
        {/* Spinning border */}
        <div className="w-16 h-16 border-2 border-gray-200 rounded-full">
          <div className="absolute inset-0 border-2 border-black border-t-transparent rounded-full animate-spin" />
        </div>
        
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}

// Page-specific loader with image preloading
export function ImageLoader({ images = [], onComplete }) {
  const [loadedImages, setLoadedImages] = useState(0)
  const totalImages = images.length

  useEffect(() => {
    if (totalImages === 0) {
      onComplete && onComplete()
      return
    }

    let loaded = 0
    
    images.forEach((src) => {
      const img = new Image()
      img.onload = () => {
        loaded++
        setLoadedImages(loaded)
        if (loaded === totalImages) {
          setTimeout(() => onComplete && onComplete(), 500)
        }
      }
      img.onerror = () => {
        loaded++
        setLoadedImages(loaded)
        if (loaded === totalImages) {
          setTimeout(() => onComplete && onComplete(), 500)
        }
      }
      img.src = src
    })
  }, [images, totalImages, onComplete])

  const progress = totalImages > 0 ? (loadedImages / totalImages) * 100 : 100

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="font-inter font-light text-2xl mb-4 text-gray-900 tracking-wider">
          Cargando Imágenes
        </div>
        
        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-black"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
        
        <div className="font-inter font-light text-sm text-gray-500 mt-2 tracking-wider">
          {loadedImages} / {totalImages}
        </div>
      </div>
    </div>
  )
}
