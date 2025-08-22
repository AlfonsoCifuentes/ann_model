'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Mail, MapPin, Instagram, Send, CheckCircle } from 'lucide-react'
import MainLayout from '../../components/MainLayout'
import { useLanguage } from '../../contexts/LanguageContext'
import { FadeInUp, StaggerContainer, StaggerItem, HoverLift } from '../../components/animations/MicroAnimations'
import { useInteractionTracking } from '../../hooks/useAnalytics'

export default function ContactPage() {
  const { t } = useLanguage()
  const { trackContactAttempt } = useInteractionTracking()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Track form submission attempt
    trackContactAttempt(`contact_form_${formData.type}`)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          type: 'general'
        })
      }, 3000)
    }, 1500)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  return (
    <MainLayout>
      <div className="min-h-screen bg-fashion-bg text-fashion-fg">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          
          {/* Left Column - Contact Info */}
          <div className="flex items-center p-8 lg:p-16">
            <div className="max-w-lg">
              <FadeInUp>
                <h1 className="font-inter font-light tracking-widest text-3xl lg:text-4xl mb-8 uppercase">
                  Work with me
                </h1>
              </FadeInUp>
              
              <StaggerContainer className="space-y-8">
                <StaggerItem>
                  <div>
                    <h3 className="font-inter font-light tracking-wider text-lg mb-4 uppercase">
                      General Inquiries
                    </h3>
                    <p className="text-fashion-muted font-light mb-2 tracking-wide">
                      For bookings, collaborations, and general inquiries
                    </p>
                    <a 
                      href="mailto:contact@ananicoleta.com"
                      className="text-fashion-secondary hover:text-orange-400 transition-colors font-light tracking-wide"
                      onClick={() => trackContactAttempt('email_click')}
                    >
                      contact@ananicoleta.com
                    </a>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div>
                    <h3 className="font-inter font-light tracking-wider text-lg mb-4 uppercase">
                      Press & Media
                    </h3>
                    <p className="text-gray-600 font-light mb-2 font-inter tracking-wide">
                      For press releases and media inquiries
                    </p>
                    <a 
                      href="mailto:press@ananicoleta.com"
                      className="text-black hover:text-gray-600 transition-colors font-light font-inter tracking-wide"
                      onClick={() => trackContactAttempt('press_email_click')}
                    >
                      press@ananicoleta.com
                    </a>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div>
                    <h3 className="font-inter font-light tracking-wider text-lg mb-4 uppercase">
                      Location
                    </h3>
                    <p className="text-gray-600 font-light font-inter tracking-wide">
                      Based in Spain<br />
                      Available worldwide for projects
                    </p>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div>
                    <h3 className="font-inter font-light tracking-wider text-lg mb-4 uppercase">
                      Social Media
                    </h3>
                    <div className="flex space-x-4">
                      <a 
                        href="https://instagram.com/ann__siedad.7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-black transition-colors"
                        onClick={() => trackContactAttempt('instagram_click')}
                      >
                        <Instagram size={20} />
                      </a>
                      <a 
                        href="mailto:contact@ananicoleta.com"
                        className="text-gray-600 hover:text-black transition-colors"
                        onClick={() => trackContactAttempt('social_email_click')}
                      >
                        <Mail size={20} />
                      </a>
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative bg-gray-50 overflow-hidden">
            <Image
              src="/photos/SVM05620.jpg"
              alt="Ana Nicoleta - Contact"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Services Section */}
        <div className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-8 lg:px-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-light tracking-wider mb-4 font-crimson">
                Services
              </h2>
              <p className="text-gray-600 font-light max-w-xl mx-auto">
                Professional modeling and acting services available worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              <div className="text-center">
                <h3 className="text-lg font-light tracking-wide mb-3 font-crimson">
                  Editorial Photography
                </h3>
                <p className="text-gray-600 font-light text-sm">
                  High-fashion editorial shoots for magazines and publications
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-light tracking-wide mb-3 font-crimson">
                  Commercial Campaigns
                </h3>
                <p className="text-gray-600 font-light text-sm">
                  Brand campaigns and commercial photography projects
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-light tracking-wide mb-3 font-crimson">
                  Runway Shows
                </h3>
                <p className="text-fashion-muted font-light text-sm">
                  Fashion week runway shows and designer presentations
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-light tracking-wide mb-3 font-crimson">
                  Acting Projects
                </h3>
                <p className="text-gray-600 font-light text-sm">
                  Film, television, and commercial acting roles
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Preview */}
        <div className="py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-8 lg:px-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-light tracking-wider mb-4 font-crimson">
                Recent Work
              </h2>
              <p className="text-gray-600 font-light max-w-xl mx-auto">
                A selection of recent projects and collaborations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative aspect-[3/4] overflow-hidden group">
                <Image
                  src="/photos/SVM05631.jpg"
                  alt="Recent Work"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              
              <div className="relative aspect-[3/4] overflow-hidden group">
                <Image
                  src="/photos/SVM05660.jpg"
                  alt="Recent Work"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              
              <div className="relative aspect-[3/4] overflow-hidden group">
                <Image
                  src="/photos/SVM05675.jpg"
                  alt="Recent Work"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>

            <div className="text-center mt-12">
              <a 
                href="/portfolio"
                className="inline-block px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors tracking-wide font-light"
              >
                VIEW FULL PORTFOLIO
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-black text-white py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-8 lg:px-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-light tracking-wider mb-4 font-crimson">
                Get in Touch
              </h2>
              <p className="text-gray-300 font-light max-w-xl mx-auto">
                Ready to start a project? Send me a message and let's discuss your vision.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full px-4 py-3 bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors font-light"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors font-light"
                    />
                  </div>
                </div>
                
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full px-4 py-3 bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors font-light"
                  />
                </div>
                
                <div>
                  <textarea
                    rows={6}
                    placeholder="Message"
                    className="w-full px-4 py-3 bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors font-light resize-none"
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors tracking-wide font-light"
                  >
                    SEND MESSAGE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
