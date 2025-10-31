"use server";

import DashboardOverview from "./DashboardOverview";
import OrderForm from "./OrderForm";
import Loader from "../components/Loader";
import { getUserDetails } from "@/lib/authentication";
import { getServices } from "@/lib/services";

export default async function DashboardPage() {
  try {
    // ✅ Fetch user
    const userRes = await getUserDetails();

    if (userRes.error) {
      return (
        <div className="flex items-center justify-center min-h-screen text-red-500">
          <p>{userRes.error}</p>
        </div>
      );
    }

    // ✅ Fetch services
    const services = await getServices();

    // ✅ Convert user & services to plain JSON (removes ObjectId, Dates, etc.)
    const plainUser = JSON.parse(JSON.stringify(userRes.user));
    const plainServices = JSON.parse(JSON.stringify(services));
    return (
      <>
        <DashboardOverview user={plainUser} />
        <OrderForm services={plainServices} />
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
