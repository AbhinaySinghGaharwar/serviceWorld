"use client";
import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { updateMobileNumber } from "@/lib/userActions";
import {
  FaUserCircle,
  FaLock,
  FaKey,
  FaLanguage,
} from "react-icons/fa";
import { changePassword } from "@/lib/authentication";
import { generateApiKey } from "@/lib/userActions";
import {
  Section,
  AlertBox,
  PasswordInput,
  Input,
  Select,
  PrimaryButton,
} from "./SettingsPageComponents";

export default function SettingsPage({ user }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordMessage, setPasswordMessage] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const [preferencesMessage, setPreferencesMessage] = useState("");
  const [mobileMessage, setMobileMessage] = useState(""); // ⭐ NEW message for mobile

  const [apiKey, setApiKey] = useState(null);
  const [isPending, startTransition] = useTransition();
  const [isGenerating, startGenerate] = useTransition();

  const [mobileNumber, setMobileNumber] = useState("");
  const [addMobileNumberIsVisible, setAddMobileNumberIsVisible] =
    useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  /* ------------------------------------
      Password Update Handler
  ------------------------------------ */
  const handlePasswordUpdate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage("⚠️ Please fill all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage("⚠️ Passwords do not match.");
      return;
    }

    startTransition(async () => {
      setPasswordMessage("Updating password...");
      const res = await changePassword({ currentPassword, newPassword });

      if (res.error) setPasswordMessage(`❌ ${res.error}`);
      else setPasswordMessage("✔ Password updated successfully!");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    });
  };

  /* ------------------------------------
      API Key Handler
  ------------------------------------ */
  const handleGenerateApiKey = () => {
    startGenerate(async () => {
      setApiMessage("Generating API key...");
      const res = await generateApiKey();

      if (res.success) {
        setApiKey(res.apiKey);
        setApiMessage("✔ API key generated!");
      } else {
        setApiMessage(`❌ ${res.error}`);
      }
    });
  };

  /* ------------------------------------
      Save Preferences
  ------------------------------------ */
  const handlePreferencesSave = () => {
    setPreferencesMessage("✔ Preferences saved successfully!");
  };

  /* ------------------------------------
      Mobile Number Submit Handler
  ------------------------------------ */
  const handleMobileNumberChange = async (e) => {
    e.preventDefault(); // ⭐ Stop page refresh

    const res = await updateMobileNumber(mobileNumber);

    if (res.success) {
      setMobileMessage("✔ Mobile number updated successfully!");
      return;
    }

    setMobileMessage("❌ " + res.error);
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
              <Input label="Username" value={user.username} readOnly />
              <Input label="Email Address" value={user.email} readOnly />
              <Input label="MobileNumber" value={user.mobileNumber} readOnly />

              {/* Show Add Mobile only when user DOES NOT have a mobile number */}
              {!user.mobileNumber && (
                <div>
                  <button
                    onClick={() => setAddMobileNumberIsVisible(true)}
                    className="w-full mt-3 py-3 rounded-lg font-semibold
                bg-gray-800 dark:bg-gray-700 text-white
                hover:bg-gray-700 dark:hover:bg-gray-600
                transition"
                  >
                    Add Mobile Number
                  </button>

                  {addMobileNumberIsVisible && (
                    <form
                      className="mt-3"
                      onSubmit={handleMobileNumberChange}
                    >
                      <label className="block mb-1 text-sm font-medium">
                        Enter Mobile Number
                      </label>

                      <input
                        type="text"
                        className="border rounded px-3 py-2 w-full"
                        value={mobileNumber}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, "");
                          setMobileNumber(digits);
                        }}
                        maxLength={10}
                      />

                      <button
                        className="w-full mt-3 py-3 rounded-lg font-semibold
                bg-gray-800 dark:bg-gray-700 text-white
                hover:bg-gray-700 dark:hover:bg-gray-600
                transition"
                        type="submit"
                      >
                        Submit
                      </button>

                      {/* Message */}
                      {mobileMessage && (
                        <p className="mt-3 text-sm font-medium text-center">
                          {mobileMessage}
                        </p>
                      )}
                    </form>
                  )}
                </div>
              )}
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

              {passwordMessage && (
                <AlertBox message={passwordMessage} />
              )}
            </>
          }
        />

        {/* API Key */}
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
                  className="mt-4 w-full p-3 rounded-lg text-sm font-mono 
               bg-gray-100 dark:bg-[#141823]
               border border-gray-300 dark:border-[#2B3143]
               text-gray-900 dark:text-gray-200
               break-all"
                >
                  🔑 {apiKey}
                </div>
              )}

              {apiMessage && <AlertBox message={apiMessage} />}

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

              <PrimaryButton
                text="Save Preferences"
                onClick={handlePreferencesSave}
              />

              {preferencesMessage && (
                <AlertBox message={preferencesMessage} />
              )}
            </>
          }
        />
      </div>
    </motion.div>
  );
}
