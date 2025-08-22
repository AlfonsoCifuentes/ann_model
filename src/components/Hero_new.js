'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Instagram, Mail, ArrowDown } from 'lucide-react'

const FloatingParticle = ({ delay = 0, className = "" }) => (
  <motion.div
    className={`floating-particle ${className}`}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.3, 0.8, 0.4, 0.9, 0.3],
      scale: [0.8, 1.2, 0.9, 1.1, 0.8],
      x: [0, 20, -10, 15, 0],
      y: [0, -30, -15, -25, 0],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);

  const words = ["Elegance", "Authenticity", "Excellence", "Artistry"];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-bg via-brand-bg-secondary to-brand-bg-tertiary" />
      
      {/* Ambient Light Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-accent-bright/8 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      
      {/* Floating Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <FloatingParticle 
          key={i} 
          delay={i * 0.8} 
          className={`absolute ${
            i % 4 === 0 ? 'top-1/4 left-1/5' :
            i % 4 === 1 ? 'top-1/3 right-1/4' :
            i % 4 === 2 ? 'bottom-1/3 left-1/3' :
            'bottom-1/4 right-1/5'
          }`}
        />
      ))}

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="text-center"
        >
          {/* Professional Badge */}
          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center glass-gold rounded-full px-6 py-3 mb-8"
          >
            <div className="w-2 h-2 bg-brand-accent-bright rounded-full mr-3 animate-pulse-glow" />
            <span className="text-sm font-medium tracking-wider uppercase text-brand-fg">
              International Model & Actress
            </span>
          </motion.div>

          {/* Main Heading with Cinematic Typography */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-hero leading-none mb-4">
              ANN
            </h1>
            <div className="text-cinematic text-brand-fg-secondary mb-6">
              Bringing{' '}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-gradient-gold inline-block"
                >
                  {words[currentWord]}
                </motion.span>
              </AnimatePresence>
              {' '}and authenticity to fashion, film, and commercial projects worldwide
            </div>
          </motion.div>

          {/* Location Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center glass rounded-full px-4 py-2 mb-12"
          >
            <div className="w-3 h-3 bg-emerald-400 rounded-full mr-2 animate-pulse" />
            <span className="text-sm text-brand-fg-muted">
              <span className="font-medium">CURRENT_LOCATION</span> • Available Internationally
            </span>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <button className="btn btn-primary group">
              <span className="relative z-10">View Portfolio</span>
            </button>
            
            <button className="btn btn-secondary group flex items-center">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              <span className="relative z-10">Watch Reel</span>
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-6 mb-12"
          >
            <a href="#" className="social-link group">
              <Instagram className="w-5 h-5 text-brand-fg-secondary group-hover:text-brand-accent-bright transition-colors" />
            </a>
            <span className="w-px h-8 bg-brand-border"></span>
            <a href="#" className="social-link group">
              <Mail className="w-5 h-5 text-brand-fg-secondary group-hover:text-brand-accent-bright transition-colors" />
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <span className="text-xs text-brand-fg-muted mb-4 tracking-wider uppercase">
              Explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="p-2 glass rounded-full"
            >
              <ArrowDown className="w-4 h-4 text-brand-accent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-8 left-8 glass w-20 h-20 rounded-2xl opacity-30" />
      <div className="absolute bottom-8 right-8 glass w-16 h-16 rounded-xl opacity-20" />
      <div className="absolute top-1/2 left-8 glass w-12 h-32 rounded-full opacity-10" />
      <div className="absolute top-1/3 right-8 glass w-8 h-24 rounded-full opacity-15" />
    </div>
  );
}
