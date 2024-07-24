import dbConnect from '../../../lib/utils/dbConnect'
import { NextResponse } from 'next/server'
import EmailSubscriber from '@/lib/models/EmailSubscriber'

export const maxDuration = 60

export async function GET() {
  await dbConnect()

  try {
    const emails = await EmailSubscriber.find({})
    return NextResponse.json({ emails })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch email' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  await dbConnect()

  try {
    const { email } = await request.json()

    const newEmail = new EmailSubscriber({ email })
    await newEmail.save()
    return NextResponse.json(newEmail, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Email already exist' }, { status: 500 })
  }
}
