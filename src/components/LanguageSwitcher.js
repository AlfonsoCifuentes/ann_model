'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState('es')

  const languages = [
    { code: 'es', name: 'ES' },
    { code: 'en', name: 'EN' },
  ]

  return (
    <div className="relative">
      <button className="flex items-center space-x-1 text-xs xl:text-sm text-fashion-fg hover:text-fashion-rose transition-colors p-1.5 xl:p-2 rounded-lg glass-fashion hover:bg-fashion-glass">
        <Globe className="w-3 h-3 xl:w-4 xl:h-4" />
        <span className="uppercase font-medium">{currentLang}</span>
      </button>
    </div>
  )
}
