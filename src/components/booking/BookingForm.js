'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Mail, Phone, MessageSquare, MapPin, Camera, Send, Check } from 'lucide-react'
import { FadeInUp, StaggerContainer, StaggerItem } from '../animations/MicroAnimations'
import { useLanguage } from '../../contexts/LanguageContext'

export default function BookingForm() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    shootDate: '',
    location: '',
    duration: '',
    budget: '',
    description: '',
    references: '',
    urgency: 'normal'
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const projectTypes = [
    'Editorial Photography',
    'Fashion Campaign',
    'Commercial Shoot',
    'Portrait Session',
    'Runway Show',
    'Acting Project',
    'Brand Collaboration',
    'Other'
  ]

  const budgetRanges = [
    'Under €500',
    '€500 - €1,000',
    '€1,000 - €2,500',
    '€2,500 - €5,000',
    '€5,000 - €10,000',
    '€10,000+',
    'To be discussed'
  ]

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.projectType) newErrors.projectType = 'Project type is required'
    if (!formData.description.trim()) newErrors.description = 'Project description is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically send the data to your backend
      console.log('Booking submission:', formData)
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check size={32} className="text-white" />
          </motion.div>
          
          <h2 className="font-playfair text-3xl font-light mb-4">
            Booking Request Sent!
          </h2>
          <p className="font-inter text-gray-600 mb-8">
            Thank you for your interest. I'll review your request and get back to you within 24 hours.
          </p>
          <motion.button
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                name: '', email: '', phone: '', company: '', projectType: '',
                shootDate: '', location: '', duration: '', budget: '',
                description: '', references: '', urgency: 'normal'
              })
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-black text-white font-inter font-medium tracking-wide hover:bg-gray-800 transition-colors"
          >
            Send Another Request
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-8">
        
        {/* Header */}
        <FadeInUp>
          <div className="text-center mb-16">
            <h1 className="font-playfair text-4xl md:text-5xl font-light tracking-wider mb-6">
              Book a Session
            </h1>
            <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
              Let's create something beautiful together. Fill out the form below with your project details.
            </p>
          </div>
        </FadeInUp>

        {/* Booking Form */}
        <FadeInUp delay={0.2}>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            
            <StaggerContainer className="space-y-8">
              
              {/* Personal Information */}
              <StaggerItem>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-inter font-medium text-gray-700 mb-2">
                      <User size={16} className="inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg font-inter focus:ring-2 focus:ring-black focus:border-transparent transition-colors ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block font-inter font-medium text-gray-700 mb-2">
                      <Mail size={16} className="inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg font-inter focus:ring-2 focus:ring-black focus:border-transparent transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-inter font-medium text-gray-700 mb-2">
                      <Phone size={16} className="inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                      placeholder="+34 123 456 789"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-inter font-medium text-gray-700 mb-2">
                      Company/Brand
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                      placeholder="Your company or brand"
                    />
                  </div>
                </div>
              </StaggerItem>

              {/* Project Details */}
              <StaggerItem>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-inter font-medium text-gray-700 mb-2">
                      <Camera size={16} className="inline mr-2" />
                      Project Type *
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg font-inter focus:ring-2 focus:ring-black focus:border-transparent transition-colors ${
                        errors.projectType ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.projectType && <p className="text-red-500 text-sm mt-1">{errors.projectType}</p>}
                  </div>
                  
                  <div>
                    <label className="block font-inter font-medium text-gray-700 mb-2">
                      <Calendar size={16} className="inline mr-2" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="shootDate"
                      value={formData.shootDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-inter font-medium text-gray-700 mb-2">
                      <MapPin size={16} className="inline mr-2" />
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                      placeholder="City, Country"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-inter font-medium text-gray-700 mb-2">
                      <Clock size={16} className="inline mr-2" />
                      Duration
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                    >
                      <option value="">Select duration</option>
                      <option value="2-4 hours">2-4 hours</option>
                      <option value="Half day">Half day</option>
                      <option value="Full day">Full day</option>
                      <option value="Multiple days">Multiple days</option>
                    </select>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div>
                  <label className="block font-inter font-medium text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </StaggerItem>

              {/* Project Description */}
              <StaggerItem>
                <div>
                  <label className="block font-inter font-medium text-gray-700 mb-2">
                    <MessageSquare size={16} className="inline mr-2" />
                    Project Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg font-inter focus:ring-2 focus:ring-black focus:border-transparent transition-colors resize-none ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tell me about your project, vision, and any specific requirements..."
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
              </StaggerItem>

              <StaggerItem>
                <div>
                  <label className="block font-inter font-medium text-gray-700 mb-2">
                    References/Inspiration
                  </label>
                  <textarea
                    name="references"
                    value={formData.references}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter focus:ring-2 focus:ring-black focus:border-transparent transition-colors resize-none"
                    placeholder="Links to inspiration, mood boards, or reference images..."
                  />
                </div>
              </StaggerItem>

              {/* Urgency */}
              <StaggerItem>
                <div>
                  <label className="block font-inter font-medium text-gray-700 mb-2">
                    Project Urgency
                  </label>
                  <div className="flex gap-4">
                    {['low', 'normal', 'high', 'urgent'].map(level => (
                      <label key={level} className="flex items-center">
                        <input
                          type="radio"
                          name="urgency"
                          value={level}
                          checked={formData.urgency === level}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="font-inter text-sm capitalize">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </StaggerItem>

              {/* Submit Button */}
              <StaggerItem>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full py-4 font-inter font-medium tracking-wide transition-colors flex items-center justify-center gap-2 ${
                    isSubmitting 
                      ? 'bg-gray-400 text-white cursor-not-allowed' 
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending Request...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Booking Request
                    </>
                  )}
                </motion.button>
              </StaggerItem>
            </StaggerContainer>
          </form>
        </FadeInUp>

        {/* Additional Info */}
        <FadeInUp delay={0.4}>
          <div className="mt-12 text-center">
            <p className="font-inter text-gray-600 mb-4">
              Response time: Within 24 hours • All inquiries are confidential
            </p>
            <p className="font-inter text-sm text-gray-500">
              For urgent requests, please call directly: +34 123 456 789
            </p>
          </div>
        </FadeInUp>
      </div>
    </div>
  )
}
