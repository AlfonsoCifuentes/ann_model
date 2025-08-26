/**
 * ADMIN AUTH HOOK
 * Hook personalizado para manejar la autenticación del panel de administración
 */

'use client';

import { useState, useEffect } from 'react';

const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const authStatus = localStorage.getItem('adminAuth');
        const authTime = localStorage.getItem('adminAuthTime');
        
        if (authStatus === 'true' && authTime) {
          // Verificar si la sesión ha expirado (24 horas)
          const sessionTime = parseInt(authTime);
          const currentTime = Date.now();
          const hoursDiff = (currentTime - sessionTime) / (1000 * 60 * 60);
          
          if (hoursDiff < 24) {
            setIsAuthenticated(true);
          } else {
            // Sesión expirada
            logout();
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (status) => {
    setIsAuthenticated(status);
    if (status) {
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminAuthTime', Date.now().toString());
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminAuthTime');
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout
  };
};

export default useAdminAuth;
