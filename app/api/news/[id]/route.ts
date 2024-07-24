import dbConnect from '../../../../lib/utils/dbConnect'
import { NextResponse } from 'next/server'
import Blog from '../../../../lib/models/Blog'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect()

  const { id } = params

  try {
    const blog = await Blog.findById(id)
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }
    return NextResponse.json({ blog })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 })
  }
}
