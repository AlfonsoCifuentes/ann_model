/**
 * ADMIN LOGIN COMPONENT
 * Sistema de autenticación para proteger el panel de administración
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simular verificación (en producción debería ser una API real)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Credenciales hardcodeadas para demo (cambiar por sistema real)
    if (credentials.username === 'artemisa' && credentials.password === 'runaloca69') {
      // Guardar en localStorage
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminAuthTime', Date.now().toString());
      onLogin(true);
    } else {
      setError('Credenciales incorrectas');
    }

    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fashion-dark via-fashion-darker to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-fashion-darker/50 backdrop-blur-xl border border-fashion-accent/20 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-fashion-accent/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Lock className="w-8 h-8 text-fashion-accent" />
            </motion.div>
            <h1 className="text-2xl font-light text-white mb-2">Panel de Administración</h1>
            <p className="text-fashion-muted text-sm">Acceso restringido</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-fashion-light text-sm font-medium mb-2">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-fashion-muted" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-3 bg-fashion-dark/50 border border-fashion-accent/20 rounded-lg text-white placeholder-fashion-muted focus:outline-none focus:ring-2 focus:ring-fashion-accent focus:border-transparent transition-all duration-200"
                  placeholder="Ingresa tu usuario"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-fashion-light text-sm font-medium mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-fashion-muted" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-fashion-dark/50 border border-fashion-accent/20 rounded-lg text-white placeholder-fashion-muted focus:outline-none focus:ring-2 focus:ring-fashion-accent focus:border-transparent transition-all duration-200"
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-fashion-muted hover:text-fashion-light transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-fashion-accent hover:bg-fashion-accent/90 disabled:bg-fashion-accent/50 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Iniciar Sesión'
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-fashion-muted text-xs">
              Ana Nicoleta Photography © 2025
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
