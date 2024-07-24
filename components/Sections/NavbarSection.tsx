'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/unarwanda16X16.png'
import unLogo from '../../public/un-logo.png'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/16/solid'
import { usePathname } from 'next/navigation'


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isActive = (href: string) => {
    return pathname === href
  }

    const toggleMenu = () => {      
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {isActive('/admin') || isActive('/admin/team') || isActive('/admin/blog') ? (
        ''
      ) : (
        <nav
          className={`fixed w-full z-20 transition-colors duration-300 pt-[15px] ${
            isScrolled
              ? 'bg-white shadow-md text-black'
              : 'bg-transparent text-white'
          }`}
        >
          <div className=" mx-auto md:py-2 py-6 px-8 md:px-24 flex items-center justify-between">
            <div className="flex items-center">
              <Link className="flex-shrink-0" href="/">
                <Image
                  width={130}
                  height={50}
                  className={`md:w-[160px] w-[80px]`}
                  src={logo}
                  alt="UNA Rwanda"
                />
              </Link>
            </div>
            <div className="hidden lg:flex space-x-8 flex-grow justify-center items-center ">
              <a
                href="/"
                className={`hover:text-[#4894DF] px-2 font-semibold ${
                  isActive('/') ? 'text-[#4894DF]' : ''
                }`}
              >
                Home
              </a>
              <a
                href="/about-us"
                className={`hover:text-[#4894DF] px-2 font-semibold ${
                  isActive('/about-us') ? 'text-[#4894DF]' : ''
                }`}
              >
                About Us
              </a>
              <a
                href="/our-programs"
                className={`hover:text-[#4894DF] px-2 font-semibold ${
                  isActive('/our-programs') ? 'text-[#4894DF]' : ''
                }`}
              >
                Our Programs
              </a>
              <a
                href="/our-team"
                className={`hover:text-[#4894DF] px-2 font-semibold ${
                  isActive('/our-team') ? 'text-[#4894DF]' : ''
                }`}
              >
                Our Team
              </a>
              <a
                href="/media"
                className={`hover:text-[#4894DF] px-2 font-semibold ${
                  isActive('/media') ? 'text-[#4894DF]' : ''
                }`}
              >
                Media
              </a>
              <a
                href="get-involved"
                className={`hover:text-[#4894DF] px-2 font-semibold ${
                  isActive('/get-involved') ? 'text-[#4894DF]' : ''
                }`}
              >
                Get Involved
              </a>
              <a
                href="/contact-us"
                className={`hover:text-[#4894DF] px-2 font-semibold ${
                  isActive('/contact-us') ? 'text-[#4894DF]' : ''
                }`}
              >
                Contact us
              </a>
              <a
                href="/donate"
                className={`hover:text-[#4894DF] px-2 font-semibold ${
                  isActive('') ? 'text-[#4894DF]' : ''
                }`}
              >
                Donate
              </a>
            </div>
            <div className="lg:hidden flex items-center z-20">
              <button onClick={toggleMenu}>
                {isOpen ? (
                  <XMarkIcon
                    className={`h-10 ${
                      isScrolled ? 'text-black' : 'text-white'
                    }`}
                  />
                ) : (
                  <Bars3Icon
                    className={`h-10 ${
                      isScrolled ? 'text-black' : 'text-white'
                    }`}
                  />
                )}
              </button>
            </div>
            <div className="hidden lg:flex items-center">
              <Link className="flex-shrink-0" href="/">
                <Image
                  width={130}
                  height={50}
                  className={`md:w-[160px] w-[80px] p-3`}
                  src={unLogo}
                  alt="UNA Rwanda"
                />
              </Link>
            </div>
          </div>
          {isOpen && (
            <div className="lg:hidden bg-white text-black items-center flex flex-col justify-center md:text-2xl text-lg">
              <a
                href="/"
                className={`block px-4 py-2 hover:text-[#4894DF] font-semibold ${
                  isActive('/') ? 'text-[#4894DF]' : ''
                }`}
              >
                Home
              </a>
              <a
                href="/about-us"
                className={`block px-4 py-2 hover:text-[#4894DF] font-semibold ${
                  isActive('/about-us') ? 'text-[#4894DF]' : ''
                }`}
              >
                About Us
              </a>
              <a
                href="/our-programs"
                className={`block px-4 py-2 hover:text-[#4894DF] font-semibold ${
                  isActive('/our-programs') ? 'text-[#4894DF]' : ''
                }`}
              >
                Our Programs
              </a>
              <a
                href="/our-team"
                className={`block px-4 py-2 hover:text-[#4894DF] font-semibold ${
                  isActive('/our-team') ? 'text-[#4894DF]' : ''
                }`}
              >
                Our Team
              </a>
              <a
                href="/media"
                className={`block px-4 py-2 hover:text-[#4894DF] font-semibold ${
                  isActive('/media') ? 'text-[#4894DF]' : ''
                }`}
              >
                Media
              </a>
              <a
                href="/get-involved"
                className={`block px-4 py-2 hover:text-[#4894DF] font-semibold ${
                  isActive('/get-involved') ? 'text-[#4894DF]' : ''
                }`}
              >
                Get Involved
              </a>
              <a
                href="/contact-us"
                className={`block px-4 py-2 hover:text-[#4894DF] font-semibold ${
                  isActive('/contact-us') ? 'text-[#4894DF]' : ''
                }`}
              >
                Contact Us
              </a>
              <a
                href="/donate"
                className={`block px-4 py-2 hover:text-[#4894DF] font-semibold ${
                  isActive('/donate') ? 'text-[#4894DF]' : ''
                }`}
              >
                Donate
              </a>
            </div>
          )}
        </nav>
      )}
    </>
  )
}

export default Navbar
