'use server'
import { getServices } from "@/lib/services";
import ServicesPage from "./ServicesPage";

export default async function Services() {
const services=await getServices()


  return (
   <>
   <ServicesPage services={services.plain}/>
   </>
  );
}
