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
    
    try {
      // Crear el enlace mailto con toda la información del formulario
      const subject = encodeURIComponent(formData.subject || `Consulta desde el sitio web - ${formData.type}`)
      const body = encodeURIComponent(
        `Nombre: ${formData.name}
Correo electrónico: ${formData.email}
Tipo de consulta: ${formData.type}

Mensaje:
${formData.message}

---
Enviado desde el formulario de contacto de ananicoleta.com`
      )
      
      const mailtoLink = `mailto:anngsesiones@gmail.com?subject=${subject}&body=${body}`
      
      // Abrir el cliente de correo
      window.location.href = mailtoLink
      
      // Mostrar confirmación y limpiar formulario
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
      }, 1000)
      
    } catch (error) {
      console.error('Error al preparar el correo:', error)
      setIsSubmitting(false)
    }
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
                  {t('workTogether')}
                </h1>
              </FadeInUp>
              
              <StaggerContainer className="space-y-8">
                <StaggerItem>
                  <div>
                    <h3 className="font-inter font-light tracking-wider text-lg mb-4 uppercase">
                      {t('generalInquiries')}
                    </h3>
                    <p className="font-inter text-fashion-fg-secondary font-light mb-2 tracking-wide">
                      {t('bookingsCollaborations')}
                    </p>
                    <a 
                      href="mailto:anngsesiones@gmail.com"
                      className="font-inter text-fashion-secondary hover:text-orange-400 transition-colors font-light tracking-wide"
                      onClick={() => trackContactAttempt('email_click')}
                    >
                      anngsesiones@gmail.com
                    </a>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div>
                    <h3 className="font-inter font-light tracking-wider text-lg mb-4 uppercase">
                      {t('location')}
                    </h3>
                    <p className="text-fashion-fg-secondary font-light font-inter tracking-wide">
                      {t('basedInSpain')}<br />
                      {t('availableWorldwide')}
                    </p>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div>
                    <h3 className="font-inter font-light tracking-wider text-lg mb-4 uppercase">
                      {t('socialNetworks')}
                    </h3>
                    <div className="flex space-x-4">
                      <a 
                        href="https://instagram.com/ann__siedad.7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fashion-fg-secondary hover:text-fashion-rose transition-colors"
                        onClick={() => trackContactAttempt('instagram_click')}
                      >
                        <Instagram size={20} />
                      </a>
                      <a 
                        href="mailto:anngsesiones@gmail.com"
                        className="text-fashion-fg-secondary hover:text-fashion-rose transition-colors"
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
          <div className="relative bg-fashion-bg-secondary overflow-hidden min-h-[400px] lg:min-h-[600px]">
            <Image
              src="/photos/SVM05620.jpg"
              alt="Ana Nicoleta - Contact"
              fill
              className="object-contain sm:object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-fashion-bg text-fashion-fg py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-8 lg:px-16">
            <div className="text-center mb-12">
              <h2 className="font-inter text-3xl lg:text-4xl font-light tracking-wider mb-4">
                {t('getInTouchContact')}
              </h2>
              <p className="font-inter text-fashion-fg-secondary font-light max-w-xl mx-auto">
                {t('readyToStart')}
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      placeholder={t('namePlaceholder')}
                      className="font-inter w-full px-4 py-3 bg-transparent border border-fashion-fg-muted text-fashion-fg placeholder-fashion-fg-muted focus:border-fashion-rose focus:outline-none transition-colors font-light rounded-full"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      className="font-inter w-full px-4 py-3 bg-transparent border border-fashion-fg-muted text-fashion-fg placeholder-fashion-fg-muted focus:border-fashion-rose focus:outline-none transition-colors font-light rounded-full"
                    />
                  </div>
                </div>
                
                <div>
                  <input
                    type="text"
                    placeholder={t('subjectPlaceholder')}
                    className="font-inter w-full px-4 py-3 bg-transparent border border-fashion-fg-muted text-fashion-fg placeholder-fashion-fg-muted focus:border-fashion-rose focus:outline-none transition-colors font-light rounded-full"
                  />
                </div>
                
                <div>
                  <textarea
                    rows={6}
                    placeholder={t('messagePlaceholder')}
                    className="font-inter w-full px-4 py-3 bg-transparent border border-fashion-fg-muted text-fashion-fg placeholder-fashion-fg-muted focus:border-fashion-rose focus:outline-none transition-colors font-light resize-none rounded-3xl"
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn-fashion btn-fashion-primary"
                  >
                    {t('sendMessage')}
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
