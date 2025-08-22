'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FadeInUp } from '../animations/MicroAnimations'

export default function PremiumGallery({ 
  images = [], 
  columns = 3,
  spacing = 4,
  className = "" 
}) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLoading, setIsLoading] = useState({})
  const [viewMode, setViewMode] = useState('masonry') // masonry, grid, list
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return

      switch (e.key) {
        case 'Escape':
          setSelectedImage(null)
          setIsFullscreen(false)
          break
        case 'ArrowLeft':
          e.preventDefault()
          navigateImage('prev')
          break
        case 'ArrowRight':
          e.preventDefault()
          navigateImage('next')
          break
        case 'f':
        case 'F':
          e.preventDefault()
          setIsFullscreen(!isFullscreen)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, selectedIndex, isFullscreen])

  const navigateImage = useCallback((direction) => {
    const newIndex = direction === 'next' 
      ? (selectedIndex + 1) % images.length
      : (selectedIndex - 1 + images.length) % images.length
    
    setSelectedIndex(newIndex)
    setSelectedImage(images[newIndex])
  }, [selectedIndex, images])

  const openImage = (image, index) => {
    setSelectedImage(image)
    setSelectedIndex(index)
  }

  const handleImageLoad = (imageId) => {
    setIsLoading(prev => ({ ...prev, [imageId]: false }))
  }

  const handleImageStart = (imageId) => {
    setIsLoading(prev => ({ ...prev, [imageId]: true }))
  }

  // Masonry layout calculation
  const getMasonryLayout = () => {
    const columnsArray = Array.from({ length: columns }, () => [])
    const columnHeights = Array(columns).fill(0)

    images.forEach((image, index) => {
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
      const aspectRatio = image.height / image.width
      const height = 300 * aspectRatio // Base height * aspect ratio
      
      columnsArray[shortestColumnIndex].push({
        ...image,
        index,
        calculatedHeight: height
      })
      
      columnHeights[shortestColumnIndex] += height + spacing * 4
    })

    return columnsArray
  }

  const masonryColumns = getMasonryLayout()

  return (
    <div className={`w-full ${className}`}>
      
      {/* View Mode Selector */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-playfair text-2xl md:text-3xl font-light text-gray-900">
          Gallery
        </h2>
        
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
          {[
            { mode: 'masonry', icon: '⬚', label: 'Masonry' },
            { mode: 'grid', icon: '⚏', label: 'Grid' },
            { mode: 'list', icon: '☰', label: 'List' }
          ].map(({ mode, icon, label }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-2 rounded-md transition-all font-inter text-sm ${
                viewMode === mode
                  ? 'bg-white text-black shadow-sm'
                  : 'text-gray-600 hover:text-black'
              }`}
              title={label}
            >
              <span className="hidden md:inline">{label}</span>
              <span className="md:hidden">{icon}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="mb-8">
        
        {/* Masonry View */}
        {viewMode === 'masonry' && (
          <div 
            className="flex gap-4"
            style={{ alignItems: 'flex-start' }}
          >
            {masonryColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex-1 space-y-4">
                {column.map((image) => (
                  <motion.div
                    key={image.index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6,
                      delay: image.index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="group cursor-pointer relative overflow-hidden rounded-lg bg-gray-100"
                    onClick={() => openImage(image, image.index)}
                    style={{ height: image.calculatedHeight }}
                  >
                    {isLoading[image.id] && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
                      </div>
                    )}
                    
                    <Image
                      src={image.src}
                      alt={image.alt || `Gallery image ${image.index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      onLoadStart={() => handleImageStart(image.id)}
                      onLoad={() => handleImageLoad(image.id)}
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    
                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="text-white font-inter font-medium text-sm mb-1">
                        {image.title}
                      </h3>
                      {image.category && (
                        <p className="text-white/80 text-xs">
                          {image.category}
                        </p>
                      )}
                    </div>

                    {/* Zoom Icon */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-95">
                      <svg className="w-4 h-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-${spacing}`}>
            {images.map((image, index) => (
              <FadeInUp key={image.id} delay={index * 0.1}>
                <div
                  className="group cursor-pointer relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                  onClick={() => openImage(image, index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <svg className="w-4 h-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {images.map((image, index) => (
              <FadeInUp key={image.id} delay={index * 0.1}>
                <div
                  className="group cursor-pointer flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300"
                  onClick={() => openImage(image, index)}
                >
                  <div className="w-20 h-20 relative overflow-hidden rounded-lg bg-gray-100 flex-shrink-0">
                    <Image
                      src={image.src}
                      alt={image.alt || `Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-inter font-medium text-gray-900 mb-1">
                      {image.title || `Image ${index + 1}`}
                    </h3>
                    {image.category && (
                      <p className="text-sm text-gray-600 mb-2">{image.category}</p>
                    )}
                    {image.description && (
                      <p className="text-sm text-gray-500">{image.description}</p>
                    )}
                  </div>
                  
                  <div className="w-8 h-8 bg-gray-100 group-hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 ${
              isFullscreen ? 'p-0' : ''
            }`}
            onClick={() => setSelectedImage(null)}
          >
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsFullscreen(!isFullscreen)
              }}
              className="absolute top-4 right-16 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isFullscreen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M15 9V4.5M15 9h4.5M15 9l5.25-5.25M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 15v4.5M15 15h4.5m0 0l5.25 5.25" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                )}
              </svg>
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateImage('prev')
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateImage('next')
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`relative max-w-full max-h-full ${
                isFullscreen ? 'w-full h-full' : 'w-auto h-auto'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt || 'Gallery image'}
                width={selectedImage.width}
                height={selectedImage.height}
                className={`max-w-full max-h-full object-contain ${
                  isFullscreen ? 'w-full h-full object-cover' : ''
                }`}
                priority
              />
            </motion.div>

            {/* Image Info */}
            {!isFullscreen && (selectedImage.title || selectedImage.description) && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
                {selectedImage.title && (
                  <h3 className="font-inter font-medium mb-2">{selectedImage.title}</h3>
                )}
                {selectedImage.description && (
                  <p className="text-sm text-white/80">{selectedImage.description}</p>
                )}
                <div className="flex items-center justify-between mt-2 text-xs text-white/60">
                  <span>{selectedIndex + 1} of {images.length}</span>
                  <span>Press F for fullscreen • ESC to close</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
