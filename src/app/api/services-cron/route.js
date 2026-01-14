import { getEnabledServices } from "@/lib/services";
import { getProvidersAction } from "@/lib/providerActions";
import { importServicesAction } from "@/lib/services";

export async function GET() {
  const services = await getEnabledServices();     // DB services
  const providers = await getProvidersAction();   // Providers
console.log(services.plain)
  // Fetch all provider services
  const allServices = await Promise.all(
    providers.map(async (p) => {
      return await importServicesAction({
        url: p.providerUrl,
        api: p.apiKey,
      });
    })
  );

  // Flatten provider services
  const providerServices = allServices.flat();

  // Compare + merge
  const updatedServices = services.plain.map((c) => {
  const match = providerServices.find(
    (s) => s.service === c.service
  );

  if (match) {
  return {
    ...c,
    category: match.category ?? c.category,
    rate: match.rate ?? c.rate,
    min: match.min ?? c.min,
    max: match.max ?? c.max,
    status: match.status ?? c.status ?? "enabled",
  };
}

  // ❌ Not found in provider → disable it
  return {
    ...c,
    status: "disabled",
  };
});


  

  return Response.json({ success: true, });
}
