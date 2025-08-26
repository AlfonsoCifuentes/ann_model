import connectDB from '../../../../lib/mongodb'
import Photo from '../../../../models/Photo'
import { NextResponse } from 'next/server'

// GET - Obtener foto por ID
export async function GET(request, { params }) {
  try {
    await connectDB()
    
    const { id } = params
    const photo = await Photo.findById(id).lean()
    
    if (!photo) {
      return NextResponse.json(
        { success: false, error: 'Foto no encontrada' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: photo })
  } catch (error) {
    console.error('Error fetching photo:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener la foto' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar foto
export async function PUT(request, { params }) {
  try {
    await connectDB()
    
    const { id } = params
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
      shootDate,
      status,
      order
    } = body
    
    // Validaciones básicas
    if (!title || !imageUrl || !category) {
      return NextResponse.json(
        { success: false, error: 'Título, imagen y categoría son obligatorios' },
        { status: 400 }
      )
    }
    
    const updateData = {
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
      status: status || 'active',
      order: order || 0
    }
    
    if (shootDate) {
      updateData.shootDate = new Date(shootDate)
    }
    
    const updatedPhoto = await Photo.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
    
    if (!updatedPhoto) {
      return NextResponse.json(
        { success: false, error: 'Foto no encontrada' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      data: updatedPhoto,
      message: 'Foto actualizada exitosamente'
    })
    
  } catch (error) {
    console.error('Error updating photo:', error)
    return NextResponse.json(
      { success: false, error: 'Error al actualizar la foto' },
      { status: 500 }
    )
  }
}

// PATCH - Actualización parcial de foto
export async function PATCH(request, { params }) {
  try {
    await connectDB()
    
    const { id } = params
    const updateData = await request.json()
    
    // Campos permitidos para actualizar
    const allowedFields = [
      'title', 'description', 'portfolioSection', 'workCollection',
      'status', 'isHero', 'featuredInHome', 'photographer', 'location',
      'shootDate', 'tags', 'altText'
    ]
    
    // Filtrar solo campos permitidos
    const filteredData = {}
    Object.keys(updateData).forEach(key => {
      if (allowedFields.includes(key)) {
        filteredData[key] = updateData[key]
      }
    })
    
    // Validaciones
    if (filteredData.portfolioSection && 
        !['Editorial', 'Fashion', 'Retrato', 'Comercial', 'Estudio', 'Lifestyle'].includes(filteredData.portfolioSection)) {
      return NextResponse.json(
        { success: false, error: 'Sección de portfolio inválida' },
        { status: 400 }
      )
    }
    
    if (filteredData.status && !['active', 'archived'].includes(filteredData.status)) {
      return NextResponse.json(
        { success: false, error: 'Estado inválido' },
        { status: 400 }
      )
    }
    
    // Actualizar fecha de modificación
    filteredData.updatedAt = new Date()
    
    const updatedPhoto = await Photo.findByIdAndUpdate(
      id,
      filteredData,
      { new: true, runValidators: true }
    )
    
    if (!updatedPhoto) {
      return NextResponse.json(
        { success: false, error: 'Foto no encontrada' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      success: true,
      data: updatedPhoto,
      message: 'Foto actualizada exitosamente'
    })
    
  } catch (error) {
    console.error('Error updating photo:', error)
    return NextResponse.json(
      { success: false, error: 'Error al actualizar foto' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar foto
export async function DELETE(request, { params }) {
  try {
    await connectDB()
    
    const { id } = params
    const deletedPhoto = await Photo.findByIdAndDelete(id)
    
    if (!deletedPhoto) {
      return NextResponse.json(
        { success: false, error: 'Foto no encontrada' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Foto eliminada exitosamente'
    })
    
  } catch (error) {
    console.error('Error deleting photo:', error)
    return NextResponse.json(
      { success: false, error: 'Error al eliminar la foto' },
      { status: 500 }
    )
  }
}
