'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { HoverLift } from './animations/MicroAnimations'

export default function MasonryGrid({ images, columns = 3, gap = 16, onImageClick }) {
  const [items, setItems] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    if (!images.length) return

    const calculateMasonry = () => {
      const container = containerRef.current
      if (!container) return

      const containerWidth = container.offsetWidth
      const columnWidth = (containerWidth - (gap * (columns - 1))) / columns
      
      // Initialize column heights
      const columnHeights = new Array(columns).fill(0)
      const itemsWithPosition = []

      images.forEach((image, index) => {
        // Find shortest column
        const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
        
        // Calculate position
        const x = shortestColumnIndex * (columnWidth + gap)
        const y = columnHeights[shortestColumnIndex]
        
        // Estimate height based on aspect ratio or default
        const aspectRatio = image.aspectRatio || (Math.random() * 0.8 + 1.2) // Random between 1.2-2.0 for variety
        const height = columnWidth * aspectRatio
        
        itemsWithPosition.push({
          ...image,
          x,
          y,
          width: columnWidth,
          height,
          index
        })
        
        // Update column height
        columnHeights[shortestColumnIndex] += height + gap
      })
      
      setItems(itemsWithPosition)
      
      // Set container height
      const maxHeight = Math.max(...columnHeights)
      container.style.height = `${maxHeight}px`
    }

    calculateMasonry()
    
    const handleResize = () => {
      setTimeout(calculateMasonry, 100)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [images, columns, gap])

  return (
    <div ref={containerRef} className="relative w-full">
      <AnimatePresence mode="wait">
        {items.map((item) => (
          <motion.div
            key={`${item.src}-${item.index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: item.x,
              y: item.y
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: 0.6, 
              delay: item.index * 0.05,
              ease: "easeOut"
            }}
            className="absolute"
            style={{
              width: item.width,
              height: item.height
            }}
          >
            <HoverLift scale={1.02}>
              <div 
                className="w-full h-full group cursor-pointer overflow-hidden rounded-lg shadow-lg"
                onClick={() => onImageClick && onImageClick(item.index)}
              >
                <Image
                  src={item.src}
                  alt={item.title || 'Portfolio Image'}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-playfair text-lg font-medium mb-1">
                    {item.title}
                  </h3>
                  {item.photographer && (
                    <p className="font-inter text-sm opacity-90">
                      {item.photographer}
                    </p>
                  )}
                  {item.category && (
                    <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs font-inter font-medium mt-2">
                      {item.category}
                    </span>
                  )}
                </div>
              </div>
            </HoverLift>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
