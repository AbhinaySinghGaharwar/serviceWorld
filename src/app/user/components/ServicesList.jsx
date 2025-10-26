'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaTiktok,
  FaTelegramPlane,
  FaGlobe,
} from 'react-icons/fa'
import { createOrder, getOrderStatus } from '@/lib/services'

export default function ServicesList({ services }) {
  const orders = {} // Keep state if needed
  const [selectedService, setSelectedService] = useState(null)

  const getIconForService = (name) => {
    name = name.toLowerCase()
    if (name.includes('instagram')) return <FaInstagram className="text-pink-500" />
    if (name.includes('youtube')) return <FaYoutube className="text-red-500" />
    if (name.includes('facebook')) return <FaFacebook className="text-blue-500" />
    if (name.includes('tiktok')) return <FaTiktok className="text-gray-300" />
    if (name.includes('telegram')) return <FaTelegramPlane className="text-sky-400" />
    return <FaGlobe className="text-emerald-400" />
  }

  const serviceList = Array.isArray(services) ? services : []

  const groupedServices = useMemo(() => {
    const groups = {
      Instagram: [],
      YouTube: [],
      Facebook: [],
      TikTok: [],
      Telegram: [],
      Other: [],
    }

    for (const s of serviceList) {
      const name = s.name?.toLowerCase() || ''
      if (name.includes('instagram')) groups.Instagram.push(s)
      else if (name.includes('youtube')) groups.YouTube.push(s)
      else if (name.includes('facebook')) groups.Facebook.push(s)
      else if (name.includes('tiktok')) groups.TikTok.push(s)
      else if (name.includes('telegram')) groups.Telegram.push(s)
      else groups.Other.push(s)
    }

    return Object.fromEntries(Object.entries(groups).filter(([_, v]) => v.length > 0))
  }, [serviceList])

  const handleOrder = async (service) => {
    const link = prompt(`Enter link/username for ${service.name}`)
    const quantity = prompt(`Enter quantity for ${service.name}`)
    if (!link || !quantity) return

    try {
      const orderData = await createOrder({
        service: service.service,
        link,
        quantity: Number(quantity),
      })

      if (orderData.error) throw orderData
      const orderId = orderData.order
      alert(`Order created: ${orderId}`)

      const statusData = await getOrderStatus(orderId)
      orders[orderId] = statusData.status || 'Pending'
    } catch (error) {
      alert('Error creating order: ' + (error.error || error.message))
    }
  }

  return (
    <div className=" md:p-8  min-h-screen text-black flex justify-center">
      <div className="w-full max-w-[1100px]">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-transparent bg-clip-text">
          💎 Available Services
        </h1>

        {Object.keys(groupedServices).length === 0 ? (
          <p className="text-center text-gray-500">No services available.</p>
        ) : (
          Object.entries(groupedServices).map(([category, services]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-10"
            >
              <div className="flex items-center gap-2 mb-3">
                {getIconForService(category)}
                <h2 className="text-xl md:text-2xl font-semibold">{category}</h2>
                <span className="text-sm text-gray-500">({services.length})</span>
              </div>

              <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 p-1 rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
                  <table className="w-full text-sm md:text-base text-left table-fixed">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs md:text-sm">
                      <tr>
                        <th className="px-2 py-2 w-12">ID</th>
                        <th className="px-2 py-2 w-48">Service</th>
                        <th className="px-2 py-2 w-20">Rate / 1K</th>
                        <th className="px-2 py-2 hidden md:table-cell w-16">Min</th>
                        <th className="px-2 py-2 hidden md:table-cell w-16">Max</th>
                        <th className="px-2 py-2 hidden sm:table-cell w-24">Avg Time</th>
                        <th className="px-2 py-2 text-center w-40">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service, index) => (
                        <tr
                          key={service.service || index}
                          className={`transition duration-200 hover:bg-gray-50 ${
                            index % 2 === 0 ? 'bg-white/80' : 'bg-white/60'
                          }`}
                        >
                          <td className="px-2 py-2 text-purple-500 font-mono whitespace-nowrap">
                            {service.service}
                          </td>
                          <td className="px-2 py-2 flex items-start gap-2">
                            {getIconForService(service.name)}
                            <span className="break-words">{service.name}</span>
                          </td>
                          <td className="px-2 py-2 whitespace-nowrap">${service.rate}</td>
                          <td className="px-2 py-2 hidden md:table-cell">{service.min}</td>
                          <td className="px-2 py-2 hidden md:table-cell">{service.max}</td>
                          <td className="px-2 py-2 hidden sm:table-cell text-gray-500">
                            {service.avg_time || '—'}
                          </td>
                          <td className="px-2 py-2 text-center flex flex-wrap gap-3 justify-center">
                            <button
                              onClick={() => setSelectedService(service)}
                              className="px-4 py-2 rounded-md text-sm md:text-base bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-white font-semibold hover:opacity-90 transition"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleOrder(service)}
                              className="px-4 py-2 rounded-md text-sm md:text-base bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-white font-semibold hover:opacity-90 transition"
                            >
                              Buy
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          ))
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white p-6 rounded-2xl max-w-md w-full shadow-xl"
              >
                <h3 className="text-xl font-bold mb-4">{selectedService.name}</h3>
                <p className="mb-6">{selectedService.desc || 'No description available.'}</p>
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-white font-semibold"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
