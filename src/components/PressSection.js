'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Download, Calendar, Award, Users, Tv } from 'lucide-react'
import { FadeInUp, StaggerContainer, StaggerItem, HoverLift } from './animations/MicroAnimations'
import { useLanguage } from '../contexts/LanguageContext'

export default function PressSection() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('all')

  const pressItems = [
    {
      id: 1,
      category: 'magazine',
      title: 'Vogue España Cover Story',
      publication: 'Vogue España',
      date: '2024-03-15',
      description: 'Featured as rising star in Spanish fashion industry',
      image: '/photos/SVM05701.jpg',
      link: 'https://vogue.es/cover-story',
      type: 'Cover Feature',
      highlights: ['Cover Model', 'Fashion Editorial', '8-page spread']
    },
    {
      id: 2,
      category: 'interview',
      title: 'Behind the Lens: A Model\'s Journey',
      publication: 'Harper\'s Bazaar',
      date: '2024-02-20',
      description: 'In-depth interview about career highlights and future aspirations',
      image: '/photos/editorial_1.jpg',
      link: 'https://harpersbazaar.com/interview',
      type: 'Interview',
      highlights: ['Personal Story', 'Career Insights', 'Exclusive Photos']
    },
    {
      id: 3,
      category: 'award',
      title: 'Best New Model 2024',
      publication: 'Fashion Awards Madrid',
      date: '2024-01-10',
      description: 'Recognized for outstanding contribution to Spanish fashion',
      image: '/photos/fashion_model_1.jpg',
      link: '#',
      type: 'Award',
      highlights: ['Industry Recognition', 'Fashion Awards', 'Madrid Fashion Week']
    },
    {
      id: 4,
      category: 'collaboration',
      title: 'Sustainable Fashion Campaign',
      publication: 'Elle España',
      date: '2023-12-05',
      description: 'Ambassador for eco-conscious fashion initiatives',
      image: '/photos/portrait_1.jpg',
      link: 'https://elle.es/sustainable-fashion',
      type: 'Campaign',
      highlights: ['Sustainability', 'Brand Ambassador', 'Social Impact']
    },
    {
      id: 5,
      category: 'tv',
      title: 'Fashion Week Insider',
      publication: 'TVE Style',
      date: '2023-11-18',
      description: 'TV appearance discussing Milan Fashion Week experience',
      image: '/photos/ana_portrait_2.jpg',
      link: '#',
      type: 'TV Appearance',
      highlights: ['Television', 'Milan Fashion Week', 'Expert Commentary']
    },
    {
      id: 6,
      category: 'magazine',
      title: 'Rising Stars of Spanish Cinema',
      publication: 'Fotogramas',
      date: '2023-10-22',
      description: 'Featured among promising new faces in acting',
      image: '/photos/SVM05722.jpg',
      link: '#',
      type: 'Feature Article',
      highlights: ['Acting Career', 'Spanish Cinema', 'Future Projects']
    }
  ]

  const categories = [
    { id: 'all', label: 'All Press', icon: Users },
    { id: 'magazine', label: 'Magazines', icon: Award },
    { id: 'interview', label: 'Interviews', icon: Users },
    { id: 'award', label: 'Awards', icon: Award },
    { id: 'collaboration', label: 'Collaborations', icon: Users },
    { id: 'tv', label: 'TV/Media', icon: Tv }
  ]

  const filteredItems = activeCategory === 'all' 
    ? pressItems 
    : pressItems.filter(item => item.category === activeCategory)

  const stats = [
    { number: "15+", label: "Magazine Features" },
    { number: "8", label: "Awards & Recognition" },
    { number: "25+", label: "Press Interviews" },
    { number: "12", label: "TV Appearances" }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        
        {/* Header */}
        <FadeInUp>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-light tracking-wider mb-6">
              Press & Media
            </h2>
            <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
              Media coverage, interviews, and recognition from leading fashion and entertainment publications
            </p>
          </div>
        </FadeInUp>

        {/* Stats */}
        <FadeInUp delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-playfair text-3xl md:text-4xl font-light text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="font-inter text-sm tracking-wide text-gray-600 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeInUp>

        {/* Category Filter */}
        <FadeInUp delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 font-inter font-medium tracking-wide transition-colors duration-300 ${
                    activeCategory === category.id
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-black border border-gray-300 hover:border-black'
                  }`}
                >
                  <IconComponent size={16} />
                  {category.label}
                </button>
              )
            })}
          </div>
        </FadeInUp>

        {/* Press Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <StaggerItem key={item.id}>
                  <HoverLift>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        
                        {/* Type Badge */}
                        <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full text-white text-xs font-inter font-medium">
                          {item.type}
                        </div>
                        
                        {/* Date */}
                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-black text-xs font-inter font-medium">
                          {new Date(item.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <Calendar size={14} />
                          <span className="font-inter">{item.publication}</span>
                        </div>
                        
                        <h3 className="font-playfair text-xl font-medium mb-3 text-gray-900">
                          {item.title}
                        </h3>
                        
                        <p className="font-inter text-gray-600 text-sm leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.highlights.map((highlight, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-inter rounded"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>

                        {/* Action */}
                        {item.link !== '#' && (
                          <Link
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-inter text-sm font-medium text-black hover:text-gray-600 transition-colors"
                          >
                            Read Article
                            <ExternalLink size={14} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </HoverLift>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </AnimatePresence>

        {/* Press Kit Download */}
        <FadeInUp delay={0.6}>
          <div className="mt-16 text-center bg-gray-50 rounded-lg p-8">
            <h3 className="font-playfair text-2xl font-light mb-4">
              Media & Press Kit
            </h3>
            <p className="font-inter text-gray-600 mb-6 max-w-2xl mx-auto">
              Download high-resolution photos, biography, and press materials for media use
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-inter font-medium tracking-wide hover:bg-gray-800 transition-colors"
              >
                <Download size={18} />
                Download Press Kit
              </motion.button>
              
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black text-black font-inter font-medium tracking-wide hover:bg-black hover:text-white transition-colors"
              >
                <Users size={18} />
                Media Inquiries
              </Link>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
