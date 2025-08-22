'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const media = [
  { name: 'Vogue España', logo: '/favicon.svg' },
  { name: 'Harper\'s Bazaar', logo: '/favicon.svg' },
  { name: 'Elle Magazine', logo: '/favicon.svg' },
  { name: 'Vanity Fair', logo: '/favicon.svg' },
]

export default function AsSeenIn() {
  return (
    <section className="section-padding bg-brand-bg/50">
      <div className="container-custom">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            As Seen In
          </h2>
          <p className="text-brand-muted text-lg">
            Featured in leading fashion and entertainment publications
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {media.map((outlet, index) => (
            <motion.div
              key={outlet.name}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative h-12 mb-2 grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={outlet.logo}
                  alt={outlet.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm text-brand-muted">{outlet.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
