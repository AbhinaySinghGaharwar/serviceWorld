'use client'
import React from "react"
import { motion } from "framer-motion"
export default function FeatureSection (){
     
 return(
     <section className="max-w-5xl mx-auto mt-12 px-6 md:px-0">
    <motion.h4 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-center text-lg md:text-2xl font-semibold">Cheapest & Fastest Smm Services For All Social Media Accounts.</motion.h4>

    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <motion.div initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <div className="bg-white p-6 rounded-lg shadow">
          <h5 className="font-semibold">Why choose us?</h5>
          <p className="text-sm text-gray-500 mt-2">We provide reliable delivery, instant support, and competitive prices for resellers and agencies. Our dashboard and API are simple to integrate.</p>
          <div className="mt-4 flex gap-3 flex-wrap">
            <span className="px-3 py-1 bg-emerald-50 rounded-full text-emerald-700 text-sm">Fast Delivery</span>
            <span className="px-3 py-1 bg-amber-50 rounded-full text-amber-700 text-sm">Secure</span>
            <span className="px-3 py-1 bg-blue-50 rounded-full text-blue-700 text-sm">API</span>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ x: 40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <div className="flex justify-center">
          <div className="w-48 h-64 bg-gradient-to-t from-amber-200 to-emerald-200 rounded-2xl p-4 shadow flex flex-col items-center justify-center">
            <div className="text-4xl font-bold">🙂</div>
            <div className="mt-3 text-center text-sm">Happy clients & repeat business</div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
 )


}