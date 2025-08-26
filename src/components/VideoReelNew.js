'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize2, X } from 'lucide-react'
import { FadeInUp } from './animations/MicroAnimations'
import { useLanguage } from '../contexts/LanguageContext'

export default function VideoReel() {
  const { t } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(0)
  const videoRef = useRef(null)

  const videos = [
    {
      id: 1,
      title: "Fashion Campaign 2024",
      description: "Behind the scenes of luxury fashion shoot",
      thumbnail: "/photos/SVM05701.jpg",
      videoUrl: "/videos/fashion-reel.mp4", // Placeholder
      duration: "1:30",
      category: "Fashion"
    },
    {
      id: 2,
      title: "Editorial Story",
      description: "Creative direction and styling",
      thumbnail: "/photos/editorial_1.jpg",
      videoUrl: "/videos/editorial-reel.mp4", // Placeholder
      duration: "2:15",
      category: "Editorial"
    },
    {
      id: 3,
      title: "Acting Showreel",
      description: "Dramatic performance highlights",
      thumbnail: "/photos/portrait_1.jpg",
      videoUrl: "/videos/acting-reel.mp4", // Placeholder
      duration: "3:00",
      category: "Acting"
    }
  ]

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <>
      <section className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-8">
          
          {/* Header */}
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl md:text-5xl font-light tracking-wider mb-6">
                Video Reel
              </h2>
              <p className="font-inter text-lg text-gray-300 max-w-2xl mx-auto">
                A collection of behind-the-scenes moments, creative processes, and performance highlights
              </p>
            </div>
          </FadeInUp>

          {/* Main Video Player */}
          <FadeInUp delay={0.2}>
            <div className="relative mb-12">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                
                {/* Video Element */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  poster={videos[currentVideo].thumbnail}
                  muted={isMuted}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onLoadedData={() => setIsPlaying(false)}
                >
                  <source src={videos[currentVideo].videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video Controls Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  
                  {/* Play/Pause Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      onClick={handlePlayPause}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause size={24} className="text-white" />
                      ) : (
                        <Play size={24} className="text-white ml-1" />
                      )}
                    </motion.button>
                  </div>

                  {/* Control Bar */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white">
                      
                      {/* Video Info */}
                      <div>
                        <h3 className="font-playfair text-lg font-medium">
                          {videos[currentVideo].title}
                        </h3>
                        <p className="font-inter text-sm opacity-80">
                          {videos[currentVideo].description}
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={toggleMute}
                          className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                        
                        <button
                          onClick={toggleFullscreen}
                          className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                          <Maximize2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInUp>

          {/* Video Thumbnails */}
          <FadeInUp delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  whileHover={{ scale: 1.02 }}
                  className={`cursor-pointer rounded-lg overflow-hidden ${
                    currentVideo === index ? 'ring-2 ring-white' : ''
                  }`}
                  onClick={() => setCurrentVideo(index)}
                >
                  <div className="relative aspect-video">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play size={16} className="text-white ml-0.5" />
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs font-inter text-white">
                      {video.duration}
                    </div>

                    {/* Category */}
                    <div className="absolute top-2 left-2 px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs font-inter text-white">
                      {video.category}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-black">
                    <h3 className="font-playfair text-lg font-medium mb-1">
                      {video.title}
                    </h3>
                    <p className="font-inter text-sm text-gray-300">
                      {video.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeInUp>

          {/* Call to Action */}
          <FadeInUp delay={0.6}>
            <div className="text-center mt-16">
              <p className="font-inter text-gray-300 mb-8">
                Interested in creating something similar?
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 border-2 border-white text-white font-inter font-medium tracking-wide hover:bg-white hover:text-black transition-colors"
              >
                {t('contactMe')}
              </motion.a>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 z-10 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            
            <video
              className="w-full h-full object-contain"
              controls
              autoPlay={isPlaying}
              muted={isMuted}
            >
              <source src={videos[currentVideo].videoUrl} type="video/mp4" />
            </video>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
