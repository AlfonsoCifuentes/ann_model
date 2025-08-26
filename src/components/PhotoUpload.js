'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Check, AlertCircle, Image as ImageIcon, Trash2 } from 'lucide-react'

export default function PhotoUpload({ onUploadSuccess }) {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024 // 10MB limit
    )
    
    if (validFiles.length !== files.length) {
      setUploadStatus({
        type: 'error',
        message: 'Algunos archivos fueron rechazados. Solo se permiten imágenes de hasta 10MB.'
      })
    }

    const newFiles = validFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file),
      category: 'portrait',
      title: file.name.split('.')[0],
      description: '',
      workCollection: ''
    }))

    setSelectedFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (id) => {
    setSelectedFiles(prev => {
      const file = prev.find(f => f.id === id)
      if (file) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter(f => f.id !== id)
    })
  }

  const updateFileData = (id, field, value) => {
    setSelectedFiles(prev => 
      prev.map(file => 
        file.id === id ? { ...file, [field]: value } : file
      )
    )
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return

    setUploading(true)
    setUploadStatus(null)

    try {
      const uploadPromises = selectedFiles.map(async (fileData) => {
        const formData = new FormData()
        formData.append('file', fileData.file)
        formData.append('upload_preset', 'ann_model_photos') // Configurar en Cloudinary
        
        // Upload to Cloudinary
        const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your-cloud-name'}/image/upload`, {
          method: 'POST',
          body: formData,
        })
        
        if (!cloudinaryResponse.ok) {
          throw new Error('Error al subir imagen a Cloudinary')
        }
        
        const cloudinaryData = await cloudinaryResponse.json()
        
        // Save to database
        const photoData = {
          title: fileData.title,
          description: fileData.description,
          imageUrl: cloudinaryData.secure_url,
          category: fileData.category,
          workCollection: fileData.workCollection || `${fileData.category}-${Date.now()}`,
          altText: fileData.title,
          metadata: {
            originalName: fileData.file.name,
            size: fileData.file.size,
            mimeType: fileData.file.type,
            uploadedBy: 'Ana Nicoleta'
          }
        }
        
        const dbResponse = await fetch('/api/photos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(photoData),
        })
        
        if (!dbResponse.ok) {
          throw new Error('Error al guardar foto en la base de datos')
        }
        
        return await dbResponse.json()
      })
      
      await Promise.all(uploadPromises)
      
      setUploadStatus({
        type: 'success',
        message: `${selectedFiles.length} foto(s) subida(s) exitosamente`
      })
      
      // Clear files after successful upload
      selectedFiles.forEach(file => URL.revokeObjectURL(file.preview))
      setSelectedFiles([])
      
      onUploadSuccess?.()
      
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus({
        type: 'error',
        message: error.message || 'Error al subir las fotos. Inténtalo de nuevo.'
      })
    } finally {
      setUploading(false)
    }
  }

  const categories = [
    { value: 'editorial', label: 'Editorial' },
    { value: 'fashion', label: 'Fashion/Moda' },
    { value: 'portrait', label: 'Retrato' },
    { value: 'commercial', label: 'Comercial' },
    { value: 'studio', label: 'Estudio' },
    { value: 'lifestyle', label: 'Lifestyle' }
  ]

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      <div 
        className="border-2 border-dashed border-fashion-rose/30 rounded-lg p-8 text-center hover:border-fashion-rose transition-colors cursor-pointer bg-fashion-bg-tertiary"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <Upload className="mx-auto w-12 h-12 text-fashion-fg-muted mb-4" />
        <p className="text-fashion-fg text-lg mb-2">Arrastra fotos aquí o haz clic para seleccionar</p>
        <p className="text-fashion-fg-secondary text-sm">PNG, JPG, WEBP hasta 10MB cada una</p>
      </div>

      {/* Upload Status */}
      <AnimatePresence>
        {uploadStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-lg flex items-center gap-3 ${
              uploadStatus.type === 'success' 
                ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                : 'bg-red-500/10 border border-red-500/20 text-red-400'
            }`}
          >
            {uploadStatus.type === 'success' ? (
              <Check className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{uploadStatus.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-white text-lg font-medium">Fotos seleccionadas ({selectedFiles.length})</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {selectedFiles.map((fileData) => (
              <motion.div
                key={fileData.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-800 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gray-700 rounded overflow-hidden">
                      <img
                        src={fileData.preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-sm">
                      <p className="text-white font-medium truncate">{fileData.file.name}</p>
                      <p className="text-gray-400">{(fileData.file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeFile(fileData.id)}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Título de la foto"
                    value={fileData.title}
                    onChange={(e) => updateFileData(fileData.id, 'title', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-orange-500 focus:outline-none"
                  />
                  
                  <input
                    type="text"
                    placeholder="Nombre del trabajo/colección (ej: Editorial-Vogue-2024)"
                    value={fileData.workCollection || ''}
                    onChange={(e) => updateFileData(fileData.id, 'workCollection', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-orange-500 focus:outline-none"
                  />
                  
                  <select
                    value={fileData.category}
                    onChange={(e) => updateFileData(fileData.id, 'category', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-orange-500 focus:outline-none"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                  
                  <textarea
                    placeholder="Descripción (opcional)"
                    value={fileData.description}
                    onChange={(e) => updateFileData(fileData.id, 'description', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-orange-500 focus:outline-none resize-none"
                    rows={2}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={handleUpload}
            disabled={uploading || selectedFiles.length === 0}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white py-3 rounded font-medium transition-colors flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <ImageIcon size={20} />
                Subir {selectedFiles.length} foto(s)
              </>
            )}
          </motion.button>
        </div>
      )}
    </div>
  )
}
