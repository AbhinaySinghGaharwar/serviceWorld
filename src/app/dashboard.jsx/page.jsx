// Server Component
import React from 'react'
import ServicesList from '@/components/ServicesList'
import { getServices, getBalance } from '@/lib/smmApi'

export default async function DashboardPage() {
  // Fetch services and balance server-side
  const [services, balanceData] = await Promise.all([getServices(), getBalance()])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-12">
      <h1 className="text-3xl font-bold text-center mb-6">SMM Dashboard</h1>
      
      <p className="text-center text-lg mb-12">
        Balance: <span className="font-semibold">${balanceData.balance}</span> {balanceData.currency}
      </p>

      {/* Client Component for services */}
      <ServicesList services={services} />
    </div>
  )
}
