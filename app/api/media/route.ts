import { NextRequest, NextResponse } from "next/server";
import cloudinary from "../../../lib/utils/cloudinary";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const folder = searchParams.get("folder") || process.env.CLOUDINARY_FOLDER;

  const results = await cloudinary.v2.search
    .expression(`folder:${folder}`)
    .sort_by("public_id", "desc")
    .max_results(400)
    .execute();

    console.log('Cloudinary results:', results);

  if (!results || !results.resources) {
    return NextResponse.json({ error: "No results found" }, { status: 404 });
  }

  const reducedResults = results.resources.map((result: any, index: number) => ({
    id: index,
    height: result.height,
    width: result.width,
    public_id: result.public_id,
    format: result.format,
    url: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${result.public_id}.${result.format}`, // ✅ full URL
  }));

  return NextResponse.json(reducedResults);
}
