"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCircle,
  FaLock,
  FaKey,
  FaLanguage,
  FaClock,
  FaChevronDown,
} from "react-icons/fa";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <motion.div
      className="space-y-6 max-w-6xl mx-auto py-4 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Account Settings
        </h2>
        <p className="text-gray-600">Manage your account details and preferences.</p>
      </motion.div>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section, i) => {
          const isActive = activeSection === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden"
            >
              {/* Header */}
              <button
                onClick={() => toggleSection(i)}
                className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    {section.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {section.title}
                  </h3>
                </div>
                <FaChevronDown
                  className={`text-gray-500 transition-transform ${
                    isActive ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Animated Content */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-gray-800"
                  >
                    {section.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* Reusable Input Component */
function Input({ label, value, onChange, type = "text", readOnly = false }) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        className={`w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none ${
          readOnly ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}

/* Section Data */
const sections = [
  {
    title: "User Info",
    icon: <FaUserCircle />,
    content: (
      <>
        <Input label="Username" value="58" readOnly />
        <Input label="Email Address" value="testing111250@gmail.com" readOnly />
      </>
    ),
  },
  {
    title: "Account Password Manager",
    icon: <FaLock />,
    content: (
      <>
        <Input label="Current Password" type="password" />
        <Input label="New Password" type="password" />
        <Input label="Confirm Password" type="password" />
        <button className="w-full mt-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition">
          Update Password
        </button>
      </>
    ),
  },
  {
    title: "API Key Generator",
    icon: <FaKey />,
    content: (
      <>
        <p className="text-gray-600 text-sm mb-3">
          Generate a new API key to access developer endpoints. Keep it private.
        </p>
        <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition">
          Generate New Key
        </button>
        <div className="mt-3 bg-red-50 text-red-600 text-sm p-3 rounded-lg">
          Generating a new key will invalidate your previous one. Keep it secret.
        </div>
      </>
    ),
  },
 
];
