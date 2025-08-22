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
      <footer className="bg-fashion-bg text-fashion-fg">
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Column */}
            <FadeInUp>
              <div className="lg:col-span-2">
                <Link href="/" className="inline-block mb-6">
                  <div className="flex flex-col items-start">
                    <span 
                      className="text-xl lg:text-2xl font-bold bg-clip-text text-transparent"
                      style={{
                        backgroundImage: 'linear-gradient(to right, #D2691E, #CD853F, #B8860B)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      Ana Nicoleta
                    </span>
                    <span className="text-xs text-fashion-muted uppercase tracking-widest">
                      {t('heroSubtitle')}
                    </span>
                  </div>
                </Link>
                
                <p className="text-fashion-muted leading-relaxed mb-8 max-w-md">
                  {t('aboutDescription')}
                </p>
                
                {/* Social Links */}
                <div className="flex gap-4">
                  <motion.a
                    href="https://instagram.com/ann__siedad.7"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-fashion-secondary/20 rounded-full flex items-center justify-center hover:bg-orange-600/30 transition-colors"
                  >
                    <Instagram size={18} />
                  </motion.a>
                  
                  <motion.a
                    href="mailto:contact@ananicoleta.com"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-fashion-secondary/20 rounded-full flex items-center justify-center hover:bg-orange-600/30 transition-colors"
                  >
                    <Mail size={18} />
                  </motion.a>
                </div>
              </div>
            </FadeInUp>

            {/* Quick Links */}
            <FadeInUp delay={0.2}>
              <div>
                <h4 className="font-medium text-lg mb-6 tracking-wide">
                  {t('quickLinks')}
                </h4>
                <AnimatedLine width="50px" delay={0.3} />
                <nav className="mt-6 space-y-3">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-fashion-muted hover:text-fashion-fg transition-colors hover:translate-x-1 transform duration-200"
                      style={{ color: 'inherit' }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </FadeInUp>

            {/* Services */}
            <FadeInUp delay={0.4}>
              <div>
                <h4 className="font-medium text-lg mb-6 tracking-wide">
                  {t('services')}
                </h4>
                <AnimatedLine width="50px" delay={0.5} />
                <div className="mt-6 space-y-3">
                  {services.map((service, index) => (
                    <p
                      key={index}
                      className="text-fashion-muted text-sm"
                    >
                      {service}
                    </p>
                  ))}
                </div>
              </div>
            </FadeInUp>
          </div>

          {/* Bottom Section */}
          <FadeInUp delay={0.6}>
            <div className="border-t border-fashion-secondary/20 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-fashion-muted text-sm">
                  {t('copyright')}
                </p>
                
                <div className="flex items-center gap-6 mt-4 md:mt-0">
                  <p className="text-fashion-muted text-sm">
                    {t('basedInSpain')} • {t('availableWorldwide')}
                  </p>
                  <div className="flex items-center gap-1 text-fashion-muted">
                    <Globe size={14} />
                    <span className="text-xs">{t('fluentLanguages')}</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeInUp>
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
