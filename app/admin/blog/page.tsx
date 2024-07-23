'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { cloudinaryService } from '@/lib/cloudinaryService'
// import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const Admin = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    const res = await axios.get('/api/news')
    setBlogs(res.data.blogs)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) return
    const response = await cloudinaryService.upload(file)
    console.log(response)
    let uploadedImage
    if (response.success === true) {
      uploadedImage = response.fileUrl
    }

    setUploading(true)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('location', location)
    formData.append('date', date)
    formData.append('file', uploadedImage)

    try {
      if (editingBlogId) {
        formData.append('id', editingBlogId)
        await axios.put('/api/news', formData)
      } else {
        await axios.post('/api/news', formData)
      }

      fetchBlogs()

      // Reset form
      setTitle('')
      setDescription('')
      setLocation('')
      setDate('')
      setFile(null)
      setUploading(false)
      setEditingBlogId(null)
      alert('Blog post saved successfully!')
    } catch (error) {
      console.error(error)
      setUploading(false)
      alert('Failed to save blog post.')
    }
  }

  const handleEdit = (blog: {
    _id: React.SetStateAction<string | null>
    title: React.SetStateAction<string>
    description: React.SetStateAction<string>
    location: React.SetStateAction<string>
    date: string
  }) => {
    setEditingBlogId(blog._id)
    setTitle(blog.title)
    setDescription(blog.description)
    setLocation(blog.location)
    setDate(blog.date.substring(0, 10)) // Format date for input
    setFile(null) // Clear file input
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        await axios.delete('/api/news', { data: { id } })
        fetchBlogs()
        alert('Blog post deleted successfully!')
      } catch (error) {
        console.error(error)
        alert('Failed to delete blog post.')
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-32">
      <h1 className="text-4xl font-bold my-8">Manage Blog Posts</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
            <ReactQuill value={description} onChange={setDescription} />
        </div>
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={uploading}
        >
          {uploading
            ? 'Uploading...'
            : editingBlogId
            ? 'Update Blog Post'
            : 'Add Blog Post'}
        </button>
      </form>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Existing Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {blogs?.map((blog: any) => (
            <div
              key={blog._id}
              className="border rounded-lg overflow-hidden shadow-lg p-4"
            >
              <img
                src={blog.picture}
                alt={blog.title}
                className="w-full h-64 object-cover"
              />
              <div>
                <p className="text-gray-600 text-sm">
                  {new Date(blog.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 text-sm">{blog.location}</p>
                <h2 className="text-2xl font-bold mt-2">{blog.title}</h2>
                <p className="text-gray-800 mt-2">{blog.description}</p>
              </div>
              <div className="flex mt-4 space-x-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Admin
