// import { v2 as cloudinary } from 'cloudinary'

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// export default cloudinary

const upload = async (file: File) => {
  const UPLOAD_PRESET: string = 'bag-rewards'
  const CLOUDINARY_NAME: string = 'dfpm7ycvg'
  const CLOUDINARY_API_KEY: string = '726851556393179'
  const CLOUDINARY_SECRET: string = 'f_TdTOZbsc2THlxj4R4J2uLLdgw'
  const CLOUDINARY_IMAGES_FOLDER: string = 'bag-rewards'

  const formData = new FormData()
  formData.append('file', file)
  formData.append('tags', `codeinfuse, medium, gist`)
  formData.append('upload_preset', UPLOAD_PRESET) // Replace the preset name with your own
  formData.append('api_key', CLOUDINARY_API_KEY) // Replace API key with your own Cloudinary key
  formData.append('timestamp', new Date().toDateString())
  formData.append('folder', CLOUDINARY_IMAGES_FOLDER)
  let response
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to upload image')
    }

    const data = await response.json()
    const fileURL = data.secure_url // You should store this URL for future references in your app

    return { success: true, fileUrl: fileURL }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to upload image',
    }
  }
}

export const cloudinaryService = { upload }