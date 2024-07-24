'use client'
import { truncateText } from '@/lib/utils/truncateText'
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

// const blogs= [
//     {
//         "_id": "66681d1f926121017abc2e74",
//         "title": "First Event",
//         "picture": "https://res.cloudinary.com/dfpm7ycvg/image/upload/v1718830812/bag-rewards/mv_ootkmv.jpg",
//         "description": "Our very First event, When you don't know the exact segment names ahead of time and want to create routes from dynamic data, you can use Dynamic Segments that are filled in at request time or prerendered at build time.",
//         "date": "2024-06-11T00:00:00.000Z",
//         "location": "Kigali, Rwanda",
//         "__v": 0
//     },
//     {
//         "_id": "66681d48926121017abc2e76",
//         "title": "EDITED Second Event",
//         "picture": "https://res.cloudinary.com/dfpm7ycvg/image/upload/v1718830900/bag-rewards/Picture1-2_ps4gt5.webp",
//         "description": "Our very First event When you don't know the exact segment names ahead of time and want to create routes from dynamic data, you can use Dynamic Segments that are filled in at request time or prerendered at build time.",
//         "date": "2024-06-19T00:00:00.000Z",
//         "location": "Kigali, Rwanda",
//         "__v": 0
//     },
//     {
//         "_id": "6672d080e5d803e1d9d7575f",
//         "title": "Title",
//         "picture": "https://res.cloudinary.com/dfpm7ycvg/image/upload/v1718831157/bag-rewards/download_dtzoj8.png",
//         "description": "Testing When you don't know the exact segment names ahead of time and want to create routes from dynamic data, you can use Dynamic Segments that are filled in at request time or prerendered at build time.",
//         "date": "2024-05-30T00:00:00.000Z",
//         "location": "kigali",
//         "__v": 0
//     },
//     {
//         "_id": "6672d7a1e5d803e1d9d7577e",
//         "title": "UNA-Rwanda to Pilot Freedom From Violence Project",
//         "picture": "https://res.cloudinary.com/dfpm7ycvg/image/upload/v1718802336/bag-rewards/NEWS1_anq3m3.jpg",
//         "description": "Countries engulfed in conflicts, insecurity and the lack of peace, have been found lacking in achieving the Millennium development Goals (MDGs).\r\nA new project ‘Freedom from violence’ was launched June 24, seeking to promote the inclusion of Peace, security and Conflict Prevention in the post 2015 development agenda.\r\nIn essence, peace, security and conflict prevention must be part of any nation’s development agenda.\r\nRwanda which has experienced lack of peace and insecurity that climaxed into (...)\r\n\r\nCountries engulfed in conflicts, insecurity and the lack of peace, have been found lacking in achieving the Millennium development Goals (MDGs).\r\n\r\nA new project ‘Freedom from violence’ was launched June 24, seeking to promote the inclusion of Peace, security and Conflict Prevention in the post 2015 development agenda.\r\n\r\nIn essence, peace, security and conflict prevention must be part of any nation’s development agenda.\r\n\r\nRwanda which has experienced lack of peace and insecurity that climaxed into genocide against Tutsi in 1994, has managed to successfully transition into a model nation currently seen as a shinning star.\r\n\r\nIt’s against this background that Rwanda has been chosen to pilot the Freedom from violence project that will be implemented by United Nations Association-Rwanda (UNA-Rwanda) with support of the Swedish government through the world federation of United Nations Associations (WFUNA).\r\n\r\nAccording to Jackline Kamanzi the Chairperson of UNA-Rwanda, the work will be mainly carried out in Rwanda, although the project’s outcome will be global reaching and some training and seminars may take place outside Rwanda.\r\n\r\nKamanzi explains that UNA-Rwanda will work with WFUNA and other UNAs on raising awareness, capacity building and engaging in dialogue and consultations to integrate peace, security and conflict prevention within the Post-2015 Development Agendas.\r\n\r\nShe adds that a series of trainings will be conducted throughout the country aimed at creating awareness, capacity building, gathering of thoughts and opinions among NGOs, Youth, Media and the academic Community on the inclusion of peace, security and conflict prevention in the Post – 2015 development agenda.\r\n\r\nSpeaking during a training workshop at Classic Hotel in Kicukiro, Kamanzi noted that participants will have acquired a great level of awareness on the project and advocate for incorporation of peace, security and conflict prevention in the post 2015 development agenda.\r\n\r\nThe training was attended by representatives from Rwanda Governance Board, Ministry of local government and Ministry of finance and economic planning, NGOs, Youth, Media and the academic Community.",
//         "date": "2024-06-20T00:00:00.000Z",
//         "location": "Kigali",
//         "__v": 0
//     }
// ]

async function fetchNewsEvents(): Promise<Blog[]> {
  const res = await fetch('/api/news')
  if (!res.ok) {
    console.error('Failed to fetch news', await res.text())
    throw new Error('Failed to fetch news')
  }
  const data = await res.json()

  return data.blogs
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
    )
  }

  const CustomPrevArrow = (props: any) => {
    const { className, style, onClick } = props
    return (
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
    )
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: newsEvents.length > 3 ? 3 : newsEvents.length,
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
    <div className={`py-10`}>
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
                    {truncateText(event.description, 150)}
                  </p>
                  <a
                    href={`/news/${event._id}`}
                    // href={`#`}
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
