'use client'

import { motion } from 'framer-motion'

const clients = [
  'Vogue', 'Harper\'s Bazaar', 'Elle', 'Marie Claire', 'Versace', 'Prada', 
  'Gucci', 'Chanel', 'Dior', 'Giorgio Armani', 'Netflix', 'HBO'
]

export default function ClientsMarquee() {
  return (
    <section className="py-16 bg-brand-bg border-y border-brand-muted/10">
      <div className="container-custom">
        <motion.h3
          className="text-center text-sm uppercase tracking-widest text-brand-muted mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Trusted by Industry Leaders
        </motion.h3>
        
        <div className="relative overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ['0%', '-100%'] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {[...clients, ...clients].map((client, index) => (
              <span
                key={index}
                className="inline-block text-2xl md:text-3xl font-playfair font-light text-brand-fg/70 mr-16"
              >
                {client}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
