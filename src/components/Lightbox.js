'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Download, Share2 } from 'lucide-react'

export default function Lightbox({ images, isOpen, onClose, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          goToPrevious()
          break
        case 'ArrowRight':
          goToNext()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, currentIndex])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const currentImage = images[currentIndex]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-20 p-6">
            <div className="flex justify-between items-center text-white">
              <div className="font-inter">
                <h3 className="text-lg font-medium">{currentImage?.title}</h3>
                <p className="text-sm opacity-80">{currentImage?.photographer}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm opacity-80">
                  {currentIndex + 1} / {images.length}
                </span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    // Función para compartir
                  }}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Share2 size={20} />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    // Función para descargar
                  }}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Download size={20} />
                </button>
                
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <ChevronLeft size={32} />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          {/* Main Image */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-[90vw] max-h-[80vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentImage?.src}
              alt={currentImage?.title || 'Portfolio Image'}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </motion.div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
              <div className="flex gap-2 bg-black/50 backdrop-blur-sm rounded-lg p-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentIndex(index)
                    }}
                    className={`relative w-16 h-16 rounded overflow-hidden transition-opacity ${
                      index === currentIndex ? 'opacity-100 ring-2 ring-white' : 'opacity-60 hover:opacity-80'
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Touch/Swipe gestures for mobile */}
          <div
            className="absolute inset-0 z-10"
            onTouchStart={(e) => {
              const touch = e.touches[0]
              e.currentTarget.touchStartX = touch.clientX
            }}
            onTouchEnd={(e) => {
              if (!e.currentTarget.touchStartX) return
              
              const touch = e.changedTouches[0]
              const deltaX = touch.clientX - e.currentTarget.touchStartX
              const threshold = 50

              if (deltaX > threshold) {
                goToPrevious()
              } else if (deltaX < -threshold) {
                goToNext()
              }
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
