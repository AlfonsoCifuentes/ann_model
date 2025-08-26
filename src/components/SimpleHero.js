'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '../contexts/LanguageContext'

export default function SimpleHero() {
  const { t } = useLanguage()
  return (
  <section className="hero-with-bg relative min-h-screen overflow-hidden" style={{backgroundImage:'url(/photos/SVM05701.jpg)',backgroundSize:'cover',backgroundPosition:'center'}}>
      {/* Layered Image to ensure visibility (no negative z-index) */}
      <div className="absolute inset-0">
        <Image
          src="/photos/SVM05701.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-8 lg:px-16 text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-widest mb-2">
            ANA<span className="font-bold">NICOLETA</span>
          </h1>
          <p className="font-sans text-base md:text-xl lg:text-2xl font-thin text-white/80 uppercase tracking-[0.65em] mb-6">
            DE PEDRO SANCHEZ
          </p>
          <p className="text-lg md:text-xl font-light tracking-wider mb-4 text-white/90 uppercase">
            {t('heroSubtitle')}
          </p>
          <p className="text-base md:text-lg font-light max-w-lg mb-12 text-white/85 leading-relaxed tracking-wide">
            {t('heroDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/portfolio"
              className="px-8 py-4 bg-fashion-rose text-fashion-bg font-inter font-medium tracking-wide hover:bg-fashion-deep-copper transition-colors rounded-lg"
            >
              {t('viewPortfolio') ?? 'View Portfolio'}
            </Link>
            <Link 
              href="/contact"
              className="px-8 py-4 border-2 border-fashion-rose text-fashion-rose font-inter font-medium tracking-wide hover:bg-fashion-rose hover:text-fashion-bg transition-colors rounded-lg"
            >
              {t('contactMe')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// (Clean hero fallback component used while debugging original EnhancedHero)
