'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Blog } from '../page'

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share'
import { LinkIcon, ShareIcon } from '@heroicons/react/16/solid'
import Loading from '@/components/ui/Loading'

const fetchBlogById = async (id: string): Promise<Blog> => {
  const res = await fetch(`/api/news/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch blog')
  }
  const data = await res.json()
  return data.blog
}

const fetchBlogs = async (): Promise<Blog[]> => {
  const res = await fetch('/api/news')
  if (!res.ok) {
    throw new Error('Failed to fetch blogs')
  }
  const data = await res.json()
  return data.blogs
}

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchBlogById(params.id as string)
        .then((data) => setBlog(data))
        .catch((err) => setError(err.message))
    }
  }, [params.id])

  useEffect(() => {
    fetchBlogs()
      .then((data) => setBlogs(data))
      .catch((err) => setError(err.message))
  }, [])

  const handleNavigation = (direction: 'prev' | 'next') => {
    const currentIndex = blogs.findIndex((b) => b._id === params.id)
    if (direction === 'prev' && currentIndex > 0) {
      router.push(`/news/${blogs[currentIndex - 1]._id}`)
    }
    if (direction === 'next' && currentIndex < blogs.length - 1) {
      router.push(`/news/${blogs[currentIndex + 1]._id}`)
    }
  }
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

   const copyLink = () => {
     navigator.clipboard.writeText(window.location.href)
     alert('Link copied to clipboard')
   }

  return (
    <div>
      <div
        className="py-32 h-[256px] bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url(/news.jpeg)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      </div>
      {error ? 'Error loading news. Please try again later' : !blog ? <Loading /> :
      <div className=" sm:px-6 lg:px-8  xl:max-w-[1320px] lg:max-w-[1000px] md:max-w-[708px] sm:max-w-full max-w-full mx-auto px-4 ">
        <div className="mt-12 mb-5">
          <h1 className="text-center text-3xl font-bold mb-5">{blog.title}</h1>
          <div className="border-t border-b border-t-[#dbdbdb] py-4 flex justify-between items-center">
            <div>
              <p>
                Location: <span>{blog.location}</span>
              </p>
            </div>
            <div className="relative flex gap-4 items-center">
              <p>
                Last Updated:{' '}
                <span>{new Date(blog.date).toLocaleDateString()}</span>
              </p>
              <span
                className="flex gap-1 items-center cursor-pointer"
                onClick={toggleDropdown}
              >
                <ShareIcon width={24} height={24} />
                Share
              </span>
              {isDropdownOpen && (
                <div className="absolute right-0 top-6 text-sm mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                  <LinkedinShareButton url={window.location.href}>
                    <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <LinkedinIcon size={24} round />
                      <span className="ml-2">LinkedIn</span>
                    </div>
                  </LinkedinShareButton>
                  <TwitterShareButton url={window.location.href}>
                    <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <TwitterIcon size={24} round />
                      <span className="ml-2">Twitter</span>
                    </div>
                  </TwitterShareButton>
                  <FacebookShareButton url={window.location.href}>
                    <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <FacebookIcon size={24} round />
                      <span className="ml-2">Facebook</span>
                    </div>
                  </FacebookShareButton>
                  <WhatsappShareButton url={window.location.href}>
                    <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <WhatsappIcon size={24} round />
                      <span className="ml-2">Whatsapp</span>
                    </div>
                  </WhatsappShareButton>
                  <EmailShareButton url={window.location.href}>
                    <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <EmailIcon size={24} round />
                      <span className="ml-2">Email</span>
                    </div>
                  </EmailShareButton>
                  <div
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={copyLink}
                  >
                    <LinkIcon className="w-6 h-6" />
                    <span className="ml-2">Copy Link</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <img
            src={blog.picture}
            alt={blog.title}
            className="w-full h-auto max-h-[66.666667%] object-cover align-middle "
          />
        </div>

        <div className=" mb-5">
          {/* <p className="text-gray-800 mt-2">{blog.description}</p> */}
          <div dangerouslySetInnerHTML={{ __html: blog.description }} />
          {/* <div className="mt-4 flex justify-around">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => handleNavigation('prev')}
            >
              Previous
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleNavigation('next')}
            >
              Next
            </button>
          </div> */}
        </div>
      </div>
      }
      
    </div>
  )
}

export default Page
