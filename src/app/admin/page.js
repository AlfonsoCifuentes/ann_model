'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LogOut, Upload, Image as ImageIcon, User, Settings } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import ProtectedRoute from '../../components/ProtectedRoute'
import PhotoUpload from '../../components/PhotoUpload'

function AdminContent() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('upload')

  const tabs = [
    { id: 'upload', label: 'Subir Fotos', icon: Upload },
    { id: 'gallery', label: 'Galería', icon: ImageIcon },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ]

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
