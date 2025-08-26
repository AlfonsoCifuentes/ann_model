'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '../../components/MainLayout'
import { useLanguage } from '../../contexts/LanguageContext'
import { FadeInUp, StaggerContainer, StaggerItem, HoverLift } from '../../components/animations/MicroAnimations'

export default function BlogPage() {
  const { t } = useLanguage()
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog?status=published')
      const result = await response.json()
      
      if (result.success) {
        setBlogPosts(result.data)
      } else {
        setError('Error al cargar los artículos')
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0]
  const otherPosts = blogPosts.filter(post => post._id !== featuredPost?._id)
  
  return (
    <MainLayout>
      <div className="min-h-screen bg-black text-white">
        
        {/* Hero Section */}
        <div className="py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-8 lg:px-16">
            <div className="text-center mb-16">
              <FadeInUp>
                <h1 className="text-4xl lg:text-5xl font-light tracking-wider mb-6 font-inter text-white">
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
        {loading && (
          <div className="pb-16">
            <div className="max-w-6xl mx-auto px-8 lg:px-16">
              <div className="bg-gray-900 p-8 lg:p-12 rounded-lg border border-gray-800 animate-pulse">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="aspect-[4/5] bg-gray-800 rounded-lg"></div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-800 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-800 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-800 rounded w-full"></div>
                    <div className="h-4 bg-gray-800 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="pb-16">
            <div className="max-w-6xl mx-auto px-8 lg:px-16">
              <div className="bg-red-900 border border-red-700 text-red-300 px-6 py-4 rounded-lg text-center">
                {error}
              </div>
            </div>
          </div>
        )}

        {!loading && !error && featuredPost && (
          <div className="pb-16">
            <div className="max-w-6xl mx-auto px-8 lg:px-16">
              <FadeInUp>
                <div className="bg-gray-900 p-8 lg:p-12 rounded-lg border border-gray-800">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    
                    <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
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
                      <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-4 font-inter text-white">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-300 font-light mb-6 leading-relaxed font-inter">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-gray-400 mb-6 font-light">
                        <span>{new Date(featuredPost.createdAt).toLocaleDateString('es-ES')}</span>
                        <span className="mx-2">•</span>
                        <span>{featuredPost.readTime}</span>
                      </div>
                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="btn-fashion btn-fashion-primary"
                      >
                        Leer Artículo Completo
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="py-16 border-t border-gray-800">
          <div className="w-full">
            <div className="text-center mb-12 px-8">
              <h2 className="text-3xl lg:text-4xl font-light tracking-wider mb-4 font-inter text-white">
                {otherPosts.length > 0 ? 'Más Artículos' : 'Próximamente'}
              </h2>
              <p className="text-gray-400 font-light font-inter">
                {otherPosts.length > 0 ? 'Descubre más contenido' : 'Más artículos y reflexiones en desarrollo'}
              </p>
            </div>

            {otherPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
                {otherPosts.map((post) => (
                  <Link 
                    key={post._id} 
                    href={`/blog/${post.slug}`}
                    className="bg-gray-900 hover:bg-gray-800 transition-colors cursor-pointer block h-full"
                  >
                    <div className="aspect-video relative">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-light tracking-wide mb-3 font-inter text-white">
                        {post.title}
                      </h3>
                      <p className="text-gray-300 font-light mb-4 leading-relaxed text-sm font-inter">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-xs text-gray-400 font-light">
                        <span>{new Date(post.createdAt).toLocaleDateString('es-ES')}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
                {/* Placeholder para futuros artículos */}
                {[1, 2, 3].map((placeholder) => (
                  <div key={placeholder} className="bg-gray-900 p-8 opacity-50">
                    <div className="aspect-video bg-gray-800 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-800 rounded mb-2"></div>
                    <div className="h-3 bg-gray-800 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-16 lg:py-24 bg-gray-900 border-t border-gray-800">
          <div className="max-w-4xl mx-auto px-8 lg:px-16 text-center">
            
            <FadeInUp>
              <h2 className="text-3xl lg:text-4xl font-light tracking-wider mb-4 font-inter text-white">
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
                  <button className="btn-fashion btn-fashion-primary" style={{borderRadius: '0 50px 50px 0'}}>
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
