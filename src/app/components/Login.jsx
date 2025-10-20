'use client'
import React from "react"
import { motion } from "framer-motion"
export default function Login() {
  const cardVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={cardVariants}
      className="max-w-3xl mx-auto mt-6 md:mt-8 p-6 md:p-8 rounded-xl shadow-lg bg-white border border-amber-100"
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 w-full">
          <h2 className="font-semibold text-lg md:text-2xl">Sign in to Your Account</h2>
          <p className="text-xs text-gray-500 mt-1">Access your dashboard and manage orders</p>

          <form className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="p-3 border rounded" placeholder="Username" />
            <input className="p-3 border rounded" placeholder="Password" type="password" />
            <div className="md:col-span-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" className="text-sm text-gray-500">Remember me</label>
              </div>
              <a className="text-sm text-emerald-600">Forgot password?</a>
            </div>
            <button className="md:col-span-2 bg-gradient-to-r from-amber-400 to-emerald-400 text-white py-2 rounded">Sign in</button>
          </form>
        </div>

        <div className="w-40 h-40 bg-gradient-to-br from-amber-200 to-emerald-200 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-sm text-gray-600">0.2rs/1K</div>
            <div className="text-xs text-gray-600">Starting Price</div>
            <div className="mt-2 text-sm font-medium">24/7 Support</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}