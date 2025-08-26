import connectDB from '../../../lib/mongodb'
import BlogPost from '../../../models/BlogPost'
import { NextResponse } from 'next/server'

// GET - Obtener todos los posts
export async function GET(request) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const featured = searchParams.get('featured')
    
    let query = {}
    
    if (status) {
      query.status = status
    }
    
    if (featured === 'true') {
      query.featured = true
    }
    
    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .lean()
    
    return NextResponse.json({ success: true, data: posts })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener los posts' },
      { status: 500 }
    )
  }
}

// POST - Crear nuevo post
export async function POST(request) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { title, excerpt, content, image, status, tags, featured } = body
    
    // Validaciones básicas
    if (!title || !excerpt || !content || !image) {
      return NextResponse.json(
        { success: false, error: 'Todos los campos son obligatorios' },
        { status: 400 }
      )
    }
    
    const newPost = new BlogPost({
      title,
      excerpt,
      content,
      image,
      status: status || 'draft',
      tags: tags || [],
      featured: featured || false
    })
    
    const savedPost = await newPost.save()
    
    return NextResponse.json({ 
      success: true, 
      data: savedPost,
      message: 'Post creado exitosamente'
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error creating post:', error)
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Ya existe un post con ese título' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Error al crear el post' },
      { status: 500 }
    )
  }
}
