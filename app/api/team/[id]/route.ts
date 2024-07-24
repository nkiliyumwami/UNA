import TeamMember from '@/lib/models/teamMember'
import dbConnect from '../../../../lib/utils/dbConnect'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect()

  const { id } = params

  try {
    const teamMember = await TeamMember.findById(id)
    if (!teamMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({ teamMember })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to fetch teamMember' },
      { status: 500 }
    )
  }
}
