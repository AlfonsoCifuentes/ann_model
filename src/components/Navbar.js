'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Instagram, Mail, Home, User, Image as ImageIcon, Phone } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'

const navigation = [
  { name: 'Inicio', href: '/', nameEn: 'Home', icon: Home },
  { name: 'Sobre Mí', href: '/about', nameEn: 'About', icon: User },
  { name: 'Portfolio', href: '/portfolio', nameEn: 'Portfolio', icon: ImageIcon },
  { name: 'Contacto', href: '/contact', nameEn: 'Contact', icon: Phone },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <>
      {/* Navbar principal */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/90 backdrop-blur-xl border-b border-orange-700/10' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-full px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              <Link href="/" className="block" style={{ color: 'inherit' }}>
                <div className="flex flex-col items-start">
                  <span 
                    className="text-xl lg:text-2xl font-playfair font-light bg-clip-text text-transparent"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #D2691E, #CD853F, #B8860B)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    Ana Nicoleta
                  </span>
                  <span 
                    className="text-xs font-inter font-light text-white/80 uppercase tracking-widest text-center"
                    style={{ 
                      letterSpacing: '0.3em',
                      transform: 'scaleX(1.05)',
                      marginTop: '-2px',
                      marginBottom: '2px'
                    }}
                  >
                    DE PEDRO SANCHEZ
                  </span>
                  <span className="text-xs font-inter text-fashion-platinum/60 uppercase tracking-widest">
                    Model & Actress
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Navegación Desktop - Solo iconos en pantallas medianas */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link 
                    href={item.href} 
                    className="group relative flex items-center px-3 lg:px-4 py-2 transition-all duration-300 hover:bg-white/10 rounded-full"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    <item.icon className="w-4 h-4 text-fashion-platinum/70 group-hover:text-orange-400 transition-colors duration-300" />
                    {/* Texto visible solo en pantallas grandes */}
                    <span className="hidden lg:block ml-2 text-sm font-medium text-fashion-platinum/80 group-hover:text-white transition-colors duration-300">
                      {item.name}
                    </span>
                    {/* Tooltip para pantallas medianas */}
                    <div className="lg:hidden absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                      {item.name}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Controles derecha */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              
              {/* Language Switcher - Solo en desktop */}
              <div className="hidden lg:block">
                <LanguageSwitcher />
              </div>

              {/* Redes sociales - Solo en desktop */}
              <div className="hidden lg:flex items-center space-x-2">
                <motion.a
                  href="https://instagram.com/ann__siedad.7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-fashion-platinum/60 hover:text-orange-400 transition-colors duration-300 hover:bg-white/10 rounded-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="mailto:contact@ananicoleta.com"
                  className="p-2 text-fashion-platinum/60 hover:text-orange-400 transition-colors duration-300 hover:bg-white/10 rounded-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-4 h-4" />
                </motion.a>
              </div>

              {/* Botón hamburguesa - Solo móvil */}
              <motion.button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 text-fashion-platinum hover:text-orange-400 transition-colors duration-300 hover:bg-white/10 rounded-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Overlay */}
            <motion.div 
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            />
            
            {/* Contenido del menú */}
            <motion.div
              className="relative h-full flex flex-col justify-center items-center space-y-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={toggleMobileMenu}
                    className="group flex flex-col items-center space-y-2 p-4"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    <div className="p-4 bg-white/10 rounded-2xl group-hover:bg-orange-700/20 transition-colors duration-300">
                      <item.icon className="w-8 h-8 text-fashion-platinum group-hover:text-orange-400 transition-colors duration-300" />
                    </div>
                    <span className="text-xl font-medium text-fashion-platinum group-hover:text-white transition-colors duration-300">
                      {item.name}
                    </span>
                  </Link>
                </motion.div>
              ))}

              {/* Language Switcher y redes en móvil */}
              <motion.div
                className="flex flex-col items-center space-y-6 pt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <LanguageSwitcher />
                
                <div className="flex items-center space-x-6">
                  <motion.a
                    href="https://instagram.com/ann__siedad.7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 rounded-xl text-fashion-platinum hover:text-orange-400 hover:bg-orange-700/20 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Instagram className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href="mailto:contact@ananicoleta.com"
                    className="p-3 bg-white/10 rounded-xl text-fashion-platinum hover:text-orange-400 hover:bg-orange-700/20 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="w-6 h-6" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}