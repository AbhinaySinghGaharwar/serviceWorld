"use server";

import DashboardOverview from "./DashboardOverview";
import OrderForm from "./OrderForm";
import Loader from "../components/Loader";
import { getServices } from "@/lib/services";
import SupportSection from "./SupportSection";

export default async function DashboardPage() {
  try {
    // ✅ Fetch services
    const services = await getServices();
    const plainServices = JSON.parse(JSON.stringify(services));
    return (
      <>
        <DashboardOverview />
        <OrderForm services={plainServices} />
        <SupportSection/>
      </>
    );
  } catch (err) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <p>⚠️ Something went wrong: {err.message}</p>
      </div>
    );
  }
}
