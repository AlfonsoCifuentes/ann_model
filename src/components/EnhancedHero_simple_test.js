'use client'

import Image from 'next/image'

export default function EnhancedHeroSimpleTest() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-red-500">
      <div className="absolute inset-0 bg-blue-500">
        <Image
          src="/photos/SVM05701.jpg"
          alt="Test Image"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
      
      <div className="relative z-10 flex items-center justify-center h-screen">
        <h1 className="text-white text-4xl bg-black bg-opacity-50 p-4">
          TEST: ¿Se ve la imagen?
        </h1>
      </div>
    </section>
  )
}
