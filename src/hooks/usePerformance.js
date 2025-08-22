'use client'

import { useState, useEffect, useRef } from 'react'

// Hook para detectar cuando un elemento entra en viewport
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [hasIntersected, options])

  return { elementRef, isIntersecting, hasIntersected }
}

// Hook para lazy loading de imágenes
export const useLazyImage = (src, options = {}) => {
  const [imageSrc, setImageSrc] = useState(null)
  const [imageRef, setImageRef] = useState()
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    let observer
    
    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setImageSrc(src)
                observer.unobserve(imageRef)
              }
            })
          },
          {
            threshold: 0.1,
            rootMargin: '50px',
            ...options,
          }
        )
        observer.observe(imageRef)
      } else {
        // Fallback for browsers without IntersectionObserver
        setImageSrc(src)
      }
    }

    return () => {
      if (observer && imageRef) {
        observer.unobserve(imageRef)
      }
    }
  }, [imageRef, imageSrc, src, options])

  const handleLoad = () => setLoaded(true)
  const handleError = () => setError(true)

  return { 
    imageSrc, 
    setImageRef, 
    loaded, 
    error, 
    handleLoad, 
    handleError 
  }
}

// Hook para precargar imágenes críticas
export const useImagePreloader = (imageUrls = []) => {
  const [loadedImages, setLoadedImages] = useState(new Set())
  const [loadingImages, setLoadingImages] = useState(new Set())

  const preloadImage = (url) => {
    if (loadedImages.has(url) || loadingImages.has(url)) {
      return Promise.resolve()
    }

    setLoadingImages(prev => new Set([...prev, url]))

    return new Promise((resolve, reject) => {
      const img = new Image()
      
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, url]))
        setLoadingImages(prev => {
          const newSet = new Set(prev)
          newSet.delete(url)
          return newSet
        })
        resolve()
      }
      
      img.onerror = () => {
        setLoadingImages(prev => {
          const newSet = new Set(prev)
          newSet.delete(url)
          return newSet
        })
        reject(new Error(`Failed to load image: ${url}`))
      }
      
      img.src = url
    })
  }

  const preloadImages = async (urls) => {
    const promises = urls.map(url => preloadImage(url))
    try {
      await Promise.all(promises)
    } catch (error) {
      console.warn('Some images failed to preload:', error)
    }
  }

  useEffect(() => {
    if (imageUrls.length > 0) {
      preloadImages(imageUrls)
    }
  }, [imageUrls])

  return {
    loadedImages,
    loadingImages,
    preloadImage,
    preloadImages,
    isLoaded: (url) => loadedImages.has(url),
    isLoading: (url) => loadingImages.has(url)
  }
}

// Hook para detectar dispositivos móviles
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  return isMobile
}

// Hook para scroll suave con offset
export const useSmoothScroll = () => {
  const scrollToElement = (elementId, offset = 0) => {
    const element = document.getElementById(elementId)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return { scrollToElement }
}

export default {
  useIntersectionObserver,
  useLazyImage,
  useImagePreloader,
  useIsMobile,
  useSmoothScroll
}
