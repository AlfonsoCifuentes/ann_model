'use client'

import { useState, useMemo } from 'react'
import { FadeInUp } from '../animations/MicroAnimations'

export const BlogSearch = ({ posts, onFilteredPosts, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Categorías disponibles
  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'editorial', label: 'Editorial' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'tips', label: 'Tips & Advice' },
    { id: 'behind-scenes', label: 'Behind the Scenes' },
    { id: 'career', label: 'Career' }
  ]

  // Filtrar posts
  const filteredPosts = useMemo(() => {
    let filtered = posts

    // Filtro por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => 
        post.category === selectedCategory || 
        post.tags?.includes(selectedCategory)
      )
    }

    // Filtro por búsqueda
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    return filtered
  }, [posts, searchTerm, selectedCategory])

  // Notificar cambios al componente padre
  useState(() => {
    onFilteredPosts?.(filteredPosts)
  }, [filteredPosts, onFilteredPosts])

  return (
    <FadeInUp className={className}>
      <div className="space-y-6">
        
        {/* Buscador */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors font-inter"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Filtros por categoría */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Contador de resultados */}
        {searchTerm || selectedCategory !== 'all' ? (
          <div className="text-sm text-gray-500 font-inter">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
            {searchTerm && ` for "${searchTerm}"`}
          </div>
        ) : null}
      </div>
    </FadeInUp>
  )
}

export default BlogSearch
