import axios from 'axios'

export const fetchBlogs = async () => {
  const res = await axios.get('/api/news')
  return res.data.blogs
}
