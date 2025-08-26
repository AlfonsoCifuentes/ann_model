import { NextResponse } from 'next/server'
import connectDB from '../../../../lib/mongodb'
import Photo from '../../../../models/Photo'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await connectDB()
    
    // Obtener todas las colecciones únicas agrupadas
    const collections = await Photo.aggregate([
      {
        $match: {
          workCollection: { $exists: true, $ne: "" },
          status: 'active'
        }
      },
      {
        $group: {
          _id: "$workCollection",
          count: { $sum: 1 },
          firstPhoto: { $first: "$$ROOT" },
          featured: { $first: "$featuredInHome" },
          photos: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: 1,
          featured: 1,
          coverPhoto: {
            _id: "$firstPhoto._id",
            imageUrl: "$firstPhoto.imageUrl",
            title: "$firstPhoto.title"
          },
          photos: 1
        }
      },
      {
        $sort: { name: 1 }
      }
    ])

    return NextResponse.json({
      success: true,
      data: collections
    })

  } catch (error) {
    console.error('Error fetching collections:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener las colecciones' },
      { status: 500 }
    )
  }
}
