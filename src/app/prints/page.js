'use client'

import { motion } from 'framer-motion'
import { Camera, ShoppingBag, Mail } from 'lucide-react'

export default function PrintsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Camera className="w-16 h-16 mx-auto mb-6 text-gray-400" />
          <h1 className="text-4xl md:text-6xl font-light mb-6">
            Prints Collection
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            High-quality prints of my best work, available soon.
          </p>
          
          <div className="bg-gray-900 rounded-lg p-8 max-w-md mx-auto">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-500" />
            <h2 className="text-2xl font-light mb-4">Coming Soon</h2>
            <p className="text-gray-400 mb-6">
              I'm preparing a curated selection of my finest photographs available as premium prints.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Mail className="w-4 h-4" />
              <span>Contact me for custom print requests</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}