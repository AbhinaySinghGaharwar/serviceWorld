"use client";

import { FaGlobe, FaCoins, FaUsers, FaUserLock, FaCopy } from "react-icons/fa";

export default function ChildPanelPage() {
  const nameservers = ["ns1.goaiohost.in", "ns2.goaiohost.in"];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[#0e0e0f] p-6 text-gray-300">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Info */}
        <div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">
            Create Your Child Panel
          </h1>
          <p className="text-gray-400">
            Follow the steps below to create your own SMM child panel.
          </p>
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "Step 1",
              text: "Enter Your Domain",
              icon: <FaGlobe className="text-yellow-400 text-3xl" />,
            },
            {
              step: "Step 2",
              text: "Select Your Website Currency",
              icon: <FaCoins className="text-yellow-400 text-3xl" />,
            },
            {
              step: "Step 3",
              text: "Enter Your Username",
              icon: <FaUsers className="text-yellow-400 text-3xl" />,
            },
            {
              step: "Step 4",
              text: "Enter Your Password",
              icon: <FaUserLock className="text-yellow-400 text-3xl" />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#151517] border border-yellow-500/20 rounded-2xl p-5 flex justify-between items-center hover:border-yellow-400/40 transition-all"
            >
              <div>
                <h6 className="text-yellow-400 font-semibold">{item.step}</h6>
                <p className="text-gray-300 text-sm">{item.text}</p>
              </div>
              <div>{item.icon}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-[#151517] border border-yellow-500/20 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">
            Fill Out Details
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Domain */}
            <div>
              <label className="block mb-1 font-semibold">Domain</label>
              <input
                type="text"
                className="w-full bg-[#0e0e0f] border border-yellow-500/20 rounded-lg px-3 py-2 text-gray-200 focus:border-yellow-400 outline-none"
                placeholder="example.com"
              />
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mt-3">
                <p className="text-sm mb-2 font-semibold">
                  Please use these nameservers:
                </p>
                <ul className="space-y-1">
                  {nameservers.map((ns, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <span className="font-mono text-sm">{ns}</span>
                      <FaCopy
                        className="text-yellow-400 cursor-pointer hover:text-yellow-300"
                        onClick={() => copyToClipboard(ns)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Currency */}
            <div>
              <label className="block mb-1 font-semibold">Currency</label>
              <select className="w-full bg-[#0e0e0f] border border-yellow-500/20 rounded-lg px-3 py-2 text-gray-200 focus:border-yellow-400 outline-none">
                <option value="INR">Indian Rupee (INR)</option>
                <option value="USD">U.S. Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="GBP">British Pound (GBP)</option>
              </select>
            </div>

            {/* Username */}
            <div>
              <label className="block mb-1 font-semibold">Username</label>
              <input
                type="text"
                className="w-full bg-[#0e0e0f] border border-yellow-500/20 rounded-lg px-3 py-2 text-gray-200 focus:border-yellow-400 outline-none"
                placeholder="admin123"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-semibold">Password</label>
              <input
                type="password"
                className="w-full bg-[#0e0e0f] border border-yellow-500/20 rounded-lg px-3 py-2 text-gray-200 focus:border-yellow-400 outline-none"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 font-semibold">Confirm Password</label>
              <input
                type="password"
                className="w-full bg-[#0e0e0f] border border-yellow-500/20 rounded-lg px-3 py-2 text-gray-200 focus:border-yellow-400 outline-none"
                placeholder="••••••••"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block mb-1 font-semibold">Price</label>
              <input
                type="text"
                value="₹ 800"
                readOnly
                className="w-full bg-[#0e0e0f] border border-yellow-500/20 rounded-lg px-3 py-2 text-gray-200"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg shadow-lg hover:shadow-yellow-500/40 transition-all"
              >
                Submit Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
