"use client";

import { useEffect, useState } from "react";
import ServicesList from "../components/ServicesList";
import Loader from "../components/Loader";
export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services/getservices");
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <Loader message="Fetching latest services..." />
  if (error) return <p className="text-center text-red-500">⚠️ {error}</p>;

  return <ServicesList services={services} />;
}
