import dbConnect from '../../../lib/utils/dbConnect'
import { NextResponse } from 'next/server'
import Blog from '../../../lib/models/Blog'

export const maxDuration = 60

export async function GET() {
  await dbConnect()

  try {
    const blogs = await Blog.find({})
    return NextResponse.json({ blogs })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  await dbConnect()

  try {
    const formData = await request.formData()
    const title = formData.get('title')
    const description = formData.get('description')
    const date = formData.get('date')
    const location = formData.get('location')
    const picture = formData.get('picture') as Blob

    const newBlog = new Blog({ title, picture, description, date, location })
    await newBlog.save()
    return NextResponse.json(newBlog, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  await dbConnect()

  try {
    const formData = await request.formData()
    const id = formData.get('id')
    const title = formData.get('title')
    const description = formData.get('description')
    const date = formData.get('date')
    const location = formData.get('location')
    const file = formData.get('file') as Blob | null

    const updateData: { [key: string]: any } = {
      title,
      description,
      date,
      location,
    }
    if (file) {
      const picture = file
      updateData.picture = picture
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
    })
    if (!updatedBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json(updatedBlog)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  await dbConnect()

  try {
    const { id } = await request.json()
    const deletedBlog = await Blog.findByIdAndDelete(id)

    if (!deletedBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Blog deleted successfully' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    )
  }
}
