'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '../contexts/LanguageContext'

export default function CTASection() {
  const { t } = useLanguage()
  
  return (
    <section className="luxury-header-spacing">
      <div className="container-custom">
        <motion.div
          className="luxury-card-elegant text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-luxury-elegant mb-6">
            {t('workTogether')}
          </h2>
          <p className="text-luxury-body mb-8 leading-relaxed">
            {t('contactDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/booking" className="w-full sm:w-auto luxury-card inline-block px-8 py-4 text-luxury-body font-medium rounded-full hover:scale-105 transition-all duration-300 bg-gradient-to-r from-fashion-rose/20 to-fashion-gold/20 text-center">
              {t('bookSession')}
            </Link>
            <Link href="/contact" className="w-full sm:w-auto luxury-card inline-block px-8 py-4 text-luxury-body font-medium rounded-full hover:scale-105 transition-all duration-300 text-center">
              {t('getInTouch')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
