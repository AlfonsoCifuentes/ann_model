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
      title: 'Behind the Scenes: Editorial Shoot in Barcelona',
      excerpt: 'A glimpse into my recent fashion editorial shoot with renowned photographer Marc Stevens in the beautiful streets of Barcelona.',
      date: 'March 15, 2024',
      readTime: '5 min read',
      image: '/photos/editorial_1.jpg',
      slug: 'editorial-shoot-barcelona'
    },
    {
      id: 2,
      title: 'The Art of Posing: Tips for Aspiring Models',
      excerpt: 'Years of experience have taught me the subtle art of posing. Here are my top tips for creating compelling photographs.',
      date: 'March 8, 2024',
      readTime: '7 min read',
      image: '/photos/fashion_model_1.jpg',
      slug: 'posing-tips-aspiring-models'
    },
    {
      id: 3,
      title: 'Fashion Week Highlights: Milan 2024',
      excerpt: 'Reflecting on my experiences walking for emerging designers during Milan Fashion Week 2024.',
      date: 'February 28, 2024',
      readTime: '6 min read',
      image: '/photos/fashion_model_2.jpg',
      slug: 'milan-fashion-week-2024'
    },
    {
      id: 4,
      title: 'Building Confidence in Front of the Camera',
      excerpt: 'Confidence is key to great photography. Learn how I developed my on-camera presence and overcome initial nervousness.',
      date: 'February 20, 2024',
      readTime: '4 min read',
      image: '/photos/portrait_1.jpg',
      slug: 'building-camera-confidence'
    },
    {
      id: 5,
      title: 'Sustainable Fashion: My Personal Journey',
      excerpt: 'How I\'ve embraced sustainable fashion choices in my modeling career and personal life.',
      date: 'February 12, 2024',
      readTime: '8 min read',
      image: '/photos/studio_1.jpg',
      slug: 'sustainable-fashion-journey'
    },
    {
      id: 6,
      title: 'Working with Different Photographers: Adaptability',
      excerpt: 'Each photographer has their unique style. Here\'s how I adapt my approach to bring their vision to life.',
      date: 'February 5, 2024',
      readTime: '5 min read',
      image: '/photos/studio_2.jpg',
      slug: 'working-with-photographers'
    }
  ]
  
  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        
        {/* Hero Section */}
        <div className="py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-8 lg:px-16">
            <div className="text-center mb-16">
              <FadeInUp>
                <h1 className="text-4xl lg:text-5xl font-light tracking-wider mb-6 font-playfair">
                  {t('blogTitle')}
                </h1>
                <p className="text-gray-600 font-light max-w-2xl mx-auto leading-relaxed font-inter">
                  {t('blogDescription')}
                </p>
              </FadeInUp>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        <div className="pb-16">
          <div className="max-w-6xl mx-auto px-8 lg:px-16">
            <FadeInUp>
              <div className="bg-gray-50 p-8 lg:p-12 rounded-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                    <Image
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 font-light tracking-wide mb-2">
                      {t('featuredPost')}
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-light tracking-wider mb-4 font-playfair">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-gray-600 font-light mb-6 leading-relaxed font-inter">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 font-light mb-6">
                      <span>{blogPosts[0].date}</span>
                      <span className="mx-2">•</span>
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                    <button className="px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors tracking-wide font-light rounded-lg">
                      {t('readMore')}
                    </button>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="pb-16 lg:pb-24">
          <div className="max-w-6xl mx-auto px-8 lg:px-16">
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post, index) => (
                <StaggerItem key={post.id}>
                  <HoverLift>
                    <article className="group cursor-pointer">
                      
                      <div className="relative aspect-[4/5] overflow-hidden mb-4 rounded-lg">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading="lazy"
                        />
                      </div>

                      <div>
                        <h3 className="text-xl font-light tracking-wide mb-3 font-playfair group-hover:text-gray-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 font-light mb-4 leading-relaxed text-sm font-inter">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 font-light">
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </article>
                  </HoverLift>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-8 lg:px-16 text-center">
            
            <FadeInUp>
              <h2 className="text-3xl lg:text-4xl font-light tracking-wider mb-4 font-playfair">
                {t('stayUpdated')}
              </h2>
              <p className="text-gray-600 font-light mb-8 leading-relaxed font-inter">
                {t('newsletterDescription')}
              </p>

              <div className="max-w-md mx-auto">
                <div className="flex">
                  <input
                    type="email"
                    placeholder={t('enterEmail')}
                    className="flex-1 px-4 py-3 border border-gray-300 font-light text-sm focus:outline-none focus:border-black rounded-l-lg"
                  />
                  <button className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors tracking-wide font-light text-sm rounded-r-lg">
                    {t('subscribe')}
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
