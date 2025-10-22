"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn=async ()=>{
      try {
       const res= await axios.get("/api/auth/me")
       if(res.data)
       setUser(res.data.user)
      } catch (error) {
        setError(error.response?.data.error||"Access Denied")
        // redirect to login page after 2 seconds
        setTimeout(() => {
          router.replace("/auth/login");
        }, 2000);
      }
    }
    isLoggedIn()

  }, []);

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    router.push("/auth/login");
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gradient-to-r from-red-300 to-red-500">
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-gray-700 mt-2">{error}</p>
          <a href="/auth/login" className="text-blue-600 underline mt-4 inline-block">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gradient-to-r from-indigo-400 to-purple-500">
      <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col gap-4 items-center w-96">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-lg text-gray-700">
          Welcome, <span className="font-semibold">{user.username || user.email}</span>
        </p>

        <button
          onClick={handleLogout}
          className="w-full py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
