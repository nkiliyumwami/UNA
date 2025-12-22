'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Blog, { IBlog } from '../../lib/models/Blog'
import { truncateText } from '@/lib/utils/truncateText'

export interface Blog {
  _id: string
  title: string
  description: string
  date: Date
  location: string
  picture: string
}

async function fetchBlogs(): Promise<Blog[]> {
  const res = await fetch('/api/news')
  if (!res.ok) {
    console.error('Failed to fetch news', await res.text())
    throw new Error('Failed to fetch news')
  }
  const data = await res.json()
  console.log('datta', data)

  return data.blogs
}

const News = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsData = await fetchBlogs()
        setBlogs(blogsData)
      } catch (err: any) {
        setError(err.message)
      }
    }

    fetchData()
  }, [])
  const itemsPerPage = 9

  const [currentPage, setCurrentPage] = useState(1)

  const sortedBlogs = blogs
    ?.slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const totalPages = Math.ceil(sortedBlogs.length / itemsPerPage)

  const currentBlogs = sortedBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  if (error) {
    console.log(error)

    return <div>Error loading News. Please try again later.</div>
  }

  return (
    <div className="">
      <div
        className="py-32 h-[256px] bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url(/latestnews.png)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-16 text-center">
          What&apos;s new ?
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentBlogs.map((blog) => (
            <div
              key={blog._id}
              className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
            >
              <div className="overflow-hidden">
                <Image
                  width={500}
                  height={300}
                  src={blog.picture}
                  alt={blog.title}
                  className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>{new Date(blog.date).toLocaleDateString()}</span>
                  <span>{blog.location}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {blog.title}
                </h2>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {/* {blog.description} */}
                  {truncateText(blog.description, 150)}
                </p>

                <div className="mt-4">
                  <a
                    href={`/news/${blog._id}`}
                    className="text-sm text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        {blogs.length !== 0 &&
          <div className="flex justify-center mt-8 space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 text-sm border rounded disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 text-sm border rounded ${page === currentPage
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-200'
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-4 py-2 text-sm border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        }
      </div>
    </div>
  )
}

export default News
