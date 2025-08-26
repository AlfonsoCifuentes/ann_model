'use client'

// Forzar renderizado dinámico para páginas de admin
export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { 
  Upload, Image as ImageIcon, User, Settings, FileText, Plus, Edit3, 
  Trash2, RefreshCw, Star, Eye, EyeOff, Grid, BookOpen, Camera,
  Home, Layers, Target, Info, HelpCircle, LogOut
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import ProtectedRoute from '../../components/ProtectedRoute'
import PhotoUpload from '../../components/PhotoUpload'
import InitialSetup from '../../components/InitialSetup'
import Image from 'next/image'

function AdminContent() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('upload')
  const [selectedPost, setSelectedPost] = useState(null)
  const [showPostEditor, setShowPostEditor] = useState(false)
  const [blogPosts, setBlogPosts] = useState([])
  const [workCollections, setWorkCollections] = useState([])
  const [featuredCollections, setFeaturedCollections] = useState([])
  const [heroPhotos, setHeroPhotos] = useState([])
  const [allPhotos, setAllPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [postForm, setPostForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    status: 'draft',
    tags: [],
    featured: false
  })

  const tabs = [
    { 
      id: 'upload', 
      label: 'Subir Fotos', 
      icon: Upload,
      description: 'Sube nuevas fotos individuales o colecciones completas'
    },
    { 
      id: 'collections', 
      label: 'Mis Trabajos', 
      icon: Layers,
      description: 'Gestiona tus colecciones y trabajos organizados'
    },
    { 
      id: 'featured', 
      label: 'Trabajos Destacados', 
      icon: Star,
      description: 'Selecciona qué trabajos mostrar en la página de inicio'
    },
    { 
      id: 'hero', 
      label: 'Hero Principal', 
      icon: Camera,
      description: 'Gestiona las 5 fotos del carrusel principal'
    },
    { 
      id: 'gallery', 
      label: 'Galería General', 
      icon: Grid,
      description: 'Ve y organiza todas tus fotos'
    },
    { 
      id: 'blog', 
      label: 'Blog Personal', 
      icon: FileText,
      description: 'Escribe y gestiona tus artículos de blog'
    },
    { 
      id: 'settings', 
      label: 'Configuración', 
      icon: Settings,
      description: 'Ajustes generales de la página'
    }
  ]

  // Función para mostrar mensajes
  const showMessage = useCallback((message, type = 'success') => {
    if (type === 'success') {
      setSuccess(message)
      setError('')
    } else {
      setError(message)
      setSuccess('')
    }
    setTimeout(() => {
      setSuccess('')
      setError('')
    }, 5000)
  }, [])

  // Cargar datos según la pestaña activa
  useEffect(() => {
    if (activeTab === 'blog') {
      fetchPosts()
    } else if (activeTab === 'featured' || activeTab === 'collections') {
      fetchWorkCollections()
    } else if (activeTab === 'hero') {
      fetchHeroPhotos()
    } else if (activeTab === 'gallery') {
      fetchAllPhotos()
    }
  }, [activeTab, fetchPosts, fetchWorkCollections, fetchHeroPhotos, fetchAllPhotos])

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/blog')
      const result = await response.json()
      
      if (result.success) {
        setBlogPosts(result.data)
      } else {
        showMessage(result.error || 'Error al cargar los posts', 'error')
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      showMessage('Error de conexión al cargar los posts', 'error')
    } finally {
      setLoading(false)
    }
  }, [showMessage])

  const fetchWorkCollections = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/photos/featured')
      const result = await response.json()
      
      if (result.success) {
        setWorkCollections(result.data)
        setFeaturedCollections(result.data.filter(c => c.featured))
      } else {
        showMessage(result.error || 'Error al cargar las colecciones', 'error')
      }
    } catch (error) {
      console.error('Error fetching collections:', error)
      showMessage('Error de conexión al cargar las colecciones', 'error')
    } finally {
      setLoading(false)
    }
  }, [showMessage])

  const fetchHeroPhotos = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/photos?portfolioSection=hero&status=active&limit=5')
      const result = await response.json()
      
      if (result.success) {
        setHeroPhotos(result.data)
      } else {
        showMessage(result.error || 'Error al cargar las fotos del hero', 'error')
      }
    } catch (error) {
      console.error('Error fetching hero photos:', error)
      showMessage('Error de conexión al cargar las fotos del hero', 'error')
    } finally {
      setLoading(false)
    }
  }, [showMessage])

  const fetchAllPhotos = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/photos?status=active')
      const result = await response.json()
      
      if (result.success) {
        setAllPhotos(result.data)
      } else {
        showMessage(result.error || 'Error al cargar las fotos', 'error')
      }
    } catch (error) {
      console.error('Error fetching photos:', error)
      showMessage('Error de conexión al cargar las fotos', 'error')
    } finally {
      setLoading(false)
    }
  }, [showMessage])

  const toggleFeaturedCollection = async (collectionId, isFeatured) => {
    setLoading(true)
    try {
      const response = await fetch('/api/photos/featured', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workCollection: collectionId,
          featuredInHome: isFeatured
        }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        await fetchWorkCollections()
        showMessage(`Trabajo ${isFeatured ? 'destacado' : 'removido de destacados'} exitosamente`)
      } else {
        showMessage(result.error || 'Error al actualizar el trabajo', 'error')
      }
    } catch (error) {
      console.error('Error updating featured status:', error)
      showMessage('Error de conexión al actualizar el trabajo', 'error')
    } finally {
      setLoading(false)
    }
  }

  const toggleHeroPhoto = async (photoId, isHero) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/photos/${photoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          portfolioSection: isHero ? 'hero' : 'portfolio'
        }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        await fetchHeroPhotos()
        await fetchAllPhotos()
        showMessage(`Foto ${isHero ? 'agregada al' : 'removida del'} hero exitosamente`)
      } else {
        showMessage(result.error || 'Error al actualizar la foto', 'error')
      }
    } catch (error) {
      console.error('Error updating hero status:', error)
      showMessage('Error de conexión al actualizar la foto', 'error')
    } finally {
      setLoading(false)
    }
  }

  // Funciones del blog
  const handleCreatePost = () => {
    setSelectedPost(null)
    setPostForm({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      status: 'draft',
      tags: [],
      featured: false
    })
    setShowPostEditor(true)
  }

  const handleEditPost = (post) => {
    setSelectedPost(post)
    setPostForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      status: post.status,
      tags: post.tags || [],
      featured: post.featured || false
    })
    setShowPostEditor(true)
  }

  const handleSavePost = async () => {
    setLoading(true)
    try {
      const url = selectedPost ? `/api/blog/${selectedPost._id}` : '/api/blog'
      const method = selectedPost ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postForm),
      })
      
      const result = await response.json()
      
      if (result.success) {
        await fetchPosts()
        setShowPostEditor(false)
        showMessage('Artículo guardado exitosamente')
      } else {
        showMessage(result.error || 'Error al guardar el post', 'error')
      }
    } catch (error) {
      console.error('Error saving post:', error)
      showMessage('Error de conexión al guardar el post', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePost = async (postId) => {
    if (!confirm('¿Estás segura de que quieres eliminar este artículo?')) {
      return
    }
    
    setLoading(true)
    try {
      const response = await fetch(`/api/blog/${postId}`, {
        method: 'DELETE',
      })
      
      const result = await response.json()
      
      if (result.success) {
        await fetchPosts()
        showMessage('Artículo eliminado exitosamente')
      } else {
        showMessage(result.error || 'Error al eliminar el post', 'error')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      showMessage('Error de conexión al eliminar el post', 'error')
    } finally {
      setLoading(false)
    }
  }

  const formatCollectionName = (collectionId) => {
    return collectionId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-light tracking-widest text-white">
                ANA<span className="font-bold">NICOLETA</span>
              </h1>
              <span className="ml-4 text-gray-400 text-sm">Panel de Administración</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-300">
                <User size={16} />
                <span className="text-sm">{user.name}</span>
                <span className="text-xs text-gray-500">({user.role})</span>
              </div>
              
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut size={16} />
                <span className="text-sm">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-orange-600 text-white transform scale-105'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <tab.icon size={20} />
              <span className="text-xs font-medium text-center">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Messages */}
        {success && (
          <div className="bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}
        
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div>
              <div className="bg-blue-900 border border-blue-700 text-blue-300 px-4 py-3 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                  <Info size={20} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-2">💡 Cómo usar esta sección:</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Sube fotos individuales que se agregarán automáticamente al portfolio</li>
                      <li>• Usa nombres descriptivos para tus fotos</li>
                      <li>• Selecciona la categoría apropiada (Editorial, Moda, Retrato, Comercial)</li>
                      <li>• Las fotos aparecerán en tu galería y portfolio inmediatamente</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-light text-white mb-6">Subir Nuevas Fotos</h2>
              <PhotoUpload onUploadSuccess={() => {
                showMessage('¡Fotos subidas exitosamente!')
              }} />
            </div>
          )}

          {/* Collections Tab */}
          {activeTab === 'collections' && (
            <div>
              <div className="bg-blue-900 border border-blue-700 text-blue-300 px-4 py-3 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                  <Info size={20} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-2">📂 Gestión de Trabajos:</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Aquí ves todos tus trabajos organizados por colecciones</li>
                      <li>• Las fotos se agrupan automáticamente si tienen el mismo "nombre de trabajo"</li>
                      <li>• Puedes ver cuántas fotos tiene cada trabajo</li>
                      <li>• Los trabajos aparecen automáticamente en tu portfolio público</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light text-white">Mis Trabajos y Colecciones</h2>
                <button
                  onClick={fetchWorkCollections}
                  disabled={loading}
                  className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                  Actualizar
                </button>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  <p className="text-gray-400 mt-2">Cargando trabajos...</p>
                </div>
              ) : workCollections.length > 0 ? (
                <div className="grid gap-6">
                  {workCollections.map((collection) => (
                    <div key={collection.id} className="bg-gray-800 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-medium text-white">{collection.title}</h3>
                          <p className="text-gray-400 text-sm">
                            {collection.photos.length} fotos • ID: {collection.id}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {collection.featured && (
                            <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">
                              ⭐ Destacado en Inicio
                            </span>
                          )}
                          <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded">
                            En Portfolio
                          </span>
                        </div>
                      </div>

                      {/* Photo Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                        {collection.photos.slice(0, 12).map((photo, index) => (
                          <div key={index} className="aspect-square relative overflow-hidden rounded">
                            <Image
                              src={photo.imageUrl}
                              alt={photo.title}
                              fill
                              className="object-cover"
                              sizes="150px"
                            />
                          </div>
                        ))}
                        {collection.photos.length > 12 && (
                          <div className="aspect-square bg-gray-700 rounded flex items-center justify-center">
                            <span className="text-gray-300 text-sm">+{collection.photos.length - 12}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                  <Layers className="mx-auto w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-gray-400">No tienes trabajos organizados aún</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Sube fotos y se organizarán automáticamente en trabajos
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Featured Tab */}
          {activeTab === 'featured' && (
            <div>
              <div className="bg-blue-900 border border-blue-700 text-blue-300 px-4 py-3 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                  <Info size={20} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-2">⭐ Trabajos Destacados:</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Selecciona hasta 2 trabajos para mostrar en la página de inicio</li>
                      <li>• Estos trabajos aparecerán en la sección "Trabajo Reciente"</li>
                      <li>• Los visitantes verán estos trabajos primero al entrar a tu página</li>
                      <li>• Puedes cambiarlos cuando quieras para mostrar tus últimos proyectos</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light text-white">
                  Trabajos Destacados en Inicio ({featuredCollections.length}/2)
                </h2>
                <button
                  onClick={fetchWorkCollections}
                  disabled={loading}
                  className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                  Actualizar
                </button>
              </div>

              {/* Currently Featured */}
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  ✨ Actualmente Destacados
                </h3>
                
                {featuredCollections.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {featuredCollections.map((collection) => (
                      <div key={collection.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-white font-medium">{collection.title}</h4>
                          <button
                            onClick={() => toggleFeaturedCollection(collection.id, false)}
                            disabled={loading}
                            className="text-red-400 hover:text-red-300 disabled:opacity-50 p-1"
                            title="Quitar de destacados"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {collection.photos.slice(0, 4).map((photo, index) => (
                            <div key={index} className="aspect-square relative overflow-hidden rounded">
                              <Image
                                src={photo.imageUrl}
                                alt={photo.title}
                                fill
                                className="object-cover"
                                sizes="100px"
                              />
                            </div>
                          ))}
                        </div>
                        <p className="text-gray-400 text-xs mt-2">
                          {collection.photos.length} fotos
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No hay trabajos destacados actualmente.</p>
                    <p className="text-gray-500 text-sm mt-2">
                      Selecciona trabajos de la lista de abajo para destacarlos.
                    </p>
                  </div>
                )}
              </div>

              {/* All Collections */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Todos los Trabajos Disponibles
                </h3>
                
                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    <p className="text-gray-400 mt-2">Cargando trabajos...</p>
                  </div>
                ) : workCollections.length > 0 ? (
                  <div className="grid gap-4">
                    {workCollections.map((collection) => (
                      <div key={collection.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="grid grid-cols-3 gap-1">
                              {collection.photos.slice(0, 3).map((photo, index) => (
                                <div key={index} className="w-12 h-12 relative overflow-hidden rounded">
                                  <Image
                                    src={photo.imageUrl}
                                    alt={photo.title}
                                    fill
                                    className="object-cover"
                                    sizes="50px"
                                  />
                                </div>
                              ))}
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{collection.title}</h4>
                              <p className="text-gray-400 text-sm">
                                {collection.photos.length} fotos
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {collection.featured && (
                              <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">
                                ⭐ Destacado
                              </span>
                            )}
                            <button
                              onClick={() => toggleFeaturedCollection(collection.id, !collection.featured)}
                              disabled={loading || (!collection.featured && featuredCollections.length >= 2)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
                                collection.featured
                                  ? 'bg-red-600 hover:bg-red-700 text-white'
                                  : 'bg-orange-600 hover:bg-orange-700 text-white'
                              }`}
                            >
                              {collection.featured ? 'Quitar Destacado' : 'Destacar'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No tienes trabajos disponibles aún.</p>
                    <p className="text-gray-500 text-sm mt-2">
                      Sube fotos para crear trabajos que puedas destacar.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Hero Tab */}
          {activeTab === 'hero' && (
            <div>
              <div className="bg-blue-900 border border-blue-700 text-blue-300 px-4 py-3 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                  <Info size={20} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-2">📸 Hero Principal:</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Selecciona exactamente 5 fotos para el carrusel principal</li>
                      <li>• Estas fotos son lo primero que ven los visitantes</li>
                      <li>• Elige tus mejores fotos que representen tu estilo</li>
                      <li>• Las fotos se muestran en orden aleatorio automáticamente</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light text-white">
                  Fotos del Hero Principal ({heroPhotos.length}/5)
                </h2>
                <button
                  onClick={fetchHeroPhotos}
                  disabled={loading}
                  className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                  Actualizar
                </button>
              </div>

              {/* Current Hero Photos */}
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  🎯 Fotos Actuales del Hero
                </h3>
                
                {heroPhotos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {heroPhotos.map((photo, index) => (
                      <div key={photo._id} className="relative group">
                        <div className="aspect-square relative overflow-hidden rounded-lg">
                          <Image
                            src={photo.imageUrl}
                            alt={photo.title}
                            fill
                            className="object-cover"
                            sizes="200px"
                          />
                        </div>
                        <button
                          onClick={() => toggleHeroPhoto(photo._id, false)}
                          disabled={loading}
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                          title="Quitar del hero"
                        >
                          <Trash2 size={14} />
                        </button>
                        <p className="text-white text-sm mt-2 truncate">{photo.title}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Camera className="mx-auto w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-gray-400">No hay fotos en el hero actualmente.</p>
                    <p className="text-gray-500 text-sm mt-2">
                      Selecciona fotos de tu galería para agregarlas.
                    </p>
                  </div>
                )}
              </div>

              {/* All Photos for Selection */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Seleccionar Fotos para el Hero
                </h3>
                
                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    <p className="text-gray-400 mt-2">Cargando fotos...</p>
                  </div>
                ) : allPhotos.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {allPhotos.filter(photo => photo.portfolioSection !== 'hero').map((photo) => (
                      <div key={photo._id} className="relative group">
                        <div className="aspect-square relative overflow-hidden rounded-lg">
                          <Image
                            src={photo.imageUrl}
                            alt={photo.title}
                            fill
                            className="object-cover"
                            sizes="150px"
                          />
                        </div>
                        <button
                          onClick={() => toggleHeroPhoto(photo._id, true)}
                          disabled={loading || heroPhotos.length >= 5}
                          className="absolute top-2 right-2 bg-orange-600 hover:bg-orange-700 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                          title={heroPhotos.length >= 5 ? "Ya tienes 5 fotos en el hero" : "Agregar al hero"}
                        >
                          <Plus size={14} />
                        </button>
                        <p className="text-white text-xs mt-1 truncate">{photo.title}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No tienes fotos disponibles.</p>
                    <p className="text-gray-500 text-sm mt-2">
                      Sube fotos primero para poder agregarlas al hero.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div>
              <div className="bg-blue-900 border border-blue-700 text-blue-300 px-4 py-3 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                  <Info size={20} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-2">🖼️ Galería General:</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Aquí ves todas tus fotos en un solo lugar</li>
                      <li>• Puedes ver el estado de cada foto (Portfolio, Hero, etc.)</li>
                      <li>• Las fotos se organizan automáticamente por fecha de subida</li>
                      <li>• Usa esta vista para tener un resumen completo de tu contenido</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light text-white">
                  Galería General ({allPhotos.length} fotos)
                </h2>
                <button
                  onClick={fetchAllPhotos}
                  disabled={loading}
                  className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                  Actualizar
                </button>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  <p className="text-gray-400 mt-2">Cargando galería...</p>
                </div>
              ) : allPhotos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {allPhotos.map((photo) => (
                    <div key={photo._id} className="bg-gray-800 rounded-lg overflow-hidden">
                      <div className="aspect-square relative">
                        <Image
                          src={photo.imageUrl}
                          alt={photo.title}
                          fill
                          className="object-cover"
                          sizes="200px"
                        />
                        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                          {photo.portfolioSection === 'hero' && (
                            <span className="bg-purple-600 text-white text-xs px-1 py-0.5 rounded">
                              Hero
                            </span>
                          )}
                          {photo.featuredInHome && (
                            <span className="bg-orange-600 text-white text-xs px-1 py-0.5 rounded">
                              ⭐
                            </span>
                          )}
                          <span className="bg-gray-600 text-white text-xs px-1 py-0.5 rounded">
                            {photo.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-2">
                        <p className="text-white text-sm truncate">{photo.title}</p>
                        {photo.workCollection && (
                          <p className="text-gray-400 text-xs truncate">
                            {formatCollectionName(photo.workCollection)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                  <ImageIcon className="mx-auto w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-gray-400">No tienes fotos en tu galería aún</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Ve a la sección "Subir Fotos" para comenzar a llenar tu galería
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Blog Tab */}
          {activeTab === 'blog' && !showPostEditor && (
            <div>
              <div className="bg-blue-900 border border-blue-700 text-blue-300 px-4 py-3 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                  <Info size={20} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-2">✍️ Blog Personal:</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Comparte tus experiencias y reflexiones personales</li>
                      <li>• Los artículos aparecen en la sección de blog de tu página</li>
                      <li>• Puedes guardar borradores y publicarlos cuando quieras</li>
                      <li>• Conecta más personalmente con tus seguidores</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light text-white">Gestión del Blog</h2>
                <div className="flex gap-2">
                  <button
                    onClick={fetchPosts}
                    disabled={loading}
                    className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    Actualizar
                  </button>
                  <button
                    onClick={handleCreatePost}
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus size={18} />
                    Nuevo Artículo
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  <p className="text-gray-400 mt-2">Cargando artículos...</p>
                </div>
              ) : blogPosts.length > 0 ? (
                <div className="grid gap-4">
                  {blogPosts.map((post) => (
                    <div key={post._id} className="bg-gray-800 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-medium text-white mb-2">{post.title}</h3>
                          <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className={`px-2 py-1 rounded text-xs ${
                              post.status === 'published' 
                                ? 'bg-green-600 text-white' 
                                : 'bg-yellow-600 text-white'
                            }`}>
                              {post.status === 'published' ? 'Publicado' : 'Borrador'}
                            </span>
                            {post.featured && (
                              <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs">
                                Destacado
                              </span>
                            )}
                            <span>{new Date(post.createdAt).toLocaleDateString('es-ES')}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditPost(post)}
                            className="text-blue-400 hover:text-blue-300 p-2"
                            title="Editar"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post._id)}
                            className="text-red-400 hover:text-red-300 p-2"
                            title="Eliminar"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                  <BookOpen className="mx-auto w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-gray-400">No tienes artículos en tu blog aún</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Crea tu primer artículo para comenzar a compartir tus experiencias
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Blog Editor */}
          {activeTab === 'blog' && showPostEditor && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light text-white">
                  {selectedPost ? 'Editar Artículo' : 'Nuevo Artículo'}
                </h2>
                <button
                  onClick={() => setShowPostEditor(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕ Cancelar
                </button>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Título
                    </label>
                    <input
                      type="text"
                      value={postForm.title}
                      onChange={(e) => setPostForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                      placeholder="Título de tu artículo..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Resumen
                    </label>
                    <textarea
                      value={postForm.excerpt}
                      onChange={(e) => setPostForm(prev => ({ ...prev, excerpt: e.target.value }))}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                      rows="3"
                      placeholder="Breve resumen de tu artículo..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Contenido
                    </label>
                    <textarea
                      value={postForm.content}
                      onChange={(e) => setPostForm(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                      rows="12"
                      placeholder="Escribe tu artículo aquí..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Estado
                      </label>
                      <select
                        value={postForm.status}
                        onChange={(e) => setPostForm(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                      >
                        <option value="draft">Borrador</option>
                        <option value="published">Publicado</option>
                      </select>
                    </div>

                    <div className="flex items-center">
                      <label className="flex items-center text-gray-300">
                        <input
                          type="checkbox"
                          checked={postForm.featured}
                          onChange={(e) => setPostForm(prev => ({ ...prev, featured: e.target.checked }))}
                          className="mr-2"
                        />
                        Artículo destacado
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleSavePost}
                      disabled={loading || !postForm.title.trim()}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Guardando...' : 'Guardar Artículo'}
                    </button>
                    <button
                      onClick={() => setShowPostEditor(false)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <div className="bg-blue-900 border border-blue-700 text-blue-300 px-4 py-3 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                  <Info size={20} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-2">⚙️ Configuración:</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Configuración inicial para nuevos usuarios</li>
                      <li>• Ajustes generales de tu página web</li>
                      <li>• Configuración de contacto y redes sociales</li>
                      <li>• Funciones avanzadas (próximamente)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-light text-white mb-6">Configuración</h2>
              
              <div className="space-y-6">
                {/* Configuración Inicial */}
                <InitialSetup onComplete={() => {
                  showMessage('Configuración inicial completada. ¡Ya puedes gestionar tu contenido!', 'success')
                  // Refrescar datos si estamos en una pestaña relevante
                  if (activeTab === 'featured' || activeTab === 'hero') {
                    fetchWorkCollections()
                    fetchHeroPhotos()
                  }
                }} />
                
                {/* Panel de configuración adicional */}
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                  <Settings className="mx-auto w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-gray-400">Configuraciones adicionales</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Próximamente: ajustes de perfil, redes sociales, y más opciones de personalización
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <ProtectedRoute requireAuth={true}>
      <AdminContent />
    </ProtectedRoute>
  )
}
