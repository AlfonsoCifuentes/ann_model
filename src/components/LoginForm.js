'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LogIn, User, Lock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function LoginForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      onSuccess?.()
    } else {
      setError(result.error)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light tracking-widest text-white mb-2">
            ANA<span className="font-bold">NICOLETA</span>
          </h1>
          <p className="text-gray-400 text-sm uppercase tracking-wider">Admin Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded text-sm"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={20} />
                Iniciar Sesión
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center text-gray-400 text-xs">
          <p>Credenciales de prueba:</p>
          <p>ana@nicoleta.com / ana2024</p>
          <p>agent@nicoleta.com / agent2024</p>
        </div>
      </motion.div>
    </div>
  )
}
