'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "Working with MODEL_NAME was an absolute pleasure. Her professionalism and talent shine through in every shot.",
    author: "Director Name",
    role: "Creative Director",
    company: "Fashion House"
  },
  {
    quote: "An exceptional talent with incredible range. MODEL_NAME brings authenticity to every project.",
    author: "Photographer Name", 
    role: "Fashion Photographer",
    company: "Vogue"
  },
  {
    quote: "Professional, dedicated, and incredibly talented. MODEL_NAME is a joy to work with.",
    author: "Agent Name",
    role: "Talent Agent",
    company: "AGENCY_NAME"
  }
]

export default function Testimonials() {
  return (
    <section className="luxury-header-spacing">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-luxury-elegant mb-6">
            What People Say
          </h2>
          <p className="text-luxury-body">
            Testimonials from industry professionals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="luxury-card text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <blockquote className="text-luxury-body mb-6 leading-relaxed italic text-fashion-platinum">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <cite className="text-fashion-gold font-medium not-italic block text-lg">
                  {testimonial.author}
                </cite>
                <p className="text-luxury-body text-sm mt-2 text-fashion-platinum/80">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
