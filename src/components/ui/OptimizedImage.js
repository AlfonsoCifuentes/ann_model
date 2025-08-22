'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'

// Componente de imagen optimizada con placeholder y transiciones suaves
export const OptimizedImage = ({
  src,
  alt,
  className = '',
  fill = false,
  width,
  height,
  sizes,
  priority = false,
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Generar placeholder blur data URL si no se proporciona
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli2O14+U7A=';

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad && onLoad()
  }

  const handleError = () => {
    setHasError(true)
    onError && onError()
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder mientras carga */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
        </div>
      )}

      {/* Imagen principal */}
      {!hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={src}
            alt={alt}
            fill={fill}
            width={!fill ? width : undefined}
            height={!fill ? height : undefined}
            sizes={sizes}
            priority={priority}
            quality={quality}
            placeholder={placeholder}
            blurDataURL={blurDataURL || defaultBlurDataURL}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            {...props}
          />
        </motion.div>
      )}

      {/* Fallback para errores */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-gray-500 text-center">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Image not available</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente de galería optimizada
export const ImageGallery = ({ 
  images = [], 
  className = '',
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  aspectRatio = 'aspect-[3/4]',
  onImageClick,
  lazy = true
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2', 
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  }

  const gridClass = `grid gap-4 ${gridCols[columns.sm] || 'grid-cols-1'} md:${gridCols[columns.md] || 'grid-cols-2'} lg:${gridCols[columns.lg] || 'grid-cols-3'} xl:${gridCols[columns.xl] || 'grid-cols-4'}`

  return (
    <div className={`${gridClass} ${className}`}>
      {images.map((image, index) => (
        <motion.div
          key={image.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group cursor-pointer"
          onClick={() => onImageClick && onImageClick(image, index)}
        >
          <div className={`relative ${aspectRatio} overflow-hidden rounded-lg`}>
            <OptimizedImage
              src={image.src}
              alt={image.alt || image.title || `Gallery image ${index + 1}`}
              fill
              sizes={`(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw`}
              priority={!lazy && index < 4}
              className="transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
            
            {/* Content overlay */}
            {(image.title || image.photographer) && (
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {image.title && (
                  <h3 className="font-medium text-sm mb-1">{image.title}</h3>
                )}
                {image.photographer && (
                  <p className="text-xs opacity-90">{image.photographer}</p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Hook para gestión de estado de imágenes en galería
export const useImageGallery = (images = []) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index) => {
    setCurrentIndex(index)
  }

  return {
    currentIndex,
    isLightboxOpen,
    currentImage: images[currentIndex],
    openLightbox,
    closeLightbox,
    nextImage,
    prevImage,
    goToImage,
    hasNext: currentIndex < images.length - 1,
    hasPrev: currentIndex > 0
  }
}

export default OptimizedImage
