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
                    {t('aboutDescription')} {t('aboutExtended1')}
                  </p>
                </StaggerItem>
                
                <StaggerItem>
                  <p>
                    {t('aboutExtended2')}
                  </p>
                </StaggerItem>
                
                <StaggerItem>
                  <p>
                    {t('aboutExtended3')}
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
                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 lg:p-8 min-h-[280px] flex flex-col shadow-xl">
                  <div className="flex items-center mb-6">
                    <div className="w-1 h-6 bg-orange-500 mr-4 flex-shrink-0"></div>
                    <h3 className="text-lg lg:text-xl font-light tracking-wide text-neutral-100 break-words">
                      {t('professionalDetails')}
                    </h3>
                  </div>
                  
                  <div className="flex-1 space-y-3 lg:space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-neutral-800 min-h-[44px]">
                      <span className="text-neutral-400 font-light text-sm lg:text-base break-words pr-2">{t('height')}</span>
                      <span className="text-orange-500 font-medium text-sm lg:text-base flex-shrink-0">175 cm</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-neutral-800 min-h-[44px]">
                      <span className="text-neutral-400 font-light text-sm lg:text-base break-words pr-2">{t('eyes')}</span>
                      <span className="text-orange-500 font-medium text-sm lg:text-base flex-shrink-0">{t('green')}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-neutral-800 min-h-[44px]">
                      <span className="text-neutral-400 font-light text-sm lg:text-base break-words pr-2">{t('hair')}</span>
                      <span className="text-orange-500 font-medium text-sm lg:text-base flex-shrink-0">{t('darkBrown')}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 min-h-[44px]">
                      <span className="text-neutral-400 font-light text-sm lg:text-base break-words pr-2">{t('shoe')}</span>
                      <span className="text-orange-500 font-medium text-sm lg:text-base flex-shrink-0">EU 38</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>

              {/* Experience */}
              <StaggerItem>
                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 lg:p-8 min-h-[280px] flex flex-col shadow-xl">
                  <div className="flex items-center mb-6">
                    <div className="w-1 h-6 bg-orange-500 mr-4 flex-shrink-0"></div>
                    <h3 className="text-lg lg:text-xl font-light tracking-wide text-neutral-100 break-words">
                      {t('experience')}
                    </h3>
                  </div>
                  
                  <div className="flex-1 space-y-2 lg:space-y-3">
                    <div className="flex items-start py-1 text-neutral-400 min-h-[32px]">
                      <div className="w-1 h-1 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="font-light text-sm break-words leading-relaxed">{t('editorialPhotography')}</span>
                    </div>
                    <div className="flex items-start py-1 text-neutral-400 min-h-[32px]">
                      <div className="w-1 h-1 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="font-light text-sm break-words leading-relaxed">{t('runwayShows')}</span>
                    </div>
                    <div className="flex items-start py-1 text-neutral-400 min-h-[32px]">
                      <div className="w-1 h-1 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="font-light text-sm break-words leading-relaxed">{t('commercialCampaigns')}</span>
                    </div>
                    <div className="flex items-start py-1 text-neutral-400 min-h-[32px]">
                      <div className="w-1 h-1 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="font-light text-sm break-words leading-relaxed">{t('actingProjects')}</span>
                    </div>
                    <div className="flex items-start py-1 text-neutral-400 min-h-[32px]">
                      <div className="w-1 h-1 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="font-light text-sm break-words leading-relaxed">{t('internationalWork')}</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>

              {/* Location */}
              <StaggerItem>
                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 lg:p-8 min-h-[280px] flex flex-col shadow-xl">
                  <div className="flex items-center mb-6">
                    <div className="w-1 h-6 bg-orange-500 mr-4 flex-shrink-0"></div>
                    <h3 className="text-lg lg:text-xl font-light tracking-wide text-neutral-100 break-words">
                      {t('location')}
                    </h3>
                  </div>
                  
                  <div className="flex-1 space-y-2 lg:space-y-3">
                    <div className="flex items-start py-1 text-neutral-400 min-h-[32px]">
                      <div className="w-1 h-1 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="font-light text-sm break-words leading-relaxed">{t('basedInSpain')}</span>
                    </div>
                    <div className="flex items-start py-1 text-neutral-400 min-h-[32px]">
                      <div className="w-1 h-1 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="font-light text-sm break-words leading-relaxed">{t('availableWorldwide')}</span>
                    </div>
                    <div className="flex items-start py-1 text-neutral-400 min-h-[32px]">
                      <div className="w-1 h-1 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="font-light text-sm break-words leading-relaxed">{t('fluentLanguages')}</span>
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
