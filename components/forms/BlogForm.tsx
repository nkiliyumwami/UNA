import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { cloudinaryService } from '@/lib/utils/cloudinaryService'
import { toast } from 'react-toastify'
import axios from 'axios'
import { formatDate } from '@/lib/utils/formatDate'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface BlogFormProps {
  initialData?: {
    title: string
    description: string
    location: string
    date: string
    id?: string
  }
  onSubmit: () => void
}

const BlogForm: React.FC<BlogFormProps> = ({ initialData, onSubmit }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setDescription(initialData.description)
      setLocation(initialData.location)
      setDate(formatDate(initialData.date))
    }
  }, [initialData])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    let uploadedImage = ''
    if (file) {
      const response = await cloudinaryService.upload(file)
      if (response.success === true) {
        uploadedImage = response.fileUrl
      }
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('location', location)
    formData.append('date', date)
    formData.append('picture', uploadedImage)

    try {
      if (initialData?.id) {
        await axios.put('/api/news', formData)
      } else {
        await axios.post('/api/news', formData)
      }

      setTitle('')
      setDescription('')
      setLocation('')
      setDate('')
      setFile(null)
      setLoading(false)
      toast.success('Post saved successfully!')
      onSubmit()
    } catch (error: any) {
      setLoading(false)
      toast.error(error.response.data.error.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border shadow-lg rounded-lg p-4"
    >
      <div>
        <label className="block text-sm font-medium">Title</label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <ReactQuill value={description} onChange={setDescription} />
      </div>
      <div>
        <label className="block text-sm font-medium">Location</label>
        <Input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Date</label>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
      <Button
        type="primary"
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
        htmlType="submit"
        loading={loading}
      >
        {initialData?.id ? 'Update Post' : 'Add Post'}
      </Button>
    </form>
  )
}

export default BlogForm
