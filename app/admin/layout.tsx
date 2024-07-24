import Link from 'next/link'
import Image from 'next/image'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4 h-screen">
        <div className="flex items-center justify-center mb-8">
          <Image
            src="/unarwanda16X16.png" // Replace with your logo path
            alt="Logo"
            width={100}
            height={100}
          />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-white">Admin Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link
                href="/admin"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/blog"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                News & Events
              </Link>
            </li>
            <li>
              <Link
                href="/admin/team"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Team
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4 h-screen overflow-y-auto admin relative">
        <div className='w-full p-4 flex justify-end items-center fixed right-0'><Link href='/'> Go back to Homepage</Link></div>{children}</main>
    </div>
  )
}
