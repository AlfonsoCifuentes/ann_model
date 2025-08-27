import { NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  type: z.string().optional(),
})

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = contactSchema.parse(body)

    // Create email transporter using Gmail SMTP
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'anngsesiones@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD, // App password, not regular password
      },
    })

    // Email to Ana
    const mailOptions = {
      from: process.env.GMAIL_USER || 'anngsesiones@gmail.com',
      to: 'anngsesiones@gmail.com',
      subject: `Nuevo contacto desde el sitio web - ${validatedData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nuevo mensaje de contacto</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Nombre:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Tipo de consulta:</strong> ${validatedData.type || 'general'}</p>
            <p><strong>Asunto:</strong> ${validatedData.subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3>Mensaje:</h3>
            <div style="background-color: #fff; padding: 15px; border-left: 3px solid #007bff; margin: 10px 0;">
              ${validatedData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            Este mensaje fue enviado desde el formulario de contacto de ananicoleta.com el ${new Date().toLocaleString('es-ES')}
          </p>
        </div>
      `,
      text: `
        Nuevo mensaje de contacto
        
        Nombre: ${validatedData.name}
        Email: ${validatedData.email}
        Tipo: ${validatedData.type || 'general'}
        Asunto: ${validatedData.subject}
        
        Mensaje:
        ${validatedData.message}
        
        ---
        Enviado desde ananicoleta.com el ${new Date().toLocaleString('es-ES')}
      `,
      replyTo: validatedData.email,
    }

    // Send email
    await transporter.sendMail(mailOptions)
    
    console.log('Email sent successfully to anngsesiones@gmail.com from:', validatedData.email)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensaje enviado correctamente. Te responderé en las próximas 24 horas.' 
      },
      { status: 200 }
    )

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Error de validación',
          errors: error.errors 
        },
        { status: 400 }
      )
    }

    console.error('Contact submission error:', error)
    
    // If email fails, provide fallback info
    return NextResponse.json(
      { 
        success: false, 
        message: 'Hubo un problema enviando el mensaje. Por favor escríbeme directamente a anngsesiones@gmail.com o intenta de nuevo más tarde.' 
      },
      { status: 500 }
    )
  }
}
