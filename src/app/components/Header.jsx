'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Updates', href: '/updates' },
    { name: 'API', href: '/apiv2' },
    { name: 'SignUp', href: '/auth/signup' },
  ]

  const gradientText = "bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-transparent bg-clip-text"

  return (
    <header className="w-full flex justify-center bg-gray-200">
      <div className="w-full max-w-[1100px] py-4 px-4 md:px-6 flex items-center justify-between bg-gray-100 rounded-3xl shadow-xl shadow-gray-300/40">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-black font-bold">
            SM
          </div>
          <h1 className={`text-lg md:text-2xl font-semibold ${gradientText}`}>InstantSMM</h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center text-base md:text-lg flex-1 justify-center">
          {menuItems.map((item, i) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={i}
                href={item.href}
                className={`relative font-medium text-black transition-colors duration-300 ${isActive ? gradientText : ''}`}
              >
                {item.name}
                <span
                  className={`absolute left-1/2 -bottom-1 h-0.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 transition-all duration-300
                    ${isActive ? 'w-full -translate-x-1/2' : 'w-0 group-hover:w-full -translate-x-1/2'}`}
                ></span>
              </Link>
            )
          })}
        </nav>

        {/* Login Button */}
        <Link href="/auth/login">
          <button className="ml-4 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-white text-base hover:opacity-90 transition">
            Login
          </button>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="px-3 py-2 border rounded text-black border-gray-300"
          >
            Menu
          </button>
        </div>

        {/* Fullscreen Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-full z-50 transform transition-transform duration-300 flex flex-col items-center justify-center gap-6
            bg-white backdrop-blur-sm rounded-3xl
            ${isOpen ? 'translate-y-0' : '-translate-y-full'}
          `}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 border rounded text-black bg-gray-100 hover:bg-gray-200 transition"
          >
            Close
          </button>

          {/* Animated Links */}
          <nav className="flex flex-col gap-6 text-2xl text-black">
            {menuItems.map((item, i) => {
              const isActive = pathname === item.href
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={`${isActive ? gradientText : 'text-black'} hover:underline`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              )
            })}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: menuItems.length * 0.05, duration: 0.3 }}
            >
              <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                <button className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform">
                  Login
                </button>
              </Link>
            </motion.div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
