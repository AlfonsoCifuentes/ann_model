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
          // Usar directamente las colecciones destacadas desde la base de datos
          setRecentWorkCollections(result.data.slice(0, 3)) // Máximo 3 colecciones
        }
      } catch (error) {
        console.error('Error fetching recent work:', error)
      }
    }
    
    const fetchRecentWorkPhotos = async () => {
      try {
        // Buscar fotos de diferentes categorías con criterios más amplios
        const response = await fetch('/api/photos?status=active&limit=50')
        const result = await response.json()
        
        if (result.success && result.data.length > 0) {
          const photos = result.data
          console.log('Fotos disponibles para página principal:', photos.length)
          
          // Buscar fotos específicas para Trabajos Recientes
          let bodyPaintPhoto = photos.find(photo => 
            photo.filename === 'street_body_paint-2.jpeg'
          )
          
          let fashionPhoto = photos.find(photo => 
            photo.filename === 'PolasAna03031.jpg'
          )
          
          let makeupPhoto = photos.find(photo => 
            photo.filename === 'make-up_close_up-1.JPG'
          )
          
          // Fallbacks si no se encuentran las fotos específicas
          if (!bodyPaintPhoto) {
            bodyPaintPhoto = photos.find(photo => 
              photo.workCollection && photo.workCollection.toLowerCase().includes('body paint')
            ) || { imageUrl: '/photos/street_body_paint-2.jpeg' }
          }
          
          if (!fashionPhoto) {
            fashionPhoto = photos.find(photo => 
              photo.workCollection && (photo.workCollection.toLowerCase().includes('pola') || photo.workCollection.toLowerCase().includes('moda'))
            ) || { imageUrl: '/photos/PolasAna03031.jpg' }
          }
          
          if (!makeupPhoto) {
            makeupPhoto = photos.find(photo => 
              photo.workCollection && photo.workCollection.toLowerCase().includes('make')
            ) || { imageUrl: '/photos/make-up_close_up-1.JPG' }
          }
          
          console.log('Fotos seleccionadas para Recent Work:', {
            bodyPaint: bodyPaintPhoto?.filename || 'fallback',
            fashion: fashionPhoto?.filename || 'fallback', 
            makeup: makeupPhoto?.filename || 'fallback'
          })
          
          setRecentWorkCollections([
            {
              id: 1,
              title: "BODY PAINT URBANO",
              category: "Body Paint",
              imageUrl: bodyPaintPhoto?.imageUrl || '/photos/street_body_paint-2.jpeg',
              workCollection: bodyPaintPhoto?.workCollection || 'Body Paint Urbano'
            },
            {
              id: 2,
              title: "MODA DE BAÑO",
              category: "Polas",
              imageUrl: fashionPhoto?.imageUrl || '/photos/PolasAna03031.jpg',
              workCollection: fashionPhoto?.workCollection || 'Polas'
            },
            {
              id: 3,
              title: "SESIÓN MAKE-UP",
              category: "Retrato",
              imageUrl: makeupPhoto?.imageUrl || '/photos/make-up_close_up-1.JPG',
              workCollection: makeupPhoto?.workCollection || 'Retrato'
            }
          ])
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
          
          console.log('Todas las fotos disponibles para Services:', photos.length, 'fotos')
          
          // Buscar fotos específicas por nombre de archivo EXACTO para SERVICIOS
          let editorialServicePhoto = photos.find(photo => 
            photo.filename === 'bodypaint_tree-2.jpg' || photo.filename === 'bodypaint_tree-2.JPG'
          )
          
          let fashionServicePhoto = photos.find(photo => 
            photo.filename === 'classy-3.jpg'
          )
          
          let portraitServicePhoto = photos.find(photo => 
            photo.filename === 'makeup2-portrait1.jpg'
          )
          
          // Fallbacks usando fotos específicas si no se encuentran en la base de datos
          if (!editorialServicePhoto) {
            editorialServicePhoto = { imageUrl: '/photos/bodypaint_tree-2.jpg' }
          }
          
          if (!fashionServicePhoto) {
            fashionServicePhoto = { imageUrl: '/photos/classy-3.jpg' }
          }
          
          if (!portraitServicePhoto) {
            portraitServicePhoto = { imageUrl: '/photos/makeup2-portrait1.jpg' }
          }
          
          console.log('Fotos seleccionadas para Services:', {
            editorial: editorialServicePhoto?.filename || 'fallback',
            fashion: fashionServicePhoto?.filename || 'fallback',
            portrait: portraitServicePhoto?.filename || 'fallback'
          })
          
          setServices([
            {
              title: t('editorialPhotography'),
              description: t('editorialDescription'),
              image: editorialServicePhoto?.imageUrl || '/photos/bodypaint_tree-2.JPG'
            },
            {
              title: t('fashion'),
              description: t('fashionDescription'),
              image: fashionServicePhoto?.imageUrl || '/photos/classy-3.jpg'
            },
            {
              title: t('portrait'),
              description: t('portraitDescription'),
              image: portraitServicePhoto?.imageUrl || '/photos/makeup2-portrait1.jpg'
            }
          ])
          
          console.log('🎯 Fotos específicas encontradas en la base de datos:', {
            editorial: editorialServicePhoto ? `✅ ${editorialServicePhoto.filename}` : '❌ bodypaint_tree-2.JPG no encontrada',
            fashion: fashionServicePhoto ? `✅ ${fashionServicePhoto.filename}` : '❌ classy-3.jpg no encontrada', 
            portrait: portraitServicePhoto ? `✅ ${portraitServicePhoto.filename}` : '❌ makeup2-portrait1.jpg no encontrada'
          })
        }
      } catch (error) {
        console.error('Error fetching service photos:', error)
      }
    }
  }, [t])

  return (
    <>
      <LoadingScreen isLoading={isInitialLoading} />
      
      <div className="w-full">
        <StaggerContainer>
          {/* Hero Section */}
          <StaggerItem>
            <EnhancedHero collections={heroCollections} />
          </StaggerItem>

          {/* Services Section */}
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

                <div className="grid md:grid-cols-3 gap-8">
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      className="group"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <HoverLift>
                        <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-500">
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

          {/* Recent Work Section */}
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

                <div className="grid md:grid-cols-3 gap-8">
                  {recentWorkCollections.map((collection, index) => (
                    <motion.div
                      key={collection.id}
                      className="group"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <HoverLift>
                        <Link href={`/portfolio/${collection.workCollection?.toLowerCase().replace(/\s+/g, '-') || 'featured'}`}>
                          <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-500 cursor-pointer">
                            <div className="aspect-w-4 aspect-h-5">
                              <Image
                                src={collection.imageUrl}
                                alt={collection.title}
                                width={400}
                                height={500}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                priority={index === 0}
                              />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                              <h3 className="text-2xl font-bold mb-2">{collection.title}</h3>
                              <p className="text-sm text-gray-200">{collection.category}</p>
                            </div>
                          </div>
                        </Link>
                      </HoverLift>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <Link 
                    href="/portfolio"
                    className="inline-flex items-center px-8 py-4 bg-black text-white hover:bg-gray-800 transition-colors duration-300 rounded-lg font-semibold"
                  >
                    {t('viewAllWork')}
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </>
  )
}
