'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const highlights = [
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
  },
  {
    id: 5,
    title: 'Classic Beauty',
    category: 'Belleza',
    image: '/photos/SVM05675.jpg',
    slug: 'classic-beauty-series'
  },
  {
    id: 6,
    title: 'Professional Look',
    category: 'Comercial',
    image: '/photos/SVM05706.jpg',
    slug: 'professional-commercial'
  },
  {
    id: 7,
    title: 'Luxury Campaign',
    category: 'Lujo',
    image: '/photos/SVM05722.jpg',
    slug: 'luxury-brand-campaign'
  },
  {
    id: 8,
    title: 'Natural Grace',
    category: 'Natural',
    image: '/photos/SVM05736.jpg',
    slug: 'natural-grace-session'
  }
]

export default function PortfolioHighlights() {
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
