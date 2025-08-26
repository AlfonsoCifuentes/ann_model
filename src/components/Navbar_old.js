'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Instagram, Mail, Camera, Sparkles } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'

const navigation = [
  { name: 'Inicio', href: '/', nameEn: 'Home', icon: Sparkles },
  { name: 'Sobre Mí', href: '/about', nameEn: 'About' },
  { name: 'Portfolio', href: '/portfolio', nameEn: 'Portfolio', icon: Camera },
  { name: 'Contacto', href: '/contact', nameEn: 'Contact', icon: Mail },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? 'glass-fashion-elevated py-3' 
            : 'bg-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo elegante */}
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/" className="group">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full glass-fashion flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-5 h-5 text-fashion-rose" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-fashion-hero bg-gradient-to-r from-fashion-fg to-fashion-rose bg-clip-text text-transparent">
                      Ana Nicoleta
                    </h1>
                    <p className="text-xs text-fashion-text-muted font-light tracking-wider">
                      Model
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Navegación desktop */}
            <div className="hidden lg:flex items-center space-x-2">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link 
                    href={item.href} 
                    className="group relative px-6 py-3 rounded-full transition-all duration-300 hover:bg-fashion-glass"
                  >
                    <div className="flex items-center space-x-2">
                      {item.icon && (
                        <item.icon className="w-4 h-4 text-fashion-text-muted group-hover:text-fashion-rose transition-colors duration-300" />
                      )}
                      <span className="text-fashion-fg group-hover:text-fashion-rose transition-colors duration-300 font-medium">
                        {item.name}
                      </span>
                    </div>
                    
                    {/* Efecto de hover elegante */}
                    <div className="absolute inset-0 rounded-full border border-fashion-rose/0 group-hover:border-fashion-rose/30 transition-all duration-300" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-fashion-rose/0 to-fashion-gold/0 group-hover:from-fashion-rose/5 group-hover:to-fashion-gold/5 transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Controles de la derecha */}
            <div className="flex items-center space-x-4">
              {/* Redes sociales */}
              <div className="hidden md:flex items-center space-x-3">
                <motion.a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group p-2 rounded-full glass-fashion hover:bg-fashion-rose/10 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram className="w-5 h-5 text-fashion-text-muted group-hover:text-fashion-rose transition-colors duration-300" />
                </motion.a>
                
                <motion.a 
                  href="mailto:ana@example.com"
                  className="group p-2 rounded-full glass-fashion hover:bg-fashion-gold/10 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5 text-fashion-text-muted group-hover:text-fashion-gold transition-colors duration-300" />
                </motion.a>
              </div>

              {/* Selector de idioma */}
              <LanguageSwitcher />

              {/* Botón de menú móvil */}
              <motion.button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-full glass-fashion hover:bg-fashion-rose/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6 text-fashion-fg" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6 text-fashion-fg" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Menú móvil elegante */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-fashion-bg/80 backdrop-blur-md z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleMobileMenu}
            />
            
            {/* Panel del menú */}
            <motion.div
              className="fixed top-20 right-6 glass-fashion-elevated p-6 rounded-3xl z-50 lg:hidden min-w-[280px]"
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="space-y-4">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link 
                      href={item.href}
                      className="group flex items-center space-x-4 p-4 rounded-2xl hover:bg-fashion-glass transition-all duration-300"
                      onClick={toggleMobileMenu}
                    >
                      {item.icon && (
                        <item.icon className="w-5 h-5 text-fashion-rose" />
                      )}
                      <span className="text-fashion-fg font-medium group-hover:text-fashion-rose transition-colors duration-300">
                        {item.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Redes sociales en móvil */}
                <div className="pt-4 border-t border-fashion-rose/20">
                  <div className="flex justify-center space-x-6">
                    <motion.a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 rounded-full glass-fashion hover:bg-fashion-rose/10 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Instagram className="w-6 h-6 text-fashion-rose" />
                    </motion.a>
                    
                    <motion.a 
                      href="mailto:ana@example.com"
                      className="p-3 rounded-full glass-fashion hover:bg-fashion-gold/10 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mail className="w-6 h-6 text-fashion-gold" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
