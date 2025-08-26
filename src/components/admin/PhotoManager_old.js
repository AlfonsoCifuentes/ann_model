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
    'Editorial', 'Fashion', 'Retrato', 'Comercial', 'Estudio', 'Lifestyle'
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
        setPhotos(data.photos || []);
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
    switch (filter) {
      case 'active':
        filtered = filtered.filter(photo => photo.status === 'active');
        break;
      case 'archived':
        filtered = filtered.filter(photo => photo.status === 'archived');
        break;
      case 'hero':
        filtered = filtered.filter(photo => photo.isHero);
        break;
      case 'featured':
        filtered = filtered.filter(photo => photo.featuredInHome);
        break;
    }

    // Filtro por categoría
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(photo => photo.portfolioSection === categoryFilter);
    }

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(photo => 
        photo.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.workCollection?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPhotos(filtered);
  }, [photos, filter, searchTerm, categoryFilter]);

  // Filtrar fotos cuando cambien los filtros
  useEffect(() => {
    filterPhotos();
  }, [filterPhotos]);

  const deletePhoto = async (photoId) => {
    if (!confirm('¿Estás segura de que quieres eliminar esta foto? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      setDeleting(photoId);
      const response = await fetch(`/api/photos/${photoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPhotos(photos.filter(photo => photo._id !== photoId));
        setError('');
      } else {
        setError('Error eliminando foto');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setDeleting(null);
    }
  };

  const togglePhotoStatus = async (photoId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'archived' : 'active';
    
    try {
      const response = await fetch(`/api/photos/${photoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setPhotos(photos.map(photo => 
          photo._id === photoId 
            ? { ...photo, status: newStatus }
            : photo
        ));
      } else {
        setError('Error actualizando estado de foto');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  const getPhotoStats = () => {
    const stats = {
      total: photos.length,
      active: photos.filter(p => p.status === 'active').length,
      archived: photos.filter(p => p.status === 'archived').length,
      hero: photos.filter(p => p.isHero).length,
      featured: photos.filter(p => p.featuredInHome).length
    };
    return stats;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const stats = getPhotoStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg border border-orange-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          📸 Gestión de Fotos
        </h2>
        <p className="text-gray-600 mb-4">
          Administra todas tus fotos: ver, editar, archivar y eliminar
        </p>
        
        {/* Estadísticas */}
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            Total: {stats.total}
          </span>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
            Activas: {stats.active}
          </span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
            Archivadas: {stats.archived}
          </span>
          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
            Hero: {stats.hero}
          </span>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
            Destacadas: {stats.featured}
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          🔍 Filtros y Búsqueda
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Filtro por estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">Todas las categorías</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Búsqueda */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por título, colección o descripción..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Mostrando {filteredPhotos.length} de {photos.length} fotos
        </div>
      </div>

      {/* Grid de fotos */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">No se encontraron fotos</p>
            <p className="text-sm">Prueba a cambiar los filtros o sube nuevas fotos</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredPhotos.map((photo) => (
              <div key={photo._id} className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200">
                <div className="relative aspect-[4/5] bg-gray-100">
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 space-y-1">
                    {photo.isHero && (
                      <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        Hero
                      </span>
                    )}
                    {photo.featuredInHome && (
                      <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        Destacada
                      </span>
                    )}
                    {photo.status === 'archived' && (
                      <span className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        Archivada
                      </span>
                    )}
                  </div>

                  {/* Acciones */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-y-1">
                    <button
                      onClick={() => togglePhotoStatus(photo._id, photo.status)}
                      className="block w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-xs"
                      title={photo.status === 'active' ? 'Archivar' : 'Activar'}
                    >
                      {photo.status === 'active' ? '📦' : '✅'}
                    </button>
                    <button
                      onClick={() => deletePhoto(photo._id)}
                      disabled={deleting === photo._id}
                      className="block w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs disabled:opacity-50"
                      title="Eliminar"
                    >
                      {deleting === photo._id ? '⏳' : '🗑️'}
                    </button>
                  </div>
                </div>

                <div className="p-3">
                  <h4 className="font-semibold text-gray-800 text-sm mb-1 truncate">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-1 truncate">
                    {photo.workCollection}
                  </p>
                  <p className="text-xs text-gray-500">
                    {photo.portfolioSection}
                  </p>
                  {photo.uploadDate && (
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(photo.uploadDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instrucciones */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Gestión de Fotos:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Activas</strong>: Fotos visibles en el sitio web</li>
          <li>• <strong>Archivadas</strong>: Fotos ocultas pero no eliminadas</li>
          <li>• <strong>Hero</strong>: Fotos del carrusel principal (máximo 5)</li>
          <li>• <strong>Destacadas</strong>: Fotos de colecciones destacadas en la página principal</li>
          <li>• Usa los filtros para encontrar fotos específicas rápidamente</li>
          <li>• Eliminar una foto la borra permanentemente de la base de datos</li>
        </ul>
      </div>
    </div>
  );
};

export default PhotoManager;
