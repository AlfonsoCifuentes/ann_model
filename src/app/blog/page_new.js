'use client'

import Image from 'next/image'
import MainLayout from '../../components/MainLayout'
import { useLanguage } from '../../contexts/LanguageContext'
import { FadeInUp, StaggerContainer, StaggerItem, HoverLift } from '../../components/animations/MicroAnimations'

export default function BlogPage() {
  const { t } = useLanguage()

  const blogPosts = [
    {
      id: 1,
      title: 'Detrás de Cámaras: Sesión Editorial en Barcelona',
      excerpt: 'Un vistazo a mi reciente sesión de fotografía editorial en las hermosas calles de Barcelona, explorando la fusión entre arquitectura clásica y moda contemporánea.',
      date: '15 de Marzo, 2024',
      readTime: '5 min de lectura',
      image: '/photos/editorial_1.jpg',
      slug: 'sesion-editorial-barcelona',
      content: 'Barcelona siempre ha sido una de mis ciudades favoritas para trabajar. La mezcla única de arquitectura gótica y modernista proporciona un telón de fondo incomparable para la fotografía de moda. En esta sesión, trabajamos con diseños contemporáneos que contrastaban bellamente con los elementos históricos de la ciudad...'
    }
  ]
  
  return (
    <MainLayout>
      <div className="min-h-screen bg-black text-white">
        
        {/* Hero Section */}
        <div className="py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-8 lg:px-16">
            <div className="text-center mb-16">
              <FadeInUp>
                <h1 className="text-4xl lg:text-5xl font-light tracking-wider mb-6 font-playfair text-white">
                  Blog
                </h1>
                <p className="text-gray-300 font-light max-w-2xl mx-auto leading-relaxed font-inter">
                  Perspectivas detrás de escena, consejos de modelaje y reflexiones personales de mi trayectoria en la industria de la moda.
                </p>
              </FadeInUp>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        <div className="pb-16">
          <div className="max-w-6xl mx-auto px-8 lg:px-16">
            <FadeInUp>
              <div className="bg-gray-900 p-8 lg:p-12 rounded-lg border border-gray-800">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                    <Image
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  <div>
                    <div className="mb-4">
                      <span className="text-orange-400 text-sm font-light tracking-wide uppercase">
                        Artículo Destacado
                      </span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-4 font-playfair text-white">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-gray-300 font-light mb-6 leading-relaxed font-inter">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-400 mb-6 font-light">
                      <span>{blogPosts[0].date}</span>
                      <span className="mx-2">•</span>
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                    <button className="px-8 py-3 border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black transition-all duration-300 tracking-wide font-light rounded-full">
                      Leer Artículo Completo
                    </button>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="py-16 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-8 lg:px-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-light tracking-wider mb-4 font-playfair text-white">
                Próximamente
              </h2>
              <p className="text-gray-400 font-light font-inter">
                Más artículos y reflexiones en desarrollo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Placeholder para futuros artículos */}
              {[1, 2, 3].map((placeholder) => (
                <div key={placeholder} className="bg-gray-900 border border-gray-800 rounded-lg p-6 opacity-50">
                  <div className="aspect-video bg-gray-800 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-800 rounded mb-2"></div>
                  <div className="h-3 bg-gray-800 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-16 lg:py-24 bg-gray-900 border-t border-gray-800">
          <div className="max-w-4xl mx-auto px-8 lg:px-16 text-center">
            
            <FadeInUp>
              <h2 className="text-3xl lg:text-4xl font-light tracking-wider mb-4 font-playfair text-white">
                Mantente Actualizada
              </h2>
              <p className="text-gray-300 font-light mb-8 leading-relaxed font-inter">
                Suscríbete para recibir las últimas actualizaciones sobre mis proyectos y reflexiones del mundo de la moda.
              </p>

              <div className="max-w-md mx-auto">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 text-white font-light text-sm focus:outline-none focus:border-orange-400 rounded-l-full placeholder-gray-400"
                  />
                  <button className="px-6 py-3 bg-orange-400 text-black hover:bg-orange-500 transition-colors tracking-wide font-light text-sm rounded-r-full">
                    Suscribirse
                  </button>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
