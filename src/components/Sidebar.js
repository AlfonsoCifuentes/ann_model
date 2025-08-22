'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Mail, Menu, X, Globe } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { t, language, toggleLanguage } = useLanguage()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
    { name: 'Prints', href: '/prints' },
    { name: 'Blog', href: '/blog' },
    { name: 'Admin', href: '/admin' },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-6 left-6 z-50 lg:hidden bg-black/80 backdrop-blur-md p-3 rounded-full text-white hover:bg-black transition-colors"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full w-64 bg-black text-white z-50 transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8 h-full flex flex-col">
          {/* Logo */}
          <div className="mb-12">
            <Link href="/" onClick={() => setIsMobileOpen(false)}>
              <div className="flex flex-col">
                <h1 className="text-2xl font-light tracking-widest">
                  ANA<span className="font-bold">NICOLETA</span>
                </h1>
                <p 
                  className="text-xs font-thin text-gray-400 uppercase text-center mt-1"
                  style={{ 
                    letterSpacing: '0.3em',
                    transform: 'scaleX(1.05)'
                  }}
                >
                  DE PEDRO SANCHEZ
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-6">
              {navigation.map((item, index) => (
                <motion.li 
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block text-sm font-light tracking-wide hover:text-gray-300 transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Social Links */}
          <div className="mt-auto">
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://instagram.com/ann__siedad.7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="mailto:contact@ananicoleta.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
            
            {/* Language Toggle */}
            <div className="mb-8">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <Globe size={16} />
                <span>{language === 'es' ? 'EN' : 'ES'}</span>
              </button>
            </div>
            
            {/* Copyright */}
            <div className="text-xs text-gray-500 space-y-1">
              <p>{t('copyright')}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
