'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Mail, Phone, MapPin, ArrowUp, Globe } from 'lucide-react'
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
    { name: t('contactTitle'), href: '/contact' }
  ]

  const services = [
    t('editorialPhotography'),
    t('commercialCampaigns'),
    t('runwayShows'),
    t('actingProjects')
  ]

  return (
    <>
      <footer className="bg-fashion-bg text-fashion-fg mt-auto">
        {/* Padding left en desktop para compensar el sidebar, padding normal en móviles */}
        <div className="w-full pl-4 pr-4 lg:pl-72 lg:pr-8 py-2 lg:py-3">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-3 lg:gap-6">
            
            {/* Brand Section - Más compacta */}
            <FadeInUp>
              <div className="flex-shrink-0 lg:max-w-sm">
                <Link href="/" className="inline-block mb-2">
                  <div className="flex flex-col items-start">
                    <h1 className="text-base lg:text-lg font-light tracking-widest text-white">
                      ANA<span className="font-bold">NICOLETA</span>
                    </h1>
                    <span 
                      className="text-xs font-thin text-white/80 uppercase"
                      style={{ 
                        letterSpacing: '0.3em',
                        transform: 'scaleX(1.05)',
                        marginTop: '-2px',
                        marginBottom: '2px'
                      }}
                    >
                      DE PEDRO SANCHEZ
                    </span>
                    <span className="text-xs text-fashion-muted uppercase tracking-widest">
                      {t('heroSubtitle')}
                    </span>
                  </div>
                </Link>
                
                <p className="text-fashion-muted leading-relaxed text-xs mb-3 max-w-xs">
                  {t('aboutDescription')}
                </p>
                
                {/* Social Links */}
                <div className="flex gap-2">
                  <motion.a
                    href="https://instagram.com/ann__siedad.7"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-7 h-7 bg-fashion-secondary/20 rounded-full flex items-center justify-center hover:bg-orange-600/30 transition-colors"
                  >
                    <Instagram size={14} />
                  </motion.a>
                  
                  <motion.a
                    href="mailto:contact@ananicoleta.com"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-7 h-7 bg-fashion-secondary/20 rounded-full flex items-center justify-center hover:bg-orange-600/30 transition-colors"
                  >
                    <Mail size={14} />
                  </motion.a>
                </div>
              </div>
            </FadeInUp>

            {/* Navigation & Services - Distribuidos ocupando TODO el resto del ancho hasta el borde */}
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              
              {/* Quick Links */}
              <FadeInUp delay={0.2}>
                <div>
                  <h4 className="font-medium text-sm mb-2 tracking-wide text-white">
                    {t('quickLinks')}
                  </h4>
                  <nav className="space-y-1">
                    {quickLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block text-fashion-muted hover:text-fashion-fg transition-colors text-xs"
                        style={{ color: 'inherit' }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </FadeInUp>

              {/* Services */}
              <FadeInUp delay={0.3}>
                <div>
                  <h4 className="font-medium text-sm mb-2 tracking-wide text-white">
                    {t('services')}
                  </h4>
                  <div className="space-y-1">
                    {services.map((service, index) => (
                      <p
                        key={index}
                        className="text-fashion-muted text-xs"
                      >
                        {service}
                      </p>
                    ))}
                  </div>
                </div>
              </FadeInUp>

              {/* Contact Info */}
              <FadeInUp delay={0.4}>
                <div>
                  <h4 className="font-medium text-sm mb-2 tracking-wide text-white">
                    Contacto
                  </h4>
                  <div className="space-y-1">
                    <p className="text-fashion-muted text-xs flex items-center">
                      <MapPin size={10} className="mr-1" />
                      España
                    </p>
                    <p className="text-fashion-muted text-xs flex items-center">
                      <Globe size={10} className="mr-1" />
                      Mundial
                    </p>
                    <p className="text-fashion-muted text-xs flex items-center">
                      <Mail size={10} className="mr-1" />
                      contact@ananicoleta.com
                    </p>
                  </div>
                </div>
              </FadeInUp>

              {/* Legal */}
              <FadeInUp delay={0.5}>
                <div>
                  <h4 className="font-medium text-sm mb-2 tracking-wide text-white">
                    Legal
                  </h4>
                  <div className="space-y-1">
                    <p className="text-fashion-muted text-xs">
                      {t('copyright')}
                    </p>
                    <p className="text-fashion-muted text-xs">
                      Todos los derechos reservados
                    </p>
                    <p className="text-fashion-muted text-xs">
                      {t('fluentLanguages')}
                    </p>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0, 
          scale: showScrollTop ? 1 : 0 
        }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-fashion-bg border border-fashion-secondary/30 text-fashion-fg rounded-full flex items-center justify-center shadow-lg hover:bg-fashion-secondary/10 hover:border-orange-600/50 transition-colors"
      >
        <ArrowUp size={20} />
      </motion.button>
    </>
  )
}
