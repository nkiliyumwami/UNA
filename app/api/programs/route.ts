import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/utils/dbConnect'
import Program from '@/lib/models/Program'
import { NextResponse } from 'next/server'

export async function GET() {
  await dbConnect()

  try {
    const programs = await Program.find({})
    return NextResponse.json({ programs })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch programs' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  await dbConnect()

  try {
    const { name, description } = await request.json()
    const newProgram = new Program({ name, description })
    await newProgram.save()
    return NextResponse.json(newProgram, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create program' },
      { status: 500 }
    )
  }
}
