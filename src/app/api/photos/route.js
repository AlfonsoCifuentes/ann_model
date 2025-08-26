import connectDB from '../../../lib/mongodb'
import Photo from '../../../models/Photo'
import { NextResponse } from 'next/server'

// GET - Obtener todas las fotos
export async function GET(request) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const portfolioSection = searchParams.get('portfolioSection')
    const isHero = searchParams.get('isHero')
    const featuredInHome = searchParams.get('featuredInHome')
    const status = searchParams.get('status') || 'active'
    const limit = parseInt(searchParams.get('limit')) || 50
    
    let query = { status }
    
    if (category) {
      query.category = category
    }
    
    if (featured === 'true') {
      query.featured = true
    }
    
    if (isHero === 'true') {
      query.isHero = true
    }
    
    if (featuredInHome === 'true') {
      query.featuredInHome = true
    }
    
    if (portfolioSection) {
      query.portfolioSection = portfolioSection
    }
    
    const photos = await Photo.find(query)
      .sort({ order: 1, createdAt: -1 })
      .limit(limit)
      .lean()
    
    // Generar thumbnails de Cloudinary si no existen
    const photosWithThumbnails = photos.map(photo => {
      if (!photo.thumbnails && photo.imageUrl.includes('cloudinary.com')) {
        // Extraer public_id y generar URLs optimizadas
        const urlParts = photo.imageUrl.split('/');
        const uploadIndex = urlParts.findIndex(part => part === 'upload');
        if (uploadIndex !== -1) {
          const publicId = urlParts.slice(uploadIndex + 2).join('/').replace(/\.[^/.]+$/, "");
          const baseUrl = urlParts.slice(0, uploadIndex + 1).join('/');
          
          photo.thumbnails = {
            small: `${baseUrl}/c_fill,w_150,h_200,q_60,f_auto/${publicId}`,
            medium: `${baseUrl}/c_fill,w_400,h_500,q_70,f_auto/${publicId}`,
            large: `${baseUrl}/c_fill,w_800,h_1000,q_80,f_auto/${publicId}`
          };
        }
      }
      return photo;
    });
    
    return NextResponse.json({ success: true, data: photosWithThumbnails })
  } catch (error) {
    console.error('Error fetching photos:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener las fotos' },
      { status: 500 }
    )
  }
}

// POST - Crear nueva foto
export async function POST(request) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { 
      title, 
      description, 
      imageUrl, 
      category, 
      tags, 
      featured, 
      portfolioSection,
      location,
      photographer,
      altText,
      shootDate
    } = body
    
    // Validaciones básicas
    if (!title || !imageUrl || !category) {
      return NextResponse.json(
        { success: false, error: 'Título, imagen y categoría son obligatorios' },
        { status: 400 }
      )
    }
    
    const newPhoto = new Photo({
      title,
      description,
      imageUrl,
      category,
      tags: tags || [],
      featured: featured || false,
      portfolioSection: portfolioSection || 'portfolio',
      location,
      photographer,
      altText: altText || title,
      shootDate: shootDate ? new Date(shootDate) : undefined,
      metadata: {
        uploadedBy: 'Ana Nicoleta'
      }
    })
    
    const savedPhoto = await newPhoto.save()
    
    return NextResponse.json({ 
      success: true, 
      data: savedPhoto,
      message: 'Foto añadida exitosamente'
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error creating photo:', error)
    
    return NextResponse.json(
      { success: false, error: 'Error al añadir la foto' },
      { status: 500 }
    )
  }
}
