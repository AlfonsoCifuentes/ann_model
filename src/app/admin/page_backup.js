'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LogOut, Upload, Image as ImageIcon, User, Settings, FileText, Plus, Edit3, Trash2, RefreshCw } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import ProtectedRoute from '../../components/ProtectedRoute'
import PhotoUpload from '../../components/PhotoUpload'

function AdminContent() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('upload')
  const [selectedPost, setSelectedPost] = useState(null)
  const [showPostEditor, setShowPostEditor] = useState(false)
  const [blogPosts, setBlogPosts] = useState([])
  const [workCollections, setWorkCollections] = useState([])
  const [featuredCollections, setFeaturedCollections] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
    { id: 'upload', label: 'Subir Fotos', icon: Upload },
    { id: 'gallery', label: 'Galería', icon: ImageIcon },
    { id: 'featured', label: 'Trabajos Destacados', icon: Plus },
    { id: 'blog', label: 'Gestión Blog', icon: FileText },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ]

  // Cargar posts cuando se accede a la pestaña de blog
  useEffect(() => {
    if (activeTab === 'blog') {
      fetchPosts()
    } else if (activeTab === 'featured') {
      fetchWorkCollections()
    }
  }, [activeTab])

  const fetchPosts = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/blog')
      const result = await response.json()
      
      if (result.success) {
        setBlogPosts(result.data)
      } else {
        setError(result.error || 'Error al cargar los posts')
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      setError('Error de conexión al cargar los posts')
    } finally {
      setLoading(false)
    }
  }

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
    setError('')
    
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
        setShowPostEditor(false)
        setSelectedPost(null)
        await fetchPosts() // Recargar la lista
        // Mostrar mensaje de éxito (opcional)
        alert(result.message || 'Operación exitosa')
      } else {
        setError(result.error || 'Error al guardar el post')
      }
    } catch (error) {
      console.error('Error saving post:', error)
      setError('Error de conexión al guardar el post')
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePost = async (postId) => {
    if (!confirm('¿Estás segura de que quieres eliminar este artículo?')) {
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`/api/blog/${postId}`, {
        method: 'DELETE',
      })
      
      const result = await response.json()
      
      if (result.success) {
        await fetchPosts() // Recargar la lista
        alert('Artículo eliminado exitosamente')
      } else {
        setError(result.error || 'Error al eliminar el post')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      setError('Error de conexión al eliminar el post')
    } finally {
      setLoading(false)
    }
  }

  // Funciones para gestionar trabajos destacados
  const fetchWorkCollections = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/photos?portfolioSection=portfolio&status=active')
      const result = await response.json()
      
      if (result.success) {
        // Agrupar fotos por workCollection
        const collections = new Map()
        
        result.data.forEach(photo => {
          if (photo.workCollection) {
            if (!collections.has(photo.workCollection)) {
              collections.set(photo.workCollection, {
                id: photo.workCollection,
                title: formatCollectionName(photo.workCollection),
                photos: [],
                featured: photo.featuredInHome || false
              })
            }
            collections.get(photo.workCollection).photos.push(photo)
            // Si cualquier foto está marcada como featured, la colección también
            if (photo.featuredInHome) {
              collections.get(photo.workCollection).featured = true
            }
          }
        })
        
        setWorkCollections(Array.from(collections.values()))
        setFeaturedCollections(Array.from(collections.values()).filter(c => c.featured))
      } else {
        setError(result.error || 'Error al cargar las colecciones')
      }
    } catch (error) {
      console.error('Error fetching collections:', error)
      setError('Error de conexión al cargar las colecciones')
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

  const toggleFeaturedCollection = async (collectionId, isFeatured) => {
    setLoading(true)
    setError('')
    
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
        await fetchWorkCollections() // Recargar las colecciones
        alert(`Colección ${isFeatured ? 'destacada' : 'removida de destacados'} exitosamente`)
      } else {
        setError(result.error || 'Error al actualizar la colección')
      }
    } catch (error) {
      console.error('Error updating featured status:', error)
      setError('Error de conexión al actualizar la colección')
    } finally {
      setLoading(false)
    }
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
              <span className="ml-4 text-gray-400 text-sm">Admin Panel</span>
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
        <div className="flex space-x-1 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'upload' && (
            <div>
              <h2 className="text-2xl font-light text-white mb-6">Subir Nuevas Fotos</h2>
              <PhotoUpload onUploadSuccess={() => {
                // Refresh gallery or show success message
                console.log('Upload successful!')
              }} />
            </div>
          )}

          {activeTab === 'gallery' && (
            <div>
              <h2 className="text-2xl font-light text-white mb-6">Galería de Fotos</h2>
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <ImageIcon className="mx-auto w-16 h-16 text-gray-400 mb-4" />
                <p className="text-gray-400">Sistema de galería en desarrollo</p>
                <p className="text-gray-500 text-sm mt-2">
                  Aquí podrás ver, editar y eliminar fotos existentes
                </p>
              </div>
            </div>
          )}

          {activeTab === 'blog' && !showPostEditor && (
            <div>
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

              {error && (
                <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Artículos del Blog</h3>
                  
                  {loading && (
                    <div className="text-center py-8">
                      <RefreshCw className="mx-auto w-8 h-8 text-gray-400 animate-spin mb-4" />
                      <p className="text-gray-400">Cargando artículos...</p>
                    </div>
                  )}
                  
                  {!loading && blogPosts.length === 0 && (
                    <div className="text-center py-8">
                      <FileText className="mx-auto w-16 h-16 text-gray-400 mb-4" />
                      <p className="text-gray-400">No hay artículos aún</p>
                      <p className="text-gray-500 text-sm mt-2">
                        Crea tu primer artículo haciendo clic en "Nuevo Artículo"
                      </p>
                    </div>
                  )}
                  
                  {!loading && blogPosts.length > 0 && (
                    <div className="space-y-4">
                      {blogPosts.map((post) => (
                        <div key={post._id} className="bg-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="text-white font-medium mb-1">{post.title}</h4>
                              <p className="text-gray-300 text-sm mb-2">{post.excerpt}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-400">
                                <span>{new Date(post.createdAt).toLocaleDateString('es-ES')}</span>
                                <span className={`px-2 py-1 rounded ${
                                  post.status === 'published' 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-yellow-600 text-white'
                                }`}>
                                  {post.status === 'published' ? 'Publicado' : 'Borrador'}
                                </span>
                                {post.featured && (
                                  <span className="px-2 py-1 rounded bg-orange-600 text-white">
                                    Destacado
                                  </span>
                                )}
                                <span className="text-gray-500">{post.readTime}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <button
                                onClick={() => handleEditPost(post)}
                                disabled={loading}
                                className="p-2 text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
                                title="Editar"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button
                                onClick={() => handleDeletePost(post._id)}
                                disabled={loading}
                                className="p-2 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                                title="Eliminar"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

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
                  Cancelar
                </button>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Título del Artículo
                    </label>
                    <input
                      type="text"
                      value={postForm.title}
                      onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
                      placeholder="Escribe el título del artículo..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Resumen
                    </label>
                    <textarea
                      value={postForm.excerpt}
                      onChange={(e) => setPostForm({...postForm, excerpt: e.target.value})}
                      rows={3}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
                      placeholder="Escribe un breve resumen del artículo..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Contenido Completo
                    </label>
                    <textarea
                      value={postForm.content}
                      onChange={(e) => setPostForm({...postForm, content: e.target.value})}
                      rows={10}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
                      placeholder="Escribe el contenido completo del artículo..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Imagen (URL)
                    </label>
                    <input
                      type="text"
                      value={postForm.image}
                      onChange={(e) => setPostForm({...postForm, image: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
                      placeholder="/photos/mi-imagen.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Estado y Opciones
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <select
                        value={postForm.status}
                        onChange={(e) => setPostForm({...postForm, status: e.target.value})}
                        className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                      >
                        <option value="draft">Borrador</option>
                        <option value="published">Publicado</option>
                      </select>
                      
                      <label className="flex items-center gap-2 text-gray-300">
                        <input
                          type="checkbox"
                          checked={postForm.featured}
                          onChange={(e) => setPostForm({...postForm, featured: e.target.checked})}
                          className="w-4 h-4 text-orange-600 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                        />
                        Artículo Destacado
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleSavePost}
                      disabled={loading}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Guardando...' : (selectedPost ? 'Actualizar Artículo' : 'Crear Artículo')}
                    </button>
                    <button
                      onClick={() => setShowPostEditor(false)}
                      disabled={loading}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded transition-colors disabled:opacity-50"
                    >
                      Cancelar
                    </button>
                  </div>

                  {error && (
                    <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'featured' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light text-white">Trabajos Destacados en Inicio</h2>
                <button
                  onClick={fetchWorkCollections}
                  disabled={loading}
                  className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                  Actualizar
                </button>
              </div>

              {error && (
                <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Trabajos Actualmente Destacados ({featuredCollections.length}/2)
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Selecciona hasta 2 trabajos para mostrar en la sección "Trabajo Reciente" de la página de inicio.
                </p>
                
                {featuredCollections.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {featuredCollections.map((collection) => (
                      <div key={collection.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-white font-medium">{collection.title}</h4>
                          <button
                            onClick={() => toggleFeaturedCollection(collection.id, false)}
                            disabled={loading}
                            className="text-red-400 hover:text-red-300 disabled:opacity-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="flex gap-2 overflow-x-auto">
                          {collection.photos.slice(0, 4).map((photo, index) => (
                            <div key={index} className="flex-shrink-0">
                              <img
                                src={photo.imageUrl}
                                alt={photo.title}
                                className="w-16 h-16 object-cover rounded"
                              />
                            </div>
                          ))}
                        </div>
                        <p className="text-gray-400 text-xs mt-2">
                          {collection.photos.length} fotos en esta colección
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

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Todas las Colecciones de Trabajo
                </h3>
                
                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    <p className="text-gray-400 mt-2">Cargando colecciones...</p>
                  </div>
                ) : workCollections.length > 0 ? (
                  <div className="grid gap-4">
                    {workCollections.map((collection) => (
                      <div key={collection.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex gap-2">
                              {collection.photos.slice(0, 3).map((photo, index) => (
                                <img
                                  key={index}
                                  src={photo.imageUrl}
                                  alt={photo.title}
                                  className="w-12 h-12 object-cover rounded"
                                />
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
                                Destacado
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
                    <p className="text-gray-400">No se encontraron colecciones de trabajo.</p>
                    <p className="text-gray-500 text-sm mt-2">
                      Asegúrate de tener fotos organizadas en colecciones.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-light text-white mb-6">Configuración</h2>
              <div className="bg-gray-800 rounded-lg p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Información de Usuario</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Nombre
                        </label>
                        <input
                          type="text"
                          value={user.name}
                          disabled
                          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={user.email}
                          disabled
                          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Cambiar Contraseña</h3>
                    <div className="space-y-4">
                      <input
                        type="password"
                        placeholder="Contraseña actual"
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
                      />
                      <input
                        type="password"
                        placeholder="Nueva contraseña"
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
                      />
                      <input
                        type="password"
                        placeholder="Confirmar nueva contraseña"
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
                      />
                      <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition-colors">
                        Actualizar Contraseña
                      </button>
                    </div>
                  </div>
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
