'use server'
import { getDeletedUserById } from "@/lib/adminServices";
import DetailsPage from "./DetailsPage";
export default async function DeletedUser({params}){
const {id}=await params
const user= await getDeletedUserById(id)
return (
    <>
    <DetailsPage user={user.user} />
    </>
)
}