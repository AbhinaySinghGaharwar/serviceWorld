'use server'
import LoginForm from "./LoginForm";
import Navbar from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getWebsiteSettings } from "@/lib/adminServices";
export default async function Login(){
    const siteSetting=await getWebsiteSettings()
    const settings=await JSON.parse(siteSetting.plainsettings)
    
   return (
    <>
   <div className="relative bg-[#0e0e0f] overflow-hidden">
  <div className="absolute inset-0 -z-10">
    <div className="w-[400px] h-[400px] bg-gradient-to-br from-yellow-600 via-yellow-400 to-yellow-700 blur-3xl rounded-full absolute top-1/3 left-1/4 opacity-20" />
  </div>
<Navbar logo={settings.logo }/>
    <LoginForm/>
    <Footer siteName={settings.siteName}/>
</div>



    
    </>
   ) 
}