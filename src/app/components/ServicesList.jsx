'use client'
import React, { useState } from 'react'
import { createOrder,getOrderStatus } from '@/lib/services'

export default function ServicesList({ services }) {
  const [orders, setOrders] = useState({})

  const handleOrder = async (service) => {
    const link = prompt(`Enter link/username for ${service.name}`)
    const quantity = prompt(`Enter quantity for ${service.name}`)

    if (!link || !quantity) return

    try {
      // Create order
      const orderData = await createOrder({
        service: service.service,
        link,
        quantity: Number(quantity)
      })
      const orderId = orderData.order
      alert(`Order created: ${orderId}`)

      // Get order status
      const statusData = await getOrderStatus(orderId)
      setOrders(prev => ({ ...prev, [orderId]: statusData.status }))
    } catch (error) {
      alert('Error creating order: ' + (error.error || error.message))
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map(service => (
        <div
          key={service.service}
          className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
          <p className="text-sm text-gray-500 mb-4">{service.type}</p>

          <div className="text-gray-700 space-y-1 mb-4">
            <p><span className="font-medium">Category:</span> {service.category}</p>
            <p><span className="font-medium">Rate:</span> ${service.rate}</p>
            <p><span className="font-medium">Min:</span> {service.min}</p>
            <p><span className="font-medium">Max:</span> {service.max}</p>
            <p><span className="font-medium">Refill:</span> {service.refill ? 'Yes' : 'No'}</p>
            <p><span className="font-medium">Cancelable:</span> {service.cancel ? 'Yes' : 'No'}</p>
          </div>

          <button
            onClick={() => handleOrder(service)}
            className="mt-auto px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 to-emerald-400 text-white font-semibold hover:scale-105 transition-transform"
          >
            Order Now
          </button>

          <div className="mt-4 text-sm text-gray-600">
            {Object.entries(orders).map(([id, status]) => (
              <p key={id}>Order {id}: {status}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
