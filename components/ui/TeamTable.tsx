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
        <img src={text} alt="Team Member" className="w-24 h-24 object-cover" />
      ),
      width: 120,
    },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Role', dataIndex: 'role' },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (text: string) => truncateText(text, 40),
      responsive: ['md'],
    },
    { title: 'Email', dataIndex: 'email', responsive: ['md'] },
    {
      title: 'LinkedIn',
      dataIndex: 'linkedin',
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      ),responsive: ['md'], 
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record: any) => (
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => onEdit(record)}
            type="primary"
            className="mb-2 lg:mb-0"
          >
            Edit
          </Button>
          <Button
            onClick={() => onDelete(record._id)}
            type="default"
            className="bg-red-500"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return (
    <Table
      className="admin w-full"
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 10 }}
      scroll={{ y: 300 }}
    />
  )
}

export default TeamTable
