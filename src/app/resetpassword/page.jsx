"use client";

import { forgotPasswordAction } from "@/lib/forgotpassword";
import { useState } from "react";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null); // ← message state

  const handleSubmit = async () => {
    const res = await forgotPasswordAction(email);

    setMsg({
      type: res.success ? "success" : "error",
      text: res.message,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4 bg-white dark:bg-[#1A1A1A] p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-center text-gray-800 dark:text-gray-200">
          Forgot Password
        </h2>

        {/* Message Box */}
        {msg && (
          <div
            className={`p-2 text-sm rounded ${
              msg.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {msg.text}
          </div>
        )}

        <input
          type="email"
          placeholder="Enter Email"
          className="border p-2 rounded w-full bg-gray-50 dark:bg-[#111]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full"
          onClick={handleSubmit}
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}
