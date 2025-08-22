'use client'

import Image from 'next/image'
import MainLayout from '../../components/MainLayout'
import { useLanguage } from '../../contexts/LanguageContext'

export default function PrintsPage() {
  const { t } = useLanguage()

  const printCategories = [
    {
      title: t('editorialCollection'),
      description: t('editorialCollectionDesc'),
      price: t('fromPrice') + ' €150',
      images: [
        '/photos/editorial_1.jpg',
        '/photos/editorial_2.jpg',
        '/photos/SVM05631.jpg'
      ]
    },
    {
      title: t('fashionSeries'),
      description: t('fashionSeriesDesc'),
      price: t('fromPrice') + ' €200',
      images: [
        '/photos/fashion_model_1.jpg',
        '/photos/fashion_model_2.jpg',
        '/photos/fashion_model_3.jpg'
      ]
    },
    {
      title: t('portraitCollection'),
      description: t('portraitCollectionDesc'),
      price: t('fromPrice') + ' €120',
      images: [
        '/photos/portrait_1.jpg',
        '/photos/portrait_2.jpg',
        '/photos/studio_1.jpg'
      ]
    }
  ]
  
  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        
        {/* Hero Section */}
        <div className="py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-8 lg:px-16">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-light tracking-wider mb-6 font-crimson">
                {t('printsTitle')}
              </h1>
              <p className="text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                {t('printsDescription')}
              </p>
            </div>
          </div>
        </div>

        {/* Print Categories */}
        {printCategories.map((category, index) => (
          <div key={category.title} className={`py-16 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
            <div className="max-w-6xl mx-auto px-8 lg:px-16">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Text Content */}
                <div className={index % 2 === 1 ? 'order-2' : ''}>
                  <h2 className="text-3xl font-light tracking-wider mb-4 font-crimson">
                    {category.title}
                  </h2>
                  <p className="text-gray-600 font-light mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  <p className="text-2xl font-light mb-8 text-black">
                    {category.price}
                  </p>
                  <button className="px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors tracking-wide font-light">
                    {t('viewCollection')}
                  </button>
                </div>

                {/* Images */}
                <div className={index % 2 === 1 ? 'order-1' : ''}>
                  <div className="grid grid-cols-2 gap-4">
                    {category.images.slice(0, 2).map((image, imgIndex) => (
                      <div key={imgIndex} className="relative aspect-[3/4] overflow-hidden group">
                        <Image
                          src={image}
                          alt={`${category.title} - Print ${imgIndex + 1}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                    ))}
                    <div className="col-span-2">
                      <div className="relative aspect-[4/3] overflow-hidden group">
                        <Image
                          src={category.images[2]}
                          alt={`${category.title} - Print 3`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Information Section */}
        <div className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-8 lg:px-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-light tracking-wider mb-4 font-crimson">
                {t('printInformation')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              <div>
                <h3 className="text-xl font-light tracking-wide mb-4 font-crimson">
                  {t('qualityMaterials')}
                </h3>
                <div className="space-y-3 text-gray-600 font-light">
                  <p>{t('museumQuality')}</p>
                  <p>{t('professionalInks')}</p>
                  <p>{t('acidFree')}</p>
                  <p>{t('uvResistant')}</p>
                  <p>{t('handSigned')}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-light tracking-wide mb-4 font-crimson">
                  {t('sizingPricing')}
                </h3>
                <div className="space-y-3 text-gray-600 font-light">
                  <p>• Small (30x40cm): €120-150</p>
                  <p>• Medium (50x70cm): €200-250</p>
                  <p>• Large (70x100cm): €350-400</p>
                  <p>• Custom sizes available</p>
                  <p>• Worldwide shipping included</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <a 
                href="/contact"
                className="inline-block px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors tracking-wide font-light"
              >
                {t('inquireAboutPrints')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
