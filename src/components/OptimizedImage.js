/**
 * OPTIMIZED IMAGE COMPONENT
 * Componente optimizado con lazy loading y Progressive Enhancement
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const OptimizedImage = ({
  src,
  thumbnails = {},
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
  placeholder = 'blur',
  sizes = '100vw',
  objectFit = 'cover',
  onLoad,
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Si es priority, cargar inmediatamente
  const imgRef = useRef(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '100px 0px', // Cargar 100px antes de que entre en vista
        threshold: 0.1
      }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [priority, isInView]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    onLoad && onLoad();
  };

  // Generar thumbnails para imágenes locales usando Next.js Image optimization
  const getOptimizedSrc = (baseSize = 400) => {
    if (src.includes('cloudinary.com')) {
      return src; // Cloudinary ya está optimizado
    }
    return src; // Next.js optimizará automáticamente
  };

  // Placeholder blur optimizado
  const blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden bg-fashion-bg-tertiary ${className}`}
      style={{ width, height }}
      {...props}
    >
      {isInView ? (
        <Image
          src={getOptimizedSrc()}
          alt={alt}
          fill={!width && !height}
          width={width}
          height={height}
          className={`transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ objectFit }}
          quality={quality}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          sizes={sizes}
          onLoad={handleImageLoad}
          loading={priority ? 'eager' : 'lazy'}
        />
      ) : (
        // Placeholder mientras no está en vista
        <div className="w-full h-full bg-gradient-to-br from-fashion-bg-secondary via-fashion-bg-tertiary to-fashion-bg animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-fashion-rose/30 border-t-fashion-rose rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Loading overlay mientras carga la imagen real */}
      {isInView && !imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-fashion-bg-tertiary/50 backdrop-blur-sm">
          <div className="w-6 h-6 border-2 border-fashion-rose border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
