'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeInUp, StaggerContainer } from '../animations/MicroAnimations'

export default function AdvancedFilters({ 
  items = [], 
  onFilter, 
  categories = [],
  tags = [],
  sortOptions = [],
  className = "" 
}) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeTags, setActiveTags] = useState([])
  const [sortBy, setSortBy] = useState('date')
  const [searchQuery, setSearchQuery] = useState('')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [filteredItems, setFilteredItems] = useState(items)

  // Filter and sort items
  useEffect(() => {
    let filtered = items

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory)
    }

    // Tags filter
    if (activeTags.length > 0) {
      filtered = filtered.filter(item => 
        activeTags.every(tag => item.tags?.includes(tag))
      )
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date)
        case 'title':
          return a.title.localeCompare(b.title)
        case 'category':
          return a.category.localeCompare(b.category)
        default:
          return 0
      }
    })

    setFilteredItems(filtered)
    onFilter?.(filtered)
  }, [items, activeCategory, activeTags, searchQuery, sortBy, onFilter])

  const toggleTag = (tag) => {
    setActiveTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setActiveCategory('all')
    setActiveTags([])
    setSearchQuery('')
    setSortBy('date')
  }

  const hasActiveFilters = activeCategory !== 'all' || activeTags.length > 0 || searchQuery

  return (
    <div className={`w-full ${className}`}>
      
      {/* Filter Toggle Button (Mobile) */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
        >
          <span className="font-inter font-medium text-gray-900">
            Filters {hasActiveFilters && `(${activeCategory !== 'all' ? 1 : 0 + activeTags.length + (searchQuery ? 1 : 0)})`}
          </span>
          <motion.div
            animate={{ rotate: isFiltersOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-5 h-5"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </button>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {(isFiltersOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:block overflow-hidden"
          >
            <StaggerContainer className="space-y-6 p-4 md:p-6 bg-white border border-gray-200 rounded-lg mb-8">
              
              {/* Search */}
              <FadeInUp>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all font-inter"
                  />
                  <div className="absolute left-3 top-3.5 w-4 h-4 text-gray-400">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 hover:text-gray-600"
                    >
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </FadeInUp>

              {/* Categories */}
              {categories.length > 0 && (
                <FadeInUp>
                  <div>
                    <h3 className="font-inter font-medium text-gray-900 mb-3">Category</h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-4 py-2 rounded-full border transition-all font-inter text-sm ${
                          activeCategory === 'all'
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        All
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          className={`px-4 py-2 rounded-full border transition-all font-inter text-sm ${
                            activeCategory === category
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </FadeInUp>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <FadeInUp>
                  <div>
                    <h3 className="font-inter font-medium text-gray-900 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1.5 rounded-full border transition-all font-inter text-xs ${
                            activeTags.includes(tag)
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </FadeInUp>
              )}

              {/* Sort */}
              {sortOptions.length > 0 && (
                <FadeInUp>
                  <div>
                    <h3 className="font-inter font-medium text-gray-900 mb-3">Sort by</h3>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full md:w-auto px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent font-inter text-sm"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </FadeInUp>
              )}

              {/* Clear Filters */}
              {hasActiveFilters && (
                <FadeInUp>
                  <button
                    onClick={clearFilters}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors font-inter text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Clear all filters</span>
                  </button>
                </FadeInUp>
              )}
            </StaggerContainer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <motion.div
        layout
        className="flex items-center justify-between mb-6"
      >
        <span className="font-inter text-sm text-gray-600">
          {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'}
        </span>
        
        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500">Active filters:</span>
            <div className="flex items-center space-x-1">
              {activeCategory !== 'all' && (
                <span className="px-2 py-1 bg-black text-white rounded text-xs">
                  {activeCategory}
                </span>
              )}
              {activeTags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {tag}
                </span>
              ))}
              {searchQuery && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  "{searchQuery}"
                </span>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

// Hook for advanced filtering
export function useAdvancedFilters(items, initialFilters = {}) {
  const [filters, setFilters] = useState({
    category: 'all',
    tags: [],
    search: '',
    sortBy: 'date',
    ...initialFilters
  })

  const [filteredItems, setFilteredItems] = useState(items)

  useEffect(() => {
    let result = items

    // Apply filters
    if (filters.category !== 'all') {
      result = result.filter(item => item.category === filters.category)
    }

    if (filters.tags.length > 0) {
      result = result.filter(item => 
        filters.tags.every(tag => item.tags?.includes(tag))
      )
    }

    if (filters.search) {
      result = result.filter(item =>
        item.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.description?.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (filters.sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date)
        case 'title':
          return a.title.localeCompare(b.title)
        case 'category':
          return a.category.localeCompare(b.category)
        default:
          return 0
      }
    })

    setFilteredItems(result)
  }, [items, filters])

  return {
    filteredItems,
    filters,
    setFilters,
    updateFilter: (key, value) => setFilters(prev => ({ ...prev, [key]: value })),
    clearFilters: () => setFilters({ category: 'all', tags: [], search: '', sortBy: 'date' })
  }
}
