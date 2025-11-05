'use server'
import { getAllUsers ,getDeletedUsers} from "@/lib/adminServices"
import AllUsers from "./AllUsers"
export default async function User() {
  const users=await getAllUsers()
  const dusers=await getDeletedUsers()
 console.log(dusers)
  return(
    <>
    <AllUsers users={users.users} dusers={dusers.users}/>
    </>
  )
}