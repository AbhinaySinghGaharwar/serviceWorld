'use server'
import LoginForm from "./LoginForm";
import Navbar from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getSetting } from "@/lib/adminServices";
export default async function Login(){
    const logo=await getSetting('logo')
    const siteName= await getSetting('siteName')
   return (
    <>
    <div className="bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600">
<Navbar logo={logo}/>
    <LoginForm/>
    <Footer siteName={siteName}/>
    </div>
    
    </>
   ) 
}