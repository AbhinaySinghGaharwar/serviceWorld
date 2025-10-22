'use client'

import { useState } from 'react'
import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Footer() {
  const socialLinks = [
    { icon: <FaFacebookF />, href: '#' },
    { icon: <FaYoutube />, href: '#' },
    { icon: <FaInstagram />, href: '#' },
    { icon: <FaLinkedinIn />, href: '#' },
  ]

  const [isOpen, setIsOpen] = useState(false) // optional for future mobile menu

  return (
    <footer className=" w-full flex justify-center bg-gray-200">
      <div className="w-full max-w-[1100px] bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 py-6 md:py-8 px-4 md:px-12 rounded-t-3xl shadow-xl shadow-gray-300/40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Footer Info */}
          <div className="text-center md:text-left">
            <h6 className="font-bold text-lg md:text-xl text-white">Best SMM Panel For Resellers</h6>
            <p className="text-sm md:text-base text-white opacity-90">
              Trusted by hundreds of resellers and agencies worldwide.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 items-center">
            {socialLinks.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-purple-500 flex items-center justify-center transition-shadow shadow-md"
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
