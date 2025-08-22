'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '../../contexts/LanguageContext'

export default function IntelligentNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [scrollDirection, setScrollDirection] = useState('up')
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const { t, language, toggleLanguage } = useLanguage()

  // Track scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      setIsScrolled(currentScrollY > 50)
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down')
      } else {
        setScrollDirection('up')
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const navigationItems = [
    { href: '/', label: t('nav.home'), key: 'home' },
    { href: '/about', label: t('nav.about'), key: 'about' },
    { href: '/portfolio', label: t('nav.portfolio'), key: 'portfolio' },
    { href: '/contact', label: t('nav.contact'), key: 'contact' }
  ]

  const isActive = (href) => pathname === href

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ 
          y: scrollDirection === 'down' && isScrolled ? -100 : 0,
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0)',
          backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
          borderBottomColor: isScrolled ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0)'
        }}
        transition={{ 
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="fixed top-0 left-0 right-0 z-50 border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <Link href="/" className="group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-playfair text-xl md:text-2xl font-light tracking-[0.2em] text-gray-900"
              >
                ANA NICOLETA
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                  className="h-px bg-gray-900 mt-1"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="relative group"
                  onMouseEnter={() => setHoveredItem(item.key)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <motion.span
                    className={`font-inter text-sm tracking-wide transition-colors ${
                      isActive(item.href) 
                        ? 'text-black font-medium' 
                        : 'text-gray-600 hover:text-black'
                    }`}
                    whileHover={{ y: -1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                  
                  {/* Active indicator */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: isActive(item.href) ? 1 : 0,
                      opacity: isActive(item.href) ? 1 : 0
                    }}
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full"
                  />
                  
                  {/* Hover underline */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ 
                      width: hoveredItem === item.key && !isActive(item.href) ? '100%' : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute -bottom-0.5 left-0 h-px bg-gray-400"
                  />
                </Link>
              ))}
              
              {/* Language Toggle */}
              <motion.button
                onClick={toggleLanguage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1 px-3 py-1.5 border border-gray-200 rounded-full hover:border-gray-300 transition-colors"
              >
                <span className="font-inter text-xs font-medium text-gray-700">
                  {language.toUpperCase()}
                </span>
                <motion.div
                  animate={{ rotate: hoveredItem === 'language' ? 180 : 0 }}
                  className="w-3 h-3 text-gray-500"
                >
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-8 h-8 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <motion.div className="flex flex-col space-y-1.5">
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 6 : 0
                  }}
                  className="w-5 h-0.5 bg-gray-900 origin-center transition-all"
                />
                <motion.span
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1
                  }}
                  className="w-5 h-0.5 bg-gray-900"
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -6 : 0
                  }}
                  className="w-5 h-0.5 bg-gray-900 origin-center transition-all"
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-50 md:hidden"
            >
              <div className="p-6">
                
                {/* Close Button */}
                <div className="flex justify-end mb-8">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-6">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.3,
                        delay: index * 0.1 + 0.2
                      }}
                    >
                      <Link
                        href={item.href}
                        className={`block font-inter text-lg tracking-wide transition-colors ${
                          isActive(item.href)
                            ? 'text-black font-medium'
                            : 'text-gray-600 hover:text-black'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                        {isActive(item.href) && (
                          <motion.div
                            layoutId="mobile-active-indicator"
                            className="w-6 h-0.5 bg-black mt-1"
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Language Toggle */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3,
                    delay: 0.6
                  }}
                  className="mt-12 pt-6 border-t border-gray-200"
                >
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center space-x-3 text-gray-600 hover:text-black transition-colors"
                  >
                    <span className="font-inter text-sm">Language</span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                      {language.toUpperCase()}
                    </span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// Breadcrumb Navigation
export function BreadcrumbNavigation({ items = [] }) {
  return (
    <nav className="flex items-center space-x-2 text-sm font-inter text-gray-500 mb-8">
      <Link 
        href="/" 
        className="hover:text-gray-900 transition-colors"
      >
        Home
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}

// Progress Indicator for page scrolling
export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 h-0.5 bg-black z-50"
      style={{ 
        width: `${scrollProgress}%`,
        originX: 0
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.1 }}
    />
  )
}
