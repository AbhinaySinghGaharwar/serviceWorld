"use client";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-900">Settings</h1>
      <p className="text-gray-700 mb-6">Update your panel settings and preferences.</p>

      <button
        onClick={() => router.push("/admin/settings/payment-methods")}
        className="bg-gradient-to-r from-indigo-400 to-purple-400 text-black font-semibold py-3 px-6 rounded-xl shadow hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
      >
        Manage Payment Methods
      </button>
      <button
        onClick={() => router.push("/admin/settings/edit-website")}
        className="bg-gradient-to-r from-indigo-400 to-purple-400 text-black font-semibold py-3 px-6 rounded-xl shadow hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 cursor"
      >
        Edit Website 
      </button>
    </div>
  );
}
