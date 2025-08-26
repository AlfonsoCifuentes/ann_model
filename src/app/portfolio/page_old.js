'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainLayout from '../../components/MainLayout'
import Lightbox from '../../components/Lightbox'
import { useLanguage } from '../../contexts/LanguageContext'
import { FadeInUp, StaggerContainer, StaggerItem, HoverLift } from '../../components/animations/MicroAnimations'

export default function PortfolioPage() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [portfolioImages, setPortfolioImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      const response = await fetch('/api/photos?portfolioSection=portfolio&status=active')
      const result = await response.json()
      
      if (result.success) {
        // Transformar los datos para mantener compatibilidad con el código existente
        const transformedImages = result.data.map(photo => ({
          src: photo.imageUrl,
          category: photo.category,
          title: photo.title,
          photographer: photo.photographer || 'Ana Nicoleta',
          description: photo.description,
          id: photo._id
        }))
        setPortfolioImages(transformedImages)
      } else {
        setError('Error al cargar las fotos del portfolio')
      }
    } catch (error) {
      console.error('Error fetching photos:', error)
      setError('Error de conexión al cargar las fotos')
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { id: 'all', label: t('allWork') },
    { id: 'editorial', label: t('editorial') },
    { id: 'fashion', label: t('fashion') },
    { id: 'portrait', label: t('portrait') }
  ]

  const filteredImages = activeCategory === 'all' 
    ? portfolioImages 
    : portfolioImages.filter(img => img.category === activeCategory)

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-fashion-bg text-fashion-fg">
        
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="max-w-6xl mx-auto px-8 lg:px-16">
            <FadeInUp>
              <div className="text-center">
                <h1 className="font-playfair text-5xl lg:text-6xl font-light tracking-wider mb-6">
                  {t('portfolioTitle')}
                </h1>
                <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  {t('portfolioDescription')}
                </p>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* Filter Navigation */}
        <section className="py-8 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-8 lg:px-16">
            <FadeInUp delay={0.2}>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full sm:w-auto px-6 py-3 font-medium tracking-wide transition-colors duration-300 rounded-full text-center ${
                      activeCategory === category.id
                        ? 'bg-orange-600 text-white'
                        : 'text-fashion-muted hover:text-orange-600 border border-orange-600/30 hover:border-orange-600'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-8">
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(16)].map((_, index) => (
                  <div key={index} className="aspect-[4/5] bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            )}

            {error && (
              <div className="text-center py-16">
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                  onClick={fetchPhotos}
                  className="px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors"
                >
                  Intentar nuevamente
                </button>
              </div>
            )}

            {!loading && !error && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {filteredImages.map((image, index) => (
                    <motion.div
                      key={`${activeCategory}-${index}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <HoverLift scale={1.03}>
                        <div 
                          className="group cursor-pointer"
                          onClick={() => openLightbox(index)}
                        >
                          <div className="relative aspect-[3/4] overflow-hidden mb-4">
                            <Image
                              src={image.src}
                              alt={image.title}
                              fill
                              className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                              loading={index < 8 ? "eager" : "lazy"}
                              priority={index < 4}
                            />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                            
                            {/* Content */}
                            <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <h3 className="font-playfair text-lg font-medium mb-1">
                                {image.title}
                              </h3>
                              <p className="font-inter text-sm opacity-90">
                                {image.photographer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </HoverLift>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-fashion-bg-secondary">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <FadeInUp>
              <h2 className="font-playfair text-3xl lg:text-4xl font-light mb-6">
                {t('discussProject')}
              </h2>
              <p className="text-lg text-fashion-muted mb-12 max-w-2xl mx-auto">
                {t('contactDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 bg-orange-600 text-white font-medium tracking-wide hover:bg-orange-700 transition-colors rounded-full text-center"
                >
                  {t('contactMe')}
                </Link>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* Lightbox */}
        <Lightbox
          images={filteredImages}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          initialIndex={lightboxIndex}
        />
      </div>
    </MainLayout>
  )
}
