'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const heroImages = [
  '/photos/classy-test.jpg',
  '/photos/SVM05720.jpg',
  '/photos/geisha.jpg',
  '/photos/hero-2.jpg',
  '/photos/SVM05741.jpg'
]

export default function EnhancedHero() {
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => { setIsLoaded(true) }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2, staggerChildren: 0.3 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 1.05, transition: { duration: 0.8 } }
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className={`absolute inset-0 ${
        currentImageIndex === 0 || currentImageIndex === 2 || currentImageIndex === 3
          ? 'scale-100' 
          : 'scale-110 transform translate-x-[5%]'
      }`}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImageIndex}
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImageIndex]}
              alt="Ana Nicoleta - Professional Portfolio"
              fill
              className={`object-cover ${
                currentImageIndex === 0
                  ? 'object-bottom md:object-bottom object-left' // Imagen 1: hacia la IZQUIERDA en móvil
                  : currentImageIndex === 2
                  ? 'object-center md:object-center object-[55%]' // Imagen 3: más hacia la IZQUIERDA (55% desde la izquierda)
                  : currentImageIndex === 3
                  ? 'object-center md:object-center object-[78%]' // Imagen 4: un poco más hacia la DERECHA (78% desde la izquierda)
                  : currentImageIndex === heroImages.length - 1
                  ? 'object-center'
                  : 'object-top'
              }`}
              priority
              quality={95}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 via-transparent to-black/25" />
      </div>

      {/* Content overlay - force transparent bg to avoid global .min-h-screen black overlay */}
      <div className="relative z-10 min-h-screen flex items-center hero-content-surface">
        <div className="w-full max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div variants={containerVariants} initial="hidden" animate={isLoaded ? 'visible' : 'hidden'} className="text-left text-white">
            <motion.div variants={itemVariants} className="mb-6 inline-block">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-widest mb-2 text-white">
                ANA<span className="font-bold">NICOLETA</span>
              </h1>
              <p className="font-sans text-base md:text-xl lg:text-2xl font-thin text-white uppercase text-center" style={{ letterSpacing: '0.65em', transform: 'scaleX(1.05)' }}>
                DE PEDRO SANCHEZ
              </p>
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg md:text-xl font-light tracking-wider mb-4 text-white uppercase">
              {t('heroSubtitle')}
            </motion.p>
            <motion.p variants={itemVariants} className="text-base md:text-lg font-light max-w-lg mb-12 text-white leading-relaxed tracking-wide">
              {t('heroDescription')}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-16">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact" className="btn btn-primary uppercase text-sm tracking-widest h-14 flex items-center justify-center">
                  {t('contactMe')}
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/portfolio" className="btn btn-secondary-hero uppercase text-sm tracking-widest h-14 flex items-center justify-center">
                  {t('viewFullPortfolio')}
                </Link>
              </motion.div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-center mb-8">
              <div className="flex gap-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${currentImageIndex === index ? 'bg-white' : 'bg-white/40'}`}
                    aria-label={`Ir a la imagen ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 1 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="flex flex-col items-center">
          <span className="font-inter text-xs font-light tracking-widest mb-2 opacity-80 uppercase">Scroll</span>
          <ChevronDown size={20} className="opacity-60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
