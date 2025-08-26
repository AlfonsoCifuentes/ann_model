'use client'

import Sidebar from './Sidebar'
import Footer from './Footer'
import { ScrollProgress } from './ui/IntelligentNavigation'

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <ScrollProgress />
      <Sidebar />
      
      {/* Main Content with sidebar offset */}
      <main className="flex-1 lg:ml-64">
        <div className="max-w-none">
          {children}
        </div>
      </main>
      
      {/* Footer ocupando TODO el ancho de la pantalla, sin offset del sidebar */}
      <Footer />
    </div>
  )
}
