'use server'

import DashboardOverview from "./DashboardOverview";
import Loader from "../components/Loader";
import { getUserDetails } from "@/lib/userActions";
import { getWebsiteSettings } from "@/lib/getSiteSettings";

export default async function DashboardPage() {
    const user=await getUserDetails()
  const data = await getWebsiteSettings();
    return (
      <>
        <DashboardOverview user={user} serviceEnabled={data.services} />
    

      </>
    );
}
