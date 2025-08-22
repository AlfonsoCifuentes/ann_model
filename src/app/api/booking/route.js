import { NextResponse } from 'next/server'
import { z } from 'zod'

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

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = bookingSchema.parse(body)

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send to CRM system
    
    // For now, we'll simulate processing
    console.log('Booking request received:', validatedData)
    
    // If using Formspree as fallback
    if (process.env.FORMSPREE_ID) {
      try {
        const formspreeResponse = await fetch(`https://formspree.io/f/${process.env.FORMSPREE_ID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(validatedData),
        })
        
        if (!formspreeResponse.ok) {
          throw new Error('Formspree submission failed')
        }
      } catch (error) {
        console.error('Formspree error:', error)
        // Continue anyway - don't fail the entire request
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Booking request submitted successfully! I\'ll get back to you within 24 hours.' 
      },
      { status: 200 }
    )

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed',
          errors: error.errors 
        },
        { status: 400 }
      )
    }

    console.error('Booking submission error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Something went wrong. Please try again or contact me directly.' 
      },
      { status: 500 }
    )
  }
}
