import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Play, CheckCircle, AlertCircle, Loader } from 'lucide-react'

const InitialSetup = ({ onComplete }) => {
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState('')
  const [logs, setLogs] = useState([])

  const addLog = (message, type = 'info') => {
    setLogs(prev => [...prev, { message, type, timestamp: new Date() }])
  }

  const runSetup = async () => {
    setIsRunning(true)
    setError('')
    setLogs([])
    
    try {
      addLog('🎨 Iniciando configuración inicial...', 'info')
      
      // 1. Obtener fotos
      addLog('📸 Obteniendo fotos disponibles...', 'info')
      const photosResponse = await fetch('/api/photos?status=active')
      const photosResult = await photosResponse.json()
      
      if (!photosResult.success) {
        throw new Error('No se pudieron obtener las fotos')
      }
      
      const photos = photosResult.data
      addLog(`✅ Se encontraron ${photos.length} fotos activas`, 'success')
      
      // 2. Agrupar por colecciones
      const collections = {}
      photos.forEach(photo => {
        if (photo.workCollection) {
          if (!collections[photo.workCollection]) {
            collections[photo.workCollection] = []
          }
          collections[photo.workCollection].push(photo)
        }
      })
      
      const collectionNames = Object.keys(collections)
      addLog(`📁 Se encontraron ${collectionNames.length} colecciones`, 'success')
      
      // 3. Marcar colecciones como destacadas
      if (collectionNames.length > 0) {
        const collectionsToFeature = collectionNames.slice(0, 3)
        
        for (const collectionName of collectionsToFeature) {
          addLog(`⭐ Marcando "${collectionName}" como destacada...`, 'info')
          
          const response = await fetch('/api/photos/featured', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ collectionName, featured: true })
          })
          
          const result = await response.json()
          if (result.success) {
            addLog(`✅ "${collectionName}" marcada como destacada`, 'success')
          } else {
            addLog(`❌ Error en "${collectionName}": ${result.error}`, 'error')
          }
        }
      }
      
      // 4. Establecer fotos hero
      if (photos.length > 0) {
        const heroPhotos = photos.slice(0, 5)
        const heroPhotoIds = heroPhotos.map(p => p._id)
        
        addLog(`🏆 Estableciendo ${heroPhotos.length} fotos como hero...`, 'info')
        
        const response = await fetch('/api/photos/hero', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ photoIds: heroPhotoIds })
        })
        
        const result = await response.json()
        if (result.success) {
          addLog(`✅ ${heroPhotos.length} fotos establecidas como hero`, 'success')
        } else {
          addLog(`❌ Error al establecer fotos hero: ${result.error}`, 'error')
        }
      }
      
      addLog('🎉 ¡Configuración completada con éxito!', 'success')
      setIsComplete(true)
      if (onComplete) onComplete()
      
    } catch (err) {
      addLog(`❌ Error: ${err.message}`, 'error')
      setError(err.message)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 text-white p-6 rounded-lg shadow-lg border border-gray-600"
    >
      <div className="flex items-center gap-3 mb-4">
        <Settings className="w-6 h-6 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-800">
          Configuración Inicial
        </h3>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-800">
            Esta herramienta te ayudará a configurar automáticamente:
          </p>
          <ul className="mt-2 text-sm text-gray-700 space-y-1">
            <li>• Las primeras 3 colecciones como "destacadas"</li>
            <li>• Las primeras 5 fotos como carousel principal</li>
            <li>• Configuración inicial para el sistema de gestión</li>
          </ul>
        </div>
        
        {!isComplete && !isRunning && (
          <button
            onClick={runSetup}
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Ejecutar Configuración Inicial
          </button>
        )}
        
        {isRunning && (
          <div className="flex items-center justify-center gap-2 py-3">
            <Loader className="w-4 h-4 animate-spin text-orange-500" />
            <span className="text-orange-500 font-medium">Configurando...</span>
          </div>
        )}
        
        {isComplete && (
          <div className="flex items-center justify-center gap-2 py-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">¡Configuración completada!</span>
          </div>
        )}
        
        {error && (
          <div className="flex items-center gap-2 py-3 px-4 bg-red-50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-700">{error}</span>
          </div>
        )}
        
        {logs.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Registro de actividad:</h4>
            <div className="bg-gray-50 rounded-lg p-3 max-h-40 overflow-y-auto">
              {logs.map((log, index) => (
                <div 
                  key={index} 
                  className={`text-xs mb-1 ${
                    log.type === 'success' ? 'text-green-600' :
                    log.type === 'error' ? 'text-red-600' :
                    'text-gray-600'
                  }`}
                >
                  {log.message}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default InitialSetup
