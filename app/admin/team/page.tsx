'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { cloudinaryService } from '@/lib/cloudinaryService'

const Admin = () => {
  const [teams, setTeams] = useState({ leadership: [], board: [] })
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [linkedin, setLinkedin] = useState('')
  const [category, setCategory] = useState('')
  const [uploading, setUploading] = useState(false)
  const [editingTeamMemberId, setEditingTeamMemberId] = useState<string | null>(
    null
  )

  useEffect(() => {
    fetchTeam()
  }, [])

  const fetchTeam = async () => {
    const res = await axios.get('/api/team')
    setTeams(res.data.teams)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null)
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

    setUploading(true)

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('role', role)
    formData.append('email', email)
    formData.append('linkedin', linkedin)
    formData.append('category', category)
    formData.append('file', uploadedImage)

    try {
      if (editingTeamMemberId) {
        formData.append('id', editingTeamMemberId)
        await axios.put('/api/team', formData)
      } else {
        await axios.post('/api/team', formData)
      }

      fetchTeam()
      // Reset form
      setName('')
      setDescription('')
      setRole('')
      setEmail('')
      setFile(null)
      setLinkedin('')
      setCategory('')
      setUploading(false)
      setEditingTeamMemberId(null)
      alert('Team member added successfully!')
    } catch (error) {
      console.error(error)
      setUploading(false)
      alert('Failed to add a team member.')
    }
  }

  const handleEdit = (teamMember: {
    _id: React.SetStateAction<string | null>
    name: React.SetStateAction<string>
    role: React.SetStateAction<string>
    description: React.SetStateAction<string>
    email: React.SetStateAction<string>
    linkedin: React.SetStateAction<string>
    category: React.SetStateAction<string>
  }) => {
    setEditingTeamMemberId(teamMember._id)
    setName(teamMember.name)
    setRole(teamMember.role)
    setDescription(teamMember.description)
    setEmail(teamMember.email)
    setLinkedin(teamMember.linkedin)
    setCategory(teamMember.category)
    setFile(null) // Clear file input
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      try {
        await axios.delete('/api/team', { data: { id } })
        fetchTeam()
        alert('Team member deleted successfully!')
      } catch (error) {
        console.error(error)
        alert('Failed to delete team member.')
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-32">
      <h1 className="text-4xl font-bold my-8">Manage Team Members</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">LinkedIn</label>
          <input
            type="text"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
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
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            required
          >
            <option value="leadership">Leadership</option>
            <option value="board">Board</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={uploading}
        >
          {uploading
            ? 'Uploading...'
            : editingTeamMemberId
            ? 'Update Team Member'
            : 'Add Team Member'}
        </button>
      </form>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {teams.leadership.map((member: any) => (
            <div
              key={member._id}
              className="border rounded-lg overflow-hidden shadow-lg p-4"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold mt-2">{member.name}</h2>
                <p className="text-gray-800 mt-2">{member.role}</p>
                <p className="text-gray-800 mt-2">{member.description}</p>
                <p className="text-gray-800 mt-2">{member.email}</p>
                <a href={member.linkedin} className="text-blue-500 mt-2">
                  LinkedIn
                </a>
              </div>
              <div className="flex mt-4 space-x-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(member._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mt-8">Board Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {teams.board.map((member: any) => (
            <div
              key={member._id}
              className="border rounded-lg overflow-hidden shadow-lg p-4"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold mt-2">{member.name}</h2>
                <p className="text-gray-800 mt-2">{member.role}</p>
                <p className="text-gray-800 mt-2">{member.description}</p>
                <p className="text-gray-800 mt-2">{member.email}</p>
                <a href={member.linkedin} className="text-blue-500 mt-2">
                  LinkedIn
                </a>
              </div>
              <div className="flex mt-4 space-x-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(member._id)}
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
