import { NextRequest, NextResponse } from 'next/server'
import cloudinary from '../../../lib/utils/cloudinary'

export async function GET(req: NextRequest) {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by('public_id', 'desc')
    .max_results(400)
    .execute()

  const reducedResults = results.resources.map((result: any, index: any) => ({
    id: index,
    height: result.height,
    width: result.width,
    public_id: result.public_id,
    format: result.format,
  }))

  return NextResponse.json(reducedResults)
}
