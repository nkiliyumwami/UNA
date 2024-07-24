'use client'
import { usePathname } from 'next/navigation'

const Footer = () => {
  const pathname = usePathname()
  const isActive = (href: string) => {
    return pathname === href
  }
  return (
    <>
      {isActive('/admin') ||
      isActive('/admin/team') ||
      isActive('/admin/blog') ? (
        ''
      ) : (
        <footer className="bg-[#111] py-6">
          <div className="w-full">
            <hr className="text-gray-500 text-center w-[80%] mx-auto py-2 px-2" />
            <div className="text-center text-gray-500">
              <p>
                Copyright © 2024 United Nations Association of Rwanda. All
                Rights Reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </>
  )
}

export default Footer
