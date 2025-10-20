import React from 'react'
import ServicesList from '../components/ServicesList'
import { getServices } from '@/lib/services'

export default async function ServicesPage() {
  //fetching data from server function
  const services = await getServices()
  console.log(services)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-12">
      <h1 className="text-3xl font-bold text-center mb-12">Our Services</h1>

    
      {/* <ServicesList services={services} /> */}
    </div>
  )
}
