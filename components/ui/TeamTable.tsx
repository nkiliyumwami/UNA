import React from 'react'
import { Table, Button } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { truncateText } from '@/lib/utils/truncateText'

interface TeamTableProps {
  data: any[]
  onEdit: (record: any) => void
  onDelete: (id: string) => void
}

const TeamTable: React.FC<TeamTableProps> = ({ data, onEdit, onDelete }) => {
  const columns: ColumnsType<any> = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: (text: string) => (
        <img
          src={text}
          alt="Team Member"
          style={{ width: 100, height: 100, objectFit: 'cover' }}
        />
      ),
      width: 120,
    },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Role', dataIndex: 'role' },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (text: string) => truncateText(text, 40),
    },
    { title: 'Email', dataIndex: 'email' },
    {
      title: 'LinkedIn',
      dataIndex: 'linkedin',
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record: any) => (
        <div>
          <Button
            onClick={() => onEdit(record)}
            type="primary"
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button onClick={() => onDelete(record._id)} type="default" className='bg-red-500'>
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return (
    <Table
      className="admin"
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 10 }}
      scroll={{ y: 300 }}
    />
  )
}

export default TeamTable
