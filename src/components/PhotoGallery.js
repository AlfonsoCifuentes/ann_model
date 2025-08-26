'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function PhotoGallery({ category = null, limit = null }) {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        let url = '/api/photos?status=active'
        if (category) url += `&category=${category}`
        if (limit) url += `&limit=${limit}`
        
        const response = await fetch(url)
        const result = await response.json()
        
        if (result.success) {
          setPhotos(result.data)
        }
      } catch (error) {
        console.error('Error fetching photos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [category, limit])

  const openLightbox = (photo, index) => {
    setSelectedPhoto(photo)
    setCurrentIndex(index)
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
  }

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1
    setCurrentIndex(newIndex)
    setSelectedPhoto(photos[newIndex])
  }

  const goToNext = () => {
    const newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0
    setCurrentIndex(newIndex)
    setSelectedPhoto(photos[newIndex])
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="aspect-[3/4] bg-gray-200 animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <motion.div
            key={photo._id}
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => openLightbox(photo, index)}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={photo.imageUrl}
                alt={photo.altText || photo.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
            {photo.title && (
              <h3 className="mt-3 text-sm font-medium text-white">
                {photo.title}
              </h3>
            )}
            {photo.category && (
              <p className="text-xs text-gray-400 capitalize">
                {photo.category}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.altText || selectedPhoto.title}
                width={800}
                height={1200}
                className="max-h-[90vh] w-auto object-contain"
              />
              
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X size={32} />
              </button>

              {/* Navigation buttons */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                  >
                    <ChevronLeft size={48} />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                  >
                    <ChevronRight size={48} />
                  </button>
                </>
              )}

              {/* Photo info */}
              {selectedPhoto.title && (
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-medium">{selectedPhoto.title}</h3>
                  {selectedPhoto.description && (
                    <p className="text-sm text-gray-300 mt-1">{selectedPhoto.description}</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
