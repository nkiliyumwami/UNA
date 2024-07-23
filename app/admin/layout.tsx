import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link href="/admin/blog" className="block py-2 px-4 rounded hover:bg-gray-700">
                  Manage Blog
              </Link>
            </li>
            <li>
              <Link href="/admin/team"className="block py-2 px-4 rounded hover:bg-gray-700">
                  Manage Team
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4">{children}</main>
    </div>
  )
}
