import Link from 'next/link'
import Image from 'next/image'
import { HomeIcon, UserIcon } from '@heroicons/react/16/solid'
import { FaNewspaper } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen w-full md:flex-row">
      <aside className="md:w-[20%] bg-gray-800 text-white p-4 md:h-screen md:relative md:flex md:flex-col hidden">
        <div className="flex items-center justify-center mb-8">
          <Image
            src="/unarwanda16X16.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </div>

        <nav>
          <ul className="flex flex-col">
            <li className="flex-1 ">
              <Link
                href="/admin"
                className="flex gap-3 py-2 px-4 rounded hover:bg-gray-700 text-center md:text-left"
              >
                <MdDashboard className="h-5 w-5" />
                <span className="">Dashboard</span>
              </Link>
            </li>
            <li className="flex-1 ">
              <Link
                href="/admin/blog"
                className="flex gap-3 py-2 px-4 rounded hover:bg-gray-700 text-center md:text-left"
              >
                <FaNewspaper className="h-5 w-5" />
                <span className="">News & Events</span>
              </Link>
            </li>
            <li className="flex-1 ">
              <Link
                href="/admin/team"
                className="flex gap-3 py-2 px-4 rounded hover:bg-gray-700 text-center md:text-left"
              >
                <UserIcon className="h-5 w-5" />
                <span className="">Team</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <aside className="w-full h-auto fixed bottom-0 left-0 right-0 z-10 md:hidden border-t shadow-xl bg-white">
        <nav>
          <ul className="flex justify-between p-4">
            <li>
              <Link
                href="/admin"
                className="flex gap-3 py-2 px-4 rounded hover:bg-gray-400 text-center md:text-left"
              >
                <MdDashboard className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <Link
                href="/admin/blog"
                className="flex gap-3 py-2 px-4 rounded hover:bg-gray-400 text-center md:text-left"
              >
                <FaNewspaper className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <Link
                href="/admin/team"
                className="flex gap-3 py-2 px-4 rounded hover:bg-gray-400 text-center md:text-left"
              >
                <UserIcon className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex gap-3 py-2 px-4 rounded hover:bg-gray-400 text-center md:text-left"
              >
                <HomeIcon className="h-5 w-5" />
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4 h-screen overflow-y-auto relative w-full md:w-[80%]">
        <div className=" p-4 flex justify-end items-center fixed right-4 z-20">
          <Link href="/" className="md:flex gap-3 hidden">
            <HomeIcon className="h-5 w-5" /> Homepage
          </Link>
        </div>
        {children}
      </main>
    </div>
  )
}
