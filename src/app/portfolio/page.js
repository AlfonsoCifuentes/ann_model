'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import MainLayout from '../../components/MainLayout'
import Lightbox from '../../components/Lightbox'
import OptimizedImage from '../../components/OptimizedImage'

export default function PortfolioPage() {
  const searchParams = useSearchParams()
  const filterParam = searchParams.get('filter')
  
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [workCollections, setWorkCollections] = useState([])
  const [currentLightboxPhotos, setCurrentLightboxPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [initialFilterApplied, setInitialFilterApplied] = useState(false)

  useEffect(() => {
    const fetchWorkCollections = async () => {
      try {
        const response = await fetch('/api/photos?portfolioSection=portfolio&status=active')
        const result = await response.json()
        
        if (result.success) {
          // Agrupar fotos por workCollection
          const collections = new Map()
          
          result.data.forEach(photo => {
            if (photo.workCollection) {
              if (!collections.has(photo.workCollection)) {
                collections.set(photo.workCollection, {
                  id: photo.workCollection,
                  title: photo.title?.split(' ').slice(0, -1).join(' ') || formatCollectionName(photo.workCollection),
                  description: photo.description || 'Colección de fotografías artísticas',
                  category: photo.category,
                  photos: [],
                  coverImage: photo.imageUrl
                })
              }
              collections.get(photo.workCollection).photos.push(photo)
            }
          })
          
          // Ordenar fotos dentro de cada colección por order
          collections.forEach(collection => {
            collection.photos.sort((a, b) => (a.order || 0) - (b.order || 0))
          })
          
          const collectionsArray = Array.from(collections.values())
          setWorkCollections(collectionsArray)
          
          // Si hay un filtro específico y solo hay una colección, abrirla automáticamente
          if (filterParam && collectionsArray.length > 0) {
            const targetCollection = collectionsArray.find(collection => 
              collection.id === filterParam || 
              collection.title.toLowerCase().includes(filterParam.toLowerCase()) ||
              collection.id.toLowerCase().includes(filterParam.toLowerCase())
            )
            
            if (targetCollection && targetCollection.photos.length > 0) {
              setTimeout(() => {
                openLightbox(0, targetCollection)
              }, 500)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching photos:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchWorkCollections()
  }, [filterParam])

  const formatCollectionName = (collectionId) => {
    // Casos especiales de nombres
    const specialNames = {
      'polaroids-vintage': 'Polas',
      'body-paint-japones': 'Body Paint Japonés',
      'body-paint-natural': 'Body Paint Natural',
      'body-paint-urbano': 'Body Paint Urbano',
      'maquillaje-artistico': 'Maquillaje Artístico',
      'elegancia-clasica': 'Elegancia Clásica',
      'sesion-profesional': 'Sesión Profesional'
    }
    
    if (specialNames[collectionId]) {
      return specialNames[collectionId]
    }
    
    return collectionId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const categories = ['all', 'editorial', 'fashion', 'portrait', 'commercial']

  const filteredCollections = (() => {
    // Filtrar por categoría normalmente
    let collections = activeCategory === 'all' 
      ? workCollections 
      : workCollections.filter(collection => collection.category === activeCategory)
    
    // Solo aplicar el filtro de URL si no se ha aplicado aún ningún filtro manual
    // y si hay un parámetro de filtro en la URL
    if (filterParam && !initialFilterApplied && activeCategory === 'all') {
      const filteredByParam = collections.filter(collection => 
        collection.id === filterParam || 
        collection.title.toLowerCase().includes(filterParam.toLowerCase()) ||
        collection.id.toLowerCase().includes(filterParam.toLowerCase())
      )
      if (filteredByParam.length > 0) {
        return filteredByParam
      }
    }
    
    return collections
  })()

  const openLightbox = (photoIndex, collection) => {
    setCurrentLightboxPhotos(collection.photos)
    setLightboxIndex(photoIndex)
    setLightboxOpen(true)
  }

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setInitialFilterApplied(true) // Marcar que el usuario ha interactuado con los filtros
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

  return (
    <MainLayout>
      <div className="min-h-screen bg-fashion-bg text-fashion-fg pt-24">
        {/* Header */}
        <div className="container mx-auto px-8 py-16">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-inter text-5xl md:text-6xl font-light mb-6 text-fashion-fg tracking-wide">
              Portfolio
            </h1>
            <p className="font-inter text-xl text-fashion-fg-secondary max-w-3xl mx-auto">
              Una colección curada de mis trabajos más representativos, organizados por proyectos y estilos artísticos.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`font-inter px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-fashion-rose text-fashion-bg shadow-lg'
                    : 'bg-fashion-bg-secondary text-fashion-fg-secondary hover:bg-fashion-bg-tertiary'
                }`}
              >
                {category === 'all' ? 'Todos los Trabajos' : getCategoryLabel(category)}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="container mx-auto px-8 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <div className="aspect-[4/5] bg-fashion-bg-secondary animate-pulse rounded-lg" />
                  <div className="h-6 bg-fashion-bg-secondary animate-pulse rounded" />
                  <div className="h-4 bg-fashion-bg-secondary animate-pulse rounded w-2/3" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Collections */}
        {!loading && (
          <div className="container mx-auto px-8 pb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {filteredCollections.map((collection, index) => (
                  <motion.div
                    key={collection.id}
                    className="group"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Collection Cover */}
                    <div 
                      className="relative aspect-[4/5] overflow-hidden rounded-lg bg-fashion-bg-secondary mb-6 cursor-pointer"
                      onClick={() => openLightbox(0, collection)}
                    >
                      <OptimizedImage
                        src={collection.coverImage}
                        thumbnails={collection.photos[0]?.thumbnails}
                        alt={collection.title}
                        className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        objectFit="cover"
                        quality={80}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      
                      {/* Photo count badge */}
                      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        {collection.photos.length} fotos
                      </div>
                      
                      {/* Always visible info overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white text-sm mb-2 uppercase tracking-wide">
                          {getCategoryLabel(collection.category)}
                        </p>
                        <h3 className="font-inter text-white font-medium text-lg">
                          {formatCollectionName(collection.id)}
                        </h3>
                      </div>
                    </div>

                    {/* Collection Info - Always visible */}
                    <div className="text-center">
                      <h3 className="font-inter text-xl font-medium text-fashion-fg mb-2 tracking-wide">
                        {formatCollectionName(collection.id)}
                      </h3>
                      <p className="font-inter text-sm text-fashion-rose uppercase tracking-wide mb-3">
                        {getCategoryLabel(collection.category)} • {collection.photos.length} fotos
                      </p>
                      <p className="font-inter text-fashion-fg-secondary text-sm leading-relaxed">
                        {collection.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredCollections.length === 0 && !loading && (
              <div className="text-center py-16">
                <p className="text-fashion-fg-secondary text-lg">
                  No hay trabajos disponibles en esta categoría.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Lightbox */}
        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          images={currentLightboxPhotos.map(photo => ({
            src: photo.imageUrl,
            title: photo.title,
            description: photo.description
          }))}
          currentIndex={lightboxIndex}
          onNext={() => setLightboxIndex((prev) => (prev + 1) % currentLightboxPhotos.length)}
          onPrev={() => setLightboxIndex((prev) => (prev - 1 + currentLightboxPhotos.length) % currentLightboxPhotos.length)}
        />
      </div>
    </MainLayout>
  )
}
