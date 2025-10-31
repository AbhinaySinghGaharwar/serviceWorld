// Server Component (default)
import { getServices } from "@/lib/services";
import ServicesList from "../components/ServicesList";

export default async function ServicesPage() {
  const res = await getServices();

  if (res.error) {
    return (
      <p className="text-center text-red-500">
        ⚠️ Failed to fetch services: {res.error}
      </p>
    );
  }

  return <ServicesList services={res} />;
}
