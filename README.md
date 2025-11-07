













Background → bg-[#0e0e0f]

Card background → bg-[#151517]

Border → border-yellow-500/20

Accent text → text-yellow-400

Typography → consistent bold section titles, text-gray-300 body text

Buttons → dark yellow hover glow












// Server Component (default)
import { getServices } from "@/lib/services";
import ServicesList from "../components/ServicesList";
import { getWebsiteSettings } from "@/lib/adminServices";
import { FaTools } from "react-icons/fa";

export default async function ServicesPage() {
  const res = await getServices();
  const data = await getWebsiteSettings();
  const result=await JSON.parse(data.plainsettings)

  // 🟡 Handle error fetching services
  if (res.error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <p className="text-red-400 text-lg font-medium mb-2">
          ⚠️ Failed to fetch services:
        </p>
        <p className="text-gray-400">{res.error}</p>
      </div>
    );
  }

  // 🔴 When services are turned OFF by admin
  if (!result.services) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
        <div className="bg-[#151517] border border-yellow-500/20 rounded-2xl p-10 max-w-md shadow-[0_0_25px_rgba(234,179,8,0.08)]">
          <FaTools className="text-yellow-400 text-5xl mx-auto mb-4 animate-pulse" />
          <h1 className="text-2xl font-semibold text-yellow-400 mb-2">
            Services Temporarily Unavailable
          </h1>
          <p className="text-gray-300 leading-relaxed">
            Our service section is currently disabled by the administrator for
            maintenance or updates. <br /> Please check back later.
          </p>
          <p className="text-sm text-gray-500 mt-3 italic">
            We’ll be back soon — thank you for your patience!
          </p>
        </div>
      </div>
    );
  }

  // 🟢 Show services normally
  return <ServicesList services={res} />;
}
