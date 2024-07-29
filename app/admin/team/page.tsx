'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamForm from '@/components/forms/TeamForm';
import TeamTable from '@/components/ui/TeamTable';
import { toast } from 'react-toastify';

const Admin = () => {
  const [teams, setTeams] = useState({ leadership: [], board: [] });
  const [uploading, setUploading] = useState(false);
  const [editingTeamMemberId, setEditingTeamMemberId] = useState<string | null>(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    const res = await axios.get('/api/team');
    setTeams(res.data.teams);
  };

  const handleFormSubmit = async (formData: FormData) => {
    setUploading(true);
    try {
      if (editingTeamMemberId) {
        formData.append('id', editingTeamMemberId);
        await axios.put('/api/team', formData);
        toast.success('Team member updated successfully!')
      } else {
        await axios.post('/api/team', formData);
        toast.success('Team member added successfully!')
      }
      fetchTeam();
      setEditingTeamMemberId(null);
      // alert('Team member added/updated successfully!');
    } catch (error:any) {
      console.error(error);
      toast.error(
        error.response.data.error.message ===
          'TeamMember validation failed: category: Path `category` is required.'? 'Please select a category' : 'Failed to add team member.'
      )
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (teamMember: any) => {
    setEditingTeamMemberId(teamMember._id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      try {
        await axios.delete('/api/team', { data: { id } });
        fetchTeam();
        toast.success('Team member deleted successfully!');
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete team member.');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold my-8">Manage Team Members</h1>
      <TeamForm onSubmit={handleFormSubmit} uploading={uploading} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Leadership Team</h2>
        <TeamTable data={teams.leadership} onEdit={handleEdit} onDelete={handleDelete} />
        <h2 className="text-2xl font-bold mt-8">Board Members</h2>
        <TeamTable data={teams.board} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Admin;
