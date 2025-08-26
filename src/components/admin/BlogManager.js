/**
 * BLOG MANAGER COMPONENT
 * Gestión completa de entradas de blog con tema oscuro
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    author: 'Ana Nicoleta',
    tags: '',
    status: 'draft', // 'draft' o 'published'
    featured: false
  });

  // Cargar posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog');
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data); // Debug
        setPosts(data.data || []); // Cambiado de data.posts a data.data
      } else {
        setError('Error al cargar los posts');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener headers con autenticación
  const getAuthHeaders = () => {
    return {
      'Content-Type': 'application/json',
      'x-admin-auth': 'authenticated'
    };
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Auto-generar slug desde el título
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const method = editingPost ? 'PUT' : 'POST';
      const url = editingPost ? `/api/blog/${editingPost._id}` : '/api/blog';
      
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...formData,
          tags: tagsArray
        })
      });

      if (response.ok) {
        await fetchPosts();
        resetForm();
        setShowCreateForm(false);
        setEditingPost(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error al guardar el post');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image || '',
      author: post.author,
      tags: post.tags.join(', '),
      status: post.status,
      featured: post.featured
    });
    setEditingPost(post);
    setShowCreateForm(true);
  };

  const handleDelete = async (postId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este post?')) return;

    try {
      const response = await fetch(`/api/blog/${postId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (response.ok) {
        await fetchPosts();
      } else {
        setError('Error al eliminar el post');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image: '',
      author: 'Ana Nicoleta',
      tags: '',
      status: 'draft',
      featured: false
    });
    setEditingPost(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fashion-rose"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-fashion-bg-tertiary p-6 rounded-lg border border-fashion-rose/30">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-fashion-fg mb-2">
              📝 Gestión de Blog
            </h2>
            <p className="text-fashion-fg-secondary">
              Crea y gestiona las entradas de tu blog profesional
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowCreateForm(!showCreateForm);
            }}
            className="bg-fashion-rose hover:bg-fashion-deep-copper text-fashion-bg px-6 py-2 rounded-lg font-medium transition-colors"
          >
            {showCreateForm ? 'Cancelar' : '+ Nueva Entrada'}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {/* Create/Edit Form */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-fashion-bg-secondary rounded-lg border border-fashion-bg-tertiary p-6"
          >
            <h3 className="text-lg font-semibold text-fashion-fg mb-6">
              {editingPost ? 'Editar Entrada' : 'Nueva Entrada de Blog'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Título y Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-fashion-fg mb-2">
                    Título *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-fashion-bg-tertiary border border-fashion-rose/30 rounded-lg px-4 py-2 text-fashion-fg focus:outline-none focus:border-fashion-rose"
                    placeholder="Título del artículo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-fashion-fg mb-2">
                    Slug (URL) *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-fashion-bg-tertiary border border-fashion-rose/30 rounded-lg px-4 py-2 text-fashion-fg focus:outline-none focus:border-fashion-rose"
                    placeholder="url-amigable"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-fashion-fg mb-2">
                  Resumen
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-fashion-bg-tertiary border border-fashion-rose/30 rounded-lg px-4 py-2 text-fashion-fg focus:outline-none focus:border-fashion-rose"
                  placeholder="Breve descripción del artículo"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-fashion-fg mb-2">
                  Contenido *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={8}
                  className="w-full bg-fashion-bg-tertiary border border-fashion-rose/30 rounded-lg px-4 py-2 text-fashion-fg focus:outline-none focus:border-fashion-rose"
                  placeholder="Contenido del artículo en Markdown"
                />
              </div>

              {/* Imagen */}
              <div>
                <label className="block text-sm font-medium text-fashion-fg mb-2">
                  URL de Imagen *
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-fashion-bg-tertiary border border-fashion-rose/30 rounded-lg px-4 py-2 text-fashion-fg focus:outline-none focus:border-fashion-rose"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>

              {/* Autor y Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-fashion-fg mb-2">
                    Autor
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full bg-fashion-bg-tertiary border border-fashion-rose/30 rounded-lg px-4 py-2 text-fashion-fg focus:outline-none focus:border-fashion-rose"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-fashion-fg mb-2">
                    Tags (separados por coma)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full bg-fashion-bg-tertiary border border-fashion-rose/30 rounded-lg px-4 py-2 text-fashion-fg focus:outline-none focus:border-fashion-rose"
                    placeholder="moda, fotografía, editorial"
                  />
                </div>
              </div>

              {/* Status y Featured */}
              <div className="flex space-x-6">
                <div>
                  <label className="block text-sm font-medium text-fashion-fg mb-2">
                    Estado
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="bg-fashion-bg-tertiary border border-fashion-rose/30 rounded-lg px-3 py-2 text-fashion-fg focus:ring-fashion-rose"
                  >
                    <option value="draft">Borrador</option>
                    <option value="published">Publicado</option>
                  </select>
                </div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="text-fashion-rose bg-fashion-bg-tertiary border-fashion-rose/30 rounded focus:ring-fashion-rose"
                  />
                  <span className="text-fashion-fg">Destacado</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowCreateForm(false);
                  }}
                  className="px-6 py-2 text-fashion-fg-secondary hover:text-fashion-fg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-fashion-rose hover:bg-fashion-deep-copper text-fashion-bg px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {saving ? 'Guardando...' : (editingPost ? 'Actualizar' : 'Crear Entrada')}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts List */}
      <div className="bg-fashion-bg-secondary rounded-lg border border-fashion-bg-tertiary p-6">
        <h3 className="text-lg font-semibold text-fashion-fg mb-4">
          Entradas Existentes ({posts.length})
        </h3>
        
        {posts.length === 0 ? (
          <div className="text-center py-8 text-fashion-fg-muted">
            No hay entradas de blog. Crea la primera entrada.
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-fashion-bg-tertiary border border-fashion-rose/20 rounded-lg p-4 hover:border-fashion-rose/40 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-fashion-fg">{post.title}</h4>
                      <div className="flex space-x-2">
                        {post.status === 'published' && (
                          <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs">
                            Publicado
                          </span>
                        )}
                        {post.status === 'draft' && (
                          <span className="bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded text-xs">
                            Borrador
                          </span>
                        )}
                        {post.featured && (
                          <span className="bg-fashion-rose/20 text-fashion-rose px-2 py-1 rounded text-xs">
                            Destacado
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-fashion-fg-secondary mb-2">
                      /{post.slug}
                    </p>
                    {post.excerpt && (
                      <p className="text-sm text-fashion-fg-muted line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 mt-3 text-xs text-fashion-fg-muted">
                      <span>Por {post.author}</span>
                      <span>{formatDate(post.createdAt)}</span>
                      {post.tags.length > 0 && (
                        <span>{post.tags.join(', ')}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(post)}
                      className="text-fashion-rose hover:text-fashion-deep-copper p-2 rounded transition-colors"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-red-400 hover:text-red-300 p-2 rounded transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManager;
