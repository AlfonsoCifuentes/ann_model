'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import EnhancedHero from './EnhancedHero'
import LoadingScreen from './LoadingScreen'
import { FadeInUp, StaggerContainer, StaggerItem, HoverLift } from './animations/MicroAnimations'

export default function HomeContent() {
  const { t } = useLanguage()
  const [heroCollections, setHeroCollections] = useState([])
  const [recentWorkCollections, setRecentWorkCollections] = useState([])
  const [services, setServices] = useState([])
  const [isInitialLoading, setIsInitialLoading] = useState(false)

  useEffect(() => {
    const fetchRecentWork = async () => {
      try {
        const response = await fetch('/api/photos/featured?featuredOnly=true')
        const result = await response.json()
        
        if (result.success) {
          setRecentWorkCollections(result.data.slice(0, 3))
        }
      } catch (error) {
        console.error('Error fetching recent work:', error)
      }
    }
    
    const fetchRecentWorkPhotos = async () => {
      try {
        const response = await fetch('/api/photos?status=active&limit=50')
        const result = await response.json()
        
        if (result.success && result.data.length > 0) {
          const photos = result.data
          
          // Agrupar por workCollection
          const collections = {}
          photos.forEach(photo => {
            const collection = photo.workCollection || 'featured'
            if (!collections[collection]) {
              collections[collection] = []
            }
            collections[collection].push(photo)
          })
          
          // Convertir a array y tomar las primeras 3 colecciones con más fotos
          const sortedCollections = Object.entries(collections)
            .map(([name, photos]) => ({
              title: name.charAt(0).toUpperCase() + name.slice(1),
              photos: photos.slice(0, 4), // Max 4 fotos por colección
              mainImage: photos[0]?.imageUrl
            }))
            .filter(col => col.photos.length > 0)
            .sort((a, b) => b.photos.length - a.photos.length)
            .slice(0, 3)
          
          setRecentWorkCollections(sortedCollections)
        }
      } catch (error) {
        console.error('Error fetching recent work photos:', error)
      }
    }

    const fetchHeroPhotos = async () => {
      try {
        const response = await fetch('/api/photos?isHero=true&status=active&limit=5')
        const result = await response.json()
        
        if (result.success && result.data.length > 0) {
          setHeroCollections(result.data.map(photo => ({
            id: photo._id,
            title: photo.workCollection || 'Portfolio',
            category: photo.workCollection || 'Featured',
            imageUrl: photo.imageUrl,
            filename: photo.filename
          })))
        }
      } catch (error) {
        console.error('Error fetching hero photos:', error)
      }
    }

    const loadData = async () => {
      try {
        // Cargar hero primero
        await fetchHeroPhotos()
        
        // Cargar trabajos recientes
        await fetchRecentWorkPhotos()
        
        // Cargar servicios después
        fetchServicePhotos()
        
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    const fetchServicePhotos = async () => {
      try {
        const response = await fetch('/api/photos?status=active&limit=50')
        const result = await response.json()
        
        if (result.success && result.data.length > 0) {
          const photos = result.data
          
          // Crear servicios basados en las fotos disponibles
          const serviceCategories = [
            {
              title: 'Editorial Fashion',
              description: 'High-end fashion photography for magazines and brands',
              image: photos.find(p => p.workCollection?.includes('editorial') || p.title?.includes('editorial'))?.imageUrl || photos[0]?.imageUrl
            },
            {
              title: 'Commercial Modeling',
              description: 'Product and brand campaigns for commercial clients',
              image: photos.find(p => p.workCollection?.includes('commercial') || p.title?.includes('commercial'))?.imageUrl || photos[1]?.imageUrl
            },
            {
              title: 'Portrait Sessions',
              description: 'Professional portrait photography for personal branding',
              image: photos.find(p => p.workCollection?.includes('portrait') || p.title?.includes('portrait'))?.imageUrl || photos[2]?.imageUrl
            }
          ]
          
          setServices(serviceCategories.filter(service => service.image))
        }
      } catch (error) {
        console.error('Error fetching service photos:', error)
      }
    }

    fetchServicePhotos()
  }, [])

  return (
    <>
      <LoadingScreen isLoading={isInitialLoading} />
      
      <div className="w-full">
        <StaggerContainer>
          <StaggerItem>
            <EnhancedHero collections={heroCollections} />
          </StaggerItem>

          <StaggerItem>
            <section className="py-20 bg-white" id="services">
              <div className="container mx-auto px-6">
                <FadeInUp>
                  <div className="text-center mb-16">
                    <motion.h2 
                      className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    >
                      {t('services')}
                    </motion.h2>
                    <motion.p 
                      className="text-xl text-gray-600 max-w-3xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      {t('servicesSubtitle')}
                    </motion.p>
                  </div>
                </FadeInUp>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <HoverLift>
                        <div className="relative h-80 rounded-2xl overflow-hidden group">
                          <div className="aspect-w-4 aspect-h-5">
                            <Image
                              src={service.image}
                              alt={service.title}
                              width={400}
                              height={500}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              priority={index === 0}
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                            <p className="text-sm text-gray-200">{service.description}</p>
                          </div>
                        </div>
                      </HoverLift>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </StaggerItem>

          <StaggerItem>
            <section className="py-20 bg-gray-50" id="recent-work">
              <div className="container mx-auto px-6">
                <FadeInUp>
                  <div className="text-center mb-16">
                    <motion.h2 
                      className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    >
                      {t('recentWork')}
                    </motion.h2>
                    <motion.p 
                      className="text-xl text-gray-600 max-w-3xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      {t('recentWorkSubtitle')}
                    </motion.p>
                  </div>
                </FadeInUp>

                {recentWorkCollections.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recentWorkCollections.map((collection, index) => (
                      <motion.div
                        key={collection.title}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <HoverLift>
                          <Link href="/portfolio" className="block group">
                            <div className="relative h-96 rounded-2xl overflow-hidden">
                              <Image
                                src={collection.mainImage}
                                alt={collection.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 className="text-2xl font-bold mb-2">{collection.title}</h3>
                                <p className="text-sm text-gray-300">{collection.photos.length} photos</p>
                              </div>
                            </div>
                          </Link>
                        </HoverLift>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </>
  )
}
