'use client';

import { useState } from 'react';
import { LogOut } from 'lucide-react';
import PhotoUpload from '@/components/PhotoUpload';
import HeroManager from '@/components/admin/HeroManager';
import FeaturedManager from '@/components/admin/FeaturedManager';
import PhotoManager from '@/components/admin/PhotoManager';
import BlogManager from '@/components/admin/BlogManager';
import AdminLogin from '@/components/admin/AdminLogin';
import useAdminAuth from '@/hooks/useAdminAuth';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('upload');
  const { isAuthenticated, isLoading, login, logout } = useAdminAuth();

  const tabs = [
    { id: 'upload', name: 'Subir Fotos', icon: '📤' },
    { id: 'hero', name: 'Hero Principal', icon: '🎭' },
    { id: 'featured', name: 'Trabajos Destacados', icon: '⭐' },
    { id: 'manage', name: 'Gestión de Fotos', icon: '📸' },
    { id: 'blog', name: 'Entradas de Blog', icon: '📝' },
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
      case 'blog':
        return <BlogManager />;
      default:
        return <PhotoUpload />;
    }
  };

  // Mostrar loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-fashion-dark via-fashion-darker to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-fashion-accent/30 border-t-fashion-accent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-fashion-light">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Mostrar login si no está autenticado
  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  // Mostrar panel de admin si está autenticado
  return (
    <div className="min-h-screen bg-fashion-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        {/* Header */}
        <div className="bg-fashion-bg-secondary rounded-lg shadow-sm border border-fashion-bg-tertiary mb-4 lg:mb-8">
          <div className="px-4 sm:px-6 py-4 border-b border-fashion-bg-tertiary">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-fashion-fg truncate">
                  Panel de Administración
                </h1>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-fashion-fg-secondary">
                  Gestiona el contenido de tu portfolio profesional
                </p>
              </div>
              <button
                onClick={logout}
                className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors text-sm shrink-0"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
                <span className="sm:hidden">Salir</span>
              </button>
            </div>
          </div>

          {/* Mobile Tabs - Vertical stack */}
          <div className="px-4 sm:px-6 lg:hidden">
            <nav className="grid grid-cols-1 gap-2 py-2" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-3 rounded-lg font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'bg-fashion-rose/20 text-fashion-rose border border-fashion-rose/30'
                      : 'bg-fashion-bg-tertiary text-fashion-fg-muted hover:text-fashion-fg hover:bg-fashion-bg-tertiary/80 border border-transparent'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Desktop Tabs */}
          <div className="px-6 hidden lg:block">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-fashion-rose text-fashion-rose'
                      : 'border-transparent text-fashion-fg-muted hover:text-fashion-fg hover:border-fashion-fg-muted'
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
        <div className="bg-fashion-bg-secondary rounded-lg shadow-sm border border-fashion-bg-tertiary">
          <div className="p-4 sm:p-6">
            {renderActiveComponent()}
          </div>
        </div>

        {/* Footer Info - Collapsible on mobile */}
        <div className="mt-4 lg:mt-8 bg-fashion-bg-tertiary border border-fashion-rose/30 rounded-lg p-4">
          <h3 className="font-semibold text-fashion-rose mb-2 text-sm sm:text-base">🚀 Guía Rápida de Administración</h3>
          <div className="text-xs sm:text-sm text-fashion-fg-secondary space-y-1">
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
