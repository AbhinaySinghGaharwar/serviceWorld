import React from 'react'
import ServicesList from '../components/ServicesList'
import { getServices } from '@/lib/services'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default async function ServicesPage() {

  const services = await getServices()

  return (
  <>  
  <Header/>
  <ServicesList services={services} />
  <Footer/>
  </>
  )
}
