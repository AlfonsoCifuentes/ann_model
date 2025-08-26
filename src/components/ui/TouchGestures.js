'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'

// Touch gesture hook
export function useSwipeGesture(onSwipe) {
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const minSwipeDistance = 50

  useEffect(() => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe || isRightSwipe) {
      onSwipe(isLeftSwipe ? 'left' : 'right')
    }
  }, [touchStart, touchEnd, onSwipe])

  return {
    onTouchStart: (e) => setTouchStart(e.targetTouches[0].clientX),
    onTouchMove: (e) => setTouchEnd(e.targetTouches[0].clientX),
    onTouchEnd: () => {
      setTouchStart(null)
      setTouchEnd(null)
    }
  }
}

// Swipeable Image Gallery
export function SwipeableGallery({ images = [], className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 0, 200], [-5, 0, 5])
  const opacity = useTransform(x, [-200, 0, 200], [0.8, 1, 0.8])

  const handleDragEnd = (event, info) => {
    const threshold = 100
    
    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else if (info.offset.x < -threshold && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const swipeGesture = useSwipeGesture((direction) => {
    if (direction === 'left' && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else if (direction === 'right' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  })

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="flex"
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30 
        }}
        {...swipeGesture}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="w-full flex-shrink-0 relative"
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 0.95 }}
          >
            <img
              src={image.src}
              alt={image.alt || `Slide ${index + 1}`}
              className="w-full h-full object-cover select-none"
              draggable={false}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
        disabled={currentIndex === 0}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-white disabled:opacity-50 transition-all"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => setCurrentIndex(Math.min(images.length - 1, currentIndex + 1))}
        disabled={currentIndex === images.length - 1}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-white disabled:opacity-50 transition-all"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

// Pull to Refresh Component
export function PullToRefresh({ onRefresh, children, className = "" }) {
  const [isPulling, setIsPulling] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const y = useMotionValue(0)
  const pullProgress = useTransform(y, [0, 100], [0, 1])
  const rotate = useTransform(y, [0, 100], [0, 180])

  const handleDragEnd = async (event, info) => {
    if (info.offset.y > 80 && !isRefreshing) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
        setIsPulling(false)
      }
    } else {
      setIsPulling(false)
    }
  }

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ y }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.2, bottom: 0 }}
      onDragStart={() => setIsPulling(true)}
      onDragEnd={handleDragEnd}
    >
      {/* Pull Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isPulling || isRefreshing ? 1 : 0,
          scale: isPulling || isRefreshing ? 1 : 0
        }}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full p-4"
      >
        <motion.div
          style={{ rotate }}
          animate={{ rotate: isRefreshing ? 360 : rotate }}
          transition={{ 
            duration: isRefreshing ? 1 : 0,
            repeat: isRefreshing ? Infinity : 0,
            ease: "linear"
          }}
          className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full"
        />
      </motion.div>

      {children}
    </motion.div>
  )
}

// Pinch to Zoom Image
export function PinchToZoomImage({ src, alt, className = "" }) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const resetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  // Handle touch events for pinch zoom
  useEffect(() => {
    let initialDistance = 0
    let initialScale = 1

    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        const touch1 = e.touches[0]
        const touch2 = e.touches[1]
        initialDistance = Math.hypot(
          touch1.clientX - touch2.clientX,
          touch1.clientY - touch2.clientY
        )
        initialScale = scale
      }
    }

    const handleTouchMove = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault()
        const touch1 = e.touches[0]
        const touch2 = e.touches[1]
        const distance = Math.hypot(
          touch1.clientX - touch2.clientX,
          touch1.clientY - touch2.clientY
        )
        
        const newScale = Math.max(0.5, Math.min(3, initialScale * (distance / initialDistance)))
        setScale(newScale)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true })
      container.addEventListener('touchmove', handleTouchMove, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchmove', handleTouchMove)
      }
    }
  }, [scale])

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden touch-none ${className}`}
      onDoubleClick={resetZoom}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{
          scale,
          x: position.x,
          y: position.y
        }}
        drag={scale > 1}
        dragConstraints={containerRef}
        dragElastic={0.1}
        onDrag={(event, info) => {
          setPosition({
            x: info.offset.x,
            y: info.offset.y
          })
        }}
        animate={{
          scale,
          x: position.x,
          y: position.y
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      />
      
      {/* Reset button */}
      {scale !== 1 && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={resetZoom}
          className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </motion.button>
      )}
    </div>
  )
}

// Responsive Card Stack with gesture controls
export function ResponsiveCardStack({ cards = [], className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [draggedCard, setDraggedCard] = useState(null)

  const handleCardDrag = (cardIndex, info) => {
    setDraggedCard(cardIndex)
    
    // If dragged far enough, move to next card
    if (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 100) {
      setCurrentIndex((prev) => (prev + 1) % cards.length)
      setDraggedCard(null)
    }
  }

  const handleCardDragEnd = () => {
    setDraggedCard(null)
  }

  return (
    <div className={`relative h-96 ${className}`}>
      {cards.map((card, index) => {
        const isActive = index === currentIndex
        const isNext = index === (currentIndex + 1) % cards.length
        const isPrev = index === (currentIndex - 1 + cards.length) % cards.length
        
        let zIndex = 0
        let scale = 0.8
        let y = 20
        let opacity = 0
        
        if (isActive) {
          zIndex = 30
          scale = 1
          y = 0
          opacity = 1
        } else if (isNext) {
          zIndex = 20
          scale = 0.95
          y = 10
          opacity = 0.7
        } else if (isPrev) {
          zIndex = 10
          scale = 0.9
          y = 15
          opacity = 0.5
        }

        return (
          <motion.div
            key={card.id || index}
            className="absolute inset-0 bg-white rounded-xl shadow-lg p-6 cursor-grab active:cursor-grabbing"
            style={{ zIndex }}
            initial={{ scale: 0.8, y: 20, opacity: 0 }}
            animate={{ 
              scale: draggedCard === index ? 1.05 : scale,
              y: draggedCard === index ? -10 : y,
              opacity,
              rotate: draggedCard === index ? Math.random() * 10 - 5 : 0
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            drag={isActive}
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            dragElastic={0.2}
            onDrag={(event, info) => handleCardDrag(index, info)}
            onDragEnd={handleCardDragEnd}
            whileHover={{ scale: isActive ? 1.02 : scale }}
          >
            <div className="h-full flex flex-col">
              {card.image && (
                <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <h3 className="font-playfair text-xl font-light mb-2 text-gray-900">
                {card.title}
              </h3>
              
              <p className="font-inter text-sm text-gray-600 flex-1">
                {card.description}
              </p>
              
              {card.action && (
                <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-inter text-sm">
                  {card.action}
                </button>
              )}
            </div>
          </motion.div>
        )
      })}
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-black scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// Responsive breakpoint hook
export function useResponsiveBreakpoint() {
  const [breakpoint, setBreakpoint] = useState('lg')

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth
      if (width < 640) setBreakpoint('sm')
      else if (width < 768) setBreakpoint('md')
      else if (width < 1024) setBreakpoint('lg')
      else if (width < 1280) setBreakpoint('xl')
      else setBreakpoint('2xl')
    }

    checkBreakpoint()
    window.addEventListener('resize', checkBreakpoint)
    return () => window.removeEventListener('resize', checkBreakpoint)
  }, [])

  return breakpoint
}
