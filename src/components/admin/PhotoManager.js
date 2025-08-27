/**
 * PHOTO MANAGER COMPONENT
 * Gestión completa de fotos - ver, editar, eliminar - Tema Oscuro
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import OptimizedImage from '../OptimizedImage';

const PhotoManager = () => {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, archived, hero, featured
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [deleting, setDeleting] = useState(null);

  const categories = [
    'editorial', 'fashion', 'portrait', 'commercial', 'studio', 'lifestyle'
  ];

  // Cargar fotos
  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/photos');
      if (response.ok) {
        const data = await response.json();
        setPhotos(data.data || []);
      } else {
        setError('Error cargando fotos');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const filterPhotos = useCallback(() => {
    let filtered = [...photos];

    // Filtro por estado
    if (filter === 'active') {
      filtered = filtered.filter(photo => photo.status === 'active');
    } else if (filter === 'archived') {
      filtered = filtered.filter(photo => photo.status === 'archived');
    } else if (filter === 'hero') {
      filtered = filtered.filter(photo => photo.isHero);
    } else if (filter === 'featured') {
      filtered = filtered.filter(photo => photo.featuredInHome);
    }

    // Filtro por categoría
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(photo => photo.category === categoryFilter);
    }

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(photo =>
        photo.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPhotos(filtered);
  }, [photos, filter, categoryFilter, searchTerm]);

  useEffect(() => {
    filterPhotos();
  }, [filterPhotos]);

  const handleDelete = async (photoId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta foto? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      setDeleting(photoId);
      const response = await fetch(`/api/photos/${photoId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchPhotos();
      } else {
        setError('Error al eliminar la foto');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setDeleting(null);
    }
  };

  const handleStatusChange = async (photoId, newStatus) => {
    try {
      const response = await fetch(`/api/photos/${photoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        await fetchPhotos();
      } else {
        setError('Error al actualizar el estado');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  const getPhotoStats = () => {
    return {
      total: photos.length,
      active: photos.filter(p => p.status === 'active').length,
      archived: photos.filter(p => p.status === 'archived').length,
      hero: photos.filter(p => p.isHero).length,
      featured: photos.filter(p => p.featuredInHome).length
    };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return Math.round(bytes / 1024) + ' KB';
    return Math.round(bytes / 1048576) + ' MB';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fashion-rose"></div>
      </div>
    );
  }

  const stats = getPhotoStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-fashion-bg-tertiary p-4 sm:p-6 rounded-lg border border-fashion-rose/30">
        <h2 className="text-xl sm:text-2xl font-bold text-fashion-fg mb-2">
          📸 Gestión de Fotos
        </h2>
        <p className="text-sm sm:text-base text-fashion-fg-secondary mb-4">
          Administra todas tus fotos: ver, editar, archivar y eliminar
        </p>
        
        {/* Estadísticas */}
        <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm">
          <span className="bg-blue-900/30 text-blue-400 px-2 sm:px-3 py-1 rounded-full border border-blue-500/30">
            Total: {stats.total}
          </span>
          <span className="bg-green-900/30 text-green-400 px-2 sm:px-3 py-1 rounded-full border border-green-500/30">
            Activas: {stats.active}
          </span>
          <span className="bg-fashion-bg-secondary text-fashion-fg-muted px-2 sm:px-3 py-1 rounded-full border border-fashion-rose/20">
            Archivadas: {stats.archived}
          </span>
          <span className="bg-fashion-rose/20 text-fashion-rose px-2 sm:px-3 py-1 rounded-full border border-fashion-rose/30">
            Hero: {stats.hero}
          </span>
          <span className="bg-purple-900/30 text-purple-400 px-2 sm:px-3 py-1 rounded-full border border-purple-500/30">
            Destacadas: {stats.featured}
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-300 text-sm sm:text-base">{error}</p>
        </div>
      )}

      {/* Filtros y búsqueda */}
      <div className="bg-fashion-bg-secondary rounded-lg border border-fashion-bg-tertiary p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-fashion-fg mb-4">
          🔍 Filtros y Búsqueda
        </h3>
        
        <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-1 lg:grid-cols-3 sm:gap-4">
          {/* Búsqueda */}
          <div>
            <label className="block text-sm font-medium text-fashion-fg mb-2">
              Buscar
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Título, descripción o tags..."
              className="w-full bg-fashion-bg-tertiary border border-fashion-rose/30 rounded-lg px-3 py-2 text-sm text-fashion-fg focus:ring-2 focus:ring-fashion-rose focus:border-fashion-rose"
            />
          </div>

          {/* Filtro por estado */}
          <div>
            <label className="block text-sm font-medium text-fashion-fg mb-2">
              Estado
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-fashion-bg-tertiary border border-fashion-rose/30 rounded-lg px-3 py-2 text-sm text-fashion-fg focus:ring-2 focus:ring-fashion-rose focus:border-fashion-rose"
            >
              <option value="all">Todas</option>
              <option value="active">Activas</option>
              <option value="archived">Archivadas</option>
              <option value="hero">Hero</option>
              <option value="featured">Destacadas</option>
            </select>
          </div>

          {/* Filtro por categoría */}
          <div>
            <label className="block text-sm font-medium text-fashion-fg mb-2">
              Categoría
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-fashion-bg-tertiary border border-fashion-rose/30 rounded-lg px-3 py-2 text-sm text-fashion-fg focus:ring-2 focus:ring-fashion-rose focus:border-fashion-rose"
            >
              <option value="all">Todas las categorías</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-fashion-fg-secondary">
          Mostrando {filteredPhotos.length} de {photos.length} fotos
        </div>
      </div>

      {/* Lista de fotos */}
      <div className="bg-fashion-bg-secondary rounded-lg border border-fashion-bg-tertiary p-6">
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-8 sm:py-12 text-fashion-fg-muted">
            <p className="text-sm sm:text-base">No se encontraron fotos con los filtros aplicados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
            {filteredPhotos.map((photo) => (
              <div key={photo._id} className="group border border-fashion-rose/20 rounded-lg overflow-hidden hover:border-fashion-rose/40 transition-all duration-200 bg-fashion-bg-tertiary">
                <div className="relative aspect-[4/5] bg-fashion-bg">
                  <OptimizedImage
                    src={photo.imageUrl}
                    thumbnails={photo.thumbnails}
                    alt={photo.title}
                    className="w-full h-full"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    objectFit="cover"
                  />
                  
                  {/* Status badges */}
                  <div className="absolute top-1 sm:top-2 left-1 sm:left-2 flex flex-col gap-1">
                    {photo.isHero && (
                      <span className="bg-fashion-rose text-fashion-bg px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-semibold">
                        Hero
                      </span>
                    )}
                    {photo.featuredInHome && (
                      <span className="bg-purple-600 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-semibold">
                        Destacada
                      </span>
                    )}
                    {photo.status === 'archived' && (
                      <span className="bg-fashion-bg-secondary text-fashion-fg-muted px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-semibold">
                        Archivada
                      </span>
                    )}
                  </div>

                  {/* Action buttons - Always visible on mobile, hover on desktop */}
                  <div className="absolute top-1 sm:top-2 right-1 sm:right-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                    {photo.status === 'active' ? (
                      <button
                        onClick={() => handleStatusChange(photo._id, 'archived')}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white p-1 sm:p-1.5 rounded-full text-xs transition-colors touch-manipulation"
                        title="Archivar"
                      >
                        📦
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(photo._id, 'active')}
                        className="bg-green-600 hover:bg-green-700 text-white p-1 sm:p-1.5 rounded-full text-xs transition-colors touch-manipulation"
                        title="Activar"
                      >
                        ✅
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDelete(photo._id)}
                      disabled={deleting === photo._id}
                      className="bg-red-600 hover:bg-red-700 text-white p-1 sm:p-1.5 rounded-full text-xs transition-colors disabled:opacity-50 touch-manipulation"
                      title="Eliminar"
                    >
                      {deleting === photo._id ? '⏳' : '🗑️'}
                    </button>
                  </div>
                </div>
                
                {/* Photo info */}
                <div className="p-2 sm:p-3">
                  <h4 className="font-semibold text-fashion-fg text-xs sm:text-sm mb-1 truncate">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-fashion-fg-secondary mb-1 sm:mb-2 truncate">
                    {photo.category} • {formatDate(photo.createdAt)}
                  </p>
                  
                  {photo.description && (
                    <p className="text-xs text-fashion-fg-muted line-clamp-2 mb-1 sm:mb-2 hidden sm:block">
                      {photo.description}
                    </p>
                  )}
                  
                  {photo.metadata?.size && (
                    <p className="text-xs text-fashion-fg-muted hidden sm:block">
                      {formatFileSize(photo.metadata.size)}
                    </p>
                  )}
                  
                  {photo.tags && photo.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1 sm:mt-2 hidden sm:flex">
                      {photo.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-fashion-rose/20 text-fashion-rose px-1.5 py-0.5 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {photo.tags.length > 2 && (
                        <span className="text-xs text-fashion-fg-muted">
                          +{photo.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-fashion-bg-tertiary border border-fashion-rose/30 rounded-lg p-4">
        <h4 className="font-semibold text-fashion-rose mb-2">💡 Gestión de Fotos:</h4>
        <div className="text-sm text-fashion-fg-secondary space-y-1">
          <p>• <strong>Archivar:</strong> Las fotos archivadas no aparecen en el sitio web pero se conservan</p>
          <p>• <strong>Eliminar:</strong> Elimina permanentemente la foto (no se puede deshacer)</p>
          <p>• <strong>Hero:</strong> Fotos que aparecen en el carrusel principal</p>
          <p>• <strong>Destacadas:</strong> Fotos que aparecen en la sección "Trabajos Recientes"</p>
          <p>• Usa los filtros para encontrar fotos específicas rápidamente</p>
        </div>
      </div>
    </div>
  );
};

export default PhotoManager;
