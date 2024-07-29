'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaNewspaper, FaUsers, FaUserTie, FaUserFriends } from 'react-icons/fa'

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

    // Mock data fetching
    setNewsCount(10) // Replace with actual data fetching logic
    setLeadershipCount(5) // Replace with actual data fetching logic
    setBoardCount(3) // Replace with actual data fetching logic
  }, [])

  return (
    <div className="p-8 ">
      {/* <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
        Welcome to the Admin Dashboard
      </h1> */}
      <div className="p-6 mb-6 bg-white rounded-lg shadow-lg flex items-center justify-center">
        {/* <div className="mr-4">
          <img
            src="/path-to-avatar.png"
            alt="Admin Avatar"
            className="w-16 h-16 rounded-full"
          />
        </div> */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 text-center">
            {greeting}, Admin!
          </h3>
          {/* <p className="text-gray-600">Welcome back to your dashboard.</p> */}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3">
        <div
          className="p-6 bg-blue-500 rounded-lg shadow-lg flex flex-col items-center justify-center text-white mx-3 mb-6 relative overflow-hidden"
          style={{ flex: '1 1 45%' }}
          onClick={() => router.push('/admin/blog')
          }
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
          onClick={() => router.push('/admin/team')
          }
        >
          <div className="absolute inset-0">
            <div className="w-32 h-32 bg-purple-400 rounded-full absolute -top-10 -left-10 opacity-30"></div>
            <div className="w-24 h-24 bg-purple-400 rounded-full absolute -bottom-10 -right-10 opacity-30"></div>
          </div>
          <div className="relative z-10 text-center">
            <FaUserTie className="text-4xl mb-2 w-full" />
            <h3 className="text-xl font-semibold">Leadership</h3>
            <p className="text-2xl font-bold mt-2">
              {leadershipCount}
            </p>
          </div>
        </div>
        <div
          className="p-6 hover:shadow-lg bg-red-500 rounded-lg shadow-lg flex flex-col items-center justify-center text-white mx-3 mb-6 relative overflow-hidden"
          style={{ flex: '1 1 45%' }}
          onClick={() => router.push('/admin/team')
          }
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
