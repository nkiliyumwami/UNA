import React from 'react';
import { truncateText } from '@/lib/utils/truncateText';

interface BlogCardProps {
  blog: {
    _id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    picture: string;
  };
  onEdit: (blog: any) => void;
  onDelete: (id: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onEdit, onDelete }) => (
  <div key={blog._id} className="border rounded-lg overflow-hidden shadow-lg p-4">
    <img src={blog.picture} alt={blog.title} className="w-full h-64 object-cover" />
    <div>
      <p className="text-gray-600 text-sm">{new Date(blog.date).toLocaleDateString()}</p>
      <p className="text-gray-600 text-sm">{blog.location}</p>
      <h2 className="text-2xl font-bold mt-2">{blog.title}</h2>
      <p className="text-gray-800 mt-2">{truncateText(blog.description, 150)}</p>
    </div>
    <div className="flex mt-4 space-x-2">
      <button onClick={() => onEdit(blog)} className="px-4 py-2 bg-yellow-500 text-white rounded">
        Edit
      </button>
      <button onClick={() => onDelete(blog._id)} className="px-4 py-2 bg-red-500 text-white rounded">
        Delete
      </button>
    </div>
  </div>
);

export default BlogCard;
