"use client";
import { motion } from "framer-motion";
import { FaUserCircle, FaLock, FaKey, FaLanguage } from "react-icons/fa";

export default function SettingsPage() {
  return (
    <motion.div
      className="max-w-6xl mx-auto py-8 px-4 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* 🔹 Page Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Account Settings
        </h2>
        <p className="text-gray-600 mt-1">
          Manage your account details and preferences securely.
        </p>
      </div>

      {/* 🔹 Responsive Grid (1 col on mobile, 2 cols on large) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Info */}
        <Section
          icon={<FaUserCircle />}
          title="User Info"
          content={
            <>
              <Input label="Username" value="58" readOnly />
              <Input
                label="Email Address"
                value="testing111250@gmail.com"
                readOnly
              />
            </>
          }
        />

        {/* Password Manager */}
        <Section
          icon={<FaLock />}
          title="Account Password Manager"
          content={
            <>
              <Input label="Current Password" type="text" />
              <Input label="New Password" type="text" />
              <Input label="Confirm Password" type="text" />
              <button className="w-full mt-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition">
                Update Password
              </button>
            </>
          }
        />

        {/* API Key Generator */}
        <Section
          icon={<FaKey />}
          title="API Key Generator"
          content={
            <>
              <p className="text-gray-600 text-sm mb-3">
                Generate a new API key to access developer endpoints. Keep it
                private.
              </p>
              <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition">
                Generate New Key
              </button>
              <div className="mt-4 bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                ⚠️ Generating a new key will invalidate your previous one. Keep
                it secret.
              </div>
            </>
          }
        />

        {/* Language & Timezone */}
        <Section
          icon={<FaLanguage />}
          title="Language & Timezone"
          content={
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <select className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-400 focus:outline-none">
                    <option>English (Default)</option>
                    <option>Hindi</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timezone
                  </label>
                  <select className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-400 focus:outline-none">
                    <option>Asia/Kolkata (GMT+5:30)</option>
                    <option>UTC (GMT+0)</option>
                    <option>America/New_York (GMT-5)</option>
                    <option>Europe/London (GMT+1)</option>
                    <option>Asia/Dubai (GMT+4)</option>
                  </select>
                </div>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition">
                Save Preferences
              </button>
            </>
          }
        />
      </div>
    </motion.div>
  );
}

/* 🔹 Section Wrapper */
function Section({ icon, title, content }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {content}
    </motion.div>
  );
}

/* 🔹 Input Component */
function Input({ label, value, onChange, type = "text", readOnly = false }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        className={`w-full border rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none ${
          readOnly ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}
