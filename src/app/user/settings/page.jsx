"use client";
import { useState, useTransition } from "react";
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

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePasswordUpdate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("⚠️ Please fill all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("⚠️ Passwords do not match.");
      return;
    }

    startTransition(async () => {
      setMessage("Updating password...");
      const res = await changePassword({ currentPassword, newPassword });

      if (res.error) setMessage(`❌ ${res.error}`);
      else setMessage("✔ Password updated successfully!");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    });
  };

  const handleGenerateApiKey = () => {
    startGenerate(async () => {
      setMessage("Generating API key...");
      const res = await generateApiKey();

      if (res.success) {
        setApiKey(res.apiKey);
        setMessage("✔ API key generated!");
      } else {
        setMessage(`❌ ${res.error}`);
      }
    });
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto py-8 px-4 sm:px-6 text-gray-900 dark:text-gray-200 
                 bg-gray-100 dark:bg-[#0F1117] rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Account Settings
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Manage your account details and preferences.
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
          title="Password Manager"
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

              <PrimaryButton
                text={isPending ? "Updating..." : "Update Password"}
                onClick={handlePasswordUpdate}
              />

              {message && (
                <p className="mt-3 text-sm p-2 rounded-lg text-center
                bg-gray-200 dark:bg-[#1A1F2B] border border-gray-300 dark:border-[#2B3143]">
                  {message}
                </p>
              )}
            </>
          }
        />

        {/* API Key Generator */}
        <Section
          icon={<FaKey />}
          title="API Key"
          content={
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Create a private API key for integrations.
              </p>

              <PrimaryButton
                text={isGenerating ? "Generating..." : "Generate API Key"}
                onClick={handleGenerateApiKey}
              />

              {apiKey && (
                <div
                  className="mt-4 p-3 rounded-lg text-center font-mono text-sm 
                             bg-gray-200 dark:bg-[#1A1F2B] border border-gray-300 dark:border-[#2B3143]"
                >
                  🔑 {apiKey}
                </div>
              )}

              <div
                className="mt-4 text-sm p-3 rounded-lg 
                         bg-gray-200 dark:bg-[#1A1F2B] 
                         border border-gray-300 dark:border-[#2B3143]"
              >
                ⚠ Generating a new key will disable your old one.
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
                    "GMT +5:30 (India)",
                    "UTC",
                    "GMT -5 (New York)",
                    "GMT +1 (London)",
                    "GMT +4 (Dubai)",
                  ]}
                />
              </div>

              <PrimaryButton text="Save Preferences" />
            </>
          }
        />
      </div>
    </motion.div>
  );
}

/* ----------------------------------------
   Section Component
---------------------------------------- */
function Section({ icon, title, content }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 rounded-xl 
                 bg-white dark:bg-[#1A1F2B] 
                 border border-gray-300 dark:border-[#2B3143]
                 shadow-md"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl text-gray-700 dark:text-gray-300">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h3>
      </div>
      {content}
    </motion.div>
  );
}

/* ----------------------------------------
   Password Input
---------------------------------------- */
function PasswordInput({ label, value, onChange, show, setShow }) {
  return (
    <div className="mb-4 relative">
      <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
        {label}
      </label>

      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg px-4 py-2.5 pr-10
                  bg-gray-100 dark:bg-[#0F1117]
                  border border-gray-300 dark:border-[#2B3143]
                  text-gray-900 dark:text-gray-200
                  focus:outline-none"
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-9 text-gray-600 dark:text-gray-400"
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}

/* ----------------------------------------
   Input Component
---------------------------------------- */
function Input({ label, value, readOnly }) {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
        {label}
      </label>
      <input
        value={value}
        readOnly={readOnly}
        className="w-full rounded-lg px-4 py-2.5
                  bg-gray-100 dark:bg-[#0F1117]
                  border border-gray-300 dark:border-[#2B3143]
                  text-gray-900 dark:text-gray-300
                  focus:outline-none"
      />
    </div>
  );
}

/* ----------------------------------------
   Select Component
---------------------------------------- */
function Select({ label, options }) {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
        {label}
      </label>
      <select
        className="w-full rounded-lg px-4 py-2.5
                   bg-gray-100 dark:bg-[#0F1117]
                   border border-gray-300 dark:border-[#2B3143]
                   text-gray-900 dark:text-gray-200
                   focus:outline-none"
      >
        {options.map((opt, i) => (
          <option key={i} className="text-black dark:text-white">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ----------------------------------------
   Gray Button
---------------------------------------- */
function PrimaryButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full mt-3 py-3 rounded-lg font-semibold
                bg-gray-800 dark:bg-gray-700 text-white
                hover:bg-gray-700 dark:hover:bg-gray-600
                transition"
    >
      {text}
    </button>
  );
}
