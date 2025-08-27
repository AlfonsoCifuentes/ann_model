'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import MainLayout from '../../../components/MainLayout'
import { useLanguage } from '../../../contexts/LanguageContext'
import { FadeInUp } from '../../../components/animations/MicroAnimations'

export default function BlogPostPage() {
  const { t } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const { slug } = params
  
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchPost = useCallback(async () => {
    try {
      const response = await fetch(`/api/blog/slug/${slug}`)
      const result = await response.json()
      
      if (result.success) {
        setPost(result.data)
      } else {
        setError(t('articleNotFound'))
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      setError(t('articleNotFound'))
    } finally {
      setLoading(false)
    }
  }, [slug, t])

  useEffect(() => {
    if (slug) {
      fetchPost()
    }
  }, [slug, fetchPost])

  const formatContent = (content) => {
    // Convertir el contenido markdown a HTML básico
    return content
      .replace(/^# (.*$)/gm, '<h1 class="text-4xl font-light mb-8 text-fashion-fg font-playfair">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-light mb-6 mt-8 text-fashion-fg font-playfair">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-light mb-4 mt-6 text-fashion-fg font-playfair">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-medium text-fashion-fg">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/\n\n/g, '</p><p class="mb-6 leading-relaxed text-fashion-fg-secondary">')
      .replace(/^(?!<[h|p])(.+)$/gm, '<p class="mb-6 leading-relaxed text-fashion-fg-secondary">$1</p>')
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-fashion-bg text-fashion-fg pt-24">
          <div className="max-w-4xl mx-auto px-8 lg:px-16">
            <div className="animate-pulse">
              <div className="h-8 bg-fashion-bg-secondary rounded mb-8"></div>
              <div className="aspect-video bg-fashion-bg-secondary rounded-lg mb-8"></div>
              <div className="h-6 bg-fashion-bg-secondary rounded mb-4"></div>
              <div className="h-4 bg-fashion-bg-secondary rounded mb-2"></div>
              <div className="h-4 bg-fashion-bg-secondary rounded mb-2"></div>
              <div className="h-4 bg-fashion-bg-secondary rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (error || !post) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-fashion-bg text-fashion-fg pt-24">
          <div className="max-w-4xl mx-auto px-8 lg:px-16 text-center">
            <FadeInUp>
              <h1 className="text-4xl font-light mb-8 text-fashion-fg">
                {t('articleNotFound')}
              </h1>
              <p className="text-fashion-fg-secondary mb-8">
                {t('articleNotFoundDesc')}
              </p>
              <Link 
                href="/blog"
                className="inline-flex items-center space-x-2 px-8 py-3 border border-fashion-rose text-fashion-rose hover:bg-fashion-rose hover:text-fashion-bg transition-colors tracking-wide font-light rounded-full"
              >
                <ArrowLeft size={16} />
                <span>{t('backToBlog')}</span>
              </Link>
            </FadeInUp>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <article className="min-h-screen bg-fashion-bg text-fashion-fg pt-24">
        
        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-8 lg:px-16 mb-8">
          <Link 
            href="/blog"
            className="inline-flex items-center space-x-2 text-fashion-fg-secondary hover:text-fashion-rose transition-colors"
          >
            <ArrowLeft size={16} />
            <span>{t('backToBlog')}</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-8 lg:px-16 mb-12">
          <FadeInUp>
            <h1 className="text-4xl lg:text-5xl font-light tracking-wide mb-6 font-playfair text-fashion-fg">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-sm text-fashion-fg-muted mb-8 space-x-6">
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{new Date(post.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{post.readTime}</span>
              </div>
              <span className="text-fashion-rose">Por Ana Nicoleta</span>
            </div>

            <p className="text-xl text-fashion-fg-secondary leading-relaxed mb-8 font-light">
              {post.excerpt}
            </p>
          </FadeInUp>
        </header>

        {/* Featured Image */}
        <div className="max-w-6xl mx-auto px-8 lg:px-16 mb-12">
          <FadeInUp delay={0.2}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>
          </FadeInUp>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-8 lg:px-16 mb-16">
          <FadeInUp delay={0.4}>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: formatContent(post.content) 
              }}
            />
          </FadeInUp>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="max-w-4xl mx-auto px-8 lg:px-16 mb-16">
            <FadeInUp delay={0.6}>
              <div className="border-t border-fashion-bg-secondary pt-8">
                <h3 className="text-sm text-fashion-fg-muted mb-4 uppercase tracking-wide">
                  Etiquetas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-fashion-bg-secondary text-fashion-fg-secondary text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInUp>
          </div>
        )}

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto px-8 lg:px-16 mb-16">
          <FadeInUp delay={0.8}>
            <div className="bg-fashion-bg-secondary p-8 rounded-lg text-center">
              <h3 className="text-2xl font-light mb-4 text-fashion-fg font-playfair">
                ¿Te gustó este artículo?
              </h3>
              <p className="text-fashion-fg-secondary mb-6">
                Descubre más contenido sobre mi trabajo y experiencias en el mundo de la moda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/portfolio"
                  className="px-8 py-3 border border-fashion-rose text-fashion-rose hover:bg-fashion-rose hover:text-fashion-bg transition-colors tracking-wide font-light rounded-full"
                >
                  Ver Portfolio
                </Link>
                <Link 
                  href="/contact"
                  className="px-8 py-3 bg-fashion-rose text-fashion-bg hover:bg-fashion-deep-copper transition-colors tracking-wide font-light rounded-full"
                >
                  Colaborar Conmigo
                </Link>
              </div>
            </div>
          </FadeInUp>
        </div>
      </article>
    </MainLayout>
  )
}
