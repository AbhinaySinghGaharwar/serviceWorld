"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import UserStatistics from "../components/UserStatistics";
import CategoryFilter from "../components/CategoryFilter";
import JoinButtons from "../components/JoinButton";
import NewOrderForm from "../components/NewOrderForm";
import DashboardOverview from "../components/DashboardOverview";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me");
        if (res.data?.user) setUser(res.data.user);
        else throw new Error("Unauthorized");
      } catch (err) {
        setError(err.response?.data?.error || "Access Denied");
      }
    };
    fetchUser();
  }, []);

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <p>{error}</p>
      </div>
    );

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading...
      </div>
    );

  return (
   <>
     <DashboardOverview/>
      <NewOrderForm />
  </>
  );
}
