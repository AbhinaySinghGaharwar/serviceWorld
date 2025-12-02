import SettingsPage from "./ClientPage"
import { getUserDetails } from "@/lib/userActions"
export default async function Page() {
  const user=await getUserDetails()
 

  return (
    <>
    <SettingsPage
    user={user}
    />
    </>
  )
}