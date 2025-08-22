import Link from 'next/link'
import { Calendar, ExternalLink, ArrowUpRight } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Press & Media - MODEL_NAME',
  description: 'Latest press coverage, interviews, and media appearances featuring MODEL_NAME in top fashion and entertainment publications.',
}

const pressArticles = [
  {
    title: 'Rising Star: The Next Generation of International Models',
    publication: 'Vogue International',
    date: '2024-03-15',
    excerpt: 'An in-depth profile exploring the journey of emerging talents reshaping the fashion industry...',
    category: 'Feature',
    image: '/images/press/vogue-feature.jpg',
    external: true,
    url: '#'
  },
  {
    title: 'Behind the Scenes: Fashion Week Exclusive',
    publication: 'Harper\'s Bazaar',
    date: '2024-02-28',
    excerpt: 'Exclusive access to the most anticipated runway shows and the models who brought them to life...',
    category: 'Interview',
    image: '/images/press/harpers-interview.jpg',
    external: true,
    url: '#'
  },
  {
    title: 'Sustainable Fashion: Models Leading the Change',
    publication: 'Elle Magazine',
    date: '2024-02-10',
    excerpt: 'How conscious models are influencing brands toward more sustainable practices in fashion...',
    category: 'Editorial',
    image: '/images/press/elle-sustainability.jpg',
    external: false,
    slug: 'sustainable-fashion-elle'
  },
  {
    title: 'The Art of Movement: Dance Meets Fashion',
    publication: 'W Magazine',
    date: '2024-01-22',
    excerpt: 'Exploring the intersection of dance and fashion through the lens of multitalented performers...',
    category: 'Feature',
    image: '/images/press/w-magazine-dance.jpg',
    external: true,
    url: '#'
  },
  {
    title: 'Young Actresses to Watch in 2024',
    publication: 'Variety',
    date: '2024-01-05',
    excerpt: 'Our annual list of breakthrough performers making waves in film and television...',
    category: 'List',
    image: '/images/press/variety-young-actresses.jpg',
    external: true,
    url: '#'
  },
  {
    title: 'International Talent: Crossing Borders',
    publication: 'The Fashion Spot',
    date: '2023-12-18',
    excerpt: 'How international models are bringing fresh perspectives to global fashion campaigns...',
    category: 'Interview',
    image: '/images/press/fashion-spot-international.jpg',
    external: false,
    slug: 'international-talent-crossing-borders'
  }
]

const mediaStats = [
  { label: 'Press Features', value: '25+' },
  { label: 'Magazine Covers', value: '8' },
  { label: 'International Publications', value: '15+' },
  { label: 'Interview Features', value: '12' }
]

export default function PressPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6">
                Press & Media
              </h1>
              <p className="text-lg text-brand-muted max-w-2xl mx-auto mb-8">
                Featured in leading fashion and entertainment publications worldwide. 
                Discover my journey through exclusive interviews, profiles, and editorial features.
              </p>
              
              {/* Media Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                {mediaStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-playfair font-bold text-brand-accent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-brand-muted">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Press Articles Grid */}
        <section className="section-padding bg-brand-bg/30">
          <div className="container-custom">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-4">
                Latest Coverage
              </h2>
              <p className="text-center text-brand-muted">
                Recent press features and media appearances
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pressArticles.map((article, index) => (
                <article 
                  key={index}
                  className="bg-brand-bg/50 rounded-lg overflow-hidden group hover:bg-brand-bg/70 transition-colors duration-300"
                >
                  {/* Article Image */}
                  <div className="aspect-[4/3] bg-gray-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-accent/20 flex items-center justify-center">
                      <span className="text-brand-accent text-sm font-medium">
                        {article.publication}
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-brand-accent bg-brand-accent/10 px-2 py-1 rounded">
                        {article.category}
                      </span>
                      <div className="flex items-center text-brand-muted text-sm">
                        <Calendar size={14} className="mr-1" />
                        {new Date(article.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>

                    <h3 className="font-playfair font-semibold text-lg mb-2 text-brand-fg group-hover:text-brand-accent transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-brand-muted text-sm mb-3 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-brand-accent text-sm font-medium">
                        {article.publication}
                      </span>
                      
                      {article.external ? (
                        <a 
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-brand-accent hover:text-brand-fg transition-colors text-sm"
                        >
                          <span className="mr-1">Read More</span>
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <Link 
                          href={`/press/${article.slug}`}
                          className="flex items-center text-brand-accent hover:text-brand-fg transition-colors text-sm"
                        >
                          <span className="mr-1">Read More</span>
                          <ArrowUpRight size={14} />
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Quote Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <blockquote className="text-2xl md:text-3xl font-playfair font-light italic text-brand-fg mb-6">
                "MODEL_NAME brings a unique combination of elegance and authenticity to every project. 
                Her ability to embody diverse characters while maintaining her distinctive presence 
                makes her one of the most promising talents of her generation."
              </blockquote>
              <cite className="text-brand-accent font-medium">
                — Fashion Editor, Vogue International
              </cite>
            </div>
          </div>
        </section>

        {/* Media Kit Section */}
        <section className="section-padding bg-brand-accent/10">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                Media Resources
              </h2>
              <p className="text-brand-muted text-lg max-w-2xl mx-auto">
                Professional media kit with high-resolution images, biography, and press materials 
                for editorial use.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-brand-bg/30 rounded-lg">
                <h3 className="font-playfair font-semibold text-lg mb-3 text-brand-accent">
                  Press Kit
                </h3>
                <p className="text-brand-muted text-sm mb-4">
                  Complete media package with biography, statistics, and career highlights
                </p>
                <button className="btn-secondary text-sm">
                  Download PDF
                </button>
              </div>

              <div className="text-center p-6 bg-brand-bg/30 rounded-lg">
                <h3 className="font-playfair font-semibold text-lg mb-3 text-brand-accent">
                  High-Res Images
                </h3>
                <p className="text-brand-muted text-sm mb-4">
                  Professional headshots and portfolio images for editorial use
                </p>
                <button className="btn-secondary text-sm">
                  Access Gallery
                </button>
              </div>

              <div className="text-center p-6 bg-brand-bg/30 rounded-lg">
                <h3 className="font-playfair font-semibold text-lg mb-3 text-brand-accent">
                  Contact Press
                </h3>
                <p className="text-brand-muted text-sm mb-4">
                  For interviews, collaborations, and media inquiries
                </p>
                <a href="/contact" className="btn-secondary text-sm">
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
