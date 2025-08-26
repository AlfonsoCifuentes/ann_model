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

  // Función para generar un identificador de sesión basado en el nombre del archivo
  const getSessionId = (filename) => {
    if (!filename) return 'featured'
    
    // Extraer el patrón base del nombre del archivo
    const cleanName = filename.toLowerCase()
    
    if (cleanName.includes('street_body_paint') || cleanName.includes('bodypaint')) {
      return 'body-paint'
    }
    if (cleanName.includes('polas') || cleanName.includes('pola')) {
      return 'polas'
    }
    if (cleanName.includes('make-up') || cleanName.includes('makeup')) {
      return 'makeup'
    }
    if (cleanName.includes('classy')) {
      return 'classy'
    }
    
    // Fallback: usar los primeros caracteres del nombre
    return cleanName.split(/[-_\.]/)[0] || 'featured'
  }

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
          
          // Buscar fotos específicas para Trabajos Recientes - SIN REPETICIONES
          let bodyPaintPhoto = photos.find(photo => 
            photo.filename === 'street_body_paint-2.jpeg'
          )
          
          let fashionPhoto = photos.find(photo => 
            photo.filename === 'PolasAna03031.jpg'
          )
          
          let portraitPhoto = photos.find(photo => 
            photo.filename === 'make-up_close_up-1.JPG'
          )
          
          // Fallbacks con fotos diferentes para evitar repeticiones
          if (!bodyPaintPhoto) {
            bodyPaintPhoto = photos.find(photo => 
              photo.workCollection && photo.workCollection.toLowerCase().includes('body paint') &&
              photo.filename !== 'PolasAna03031.jpg' && 
              photo.filename !== 'make-up_close_up-1.JPG'
            ) || photos.find(photo => 
              photo.filename && photo.filename.toLowerCase().includes('bodypaint')
            ) || { imageUrl: '/photos/street_body_paint-2.jpeg' }
          }
          
          if (!fashionPhoto) {
            fashionPhoto = photos.find(photo => 
              photo.workCollection && (photo.workCollection.toLowerCase().includes('pola') || photo.workCollection.toLowerCase().includes('moda')) &&
              photo.filename !== bodyPaintPhoto?.filename && 
              photo.filename !== 'make-up_close_up-1.JPG'
            ) || photos.find(photo => 
              photo.filename && (photo.filename.toLowerCase().includes('pola') || photo.filename.toLowerCase().includes('classy'))
            ) || { imageUrl: '/photos/PolasAna03031.jpg' }
          }
          
          if (!portraitPhoto) {
            portraitPhoto = photos.find(photo => 
              photo.workCollection && photo.workCollection.toLowerCase().includes('make') &&
              photo.filename !== bodyPaintPhoto?.filename && 
              photo.filename !== fashionPhoto?.filename
            ) || photos.find(photo => 
              photo.filename && photo.filename.toLowerCase().includes('portrait') &&
              photo.filename !== bodyPaintPhoto?.filename && 
              photo.filename !== fashionPhoto?.filename
            ) || { imageUrl: '/photos/make-up_close_up-1.JPG' }
          }
          
          console.log('Fotos seleccionadas para Recent Work (sin repeticiones):', {
            bodyPaint: bodyPaintPhoto?.filename || 'fallback',
            fashion: fashionPhoto?.filename || 'fallback', 
            portrait: portraitPhoto?.filename || 'fallback'
          })
          
          setRecentWorkCollections([
            {
              id: 1,
              title: "BODY PAINT ARTÍSTICO",
              category: "Editorial",
              imageUrl: bodyPaintPhoto?.imageUrl || '/photos/street_body_paint-2.jpeg',
              workCollection: bodyPaintPhoto?.workCollection || 'Body Paint Artístico',
              filename: bodyPaintPhoto?.filename || 'street_body_paint-2.jpeg',
              sessionId: getSessionId(bodyPaintPhoto?.filename || 'street_body_paint-2.jpeg')
            },
            {
              id: 2,
              title: "MODA Y ESTILO",
              category: "Fashion",
              imageUrl: fashionPhoto?.imageUrl || '/photos/PolasAna03031.jpg',
              workCollection: fashionPhoto?.workCollection || 'Moda y Estilo',
              filename: fashionPhoto?.filename || 'PolasAna03031.jpg',
              sessionId: getSessionId(fashionPhoto?.filename || 'PolasAna03031.jpg')
            },
            {
              id: 3,
              title: "MAQUILLAJE PROFESIONAL",
              category: "Retrato",
              imageUrl: portraitPhoto?.imageUrl || '/photos/make-up_close_up-1.JPG',
              workCollection: portraitPhoto?.workCollection || 'Maquillaje Profesional',
              filename: portraitPhoto?.filename || 'make-up_close_up-1.JPG',
              sessionId: getSessionId(portraitPhoto?.filename || 'make-up_close_up-1.JPG')
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

    const fetchServicePhotos = async () => {
      try {
        const response = await fetch('/api/photos?status=active&limit=50')
        const result = await response.json()
        
        if (result.success && result.data.length > 0) {
          const photos = result.data
          
          console.log('Todas las fotos disponibles para Services:', photos.length, 'fotos')
          
          // Buscar fotos específicas para SERVICIOS - Diferentes a Recent Work
          let editorialServicePhoto = photos.find(photo => 
            photo.filename === 'bodypaint_tree-2.jpg' || photo.filename === 'bodypaint_tree-2.JPG'
          )
          
          let fashionServicePhoto = photos.find(photo => 
            photo.filename === 'classy-3.jpg'
          )
          
          let portraitServicePhoto = photos.find(photo => 
            photo.filename === 'makeup2-portrait1.jpg'
          )
          
          // Fallbacks con fotos completamente diferentes para Services
          if (!editorialServicePhoto) {
            editorialServicePhoto = photos.find(photo => 
              photo.workCollection && photo.workCollection.toLowerCase().includes('body paint') &&
              photo.filename !== 'street_body_paint-2.jpeg' &&
              photo.filename !== 'PolasAna03031.jpg' &&
              photo.filename !== 'make-up_close_up-1.JPG'
            ) || { imageUrl: '/photos/bodypaint_tree-2.jpg' }
          }
          
          if (!fashionServicePhoto) {
            fashionServicePhoto = photos.find(photo => 
              photo.filename && photo.filename.toLowerCase().includes('classy') &&
              photo.filename !== 'street_body_paint-2.jpeg' &&
              photo.filename !== 'PolasAna03031.jpg' &&
              photo.filename !== 'make-up_close_up-1.JPG'
            ) || { imageUrl: '/photos/classy-3.jpg' }
          }
          
          if (!portraitServicePhoto) {
            portraitServicePhoto = photos.find(photo => 
              photo.filename && (photo.filename.toLowerCase().includes('portrait') || photo.filename.toLowerCase().includes('makeup2')) &&
              photo.filename !== 'street_body_paint-2.jpeg' &&
              photo.filename !== 'PolasAna03031.jpg' &&
              photo.filename !== 'make-up_close_up-1.JPG'
            ) || { imageUrl: '/photos/makeup2-portrait1.jpg' }
          }
          
          console.log('Fotos seleccionadas para Services (diferentes a Recent Work):', {
            editorial: editorialServicePhoto?.filename || 'fallback bodypaint_tree-2.jpg',
            fashion: fashionServicePhoto?.filename || 'fallback classy-3.jpg',
            portrait: portraitServicePhoto?.filename || 'fallback makeup2-portrait1.jpg'
          })
          
          setServices([
            {
              title: t('editorialPhotography'),
              description: t('editorialDescription'),
              image: editorialServicePhoto?.imageUrl || '/photos/bodypaint_tree-2.jpg'
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
          
          console.log('🎯 Services - Fotos diferentes asignadas:', {
            editorial: editorialServicePhoto ? `✅ ${editorialServicePhoto.filename}` : '❌ bodypaint_tree-2.jpg no encontrada',
            fashion: fashionServicePhoto ? `✅ ${fashionServicePhoto.filename}` : '❌ classy-3.jpg no encontrada', 
            portrait: portraitServicePhoto ? `✅ ${portraitServicePhoto.filename}` : '❌ makeup2-portrait1.jpg no encontrada'
          })
        }
      } catch (error) {
        console.error('Error fetching service photos:', error)
      }
    }

    const loadData = async () => {
      try {
        // Cargar hero primero
        await fetchHeroPhotos()
        
        // Cargar trabajos recientes
        await fetchRecentWorkPhotos()
        
        // Cargar servicios después
        await fetchServicePhotos()
        
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }

    loadData()
  }, [t])

  return (
    <>
      <LoadingScreen isLoading={isInitialLoading} />
      
      <div className="w-full bg-black text-white">
        <StaggerContainer>
          {/* Hero Section */}
          <StaggerItem>
            <EnhancedHero collections={heroCollections} />
          </StaggerItem>

          {/* Statistics Section */}
          <StaggerItem>
            <section className="py-16 bg-gray-950" id="statistics">
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">10+</div>
                    <div className="text-sm md:text-base text-gray-300">Años de Experiencia</div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">50+</div>
                    <div className="text-sm md:text-base text-gray-300">Sesiones Fotográficas</div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">90+</div>
                    <div className="text-sm md:text-base text-gray-300">Colaboraciones</div>
                  </motion.div>
                </div>
              </div>
            </section>
          </StaggerItem>

          {/* Services Section */}
          <StaggerItem>
            <section className="py-20 bg-black" id="services">
              <div className="container mx-auto px-6">
                <FadeInUp>
                  <div className="text-center mb-16">
                    <motion.h2 
                      className="text-4xl md:text-5xl font-bold mb-6 text-white"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    >
                      {t('services')}
                    </motion.h2>
                    <motion.p 
                      className="text-xl text-gray-300 max-w-3xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      {t('servicesSubtitle')}
                    </motion.p>
                  </div>
                </FadeInUp>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                        <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-500 h-80 md:h-96 lg:h-[420px]">
                          <div className="relative w-full h-full">
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                              priority={index === 0}
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                            <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">{service.title}</h3>
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
            <section className="py-20 bg-gray-950" id="recent-work">
              <div className="container mx-auto px-6">
                <FadeInUp>
                  <div className="text-center mb-16">
                    <motion.h2 
                      className="text-4xl md:text-5xl font-bold mb-6 text-white"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    >
                      {t('recentWork')}
                    </motion.h2>
                    <motion.p 
                      className="text-xl text-gray-300 max-w-3xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      {t('recentWorkSubtitle')}
                    </motion.p>
                  </div>
                </FadeInUp>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                        <Link href={`/portfolio?filter=${encodeURIComponent(collection.workCollection || collection.sessionId)}`}>
                          <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-500 cursor-pointer h-80 md:h-96 lg:h-[420px]">
                            <div className="relative w-full h-full">
                              <Image
                                src={collection.imageUrl}
                                alt={collection.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                priority={index === 0}
                              />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">{collection.title}</h3>
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
                    className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-300 rounded-lg font-semibold"
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
