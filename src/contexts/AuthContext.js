'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('auth_token')
    const userData = localStorage.getItem('user_data')
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_data')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      setIsLoading(true)
      
      // Simulate API call - replace with real authentication
      if (email === 'ana@nicoleta.com' && password === 'ana2024') {
        const userData = {
          id: '1',
          email: 'ana@nicoleta.com',
          name: 'Ana Nicoleta',
          role: 'model'
        }
        
        const token = 'mock_token_' + Date.now()
        
        localStorage.setItem('auth_token', token)
        localStorage.setItem('user_data', JSON.stringify(userData))
        setUser(userData)
        return { success: true }
      } else if (email === 'agent@nicoleta.com' && password === 'agent2024') {
        const userData = {
          id: '2',
          email: 'agent@nicoleta.com',
          name: 'Agent',
          role: 'agent'
        }
        
        const token = 'mock_token_' + Date.now()
        
        localStorage.setItem('auth_token', token)
        localStorage.setItem('user_data', JSON.stringify(userData))
        setUser(userData)
        return { success: true }
      } else {
        return { success: false, error: 'Credenciales incorrectas' }
      }
    } catch (error) {
      return { success: false, error: 'Error en el servidor' }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
