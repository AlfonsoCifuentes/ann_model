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
      <footer className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Column */}
            <FadeInUp>
              <div className="lg:col-span-2">
                <Link href="/" className="inline-block mb-6">
                  <h3 className="font-playfair text-3xl font-light tracking-wider">
                    Ana Nicoleta
                  </h3>
                  <p className="font-inter text-sm text-gray-400 mt-1 tracking-widest uppercase">
                    {t('heroSubtitle')}
                  </p>
                </Link>
                
                <p className="font-inter text-gray-300 leading-relaxed mb-8 max-w-md">
                  {t('aboutDescription')}
                </p>
                
                {/* Social Links */}
                <div className="flex gap-4">
                  <motion.a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Instagram size={18} />
                  </motion.a>
                  
                  <motion.a
                    href="mailto:contact@ananicoleta.com"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Mail size={18} />
                  </motion.a>
                </div>
              </div>
            </FadeInUp>

            {/* Quick Links */}
            <FadeInUp delay={0.2}>
              <div>
                <h4 className="font-inter font-medium text-lg mb-6 tracking-wide">
                  {t('quickLinks')}
                </h4>
                <AnimatedLine width="50px" delay={0.3} />
                <nav className="mt-6 space-y-3">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="font-inter block text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200"
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
                <h4 className="font-inter font-medium text-lg mb-6 tracking-wide">
                  {t('services')}
                </h4>
                <AnimatedLine width="50px" delay={0.5} />
                <div className="mt-6 space-y-3">
                  {services.map((service, index) => (
                    <p
                      key={index}
                      className="font-inter text-gray-300 text-sm"
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
            <div className="border-t border-gray-700 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="font-inter text-gray-400 text-sm">
                  {t('copyright')}
                </p>
                
                <div className="flex items-center gap-6 mt-4 md:mt-0">
                  <p className="font-inter text-gray-400 text-sm">
                    {t('basedInSpain')} • {t('availableWorldwide')}
                  </p>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Globe size={14} />
                    <span className="font-inter text-xs">{t('fluentLanguages')}</span>
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
        className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-900 transition-colors"
      >
        <ArrowUp size={20} />
      </motion.button>
    </>
  )
}
