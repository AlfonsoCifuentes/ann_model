'use client'

import Sidebar from './Sidebar'
import Footer from './Footer'
import { ScrollProgress } from './ui/IntelligentNavigation'

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <Sidebar />
      
      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="max-w-none">
          {children}
        </div>
      </main>
      
      <div className="lg:ml-64">
        <Footer />
      </div>
    </div>
  )
}
