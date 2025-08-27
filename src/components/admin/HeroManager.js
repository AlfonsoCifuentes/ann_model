/**
 * HERO MANAGER COMPONENT
 * Gestión de las 5 fotos principales del carrusel hero
 */

'use client';

import { useState, useEffect } from 'react';
import OptimizedImage from '../OptimizedImage';

const HeroManager = () => {
  const [photos, setPhotos] = useState([]);
  const [heroPhotos, setHeroPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

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
        
        // Separar fotos hero de las disponibles
        const heroPhotos = data.photos?.filter(photo => photo.isHero) || [];
        const availablePhotos = data.photos?.filter(photo => !photo.isHero) || [];
        
        setHeroPhotos(heroPhotos);
        setPhotos(availablePhotos);
      } else {
        setError('Error al cargar las fotos');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const addToHero = async (photoId) => {
    if (heroPhotos.length >= 5) {
      setError('Solo puedes tener 5 fotos en el hero');
      return;
    }

    try {
      setSaving(true);
      const response = await fetch('/api/photos/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoId, isHero: true })
      });

      if (response.ok) {
        await fetchPhotos(); // Recargar fotos
        setError('');
      } else {
        setError('Error al agregar foto al hero');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setSaving(false);
    }
  };

  const removeFromHero = async (photoId) => {
    try {
      setSaving(true);
      const response = await fetch('/api/photos/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoId, isHero: false })
      });

      if (response.ok) {
        await fetchPhotos(); // Recargar fotos
        setError('');
      } else {
        setError('Error al quitar foto del hero');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fashion-rose"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-fashion-bg-tertiary p-4 sm:p-6 rounded-lg border border-fashion-rose/30">
        <h2 className="text-xl sm:text-2xl font-bold text-fashion-fg mb-2">
          🎭 Gestión del Hero Principal
        </h2>
        <p className="text-sm sm:text-base text-fashion-fg-secondary">
          Selecciona las 5 mejores fotos para el carrusel principal del sitio web
        </p>
        <div className="mt-3 flex items-center space-x-4 text-sm">
          <span className="text-fashion-rose font-medium">
            {heroPhotos.length}/5 fotos seleccionadas
          </span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-300 text-sm sm:text-base">{error}</p>
        </div>
      )}

      {/* Current Hero Photos */}
      {heroPhotos.length > 0 && (
        <div className="bg-fashion-bg-secondary rounded-lg border border-fashion-bg-tertiary p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-fashion-fg mb-4">
            ✨ Fotos Actuales del Hero ({heroPhotos.length}/5)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
            {heroPhotos.map((photo, index) => (
              <div key={photo._id} className="group relative">
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-fashion-bg-tertiary">
                  <OptimizedImage
                    src={photo.imageUrl}
                    thumbnails={photo.thumbnails}
                    alt={photo.title}
                    className="w-full h-full"
                    objectFit="cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200" />
                  
                  {/* Position Badge */}
                  <div className="absolute top-1 sm:top-2 left-1 sm:left-2">
                    <span className="bg-fashion-rose text-fashion-bg px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-semibold">
                      #{index + 1}
                    </span>
                  </div>
                  
                  {/* Remove Button - Always visible on mobile */}
                  <button
                    onClick={() => removeFromHero(photo._id)}
                    disabled={saving}
                    className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-red-500 hover:bg-red-600 text-white p-1 sm:p-1.5 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 disabled:opacity-50 touch-manipulation"
                  >
                    <span className="text-xs">❌</span>
                  </button>
                </div>
                <div className="mt-1 sm:mt-2">
                  <p className="text-xs sm:text-sm font-medium text-fashion-fg truncate">
                    {photo.title}
                  </p>
                  <p className="text-xs text-fashion-fg-muted truncate">
                    {photo.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Photos */}
      <div className="bg-fashion-bg-secondary rounded-lg border border-fashion-bg-tertiary p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-fashion-fg mb-4">
          📸 Fotos Disponibles para Hero
        </h3>
        
        {photos.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-fashion-fg-muted">
            <p className="text-sm sm:text-base">No hay fotos disponibles. Sube algunas fotos primero.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
            {photos.map((photo) => (
              <div key={photo._id} className="group relative">
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-fashion-bg-tertiary">
                  <OptimizedImage
                    src={photo.imageUrl}
                    thumbnails={photo.thumbnails}
                    alt={photo.title}
                    className="w-full h-full"
                    objectFit="cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200" />
                  
                  {/* Add to Hero Button - Always visible on mobile */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200">
                    <button
                      onClick={() => addToHero(photo._id)}
                      disabled={saving || heroPhotos.length >= 5}
                      className="bg-fashion-rose hover:bg-fashion-deep-copper text-fashion-bg px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium disabled:bg-fashion-fg-muted disabled:text-fashion-bg-secondary touch-manipulation"
                    >
                      {heroPhotos.length >= 5 ? 'Hero Lleno' : 'Agregar'}
                    </button>
                  </div>
                </div>
                <div className="mt-1 sm:mt-2">
                  <p className="text-xs font-medium text-fashion-fg truncate">
                    {photo.title}
                  </p>
                  <p className="text-xs text-fashion-fg-muted truncate">
                    {photo.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-fashion-bg-tertiary border border-fashion-rose/30 rounded-lg p-4">
        <h4 className="font-semibold text-fashion-rose mb-2 text-sm sm:text-base">💡 Instrucciones</h4>
        <div className="text-xs sm:text-sm text-fashion-fg-secondary space-y-1">
          <p>• Selecciona hasta 5 fotos para el carrusel principal</p>
          <p>• El orden se establece automáticamente según selección</p>
          <p>• Las fotos hero aparecerán en la página principal</p>
          <p className="hidden sm:block">• Puedes quitar fotos pasando el mouse sobre ellas</p>
          <p className="sm:hidden">• Toca el botón ❌ para quitar fotos del hero</p>
        </div>
      </div>

      {/* Save Status */}
      {saving && (
        <div className="text-center py-4">
          <div className="text-fashion-rose text-sm sm:text-base">Guardando cambios...</div>
        </div>
      )}
    </div>
  );
};

export default HeroManager;
