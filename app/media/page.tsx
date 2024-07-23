'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import bgImage from '../../public/unHome.png'
import Link from 'next/link'
import Loading from '@/components/ui/Loading'

interface ImageData {
  public_id: string
  format: string
  id: string
}

export default function Media() {
  const [images, setImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)

  useEffect(() => {
    async function fetchImages() {
      const response = await fetch('/api/media')
      const data = await response.json()
      setImages(data)
      setLoading(false)
    }
    fetchImages()
  }, [])

  const openPopup = (image: ImageData) => {
    setSelectedImage(image)
  }

  const closePopup = () => {
    setSelectedImage(null)
  }

  return (
    <div>
      <div
        className="py-32 h-[256px] bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url(${bgImage.src})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      </div>
      <div className="flex flex-col items-center justify-center max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="text-center mx-auto -mt-[5px] mb-[60px] max-w-[720px]">
          <h2 className="font-bold tracking-wide mb-4 text-3xl">Gallery</h2>
        </div>
        {loading ? (
          <Loading/>
        ) : (
          <div className="flex flex-wrap -m-2">
            {images.map(({ public_id, format, id }, index) => (
              <motion.div
                key={index}
                className="p-2 w-full sm:w-1/2 lg:w-1/3"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              >
                <Link
                  href={`/media/?photoId=${id}`}
                  className="relative transition-all duration-300 ease no-underline bg-transparent"
                >
                  <div
                    className="overlay"
                    onClick={() => openPopup({ public_id, format, id })}
                  ></div>
                  <Image
                    alt={`Image ${index + 1}`}
                    width={720}
                    height={300}
                    className="w-full h-[300px] mb-5 align-middle object-cover transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                    style={{ transform: 'translate3d(0, 0, 0)' }}
                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      {selectedImage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="max-w-3xl w-full p-4 bg-white rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closePopup}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Image
              alt={`Popup Image`}
              width={960}
              height={600}
              className="object-cover rounded-lg"
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_960/${selectedImage.public_id}.${selectedImage.format}`}
            />
          </div>
        </div>
      )}
    </div>
  )
}
