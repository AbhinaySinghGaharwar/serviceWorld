

'use client'

import React from 'react'
import { motion } from 'framer-motion'

import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import FeatureSection from './components/FeatureSection'

const StatItem = ({ value, label, icon }) => (
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center">{icon}</div>
    <div>
      <div className="font-semibold">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  </div>
)

const StatsRow = () => (
  <div className="max-w-4xl mx-auto mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-0">
    <StatItem value={`6629`} label={`Total Orders`} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2v20" stroke="#0f172a" strokeWidth="1.2"/></svg>} />
    <StatItem value={`0.2rs/1K`} label={`Starting Price`} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="#0f172a" strokeWidth="1.2"/></svg>} />
    <StatItem value={`24/7`} label={`Fastest Support`} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 12h16" stroke="#0f172a" strokeWidth="1.2"/></svg>} />
    <StatItem value={`801+`} label={`Total Clients`} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 4v8" stroke="#0f172a" strokeWidth="1.2"/></svg>} />
  </div>
)

const SocialIconCircle = ({ children }) => (
  <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center">{children}</div>
)

const ServicesSection = () => {
  const services = [
    'Instagram Followers',
    'TikTok Likes',
    'YouTube Views',
    'Twitter Followers',
    'Telegram Members',
    'WhatsApp Shares'
  ]

  return (
    <section className="max-w-6xl mx-auto mt-14 px-6 md:px-0">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h3 className="text-xl md:text-3xl font-bold">Top Smm Services<br />We Provide</h3>
          <p className="text-gray-500 mt-3 max-w-md">All cheapest & fastest panel, our specialists are providing the most result-oriented social media marketing services tailored for resellers and agencies.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {services.map((s) => (
              <button key={s} className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm">{s}</button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex justify-center"
        >
          <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-white to-emerald-50 flex items-center justify-center shadow-lg relative">
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-36 h-36 rounded-full bg-white grid place-items-center"> 
                <div className="text-2xl font-bold text-emerald-500">S</div>
              </div>
            </div>
            <div className="absolute -right-6 -bottom-6">
              <div className="grid gap-2">
                <SocialIconCircle> <svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#3b82f6"/></svg> </SocialIconCircle>
                <SocialIconCircle> <svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#ff6b6b"/></svg> </SocialIconCircle>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}



export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-slate-900">
      <Header />

      <div className="container mx-auto px-4">
        <Login />
    <StatsRow />
        <ServicesSection />
        
        <FeatureSection /> 
      </div>

      <Footer />

     
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="fixed right-4 bottom-4 w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-emerald-400 to-lime-400 rounded-full shadow-lg flex items-center justify-center"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 2c2 0 3 2 4 3s3 2 3 4-1 3-2 4-3 2-5 2-4-1-6-2-3-3-3-4 1-3 2-4 3-3 7-3z" fill="#fff"/></svg>
      </motion.div>
    </main>
  )
}
