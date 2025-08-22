'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

const projectTypes = [
  'Editorial Shoot',
  'Commercial Campaign',
  'Runway Show',
  'Acting/Film Project',
  'Brand Collaboration',
  'Personal Project',
  'Other'
]

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(bookingSchema)
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitResult({ type: 'success', message: result.message })
        reset()
      } else {
        setSubmitResult({ type: 'error', message: result.message })
      }
    } catch (error) {
      setSubmitResult({ 
        type: 'error', 
        message: 'Something went wrong. Please try again or contact me directly.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      className="bg-brand-bg/30 p-8 rounded-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {submitResult && (
        <motion.div
          className={`p-4 rounded-lg mb-6 flex items-center space-x-2 ${
            submitResult.type === 'success' 
              ? 'bg-green-900/20 border border-green-500/20' 
              : 'bg-red-900/20 border border-red-500/20'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {submitResult.type === 'success' ? (
            <CheckCircle className="text-green-400" size={20} />
          ) : (
            <AlertCircle className="text-red-400" size={20} />
          )}
          <span className={
            submitResult.type === 'success' ? 'text-green-300' : 'text-red-300'
          }>
            {submitResult.message}
          </span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name *
            </label>
            <input
              {...register('name')}
              type="text"
              id="name"
              className="w-full px-4 py-3 bg-brand-bg border border-brand-muted/20 rounded-lg focus:border-brand-accent focus:ring-1 focus:ring-brand-accent focus:outline-none transition-colors"
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address *
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className="w-full px-4 py-3 bg-brand-bg border border-brand-muted/20 rounded-lg focus:border-brand-accent focus:ring-1 focus:ring-brand-accent focus:outline-none transition-colors"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2">
              Company/Agency
            </label>
            <input
              {...register('company')}
              type="text"
              id="company"
              className="w-full px-4 py-3 bg-brand-bg border border-brand-muted/20 rounded-lg focus:border-brand-accent focus:ring-1 focus:ring-brand-accent focus:outline-none transition-colors"
              placeholder="Company or agency name"
            />
          </div>

          <div>
            <label htmlFor="projectType" className="block text-sm font-medium mb-2">
              Project Type *
            </label>
            <select
              {...register('projectType')}
              id="projectType"
              className="w-full px-4 py-3 bg-brand-bg border border-brand-muted/20 rounded-lg focus:border-brand-accent focus:ring-1 focus:ring-brand-accent focus:outline-none transition-colors"
            >
              <option value="">Select project type</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.projectType && (
              <p className="text-red-400 text-sm mt-1">{errors.projectType.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="budget" className="block text-sm font-medium mb-2">
              Budget Range
            </label>
            <select
              {...register('budget')}
              id="budget"
              className="w-full px-4 py-3 bg-brand-bg border border-brand-muted/20 rounded-lg focus:border-brand-accent focus:ring-1 focus:ring-brand-accent focus:outline-none transition-colors"
            >
              <option value="">Select budget</option>
              <option value="under-1k">Under €1,000</option>
              <option value="1k-5k">€1,000 - €5,000</option>
              <option value="5k-10k">€5,000 - €10,000</option>
              <option value="10k-plus">€10,000+</option>
              <option value="discuss">Let's discuss</option>
            </select>
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium mb-2">
              Start Date
            </label>
            <input
              {...register('startDate')}
              type="date"
              id="startDate"
              className="w-full px-4 py-3 bg-brand-bg border border-brand-muted/20 rounded-lg focus:border-brand-accent focus:ring-1 focus:ring-brand-accent focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium mb-2">
              End Date
            </label>
            <input
              {...register('endDate')}
              type="date"
              id="endDate"
              className="w-full px-4 py-3 bg-brand-bg border border-brand-muted/20 rounded-lg focus:border-brand-accent focus:ring-1 focus:ring-brand-accent focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Project Details *
          </label>
          <textarea
            {...register('message')}
            id="message"
            rows={6}
            className="w-full px-4 py-3 bg-brand-bg border border-brand-muted/20 rounded-lg focus:border-brand-accent focus:ring-1 focus:ring-brand-accent focus:outline-none transition-colors resize-vertical"
            placeholder="Tell me about your project, vision, and any specific requirements..."
          />
          {errors.message && (
            <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-bg" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Send Booking Request</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  )
}
