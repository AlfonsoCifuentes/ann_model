'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import MainLayout from '../../components/MainLayout'
import Lightbox from '../../components/Lightbox'
import OptimizedImage from '../../components/OptimizedImage'
import { useLanguage } from '../../contexts/LanguageContext'

function PortfolioContent() {
  const { t } = useLanguage()
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
        // Traer TODAS las fotos activas de todas las secciones
        const response = await fetch('/api/photos?status=active')
        const result = await response.json()
        
        if (result.success) {
          // Helpers de normalización y deduplicación
          const normalizeCollectionId = (id) =>
            String(id)
              .trim()
              .toLowerCase()
              .replace(/[_\s]+/g, '-')
              .replace(/-+/g, '-')
              .replace(/[^a-z0-9-]/g, '')
              .replace(/^-+|-+$/g, '')

          const uniqueBy = (arr, keyFn) => {
            const seen = new Set()
            return arr.filter(item => {
              const key = keyFn(item)
              if (seen.has(key)) return false
              seen.add(key)
              return true
            })
          }

          // Agrupar fotos por workCollection normalizado
          const collections = new Map()

          result.data.forEach(photo => {
            if (!photo?.workCollection || !photo?.imageUrl) return
            
            // Filtrar solo fotos del portfolio O fotos SVM de cualquier sección
            const imageFileName = photo.imageUrl.split('/').pop() || ''
            const isSVMPhoto = imageFileName.toUpperCase().startsWith('SVM')
            const isPortfolioSection = photo.portfolioSection === 'portfolio'
            
            if (!isPortfolioSection && !isSVMPhoto) return
            
            // Lógica especial: asignar fotos SVM* a la colección "Polas"
            let workCollectionToUse = photo.workCollection
            if (isSVMPhoto) {
              workCollectionToUse = 'polaroids-vintage' // Asignar a Polas
            }
            
            const normId = normalizeCollectionId(workCollectionToUse)
            const formattedName = formatCollectionName(normId)
            
            // Saltar colecciones excluidas
            if (formattedName === null) return
            
            if (!collections.has(normId)) {
              collections.set(normId, {
                id: normId,
                title: formattedName,
                description: photo.description || t('artisticPhotos'),
                category: photo.category,
                photos: [],
                coverImage: photo.imageUrl
              })
            }
            const col = collections.get(normId)
            
            // Aplicar descripción personalizada SIEMPRE para colecciones específicas
            if (normId.includes('artistico') || normId.includes('artstico') || formattedName === 'Make-up creativo') {
              col.description = 'Sesión de make-up creativo, fusionando arte corporal con naturaleza'
            }
            
            col.photos.push(photo)
            // Preferir primera imagen válida como cover si no está definida
            if (!col.coverImage && photo.imageUrl) {
              col.coverImage = photo.imageUrl
            }
            // Mantener la primera categoría definida si cambia
            if (!col.category && photo.category) {
              col.category = photo.category
            }
          })

          // Deduplicar fotos por imageUrl y ordenar por order dentro de cada colección
          collections.forEach(collection => {
            collection.photos = uniqueBy(collection.photos, (p) => p.imageUrl)
            collection.photos.sort((a, b) => (a.order || 0) - (b.order || 0))
            // Asegurar coverImage consistente con el primer elemento tras ordenar
            if (collection.photos.length > 0) {
              collection.coverImage = collection.photos[0].imageUrl
            }
          })

          // Convertir a array y eliminar colecciones duplicadas por título mostrado y portada
          let collectionsArray = Array.from(collections.values())
          const usedTitles = new Set()
          const usedCovers = new Set()
          collectionsArray = collectionsArray.filter(c => {
            const displayTitle = formatCollectionName(c.id).trim()
            if (!c.coverImage) return false
            if (usedTitles.has(displayTitle)) return false
            if (usedCovers.has(c.coverImage)) return false
            usedTitles.add(displayTitle)
            usedCovers.add(c.coverImage)
            return true
          })

          // Filtro específico para "Body Paint Japonés" - mantener solo el primero
          const bodyPaintJapones = collectionsArray.filter(c => 
            formatCollectionName(c.id) === 'Body Paint Japonés'
          )
          
          if (bodyPaintJapones.length > 1) {
            // Mantener solo el primero y remover los demás del array
            const firstBodyPaint = bodyPaintJapones[0]
            collectionsArray = collectionsArray.filter(c => {
              if (formatCollectionName(c.id) === 'Body Paint Japonés') {
                return c.id === firstBodyPaint.id
              }
              return true
            })
          }

          // Ordenar colecciones: "Polas" siempre primero, luego el resto alfabéticamente
          collectionsArray.sort((a, b) => {
            const aTitle = formatCollectionName(a.id)
            const bTitle = formatCollectionName(b.id)
            
            // "Polas" siempre va primero
            if (aTitle === 'Polas') return -1
            if (bTitle === 'Polas') return 1
            
            // El resto ordenado alfabéticamente
            return aTitle.localeCompare(bTitle)
          })

          setWorkCollections(collectionsArray)
          
          // Debug final: contar fotos SVM en la colección Polas
          const polasCollection = collectionsArray.find(c => c.id === 'polaroids-vintage')
          if (polasCollection) {
            const svmPhotos = polasCollection.photos.filter(photo => {
              const fileName = photo.imageUrl.split('/').pop() || ''
              return fileName.toUpperCase().startsWith('SVM')
            })
            console.log('DEBUG FINAL - Fotos SVM en Polas:', svmPhotos.length, 'de', polasCollection.photos.length, 'total')
            console.log('DEBUG FINAL - Archivos SVM en Polas:', svmPhotos.map(p => p.imageUrl.split('/').pop()).slice(0, 10))
          }
          
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
  }, [filterParam, t])

  const formatCollectionName = (collectionId) => {
    // Casos especiales de nombres
    const specialNames = {
      'polaroids-vintage': 'Polas',
      'body-paint-japones': 'Body Paint Japonés', // Versión correcta con acento
      'body-paint-artistico': 'Make-up creativo',  // Sin acento (normalizado)
      'body-paint-artstico': 'Make-up creativo',   // Variante sin 'i'
      'body-paint-urbano': 'Body Paint Urbano',
      'elegancia-clasica': 'Elegancia Clásica'
    }
    
    // Colecciones a excluir
    const excludedCollections = new Set([
      'maquillaje-artistico',
      'maquillaje-artístico',
      'maquillaje_artistico',
      'body-paint-japons',   // Sin acento - a excluir (nombre incorrecto)
      'body_paint_japons',   // Variante con guiones bajos
      'body-paint-natural',  // Eliminar Body Paint Natural
      'body_paint_natural',  // Variante con guiones bajos
      'sesion-profesional',  // Eliminar Sesión Profesional
      'sesión-profesional',  // Variante con acento
      'sesion_profesional'   // Variante con guiones bajos
    ])
    
    if (excludedCollections.has(collectionId)) {
      return null // Marcamos para exclusión
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

  // Calcular qué categorías tienen colecciones disponibles
  const availableCategories = (() => {
    const categoriesWithCollections = new Set(['all']) // 'all' siempre está disponible
    
    workCollections.forEach(collection => {
      if (collection.category) {
        categoriesWithCollections.add(collection.category)
      }
    })
    
    return categories.filter(category => categoriesWithCollections.has(category))
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

  // Resetear a "all" si la categoría activa no está disponible
  useEffect(() => {
    if (workCollections.length > 0 && !availableCategories.includes(activeCategory)) {
      setActiveCategory('all')
    }
  }, [workCollections, availableCategories, activeCategory])

  const getCategoryLabel = (category) => {
    const labels = {
      editorial: t('editorialCat'),
      fashion: t('fashionCat'),
      portrait: t('portraitCat'),
      commercial: t('commercialCat')
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
              {t('portfolioTitle')}
            </h1>
            <p className="font-inter text-xl text-fashion-fg-secondary max-w-3xl mx-auto">
              {t('portfolioDescription')}
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {availableCategories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`font-inter px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-fashion-rose text-fashion-bg shadow-lg'
                    : 'bg-fashion-bg-secondary text-fashion-fg-secondary hover:bg-fashion-bg-tertiary'
                }`}
              >
                {category === 'all' ? t('allCategories') : getCategoryLabel(category)}
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

export default function PortfolioPage() {
  return (
    <Suspense fallback={
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fashion-rose"></div>
        </div>
      </MainLayout>
    }>
      <PortfolioContent />
    </Suspense>
  )
}
