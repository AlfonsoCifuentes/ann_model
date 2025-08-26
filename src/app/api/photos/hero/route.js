import { NextResponse } from 'next/server'
import connectDB from '../../../../lib/mongodb'
import Photo from '../../../../models/Photo'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await connectDB()
    
    // Obtener todas las fotos marcadas como hero
    const heroPhotos = await Photo.find({ 
      isHero: true,
      status: 'active' 
    }).sort({ order: 1, createdAt: -1 }).lean()

    return NextResponse.json({
      success: true,
      data: heroPhotos
    })

  } catch (error) {
    console.error('Error fetching hero photos:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener las fotos del hero' },
      { status: 500 }
    )
  }
}

export async function PUT(request) {
  try {
    await connectDB()
    
    const { photoIds } = await request.json()

    if (!Array.isArray(photoIds)) {
      return NextResponse.json(
        { success: false, error: 'Se requiere un array de IDs de fotos' },
        { status: 400 }
      )
    }

    // Primero quitar el estado hero de todas las fotos
    await Photo.updateMany(
      { isHero: true },
      { $unset: { isHero: 1 } }
    )

    // Luego marcar las fotos seleccionadas como hero
    if (photoIds.length > 0) {
      await Photo.updateMany(
        { _id: { $in: photoIds } },
        { $set: { isHero: true } }
      )
    }

    // Obtener las fotos actualizadas
    const updatedHeroPhotos = await Photo.find({ 
      isHero: true,
      status: 'active' 
    }).sort({ order: 1, createdAt: -1 }).lean()

    return NextResponse.json({
      success: true,
      message: 'Fotos del hero actualizadas exitosamente',
      data: updatedHeroPhotos
    })

  } catch (error) {
    console.error('Error updating hero photos:', error)
    return NextResponse.json(
      { success: false, error: 'Error al actualizar las fotos del hero' },
      { status: 500 }
    )
  }
}
