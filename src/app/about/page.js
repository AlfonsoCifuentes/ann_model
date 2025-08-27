'use client'

import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '../../components/MainLayout'
import { useLanguage } from '../../contexts/LanguageContext'
import { FadeInUp, StaggerContainer, StaggerItem, ParallaxImage } from '../../components/animations/MicroAnimations'

export default function AboutPage() {
  const { t } = useLanguage()
  
  return (
    <MainLayout>
      <div className="min-h-screen bg-fashion-bg text-fashion-fg">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          
          {/* Left Column - Text */}
          <div className="flex items-center p-8 lg:p-16 order-2 lg:order-1">
            <div className="max-w-lg">
              <FadeInUp>
                <h1 className="font-inter font-light tracking-widest text-3xl lg:text-4xl mb-8 uppercase">
                  {t('aboutTitle')}
                </h1>
              </FadeInUp>
              
              <StaggerContainer className="space-y-6 text-fashion-fg-secondary leading-relaxed tracking-wide">
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
                    className="btn-fashion btn-fashion-dark"
                  >
                    {t('contactMe')}
                  </Link>
                </div>
              </FadeInUp>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative bg-fashion-bg-secondary overflow-hidden min-h-[60vh] lg:min-h-screen order-1 lg:order-2">
            <ParallaxImage>
              <Image
                src="/photos/SVM05631.jpg"
                alt="Ana Nicoleta - Professional Portrait"
                fill
                className="object-contain lg:object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </ParallaxImage>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-gradient-to-br from-fashion-bg via-fashion-bg-secondary to-fashion-bg-tertiary py-16 lg:py-24 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-32 h-32 border border-fashion-rose rounded-full bg-decoration"></div>
            <div className="absolute bottom-20 right-10 w-24 h-24 border border-fashion-gold rounded-full bg-decoration"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-fashion-platinum rounded-full bg-decoration"></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-8 lg:px-16 relative z-10">
            
            <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Professional Details */}
              <StaggerItem>
                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 h-80 flex flex-col shadow-xl">
                  <div className="flex items-center mb-6">
                    <div className="w-1 h-6 bg-orange-500 mr-4"></div>
                    <h3 className="text-xl font-light tracking-wide text-neutral-100">
                      {t('professionalDetails')}
                    </h3>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-neutral-800">
                      <span className="text-neutral-400 font-light">{t('height')}</span>
                      <span className="text-orange-500 font-medium">175 cm</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-neutral-800">
                      <span className="text-neutral-400 font-light">{t('eyes')}</span>
                      <span className="text-orange-500 font-medium">{t('green')}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-neutral-800">
                      <span className="text-neutral-400 font-light">{t('hair')}</span>
                      <span className="text-orange-500 font-medium">{t('darkBrown')}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-neutral-400 font-light">{t('shoe')}</span>
                      <span className="text-orange-500 font-medium">EU 38</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>

              {/* Experience */}
              <StaggerItem>
                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 h-80 flex flex-col shadow-xl">
                  <div className="flex items-center mb-6">
                    <div className="w-1 h-6 bg-orange-500 mr-4"></div>
                    <h3 className="text-xl font-light tracking-wide text-neutral-100">
                      {t('experience')}
                    </h3>
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center py-1 text-neutral-400">
                      <div className="w-1 h-1 bg-orange-500 rounded-full mr-3"></div>
                      <span className="font-light text-sm">{t('editorialPhotography')}</span>
                    </div>
                    <div className="flex items-center py-1 text-neutral-400">
                      <div className="w-1 h-1 bg-orange-500 rounded-full mr-3"></div>
                      <span className="font-light text-sm">{t('runwayShows')}</span>
                    </div>
                    <div className="flex items-center py-1 text-neutral-400">
                      <div className="w-1 h-1 bg-orange-500 rounded-full mr-3"></div>
                      <span className="font-light text-sm">{t('commercialCampaigns')}</span>
                    </div>
                    <div className="flex items-center py-1 text-neutral-400">
                      <div className="w-1 h-1 bg-orange-500 rounded-full mr-3"></div>
                      <span className="font-light text-sm">{t('actingProjects')}</span>
                    </div>
                    <div className="flex items-center py-1 text-neutral-400">
                      <div className="w-1 h-1 bg-orange-500 rounded-full mr-3"></div>
                      <span className="font-light text-sm">{t('internationalWork')}</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>

              {/* Location */}
              <StaggerItem>
                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 h-80 flex flex-col shadow-xl">
                  <div className="flex items-center mb-6">
                    <div className="w-1 h-6 bg-orange-500 mr-4"></div>
                    <h3 className="text-xl font-light tracking-wide text-neutral-100">
                      {t('location')}
                    </h3>
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center py-1 text-neutral-400">
                      <div className="w-1 h-1 bg-orange-500 rounded-full mr-3"></div>
                      <span className="font-light text-sm">{t('basedInSpain')}</span>
                    </div>
                    <div className="flex items-center py-1 text-neutral-400">
                      <div className="w-1 h-1 bg-orange-500 rounded-full mr-3"></div>
                      <span className="font-light text-sm">{t('availableWorldwide')}</span>
                    </div>
                    <div className="flex items-center py-1 text-neutral-400">
                      <div className="w-1 h-1 bg-orange-500 rounded-full mr-3"></div>
                      <span className="font-light text-sm">{t('fluentLanguages')}</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
