'use client'

import Link from 'next/link'
import MainLayout from '../components/MainLayout'
import { useLanguage } from '../contexts/LanguageContext'

export default function NotFound() {
  const { t } = useLanguage()
  
  return (
    <MainLayout>
      <div className="min-h-screen bg-fashion-bg text-fashion-fg flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-8">
          
          <h1 className="text-6xl lg:text-8xl font-light tracking-wider mb-8 text-fashion-muted">
            404
          </h1>
          
          <h2 className="text-3xl lg:text-4xl font-light tracking-wider mb-6">
            {t('pageNotFound')}
          </h2>
          
          <p className="text-fashion-muted font-light mb-12 leading-relaxed">
            {t('pageNotFoundDesc')}
          </p>

          <div className="space-y-4">
            <Link 
              href="/"
              className="inline-block px-8 py-3 bg-fashion-secondary text-fashion-bg hover:bg-orange-600 transition-colors tracking-wide font-light"
            >
              {t('returnHome')}
            </Link>
            
            <div className="text-center">
              <Link 
                href="/portfolio"
                className="text-gray-600 hover:text-black transition-colors tracking-wide font-light underline"
              >
                {t('portfolioTitle')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
