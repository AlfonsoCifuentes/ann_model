'use client'

import { useState, useEffect } from 'react'
import MainLayout from '../components/MainLayout'
import HomeContent from '../components/HomeContent'
import LoadingScreen from '../components/ui/LoadingScreen'
import PageTransition from '../components/ui/PageTransition'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial load time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <PageTransition>
      <MainLayout>
        <HomeContent />
      </MainLayout>
    </PageTransition>
  )
}
