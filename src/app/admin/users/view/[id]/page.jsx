'use server'

import ViewUserDetails from "./ViewUserDetails"
import { getUserById } from "@/lib/adminServices"

export default async function ViewUser({params}){
  const {id}= await params

  const user=await getUserById(id)
  console.log(user)
  return (
    <>
    <ViewUserDetails user={user.user} />
    </>
  )
}