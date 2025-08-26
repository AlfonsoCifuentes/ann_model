'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function PortfolioHighlights() {
  const [highlights, setHighlights] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHighlights()
  }, [])

  const fetchHighlights = async () => {
    try {
      const response = await fetch('/api/photos?portfolioSection=highlights&featured=true&status=active&limit=8')
      const result = await response.json()
      
      if (result.success && result.data.length > 0) {
        const highlightsData = result.data.map((photo, index) => ({
          id: photo._id,
          title: photo.title || `Highlight ${index + 1}`,
          category: photo.category === 'editorial' ? 'Editorial' :
                   photo.category === 'fashion' ? 'Moda' :
                   photo.category === 'portrait' ? 'Retrato' :
                   photo.category === 'commercial' ? 'Comercial' :
                   photo.category === 'studio' ? 'Estudio' :
                   photo.category === 'lifestyle' ? 'Lifestyle' : 'Portfolio',
          image: photo.imageUrl,
          slug: photo.slug || `highlight-${index + 1}`
        }))
        setHighlights(highlightsData)
      } else {
        // Fallback a datos por defecto si no hay fotos destacadas
        setHighlights([
          {
            id: 1,
            title: 'Editorial Elegance',
            category: 'Editorial',
            image: '/photos/SVM05701.jpg',
            slug: 'editorial-elegance-2024'
          },
          {
            id: 2,
            title: 'Fashion Portrait',
            category: 'Retrato',
            image: '/photos/SVM05620.jpg',
            slug: 'fashion-portrait-session'
          },
          {
            id: 3,
            title: 'Artistic Vision',
            category: 'Arte',
            image: '/photos/SVM05631.jpg',
            slug: 'artistic-vision-collection'
          },
          {
            id: 4,
            title: 'Contemporary Style',
            category: 'Moda',
            image: '/photos/SVM05660.jpg',
            slug: 'contemporary-style-shoot'
          }
        ])
      }
    } catch (error) {
      console.error('Error fetching highlights:', error)
      // Fallback en caso de error
      setHighlights([
        {
          id: 1,
          title: 'Editorial Elegance',
          category: 'Editorial',
          image: '/photos/SVM05701.jpg',
          slug: 'editorial-elegance-2024'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="luxury-header-spacing">
        <div className="container-custom">
          <div className="text-center py-20">
            <div className="text-gray-600">Cargando highlights...</div>
          </div>
        </div>
      </section>
    )
  }
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
            Portfolio Highlights
          </h2>
          <p className="text-luxury-body max-w-2xl mx-auto">
            A curated selection of my latest work across editorial, runway, commercial, and acting projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.id}
              className="group cursor-pointer overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link href={`/portfolio/${item.slug}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-xs uppercase tracking-wider text-fashion-gold font-medium">
                      {item.category}
                    </span>
                    <h3 className="text-luxury-body font-semibold mt-1 text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link href="/portfolio" className="luxury-card inline-block px-8 py-4 text-luxury-body font-medium rounded-2xl hover:scale-105 transition-all duration-300">
            View Complete Portfolio
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
