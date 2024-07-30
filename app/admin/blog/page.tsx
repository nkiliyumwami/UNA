'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { fetchBlogs } from '@/lib/action/fetchBlogs'
import BlogForm from '@/components/forms/BlogForm'
import BlogCard from '@/components/ui/BlogCard'

const BlogDashboard = () => {
  const [blogs, setBlogs] = useState([])
  const [editingBlog, setEditingBlog] = useState<any>(null)

  useEffect(() => {
    fetchBlogsData()
  }, [])

  const fetchBlogsData = async () => {
    const blogs = await fetchBlogs()
    setBlogs(blogs)
  }

  const handleEdit = (blog: any) => {
    setEditingBlog(blog)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this Post?')) {
      try {
        await axios.delete('/api/news', { data: { id } })
        fetchBlogsData()
        toast.success('Post deleted successfully!')
      } catch (error) {
        console.error(error)
        toast.error('Failed to delete post.')
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold my-8">Manage News & Events</h1>
      <BlogForm
        initialData={editingBlog}
        onSubmit={() => {
          fetchBlogsData()
          setEditingBlog(null)
        }}
      />
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Existing News & Events Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {blogs?.map((blog:any) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogDashboard

