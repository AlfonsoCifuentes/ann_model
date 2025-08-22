'use client'

import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import LoginForm from './LoginForm'

export default function ProtectedRoute({ children, requireAuth = true }) {
  const { user, isLoading, isAuthenticated } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return <LoginForm />
  }

  return children
}
