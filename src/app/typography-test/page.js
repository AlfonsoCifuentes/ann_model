'use client'

import { Inter, Playfair_Display } from 'next/font/google'
import { motion } from 'framer-motion'
import MainLayout from '../../components/MainLayout'
import { useLanguage } from '../../contexts/LanguageContext'

// Configurar tipografías
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'
})

export default function TypographyTest() {
  const { t } = useLanguage()

  return (
    <MainLayout>
      <div className={`min-h-screen bg-white p-8 ${inter.variable} ${playfair.variable}`}>
        
        {/* Hero Test */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-16 text-center"
        >
          <h1 className="font-playfair text-6xl lg:text-8xl font-light tracking-wider mb-4">
            Ana Nicoleta
          </h1>
          <p className="font-inter text-xl text-gray-600 font-light tracking-wide">
            Professional Model & Actress
          </p>
        </motion.section>

        {/* Typography Samples */}
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Playfair Display Examples */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-playfair text-4xl font-light mb-6 text-black">
              Playfair Display - Headlines
            </h2>
            <div className="space-y-4">
              <h1 className="font-playfair text-7xl font-light tracking-wider">Editorial</h1>
              <h2 className="font-playfair text-5xl font-light tracking-wide">Fashion Portfolio</h2>
              <h3 className="font-playfair text-3xl font-light tracking-wide">Creative Direction</h3>
              <h4 className="font-playfair text-2xl font-light tracking-wide">Professional Modeling</h4>
            </div>
          </motion.div>

          {/* Inter Examples */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="font-playfair text-4xl font-light mb-6 text-black">
              Inter - Body Text
            </h2>
            <div className="space-y-4">
              <p className="font-inter text-lg font-light text-gray-700 leading-relaxed">
                Ana Nicoleta es una modelo y actriz profesional con más de cinco años de experiencia 
                en la industria de la moda y el entretenimiento. Su trabajo abarca desde fotografía 
                editorial hasta campañas comerciales internacionales.
              </p>
              <p className="font-inter text-base font-normal text-gray-600 leading-relaxed">
                Con un enfoque artístico único y una presencia versátil, Ana ha colaborado con 
                reconocidos fotógrafos y marcas de prestigio a nivel mundial.
              </p>
              <p className="font-inter text-sm font-light text-gray-500 tracking-wide uppercase">
                Available Worldwide • Based in Spain • Fluent in Spanish & English
              </p>
            </div>
          </motion.div>

          {/* Combined Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gray-50 p-8 rounded-lg"
          >
            <h2 className="font-playfair text-4xl font-light mb-4 text-black">
              Combined Typography
            </h2>
            <h3 className="font-playfair text-2xl font-light mb-3 text-gray-800">
              Recent Editorial Work
            </h3>
            <p className="font-inter text-base text-gray-600 leading-relaxed mb-4">
              This combination creates a perfect balance between elegance and readability. 
              Playfair Display brings sophistication to headlines, while Inter ensures 
              excellent legibility for body text.
            </p>
            <button className="font-inter text-sm font-medium tracking-wide uppercase px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors">
              View Portfolio
            </button>
          </motion.div>

          {/* Animation Examples */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <h2 className="font-playfair text-4xl font-light mb-8 text-black">
              Micro-animations Preview
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Hover Card */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white border p-6 cursor-pointer shadow-sm"
              >
                <h3 className="font-playfair text-xl font-light mb-2">Hover Effect</h3>
                <p className="font-inter text-sm text-gray-600">Subtle scale and lift</p>
              </motion.div>

              {/* Stagger Animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="bg-white border p-6"
              >
                <h3 className="font-playfair text-xl font-light mb-2">Stagger In</h3>
                <p className="font-inter text-sm text-gray-600">Delayed entrance</p>
              </motion.div>

              {/* Gentle Pulse */}
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-black text-white p-6"
              >
                <h3 className="font-playfair text-xl font-light mb-2">Gentle Pulse</h3>
                <p className="font-inter text-sm text-gray-300">Breathing effect</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  )
}
