'use client'
import { truncateText } from '@/lib/truncateText'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
interface Blog {
  _id: string
  title: string
  description: string
  date: Date
  location: string
  picture: string
}

// async function fetchNewsEvents(): Promise<Blog[]> {
//   const res = await fetch('/api/news')
//   if (!res.ok) {
//     console.error('Failed to fetch news', await res.text())
//     throw new Error('Failed to fetch news')
//   }
//   const data = await res.json()

//   return data.blogs
// }

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = 5000
): Promise<Response> {
  const controller = new AbortController()
  const { signal } = controller
  const fetchOptions = { ...options, signal }

  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, fetchOptions)
    clearTimeout(timeoutId)
    return response
  } catch (error:any) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out')
    }
    throw error
  }
}

async function fetchNewsEvents(retries = 3): Promise<Blog[]> {
  try {
    const res = await fetchWithTimeout('/api/news', {}, 5000) // 5 seconds timeout
    if (!res.ok) {
      const errorText = await res.text()
      console.error('Failed to fetch news', errorText)
      throw new Error('Failed to fetch news')
    }
    const data = await res.json()
    return data.blogs
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying fetchNewsEvents (${3 - retries + 1}/3)`)
      return fetchNewsEvents(retries - 1)
    } else {
      console.error('Failed to fetch news after 3 retries', error)
      throw error
    }
  }
}


const NewsEvents = () => {
  const [newsEvents, setNewsEvents] = useState<Blog[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsData = await fetchNewsEvents()
        setNewsEvents(blogsData)
        setLoading(false)
      } catch (err: any) {
        setError(err.message)
      }
    }

    fetchData()
  }, [])

  const CustomNextArrow = (props: any) => {
    const { className, style, onClick } = props
    return (
      <div>
        <div className={`next-slick-arrow ${className}`} onClick={onClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="black"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" />
          </svg>
        </div>
      </div>
    )
  }

  const CustomPrevArrow = (props: any) => {
    const { className, style, onClick } = props
    return (
      <div>
        <div
          className={`next-slick-arrow rotate-180 ${className}`}
          onClick={onClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="black"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" />
          </svg>
        </div>
      </div>
    )
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className={`py-10 ${loading ? 'hidden' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-orange-600">NEWS UPDATE</p>
          <h2 className="text-4xl font-bold">Latest News & Events</h2>
        </div>

        <Slider {...settings}>
          {newsEvents.map((event) => (
            <div key={event._id} className="p-4">
              <div className="bg-white border rounded-lg shadow-md overflow-hidden">
                <img
                  src={event.picture}
                  alt={event.title}
                  className="w-full h-48 object-cover hover:scale-105 transition duration-300 ease-in-out"
                />
                <div className="p-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <span className="mr-2">{event.location}</span>
                    <span className="mr-2">•</span>
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold">{event.title}</h3>
                  <p className="mt-2 text-gray-600">
                    {truncateText(event.description, 15)}
                  </p>
                  <a
                    // href={`/news/${event._id}`}
                    href={`#`}
                    className="mt-4 inline-block text-orange-600 font-semibold"
                  >
                    READ MORE &gt;&gt;
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default NewsEvents
