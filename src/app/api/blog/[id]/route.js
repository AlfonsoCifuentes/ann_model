import connectDB from '../../../../lib/mongodb'
import BlogPost from '../../../../models/BlogPost'
import { NextResponse } from 'next/server'

// GET - Obtener post por ID
export async function GET(request, { params }) {
  try {
    await connectDB()
    
    const { id } = params
    const post = await BlogPost.findById(id).lean()
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post no encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: post })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener el post' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar post
export async function PUT(request, { params }) {
  try {
    await connectDB()
    
    const { id } = params
    const body = await request.json()
    const { title, excerpt, content, image, status, tags, featured } = body
    
    // Validaciones básicas
    if (!title || !excerpt || !content || !image) {
      return NextResponse.json(
        { success: false, error: 'Todos los campos son obligatorios' },
        { status: 400 }
      )
    }
    
    const updatedPost = await BlogPost.findByIdAndUpdate(
      id,
      {
        title,
        excerpt,
        content,
        image,
        status: status || 'draft',
        tags: tags || [],
        featured: featured || false
      },
      { new: true, runValidators: true }
    )
    
    if (!updatedPost) {
      return NextResponse.json(
        { success: false, error: 'Post no encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      data: updatedPost,
      message: 'Post actualizado exitosamente'
    })
    
  } catch (error) {
    console.error('Error updating post:', error)
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Ya existe un post con ese título' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Error al actualizar el post' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar post
export async function DELETE(request, { params }) {
  try {
    await connectDB()
    
    const { id } = params
    const deletedPost = await BlogPost.findByIdAndDelete(id)
    
    if (!deletedPost) {
      return NextResponse.json(
        { success: false, error: 'Post no encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Post eliminado exitosamente'
    })
    
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { success: false, error: 'Error al eliminar el post' },
      { status: 500 }
    )
  }
}
