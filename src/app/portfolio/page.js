'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
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

  const portfolioImages = [
    { src: '/photos/SVM05701.jpg', category: 'editorial', title: 'Editorial Campaign', photographer: 'Marc Stevens' },
    { src: '/photos/SVM05620.jpg', category: 'editorial', title: 'Magazine Editorial', photographer: 'Studio Session' },
    { src: '/photos/SVM05631.jpg', category: 'portrait', title: 'Professional Portrait', photographer: 'Portrait Session' },
    { src: '/photos/SVM05660.jpg', category: 'fashion', title: 'Fashion Campaign', photographer: 'Commercial Work' },
    { src: '/photos/SVM05675.jpg', category: 'fashion', title: 'Style Editorial', photographer: 'Fashion Studio' },
    { src: '/photos/SVM05706.jpg', category: 'editorial', title: 'Creative Editorial', photographer: 'Art Direction' },
    { src: '/photos/SVM05702.jpg', category: 'portrait', title: 'Beauty Portrait', photographer: 'Beauty Session' },
    { src: '/photos/SVM05720.jpg', category: 'editorial', title: 'Editorial Story', photographer: 'Editorial Team' },
    { src: '/photos/SVM05728.jpg', category: 'fashion', title: 'Fashion Story', photographer: 'Fashion Team' },
    { src: '/photos/SVM05734.jpg', category: 'portrait', title: 'Professional Headshot', photographer: 'Portrait Studio' },
    { src: '/photos/SVM05741.jpg', category: 'portrait', title: 'Character Portrait', photographer: 'Creative Session' },
    { src: '/photos/SVM05651.jpg', category: 'fashion', title: 'Fashion Portrait', photographer: 'Style Session' },
    { src: '/photos/SVM05670.jpg', category: 'editorial', title: 'Creative Direction', photographer: 'Editorial Session' },
    { src: '/photos/SVM05678.jpg', category: 'fashion', title: 'Fashion Editorial', photographer: 'Fashion Team' },
    { src: '/photos/SVM05716.jpg', category: 'portrait', title: 'Portrait Series', photographer: 'Portrait Studio' },
    { src: '/photos/SVM05718.jpg', category: 'editorial', title: 'Magazine Cover', photographer: 'Editorial Team' }
  ]

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
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-3 font-medium tracking-wide transition-colors duration-300 ${
                      activeCategory === category.id
                        ? 'bg-fashion-secondary text-fashion-bg'
                        : 'text-fashion-muted hover:text-fashion-secondary border border-fashion-secondary/30 hover:border-fashion-secondary'
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
                  className="px-8 py-4 bg-fashion-secondary text-fashion-bg font-medium tracking-wide hover:bg-orange-600 transition-colors"
                >
                  {t('contactMe')}
                </Link>
                <Link 
                  href="/prints"
                  className="px-8 py-4 border-2 border-fashion-secondary text-fashion-secondary font-medium tracking-wide hover:bg-fashion-secondary hover:text-fashion-bg transition-colors"
                >
                  {t('viewPrints')}
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
