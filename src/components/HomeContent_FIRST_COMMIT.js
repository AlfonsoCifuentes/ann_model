'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import EnhancedHero from './EnhancedHero'
import { FadeInUp, StaggerContainer, StaggerItem, HoverLift } from './animations/MicroAnimations'

export default function HomeContent() {
  const { t } = useLanguage()

  const stats = [
    { number: "8+", label: t('yearsExperience') },
    { number: "200+", label: t('photoshoots') },
    { number: "50+", label: t('collaborations') },
    { number: "15+", label: t('countries') }
  ]

  const services = [
    {
      title: t('editorialPhotography'),
      description: t('editorialDescription'),
      image: '/photos/SVM05651.jpg'
    },
    {
      title: t('fashion'),
      description: t('fashionDescription'),
      image: '/photos/SVM05670.jpg'
    },
    {
      title: t('portrait'),
      description: t('portraitDescription'),
      image: '/photos/SVM05675.jpg'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <EnhancedHero />

      {/* Stats Section */}
      <section className="py-20 bg-fashion-bg-secondary">
        <div className="container mx-auto px-8">
          <FadeInUp>
            <h2 className="font-inter font-light tracking-widest text-3xl md:text-4xl text-center mb-16 text-fashion-fg uppercase">
              {t('professionalDetails')}
            </h2>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <div className="text-center">
                  <div className="font-inter text-4xl md:text-5xl font-light text-fashion-rose mb-2 tracking-wider">
                    {stat.number}
                  </div>
                  <div className="font-inter text-sm tracking-widest text-fashion-fg-muted uppercase">
                    {stat.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-fashion-bg">
        <div className="container mx-auto px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="font-inter font-light tracking-widest text-3xl md:text-4xl mb-6 text-fashion-fg uppercase">
                {t('services')}
              </h2>
              <p className="font-inter font-light text-lg text-fashion-fg-muted max-w-2xl mx-auto tracking-wide">
                {t('portfolioDescription')}
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <StaggerItem key={index}>
                <HoverLift>
                  <div className="group cursor-pointer">
                    <div className="relative h-96 mb-6 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        priority={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <h3 className="font-inter font-light tracking-wider text-xl mb-3 text-fashion-fg uppercase">
                      {service.title}
                    </h3>
                    <p className="font-inter font-light text-fashion-fg-muted leading-relaxed tracking-wide">
                      {service.description}
                    </p>
                  </div>
                </HoverLift>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeInUp delay={0.6}>
            <div className="text-center mt-16">
              <Link
                href="/portfolio"
                className="inline-block px-8 py-4 border border-fashion-rose text-fashion-rose font-inter font-light tracking-widest hover:bg-fashion-rose hover:text-fashion-bg transition-colors duration-300 uppercase text-sm"
              >
                {t('viewFullPortfolio')}
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Recent Work Showcase */}
      <section className="py-20 bg-fashion-bg-secondary">
        <div className="container mx-auto px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="font-inter font-light tracking-widest text-4xl md:text-5xl mb-6 text-fashion-fg uppercase">
                {t('recentWork')}
              </h2>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            <StaggerItem>
              <HoverLift>
                <div className="relative h-96 group cursor-pointer overflow-hidden">
                  <Image
                    src="/photos/SVM05701.jpg"
                    alt="Recent Editorial Work"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="font-inter font-light tracking-wider text-2xl mb-2 uppercase">Editorial Campaign</h3>
                    <p className="font-inter text-sm opacity-90">2024</p>
                  </div>
                </div>
              </HoverLift>
            </StaggerItem>

            <StaggerItem>
              <HoverLift>
                <div className="relative h-96 group cursor-pointer overflow-hidden">
                  <Image
                    src="/photos/SVM05719.jpg"
                    alt="Fashion Portrait"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="font-inter font-light tracking-wider text-2xl mb-2 uppercase">Fashion Portrait</h3>
                    <p className="font-inter text-sm opacity-90">Studio Session • 2024</p>
                  </div>
                </div>
              </HoverLift>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-fashion-bg">
        <div className="container mx-auto px-8 text-center">
          <FadeInUp>
            <h2 className="font-inter font-light tracking-widest text-4xl md:text-5xl mb-6 text-fashion-fg uppercase">
              {t('getInTouch')}
            </h2>
            <p className="font-inter text-lg text-fashion-fg-muted mb-12 max-w-2xl mx-auto">
              {t('contactDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-fashion-rose text-fashion-bg font-inter font-medium tracking-wide hover:bg-fashion-copper-dark transition-colors rounded-lg mr-4"
              >
                {t('contactMe')}
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-4 border-2 border-fashion-rose text-fashion-rose font-inter font-medium tracking-wide hover:bg-fashion-rose hover:text-fashion-bg transition-colors rounded-lg"
              >
                {t('viewMore')}
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  )
}
