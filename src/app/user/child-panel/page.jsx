'use server'
import { getChildPanelSettings } from "@/lib/adminServices";
import ChildPanelPageClient from "./ChildPanelPageClient";
import { getAllPaymentMethods } from "@/lib/adminServices";

export default async function Page() {
  const settings = await getChildPanelSettings();
  const payment_methods= await getAllPaymentMethods()

  return <ChildPanelPageClient settings={settings} paymentMethods={payment_methods}  />;
}
