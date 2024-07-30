'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaNewspaper, FaUsers, FaUserTie, FaUserFriends } from 'react-icons/fa'
import axios from 'axios'

export default function AdminPage() {
  const [greeting, setGreeting] = useState('')
  const [newsCount, setNewsCount] = useState(0)
  const [leadershipCount, setLeadershipCount] = useState(0)
  const [boardCount, setBoardCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const hours = new Date().getHours()
    if (hours < 12) {
      setGreeting('Good Morning')
    } else if (hours < 18) {
      setGreeting('Good Afternoon')
    } else {
      setGreeting('Good Evening')
    }

    const fetchCounts = async () => {
      try {
        const blogsResponse = await axios.get('/api/news')
        setNewsCount(blogsResponse.data.blogs.length)

        const teamRes = await axios.get('/api/team')
        const leadershipCount = teamRes.data.teams.leadership.length
        const boardCount = teamRes.data.teams.board.length
        setLeadershipCount(leadershipCount)
        setBoardCount(boardCount)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchCounts()
  }, [])

  return (
    <div className="p-8">
      <div className="p-6 mb-6 bg-white rounded-lg shadow-lg flex items-center justify-center">
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 text-center">
            {greeting}, Admin!
          </h3>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3">
        <div
          className="p-6 bg-blue-500 rounded-lg shadow-lg flex flex-col items-center justify-center text-white mx-3 mb-6 relative overflow-hidden"
          style={{ flex: '1 1 45%' }}
          onClick={() => router.push('/admin/blog')}
        >
          <div className="absolute inset-0">
            <div className="w-32 h-32 bg-blue-400 rounded-full absolute -top-10 -left-10 opacity-30"></div>
            <div className="w-24 h-24 bg-blue-400 rounded-full absolute -bottom-10 -right-10 opacity-30"></div>
          </div>
          <div className="relative z-10 text-center">
            <FaNewspaper className="text-4xl mb-2 w-full" />
            <h3 className="text-xl font-semibold">News & Events</h3>
            <p className="text-2xl font-bold mt-2">{newsCount}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3">
        <div
          className="p-6 bg-purple-500 rounded-lg shadow-lg flex flex-col items-center justify-center text-white mx-3 mb-6 relative overflow-hidden"
          style={{ flex: '1 1 45%' }}
          onClick={() => router.push('/admin/team')}
        >
          <div className="absolute inset-0">
            <div className="w-32 h-32 bg-purple-400 rounded-full absolute -top-10 -left-10 opacity-30"></div>
            <div className="w-24 h-24 bg-purple-400 rounded-full absolute -bottom-10 -right-10 opacity-30"></div>
          </div>
          <div className="relative z-10 text-center">
            <FaUserTie className="text-4xl mb-2 w-full" />
            <h3 className="text-xl font-semibold">Leadership</h3>
            <p className="text-2xl font-bold mt-2">{leadershipCount}</p>
          </div>
        </div>
        <div
          className="p-6 hover:shadow-lg bg-red-500 rounded-lg shadow-lg flex flex-col items-center justify-center text-white mx-3 mb-6 relative overflow-hidden"
          style={{ flex: '1 1 45%' }}
          onClick={() => router.push('/admin/team')}
        >
          <div className="absolute inset-0">
            <div className="w-32 h-32 bg-red-400 rounded-full absolute -top-10 -left-10 opacity-30"></div>
            <div className="w-24 h-24 bg-red-400 rounded-full absolute -bottom-10 -right-10 opacity-30"></div>
          </div>
          <div className="relative z-10 text-center">
            <FaUserFriends className="text-4xl mb-2 w-full text-center" />
            <h3 className="text-xl font-semibold">Board</h3>
            <p className="text-2xl font-bold mt-2">{boardCount}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
