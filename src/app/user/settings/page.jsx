"use client";
import { useEffect, useState, useTransition } from "react";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaLock,
  FaKey,
  FaLanguage,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { changePassword } from "@/lib/authentication";
import { generateApiKey } from "@/lib/userActions";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [apiKey, setApiKey] = useState(null);
  const [isPending, startTransition] = useTransition();
  const [isGenerating, startGenerate] = useTransition();

  useEffect(()=>{

  })

  // Password visibility
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // 🔹 Password Update Logic
  const handlePasswordUpdate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("⚠️ Please fill all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("⚠️ New passwords do not match.");
      return;
    }

    startTransition(async () => {
      setMessage("⏳ Updating password...");
      const res = await changePassword({ currentPassword, newPassword });
      if (res.error) setMessage(`❌ ${res.error}`);
      else setMessage("✅ Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    });
  };

  // 🔹 API Key Generation Logic
  const handleGenerateApiKey = () => {
    startGenerate(async () => {
      setMessage("⏳ Generating API key...");
      const res = await generateApiKey();
      if (res.success) {
        setApiKey(res.apiKey);
        setMessage("✅ New API key generated successfully!");
      } else {
        setMessage(`❌ ${res.error}`);
      }
    });
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto py-8 px-4 sm:px-6 text-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,255,0,0.6)]">
          Account Settings
        </h2>
        <p className="text-gray-400 mt-1">
          Manage your account details and preferences securely.
        </p>
      </div>

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
              <PasswordInput
                label="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                show={showCurrent}
                setShow={setShowCurrent}
              />
              <PasswordInput
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                show={showNew}
                setShow={setShowNew}
              />
              <PasswordInput
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                show={showConfirm}
                setShow={setShowConfirm}
              />
              <NeonButton
                text={isPending ? "Updating..." : "Update Password"}
                onClick={handlePasswordUpdate}
              />
              {message && (
                <p className="mt-3 text-sm text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 p-2 rounded-lg text-center">
                  {message}
                </p>
              )}
            </>
          }
        />

        {/* API Key Generator */}
        <Section
          icon={<FaKey />}
          title="API Key Generator"
          content={
            <>
              <p className="text-gray-400 text-sm mb-3">
                Generate a new API key to access developer endpoints. Keep it private.
              </p>
              <NeonButton
                text={isGenerating ? "Generating..." : "Generate New Key"}
                onClick={handleGenerateApiKey}
              />
              {apiKey && (
                <div className="mt-4 bg-[#0e0e0f] border border-yellow-500/40 text-yellow-300 text-sm p-3 rounded-lg font-mono text-center shadow-[0_0_10px_rgba(255,255,0,0.3)]">
                  🔑 {apiKey}
                </div>
              )}
              <div className="mt-4 bg-yellow-500/10 text-yellow-400 text-sm p-3 rounded-lg border border-yellow-500/30">
                ⚠️ Generating a new key will invalidate your previous one. Keep it secret.
              </div>
            </>
          }
        />

        {/* Language */}
        <Section
          icon={<FaLanguage />}
          title="Language & Timezone"
          content={
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Language"
                  options={[
                    "English (Default)",
                    "Hindi",
                    "Spanish",
                    "French",
                    "German",
                  ]}
                />
                <Select
                  label="Timezone"
                  options={[
                    "Asia/Kolkata (GMT+5:30)",
                    "UTC (GMT+0)",
                    "America/New_York (GMT-5)",
                    "Europe/London (GMT+1)",
                    "Asia/Dubai (GMT+4)",
                  ]}
                />
              </div>
              <NeonButton text="Save Preferences" />
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
      className="bg-[#151517] border border-yellow-500/20 rounded-2xl p-6 shadow-[0_0_12px_rgba(255,255,0,0.05)] hover:shadow-[0_0_18px_rgba(255,255,0,0.15)] transition"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl text-yellow-400 drop-shadow-[0_0_6px_rgba(255,255,0,0.6)]">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-yellow-400">{title}</h3>
      </div>
      {content}
    </motion.div>
  );
}

/* 🔹 Password Input */
function PasswordInput({ label, value, onChange, show, setShow }) {
  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-medium text-yellow-400 mb-1">
        {label}
      </label>
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="w-full bg-[#0e0e0f] border border-yellow-500/20 rounded-lg px-4 py-2.5 pr-10 text-gray-200 focus:ring-2 focus:ring-yellow-500/40 focus:outline-none transition"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-9 text-yellow-400 hover:text-yellow-300"
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}

/* 🔹 Input Component */
function Input({ label, value, onChange, type = "text", readOnly = false }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-yellow-400 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        className={`w-full bg-[#0e0e0f] border border-yellow-500/20 rounded-lg px-4 py-2.5 text-gray-200 focus:ring-2 focus:ring-yellow-500/40 focus:outline-none transition ${
          readOnly ? "opacity-70 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}

/* 🔹 Select Component */
function Select({ label, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-yellow-400 mb-1">
        {label}
      </label>
      <select className="w-full bg-[#0e0e0f] border border-yellow-500/20 rounded-lg px-4 py-2.5 text-gray-200 focus:ring-2 focus:ring-yellow-500/40 focus:outline-none transition">
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

/* 🔹 Neon Button */
function NeonButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full mt-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-3 rounded-lg shadow-[0_0_12px_rgba(255,255,0,0.4)] hover:shadow-[0_0_20px_rgba(255,255,0,0.7)] transition-all"
    >
      {text}
    </button>
  );
}
