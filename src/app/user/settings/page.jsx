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

  // Password visibility
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
      className="max-w-6xl mx-auto py-8 px-4 sm:px-6 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ background: "#0F1117" }}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h2
          className="text-3xl font-bold bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(to right, #4A6CF7, #16D1A5)" }}
        >
          Account Settings
        </h2>
        <p className="mt-1" style={{ color: "#A0AEC3" }}>
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
              <Input label="Email Address" value="testing111250@gmail.com" readOnly />
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
                <p
                  className="mt-3 text-sm p-2 rounded-lg text-center"
                  style={{
                    color: "#4A6CF7",
                    background: "#1A1F2B",
                    border: "1px solid rgba(74,108,247,0.3)",
                  }}
                >
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
              <p className="text-sm mb-3" style={{ color: "#A0AEC3" }}>
                Generate a new API key to access developer endpoints. Keep it private.
              </p>

              <NeonButton
                text={isGenerating ? "Generating..." : "Generate New Key"}
                onClick={handleGenerateApiKey}
              />

              {apiKey && (
                <div
                  className="mt-4 p-3 rounded-lg font-mono text-center"
                  style={{
                    background: "#1A1F2B",
                    border: "1px solid rgba(74,108,247,0.4)",
                    color: "#4A6CF7",
                  }}
                >
                  🔑 {apiKey}
                </div>
              )}

              <div
                className="mt-4 text-sm p-3 rounded-lg"
                style={{
                  background: "rgba(22,209,165,0.1)",
                  border: "1px solid rgba(22,209,165,0.3)",
                  color: "#16D1A5",
                }}
              >
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
                  options={["English (Default)", "Hindi", "Spanish", "French", "German"]}
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
      className="rounded-2xl p-6 transition"
      style={{
        background: "#1A1F2B",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl" style={{ color: "#4A6CF7" }}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold" style={{ color: "#4A6CF7" }}>
          {title}
        </h3>
      </div>
      {content}
    </motion.div>
  );
}

/* 🔹 Password Input */
function PasswordInput({ label, value, onChange, show, setShow }) {
  return (
    <div className="mb-4 relative">
      <label className="block text-sm mb-1" style={{ color: "#A0AEC3" }}>
        {label}
      </label>
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg px-4 py-2.5 pr-10 focus:outline-none"
        style={{
          background: "#0F1117",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#FFFFFF",
        }}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-9"
        style={{ color: "#4A6CF7" }}
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}

/* 🔹 Input Component */
function Input({ label, value, readOnly }) {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-1" style={{ color: "#A0AEC3" }}>
        {label}
      </label>
      <input
        value={value}
        readOnly={readOnly}
        className="w-full rounded-lg px-4 py-2.5 focus:outline-none"
        style={{
          background: "#0F1117",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#FFFFFF",
          opacity: readOnly ? 0.7 : 1,
        }}
      />
    </div>
  );
}

/* 🔹 Select Component */
function Select({ label, options }) {
  return (
    <div>
      <label className="block text-sm mb-1" style={{ color: "#A0AEC3" }}>
        {label}
      </label>
      <select
        className="w-full rounded-lg px-4 py-2.5 focus:outline-none"
        style={{
          background: "#0F1117",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#FFFFFF",
        }}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt} className="text-black">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

/* 🔹 Neon Button */
function NeonButton({ text, 
  onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full mt-3 font-semibold py-3 rounded-lg transition-all"
      style={{
        background: "linear-gradient(to right, #4A6CF7, #16D1A5)",
        color: "black",
        boxShadow: "0 0 12px rgba(74,108,247,0.4)",
      }}
    >
      {text}
    </button>
  );
}
