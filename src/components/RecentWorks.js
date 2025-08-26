'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function RecentWorks() {
  const [recentWorks, setRecentWorks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentWorks()
  }, [])

  const fetchRecentWorks = async () => {
    try {
      // Obtener fotos de las colecciones específicas: classy y body paint japonés
      const response = await fetch('/api/photos?featured=true&status=active')
      const result = await response.json()
      
      if (result.success) {
        // Filtrar solo las colecciones que queremos mostrar
        const targetCollections = ['elegancia-clasica', 'body-paint-japones']
        const workMap = new Map()
        
        result.data.forEach(photo => {
          if (photo.workCollection && targetCollections.includes(photo.workCollection) && !workMap.has(photo.workCollection)) {
            workMap.set(photo.workCollection, {
              id: photo._id,
              title: photo.title,
              description: photo.description,
              image: photo.imageUrl,
              category: photo.category,
              collection: photo.workCollection,
              slug: photo.workCollection
            })
          }
        })
        
        setRecentWorks(Array.from(workMap.values()))
      }
    } catch (error) {
      console.error('Error fetching recent works:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryLabel = (category) => {
    const labels = {
      editorial: 'Editorial',
      fashion: 'Moda',
      portrait: 'Retrato',
      commercial: 'Comercial'
    }
    return labels[category] || category
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-light text-center mb-16 text-gray-800">
            Trabajos Recientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="aspect-[4/5] bg-gray-200 animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-light mb-6 text-gray-800">
            Trabajos Recientes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Una selección de mis últimos proyectos artísticos y colaboraciones profesionales
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentWorks.map((work, index) => (
            <motion.div
              key={work.id}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/portfolio`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-100 mb-4">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  
                  {/* Overlay con información */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-medium text-lg mb-2">
                      {work.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {work.description}
                    </p>
                  </div>
                </div>
                
                {/* Información visible */}
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-800 mb-1">
                    {work.title}
                  </h3>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                    {getCategoryLabel(work.category)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {recentWorks.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center px-8 py-3 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-300 rounded-full"
            >
              Ver Todo el Portfolio
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
