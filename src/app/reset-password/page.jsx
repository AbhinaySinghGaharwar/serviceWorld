"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { verifyTokenAction,updatePasswordAction } from "@/lib/resetActions";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const token = params.get("token");

  const [valid, setValid] = useState(null);
  const [password, setPassword] = useState("");

  const verify = async () => {
    const res = await verifyTokenAction(token);
    setValid(res.valid);
  };

  const updatePass = async () => {
    const res = await updatePasswordAction(token, password);
    alert(res.message);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      {valid === null && (
        <button
          onClick={verify}
          className="bg-blue-600 text-white p-2 rounded w-full"
        >
          Verify Reset Link
        </button>
      )}

      {valid === false && (
        <p className="text-red-600">Invalid or expired reset link</p>
      )}

      {valid === true && (
        <>
          <input
            type="password"
            placeholder="Enter New Password"
            className="border p-2 rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={updatePass}
            className="bg-green-600 text-white p-2 rounded w-full"
          >
            Update Password
          </button>
        </>
      )}
    </div>
  );
}
