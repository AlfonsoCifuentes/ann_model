'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

const galleryPhotos = [
  {
    id: 1,
    src: '/photos/SVM05601(1).jpg',
    alt: 'Ana Nicoleta - Professional Portrait',
    category: 'portrait'
  },
  {
    id: 2,
    src: '/photos/SVM05620.jpg',
    alt: 'Ana Nicoleta - Fashion Editorial',
    category: 'editorial'
  },
  {
    id: 3,
    src: '/photos/SVM05626.jpg',
    alt: 'Ana Nicoleta - Artistic Shot',
    category: 'artistic'
  },
  {
    id: 4,
    src: '/photos/SVM05628.jpg',
    alt: 'Ana Nicoleta - Professional Model',
    category: 'professional'
  },
  {
    id: 5,
    src: '/photos/SVM05631.jpg',
    alt: 'Ana Nicoleta - Beauty Shot',
    category: 'beauty'
  },
  {
    id: 6,
    src: '/photos/SVM05633.jpg',
    alt: 'Ana Nicoleta - Contemporary Look',
    category: 'contemporary'
  },
  {
    id: 7,
    src: '/photos/SVM05637.jpg',
    alt: 'Ana Nicoleta - Fashion Model',
    category: 'fashion'
  },
  {
    id: 8,
    src: '/photos/SVM05640.jpg',
    alt: 'Ana Nicoleta - Professional Headshot',
    category: 'headshot'
  },
  {
    id: 9,
    src: '/photos/SVM05646.jpg',
    alt: 'Ana Nicoleta - Editorial Style',
    category: 'editorial'
  },
  {
    id: 10,
    src: '/photos/SVM05651.jpg',
    alt: 'Ana Nicoleta - Elegant Portrait',
    category: 'portrait'
  },
  {
    id: 11,
    src: '/photos/SVM05660.jpg',
    alt: 'Ana Nicoleta - Fashion Photography',
    category: 'fashion'
  },
  {
    id: 12,
    src: '/photos/SVM05665.jpg',
    alt: 'Ana Nicoleta - Professional Model',
    category: 'professional'
  },
  {
    id: 13,
    src: '/photos/SVM05670.jpg',
    alt: 'Ana Nicoleta - Beauty Editorial',
    category: 'beauty'
  },
  {
    id: 14,
    src: '/photos/SVM05675.jpg',
    alt: 'Ana Nicoleta - Classic Portrait',
    category: 'portrait'
  },
  {
    id: 15,
    src: '/photos/SVM05678.jpg',
    alt: 'Ana Nicoleta - Fashion Elegance',
    category: 'fashion'
  },
  {
    id: 16,
    src: '/photos/SVM05701.jpg',
    alt: 'Ana Nicoleta - Professional Editorial',
    category: 'editorial'
  },
  {
    id: 17,
    src: '/photos/SVM05702.jpg',
    alt: 'Ana Nicoleta - Contemporary Style',
    category: 'contemporary'
  },
  {
    id: 18,
    src: '/photos/SVM05706.jpg',
    alt: 'Ana Nicoleta - Professional Look',
    category: 'professional'
  },
  {
    id: 19,
    src: '/photos/SVM05709.jpg',
    alt: 'Ana Nicoleta - Beauty Shot',
    category: 'beauty'
  },
  {
    id: 20,
    src: '/photos/SVM05711.jpg',
    alt: 'Ana Nicoleta - Artistic Portrait',
    category: 'artistic'
  },
  {
    id: 21,
    src: '/photos/SVM05716.jpg',
    alt: 'Ana Nicoleta - Fashion Model',
    category: 'fashion'
  },
  {
    id: 22,
    src: '/photos/SVM05718.jpg',
    alt: 'Ana Nicoleta - Editorial Portrait',
    category: 'editorial'
  },
  {
    id: 23,
    src: '/photos/SVM05719.jpg',
    alt: 'Ana Nicoleta - Professional Headshot',
    category: 'headshot'
  },
  {
    id: 24,
    src: '/photos/SVM05720.jpg',
    alt: 'Ana Nicoleta - Elegant Style',
    category: 'portrait'
  },
  {
    id: 25,
    src: '/photos/SVM05722.jpg',
    alt: 'Ana Nicoleta - Luxury Campaign',
    category: 'professional'
  },
  {
    id: 26,
    src: '/photos/SVM05724.jpg',
    alt: 'Ana Nicoleta - Contemporary Fashion',
    category: 'fashion'
  },
  {
    id: 27,
    src: '/photos/SVM05728.jpg',
    alt: 'Ana Nicoleta - Beauty Editorial',
    category: 'beauty'
  },
  {
    id: 28,
    src: '/photos/SVM05729.jpg',
    alt: 'Ana Nicoleta - Artistic Vision',
    category: 'artistic'
  },
  {
    id: 29,
    src: '/photos/SVM05734.jpg',
    alt: 'Ana Nicoleta - Professional Portrait',
    category: 'portrait'
  },
  {
    id: 30,
    src: '/photos/SVM05736.jpg',
    alt: 'Ana Nicoleta - Natural Grace',
    category: 'contemporary'
  },
  {
    id: 31,
    src: '/photos/SVM05737.jpg',
    alt: 'Ana Nicoleta - Editorial Style',
    category: 'editorial'
  },
  {
    id: 32,
    src: '/photos/SVM05741.jpg',
    alt: 'Ana Nicoleta - Professional Model',
    category: 'professional'
  }
]

const categories = [
  { id: 'all', name: 'Todas' },
  { id: 'portrait', name: 'Retratos' },
  { id: 'editorial', name: 'Editorial' },
  { id: 'fashion', name: 'Moda' },
  { id: 'professional', name: 'Profesional' },
  { id: 'beauty', name: 'Belleza' },
  { id: 'artistic', name: 'Artístico' },
  { id: 'contemporary', name: 'Contemporáneo' },
  { id: 'headshot', name: 'Headshots' }
]

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const filteredPhotos = selectedCategory === 'all' 
    ? galleryPhotos 
    : galleryPhotos.filter(photo => photo.category === selectedCategory)

  return (
    <section className="luxury-header-spacing">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-luxury-elegant mb-6">
            Galería Fotográfica
          </h2>
          <p className="text-luxury-body max-w-3xl mx-auto mb-12">
            Una colección completa de sesiones fotográficas profesionales que muestran la versatilidad 
            y elegancia de Ana Nicoleta en diferentes estilos y conceptos.
          </p>

          {/* Filtros de categorías */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`luxury-card px-6 py-3 rounded-2xl transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? 'bg-gradient-to-r from-fashion-rose/30 to-fashion-gold/30 scale-105' 
                    : 'hover:scale-105'
                }`}
              >
                <span className="text-luxury-body font-medium">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid de fotos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-t from-black/60 via-transparent to-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-luxury-body text-sm text-white">
                    {photo.alt}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal para foto ampliada */}
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                width={1200}
                height={1600}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="w-full h-full object-contain rounded-2xl"
                loading="lazy"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 luxury-card w-12 h-12 rounded-full flex items-center justify-center text-fashion-platinum hover:scale-110 transition-transform"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
