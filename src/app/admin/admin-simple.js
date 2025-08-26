'use client';

import { useState } from 'react';
import PhotoUpload from '@/components/PhotoUpload';
import HeroManager from '@/components/admin/HeroManager';
import FeaturedManager from '@/components/admin/FeaturedManager';
import PhotoManager from '@/components/admin/PhotoManager';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('upload');

  const tabs = [
    { id: 'upload', name: 'Subir Fotos', icon: '📤' },
    { id: 'hero', name: 'Hero Principal', icon: '🎭' },
    { id: 'featured', name: 'Trabajos Destacados', icon: '⭐' },
    { id: 'manage', name: 'Gestión de Fotos', icon: '📸' },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'upload':
        return <PhotoUpload />;
      case 'hero':
        return <HeroManager />;
      case 'featured':
        return <FeaturedManager />;
      case 'manage':
        return <PhotoManager />;
      default:
        return <PhotoUpload />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">
              Panel de Administración
            </h1>
            <p className="mt-2 text-gray-600">
              Gestiona el contenido de tu portfolio profesional
            </p>
          </div>

          {/* Tabs */}
          <div className="px-6">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            {renderActiveComponent()}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">🚀 Guía Rápida de Administración</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>📤 Subir Fotos:</strong> Sube nuevas fotos agrupándolas por nombre de trabajo</p>
            <p><strong>🎭 Hero Principal:</strong> Selecciona las 5 mejores fotos para el carrusel principal</p>
            <p><strong>⭐ Trabajos Destacados:</strong> Marca hasta 2 colecciones para mostrar en la página principal</p>
            <p><strong>📸 Gestión de Fotos:</strong> Ve, edita, archiva y elimina todas tus fotos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
