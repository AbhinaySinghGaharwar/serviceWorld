'use server'
import { getChildPanelSettings } from "@/lib/adminServices";
import ChildPanel from "./ChildPanel";

export default async function Page() {
  const settings = await getChildPanelSettings();
console.log(settings)
  return <ChildPanel initialSettings={settings} />;
}
