'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Mail, MapPin, ArrowUp, Globe } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { FadeInUp, AnimatedLine } from './animations/MicroAnimations'

export default function Footer() {
  const { t } = useLanguage()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quickLinks = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('portfolioTitle'), href: '/portfolio' },
    { name: t('contact'), href: '/contact' }
  ]

  const services = [
    t('editorialPhotography'),
    t('commercialCampaigns'),
    t('runwayShows'),
    t('portraitSessions')
  ]

  return (
    <>
  {/* Scroll to Top Button - un poco más arriba, sin pisar el footer */}
  <div className="w-full flex justify-end pr-8 pb-10">
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: showScrollTop ? 1 : 0, 
            scale: showScrollTop ? 1 : 0 
          }}
          onClick={scrollToTop}
          className="w-12 h-12 bg-fashion-bg border border-fashion-secondary/30 text-fashion-fg rounded-full flex items-center justify-center shadow-lg hover:bg-fashion-secondary/10 hover:border-orange-600/50 transition-colors"
        >
          <ArrowUp size={20} />
        </motion.button>
      </div>

    <footer className="bg-fashion-bg text-fashion-fg mt-auto">
        <div className="w-full pl-4 pr-4 lg:pl-72 lg:pr-8 pt-8 pb-8">
          {/* Footer con separación clara entre brand y navegación */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 lg:gap-24">
            
            {/* Brand Section - Pegada a la izquierda */}
            <FadeInUp>
              <div className="flex flex-col lg:max-w-xs">
                {/* Social links encima para alinear con los del sidebar */}
                <div className="flex space-x-4 mb-6">
                  <motion.a
                    href="https://instagram.com/ann__siedad.7"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Instagram size={18} />
                  </motion.a>
                  
                  <motion.a
                    href="mailto:anngsesiones@gmail.com"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Mail size={18} />
                  </motion.a>
                </div>

                <div className="mb-6">
                  <Link href="/" className="block">
                    <h1 className="text-2xl font-light tracking-widest text-white">
                      ANA<span className="font-bold">NICOLETA</span>
                    </h1>
                    <p 
                      className="text-xs font-thin text-gray-400 uppercase mt-1"
                      style={{ 
                        letterSpacing: '0.3em',
                        transform: 'scaleX(1.05)'
                      }}
                    >
                      DE PEDRO SANCHEZ
                    </p>
                  </Link>
                </div>
                
                <div className="mt-auto">
                  <p className="text-[#b8b8b8] leading-relaxed text-sm">
                    {t('aboutDescription')}
                  </p>
                </div>
              </div>
            </FadeInUp>

            {/* Navigation Grid - Agrupadas y alineadas a la derecha */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-end lg:max-w-2xl lg:ml-auto">
              
              {/* Quick Links */}
              <FadeInUp delay={0.2}>
                <div className="flex flex-col">
                  <h4 className="font-medium text-base mb-4 tracking-wide text-white">
                    {t('quickLinks')}
                  </h4>
                  <nav className="space-y-2">
                    {quickLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block text-[#b8b8b8] hover:text-white transition-colors text-sm leading-6"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </FadeInUp>

              {/* Services */}
              <FadeInUp delay={0.3}>
                <div className="flex flex-col">
                  <h4 className="font-medium text-base mb-4 tracking-wide text-white">
                    {t('services')}
                  </h4>
                  <div className="space-y-2">
                    {services.map((service, index) => (
                      <p
                        key={index}
                        className="text-[#b8b8b8] text-sm leading-6"
                      >
                        {service}
                      </p>
                    ))}
                  </div>
                </div>
              </FadeInUp>

              {/* Contact & Legal */}
              <FadeInUp delay={0.4}>
                <div className="flex flex-col">
                  <h4 className="font-medium text-base mb-4 tracking-wide text-white">
                    Contacto
                  </h4>
                  <div className="mb-6">
                    <p className="text-[#b8b8b8] text-sm flex items-center leading-6">
                      <Mail size={12} className="mr-2 flex-shrink-0" />
                      anngsesiones@gmail.com
                    </p>
                  </div>
                  
                  {/* Legal info con separador visual */}
                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-[#888] text-xs leading-5 mb-1">
                      © 2025 Ana Nicoleta
                    </p>
                    <p className="text-[#888] text-xs leading-5">
                      Todos los derechos reservados
                    </p>
                  </div>
                </div>
              </FadeInUp>
              
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
