'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const pageTransitions = {
  initial: { 
    opacity: 0,
    scale: 0.95,
    filter: 'blur(10px)'
  },
  animate: { 
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: { 
    opacity: 0,
    scale: 1.05,
    filter: 'blur(10px)',
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const slideTransitions = {
  initial: { 
    x: 100,
    opacity: 0
  },
  animate: { 
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: { 
    x: -100,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const curtainTransitions = {
  initial: { 
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)'
  },
  animate: { 
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: { 
    clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function PageTransition({ children, variant = 'page' }) {
  const pathname = usePathname()

  const getTransition = () => {
    switch (variant) {
      case 'slide':
        return slideTransitions
      case 'curtain':
        return curtainTransitions
      default:
        return pageTransitions
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={getTransition()}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
