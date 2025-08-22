'use client'

import { motion } from 'framer-motion'

// Contenedor animado para elementos que aparecen
export const FadeInUp = ({ children, delay = 0, duration = 0.6, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Para imágenes con efecto parallax sutil
export const ParallaxImage = ({ children, offset = 20, ...props }) => {
  return (
    <motion.div
      initial={{ y: offset }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Hover suave para cards/elementos interactivos
export const HoverLift = ({ children, scale = 1.02, ...props }) => {
  return (
    <motion.div
      whileHover={{ 
        scale: scale,
        y: -5,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Stagger para listas/grids
export const StaggerContainer = ({ children, staggerDelay = 0.1, ...props }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const StaggerItem = ({ children, ...props }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" }
        }
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Botones con microinteracciones
export const AnimatedButton = ({ children, variant = "primary", ...props }) => {
  const variants = {
    primary: {
      whileHover: { scale: 1.05, backgroundColor: "#f8f8f8" },
      whileTap: { scale: 0.95 },
      transition: { duration: 0.2, ease: "easeOut" }
    },
    secondary: {
      whileHover: { scale: 1.05, borderColor: "#000" },
      whileTap: { scale: 0.95 },
      transition: { duration: 0.2, ease: "easeOut" }
    }
  }

  return (
    <motion.button
      {...variants[variant]}
      {...props}
    >
      {children}
    </motion.button>
  )
}

// Para texto que aparece caracter por caracter
export const TypewriterText = ({ text, delay = 0, speed = 0.05 }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: delay + (index * speed),
            duration: 0.3
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Línea animada para separadores
export const AnimatedLine = ({ width = "100%", delay = 0 }) => {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      className="h-px bg-current origin-left"
      style={{ width }}
    />
  )
}

// Para números que cuentan hacia arriba
export const CountingNumber = ({ from = 0, to, duration = 2, delay = 0 }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <motion.span
        initial={{ textContent: from }}
        whileInView={{ textContent: to }}
        viewport={{ once: true }}
        transition={{ 
          delay,
          duration,
          ease: "easeOut",
          type: "tween"
        }}
        onUpdate={(latest) => {
          if (typeof latest.textContent === 'number') {
            return Math.round(latest.textContent)
          }
        }}
      />
    </motion.span>
  )
}

// Revelado de imagen con overlay
export const ImageReveal = ({ children, direction = "up" }) => {
  const directions = {
    up: { y: "100%" },
    down: { y: "-100%" },
    left: { x: "100%" },
    right: { x: "-100%" }
  }

  return (
    <div className="relative overflow-hidden">
      {children}
      <motion.div
        initial={directions[direction]}
        whileInView={{ x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 bg-white z-10"
      />
    </div>
  )
}

// Efecto magnético para elementos
export const MagneticHover = ({ children, strength = 0.3, ...props }) => {
  return (
    <motion.div
      whileHover={(event) => {
        const rect = event.target.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const deltaX = (event.clientX - centerX) * strength
        const deltaY = (event.clientY - centerY) * strength
        
        return {
          x: deltaX,
          y: deltaY,
          transition: { duration: 0.3, ease: "easeOut" }
        }
      }}
      whileLeave={{
        x: 0,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
