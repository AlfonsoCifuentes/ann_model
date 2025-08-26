import { NextResponse } from 'next/server'
import connectDB from '../../../../lib/mongodb'
import Photo from '../../../../models/Photo'

// Forzar renderizado dinámico
export const dynamic = 'force-dynamic'

export async function PUT(request) {
  try {
    await connectDB()
    
    const { workCollection, featuredInHome } = await request.json()

    if (!workCollection) {
      return NextResponse.json(
        { success: false, error: 'workCollection es requerido' },
        { status: 400 }
      )
    }

    // Actualizar todas las fotos de la colección
    const result = await Photo.updateMany(
      { 
        workCollection: workCollection,
        status: 'active' 
      },
      { 
        featuredInHome: featuredInHome 
      }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'No se encontraron fotos para esta colección' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `${result.modifiedCount} fotos actualizadas`,
      data: {
        workCollection,
        featuredInHome,
        modifiedCount: result.modifiedCount
      }
    })

  } catch (error) {
    console.error('Error updating featured status:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const featuredOnly = searchParams.get('featuredOnly') === 'true'

    const formatCollectionName = (collectionId) => {
      // Casos especiales de nombres
      const specialNames = {
        'polaroids-vintage': 'Polas',
        'body-paint-japones': 'Body Paint Japonés',
        'body-paint-natural': 'Body Paint Natural',
        'body-paint-urbano': 'Body Paint Urbano',
        'maquillaje-artistico': 'Maquillaje Artístico',
        'elegancia-clasica': 'Elegancia Clásica',
        'sesion-profesional': 'Sesión Profesional'
      }
      
      if (specialNames[collectionId]) {
        return specialNames[collectionId]
      }
      
      return collectionId
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }

    let query = { 
      status: 'active',
      workCollection: { $exists: true, $ne: null }
    }

    if (featuredOnly) {
      query.featuredInHome = true
    }

    const photos = await Photo.find(query)
      .sort({ order: 1, createdAt: -1 })

    // Agrupar por workCollection
    const collections = new Map()
    
    photos.forEach(photo => {
      if (!collections.has(photo.workCollection)) {
        collections.set(photo.workCollection, {
          id: photo.workCollection,
          title: formatCollectionName(photo.workCollection),
          photos: [],
          featured: photo.featuredInHome || false
        })
      }
      collections.get(photo.workCollection).photos.push(photo)
      // Si cualquier foto está marcada como featured, la colección también
      if (photo.featuredInHome) {
        collections.get(photo.workCollection).featured = true
      }
    })

    return NextResponse.json({
      success: true,
      data: Array.from(collections.values())
    })

  } catch (error) {
    console.error('Error fetching featured collections:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
