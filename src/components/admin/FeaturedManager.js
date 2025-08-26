/**
 * FEATURED MANAGER COMPONENT
 * Gestión de colecciones destacadas (máximo 2) - Tema Oscuro
 */

'use client';

import { useState, useEffect } from 'react';
import OptimizedImage from '../OptimizedImage';

const FeaturedManager = () => {
  const [collections, setCollections] = useState([]);
  const [featuredCollections, setFeaturedCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  // Cargar colecciones
  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/photos');
      if (response.ok) {
        const data = await response.json();
        const photos = data.photos || [];
        
        // Agrupar por workCollection
        const collectionsMap = {};
        photos.forEach(photo => {
          if (photo.workCollection && photo.status === 'active') {
            if (!collectionsMap[photo.workCollection]) {
              collectionsMap[photo.workCollection] = {
                name: photo.workCollection,
                photos: [],
                isFeatured: false,
                portfolioSection: photo.portfolioSection || 'Editorial'
              };
            }
            collectionsMap[photo.workCollection].photos.push(photo);
            if (photo.featuredInHome) {
              collectionsMap[photo.workCollection].isFeatured = true;
            }
          }
        });

        const collectionsArray = Object.values(collectionsMap);
        setCollections(collectionsArray);
        
        // Filtrar las destacadas
        const featured = collectionsArray.filter(col => col.isFeatured);
        setFeaturedCollections(featured);
      } else {
        setError('Error cargando colecciones');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (collectionName) => {
    const collection = collections.find(c => c.name === collectionName);
    const isCurrentlyFeatured = collection?.isFeatured;
    
    // Si ya está destacada, la quitamos
    if (isCurrentlyFeatured) {
      await updateFeaturedStatus(collectionName, false);
      return;
    }
    
    // Si no está destacada y ya hay 2, mostrar error
    if (featuredCollections.length >= 2) {
      setError('Máximo 2 colecciones destacadas. Quita una primero.');
      return;
    }
    
    // Agregar como destacada
    await updateFeaturedStatus(collectionName, true);
  };

  const updateFeaturedStatus = async (collectionName, featured) => {
    try {
      setSaving(true);
      const response = await fetch('/api/photos/featured', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          workCollection: collectionName, 
          featured 
        }),
      });

      if (response.ok) {
        fetchCollections(); // Recargar colecciones
        setError('');
      } else {
        setError('Error al actualizar colección destacada');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setSaving(false);
    }
  };

  const getCollectionCoverImage = (collection) => {
    return collection.photos[0]?.url || '/placeholder-image.jpg';
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
        <h2 className="text-2xl font-bold text-fashion-fg mb-2">
          ⭐ Trabajos Destacados
        </h2>
        <p className="text-fashion-fg-secondary">
          Selecciona hasta 2 colecciones para destacar en la página principal
        </p>
        <div className="mt-3 flex items-center space-x-4 text-sm">
          <span className={`px-3 py-1 rounded-full ${
            featuredCollections.length === 2 
              ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
              : 'bg-fashion-rose/20 text-fashion-rose border border-fashion-rose/30'
          }`}>
            {featuredCollections.length}/2 colecciones destacadas
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {/* Colecciones destacadas actuales */}
      {featuredCollections.length > 0 && (
        <div className="bg-fashion-bg-secondary rounded-lg border border-fashion-bg-tertiary p-6">
          <h3 className="text-lg font-semibold text-fashion-fg mb-4">
            ✨ Colecciones Destacadas Actuales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredCollections.map((collection) => (
              <div key={collection.name} className="border border-fashion-rose/30 rounded-lg overflow-hidden bg-fashion-bg-tertiary">
                <div className="relative aspect-[16/10] bg-fashion-bg">
                  <OptimizedImage
                    src={getCollectionCoverImage(collection)}
                    alt={collection.name}
                    className="w-full h-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    objectFit="cover"
                  />
                  <div className="absolute top-3 right-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Destacada
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="font-semibold text-fashion-fg mb-1">
                    {collection.name}
                  </h4>
                  <p className="text-sm text-fashion-fg-secondary mb-3">
                    {collection.photos.length} fotos • {collection.portfolioSection}
                  </p>
                  
                  <button
                    onClick={() => toggleFeatured(collection.name)}
                    disabled={saving}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    Quitar de Destacados
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Todas las colecciones */}
      <div className="bg-fashion-bg-secondary rounded-lg border border-fashion-bg-tertiary p-6">
        <h3 className="text-lg font-semibold text-fashion-fg mb-4">
          📁 Todas las Colecciones
        </h3>
        
        {collections.length === 0 ? (
          <div className="text-center py-8 text-fashion-fg-muted">
            <p>No hay colecciones disponibles. Sube algunas fotos agrupadas por nombre de trabajo.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collections.map((collection) => (
              <div key={collection.name} className="border border-fashion-rose/20 rounded-lg overflow-hidden hover:border-fashion-rose/40 transition-colors bg-fashion-bg-tertiary">
                <div className="relative aspect-[16/10] bg-fashion-bg">
                  <OptimizedImage
                    src={getCollectionCoverImage(collection)}
                    alt={collection.name}
                    className="w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    objectFit="cover"
                  />
                  {collection.isFeatured && (
                    <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Destacada
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h4 className="font-semibold text-fashion-fg mb-1 truncate">
                    {collection.name}
                  </h4>
                  <p className="text-sm text-fashion-fg-secondary mb-3">
                    {collection.photos.length} fotos • {collection.portfolioSection}
                  </p>
                  
                  <button
                    onClick={() => toggleFeatured(collection.name)}
                    disabled={saving || (!collection.isFeatured && featuredCollections.length >= 2)}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
                      collection.isFeatured
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-fashion-rose hover:bg-fashion-deep-copper text-fashion-bg'
                    }`}
                  >
                    {collection.isFeatured ? 'Quitar de Destacados' : 
                     featuredCollections.length >= 2 ? 'Límite alcanzado' : 'Destacar Colección'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instrucciones */}
      <div className="bg-fashion-bg-tertiary border border-fashion-rose/30 rounded-lg p-4">
        <h4 className="font-semibold text-fashion-rose mb-2">💡 Consejos para Destacados:</h4>
        <ul className="text-sm text-fashion-fg-secondary space-y-1">
          <li>• Selecciona tus 2 mejores trabajos recientes o más importantes</li>
          <li>• Las colecciones destacadas aparecen en "Trabajos Recientes" en la página principal</li>
          <li>• Usa trabajos que representen la variedad de tu portafolio</li>
          <li>• Puedes cambiar las colecciones destacadas en cualquier momento</li>
          <li>• Asegúrate de que las fotos estén en alta calidad</li>
        </ul>
      </div>
    </div>
  );
};

export default FeaturedManager;
