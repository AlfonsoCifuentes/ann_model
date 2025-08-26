import connectDB from '../../../../../lib/mongodb'
import BlogPost from '../../../../../models/BlogPost'
import { NextResponse } from 'next/server'

// GET - Obtener post por slug
export async function GET(request, { params }) {
  try {
    await connectDB()
    
    const { slug } = params
    const post = await BlogPost.findOne({ slug: slug }).lean()
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post no encontrado' },
        { status: 404 }
      )
    }

    // Incrementar contador de vistas
    await BlogPost.findOneAndUpdate(
      { slug: slug },
      { $inc: { views: 1 } }
    )
    
    return NextResponse.json({ success: true, data: post })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener el post' },
      { status: 500 }
    )
  }
}
