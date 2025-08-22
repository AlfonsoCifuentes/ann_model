'use client'

import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '../../components/MainLayout'
import { useLanguage } from '../../contexts/LanguageContext'
import { FadeInUp, StaggerContainer, StaggerItem, HoverLift, ParallaxImage } from '../../components/animations/MicroAnimations'

export default function AboutPage() {
  const { t } = useLanguage()
  
  return (
    <MainLayout>
      <div className="min-h-screen bg-fashion-bg text-fashion-fg">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          
          {/* Left Column - Text */}
          <div className="flex items-center p-8 lg:p-16">
            <div className="max-w-lg">
              <FadeInUp>
                <h1 className="font-inter font-light tracking-widest text-3xl lg:text-4xl mb-8 uppercase">
                  {t('aboutTitle')}
                </h1>
              </FadeInUp>
              
              <StaggerContainer className="space-y-6 text-fashion-muted leading-relaxed tracking-wide">
                <StaggerItem>
                  <p>
                    {t('aboutDescription')} Mi carrera me ha llevado a trabajar 
                    en diversos proyectos internacionales.
                  </p>
                </StaggerItem>
                
                <StaggerItem>
                  <p>
                    Con años de experiencia en la industria de la moda y el entretenimiento, 
                    me especializo en fotografía editorial, desfiles de moda, campañas comerciales 
                    y proyectos de actuación.
                  </p>
                </StaggerItem>
                
                <StaggerItem>
                  <p>
                    Mi trabajo ha sido destacado en importantes publicaciones de moda y he 
                    colaborado con reconocidos fotógrafos y directores de todo el mundo.
                  </p>
                </StaggerItem>
              </StaggerContainer>

              <FadeInUp delay={0.8}>
                <div className="mt-12">
                  <Link 
                    href="/contact"
                    className="inline-block px-8 py-3 border border-fashion-secondary text-fashion-secondary hover:bg-fashion-secondary hover:text-fashion-bg transition-colors tracking-wide font-medium rounded-lg"
                  >
                    {t('contactMe')}
                  </Link>
                </div>
              </FadeInUp>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative bg-fashion-bg-secondary overflow-hidden">
            <ParallaxImage>
              <Image
                src="/photos/SVM05631.jpg"
                alt="Ana Nicoleta - Professional Portrait"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </ParallaxImage>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-fashion-secondary/5 py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-8 lg:px-16">
            
            <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              
              {/* Professional Details */}
              <StaggerItem>
                <div>
                  <h3 className="font-playfair text-xl font-light tracking-wider mb-6">
                    {t('professionalDetails')}
                  </h3>
                  <div className="space-y-3 text-sm text-fashion-muted">
                    <div className="flex justify-between">
                      <span>{t('height')}</span>
                      <span>175 cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('eyes')}</span>
                      <span>{t('green')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('hair')}</span>
                      <span>{t('darkBrown')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('shoe')}</span>
                      <span>EU 38</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>

              {/* Experience */}
              <StaggerItem>
                <div>
                  <h3 className="font-playfair text-xl font-light tracking-wider mb-6">
                    {t('experience')}
                  </h3>
                  <div className="space-y-2 text-sm text-fashion-muted">
                    <p>{t('editorialPhotography')}</p>
                    <p>{t('runwayShows')}</p>
                    <p>{t('commercialCampaigns')}</p>
                    <p>{t('actingProjects')}</p>
                    <p>{t('internationalWork')}</p>
                  </div>
                </div>
              </StaggerItem>

              {/* Location */}
              <StaggerItem>
                <div>
                  <h3 className="font-playfair text-xl font-light tracking-wider mb-6">
                    {t('location')}
                  </h3>
                  <div className="space-y-2 text-sm text-fashion-muted">
                    <p>{t('basedInSpain')}</p>
                    <p>{t('availableWorldwide')}</p>
                    <p>{t('fluentLanguages')}</p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>

        {/* Portfolio Preview */}
        <div className="py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-8 lg:px-16">
            <FadeInUp>
              <h2 className="font-inter font-light tracking-widest text-3xl lg:text-4xl mb-12 text-center uppercase">
                {t('recentWork')}
              </h2>
            </FadeInUp>
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StaggerItem>
                <HoverLift>
                  <div className="relative aspect-[3/4] overflow-hidden group">
                    <Image
                      src="/photos/SVM05620.jpg"
                      alt="Recent Work"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                </HoverLift>
              </StaggerItem>
              
              <StaggerItem>
                <HoverLift>
                  <div className="relative aspect-[3/4] overflow-hidden group">
                    <Image
                      src="/photos/SVM05660.jpg"
                      alt="Recent Work"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                </HoverLift>
              </StaggerItem>
              
              <StaggerItem>
                <HoverLift>
                  <div className="relative aspect-[3/4] overflow-hidden group">
                    <Image
                      src="/photos/SVM05675.jpg"
                      alt="Recent Work"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                </HoverLift>
              </StaggerItem>
            </StaggerContainer>

            <FadeInUp delay={0.6}>
              <div className="text-center mt-12">
                <Link 
                  href="/portfolio"
                  className="inline-block px-8 py-4 border border-fashion-secondary text-fashion-secondary hover:bg-fashion-secondary hover:text-fashion-bg transition-colors tracking-widest font-light uppercase text-sm"
                >
                  {t('viewFullPortfolio')}
                </Link>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
