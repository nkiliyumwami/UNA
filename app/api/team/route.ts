import dbConnect from '@/lib/utils/dbConnect'
import TeamMember from '@/lib/models/teamMember'
import { NextResponse } from 'next/server'

export const maxDuration = 60

export async function POST(request: Request) {
  await dbConnect()

  try {
    const formData = await request.formData()
    const name = formData.get('name')
    const role = formData.get('role')
    const description = formData.get('description')
    const email = formData.get('email')
    const linkedin = formData.get('linkedin')
    const category = formData.get('category')
    const file = formData.get('file') as Blob

    const image = file

    const newTeamMember = new TeamMember({
      name,
      role,
      description,
      image,
      email,
      linkedin,
      category,
    })
    await newTeamMember.save()
    return NextResponse.json(newTeamMember, { status: 201 })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { error: error },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await dbConnect()

    const leadershipTeam = await TeamMember.find({ category: 'leadership' })
    const boardMembers = await TeamMember.find({ category: 'board' })

    return NextResponse.json(
      { teams: { leadership: leadershipTeam, board: boardMembers } },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error fetching team members', error: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  await dbConnect()

  try {
    const formData = await request.formData()
    const id = formData.get('id')
    const name = formData.get('name')
    const role = formData.get('role')
    const description = formData.get('description')
    const email = formData.get('email')
    const linkedin = formData.get('linkedin')
    const category = formData.get('category')
    const file = formData.get('file') as Blob

    const updateData: { [key: string]: any } = {
      name,
      role,
      description,
      email,
      linkedin,
      category,
    }
    if (file) {
      const image = file
      updateData.image = image
    }

    const updatedTeamMember = await TeamMember.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    )
    if (!updatedTeamMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedTeamMember)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  await dbConnect()

  try {
    const { id } = await request.json()
    const deletedTeamMember = await TeamMember.findByIdAndDelete(id)

    if (!deletedTeamMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Team member deleted successfully' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    )
  }
}
