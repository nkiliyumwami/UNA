import React, { useEffect, useState } from 'react'
import { Button, Input, Select } from 'antd'
import { cloudinaryService } from '@/lib/utils/cloudinaryService'

interface TeamFormProps {
  onSubmit: (data: FormData) => void
  initialData?: any
  uploading: boolean
}

const { Option } = Select

const TeamForm: React.FC<TeamFormProps> = ({
  onSubmit,
  initialData,
  uploading,
}) => {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [description, setDescription] = useState(
    initialData?.description || ''
  )
  const [email, setEmail] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [category, setCategory] = useState('')
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      setRole(initialData.role)
      setDescription(initialData.description)
      setEmail(initialData.email)
      setLinkedin(initialData.linkedin)
      setCategory(initialData.category)
    }
  }, [initialData])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let uploadedImage = ''
    if (file) {
      const response = await cloudinaryService.upload(file)
      if (response.success) {
        uploadedImage = response.fileUrl
      }
    }
    const formData = new FormData()
    formData.append('name', name)
    formData.append('role', role)
    formData.append('description', description)
    formData.append('email', email)
    formData.append('linkedin', linkedin)
    formData.append('category', category)
    if (file) {
      formData.append('file', uploadedImage)
    }
    onSubmit(formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border shadow-lg rounded-lg p-4"
    >
      <div>
        <label className="block text-sm font-medium">Name</label>
        <Input
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Role</label>
        <Input
          placeholder="Enter role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <Input
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <Input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">LinkedIn</label>
        <Input
          placeholder="Enter LinkedIn URL"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
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
      <div>
        <label className="block text-sm font-medium">Category</label>
        <Select
          value={category}
          onChange={(value) => setCategory(value)}
          className="w-full mt-1"
        >
          <Option value="leadership">Leadership</Option>
          <Option value="board">Board</Option>
        </Select>
      </div>
      <Button
        type="primary"
        htmlType="submit"
        loading={uploading}
        className="mt-4"
      >
        {initialData ? 'Update Team Member' : 'Add Team Member'}
      </Button>
    </form>
  )
}

export default TeamForm
