'use server'
import LoginForm from "./LoginForm";
export default async function Login(){
   
    
   return (
    <>
   <div className="relative bg-[#0e0e0f] overflow-hidden">
  <div className="absolute inset-0 -z-10">
    <div className="w-[400px] h-[400px] bg-gradient-to-br from-yellow-600 via-yellow-400 to-yellow-700 blur-3xl rounded-full absolute top-1/3 left-1/4 opacity-20" />
  </div>

    <LoginForm/>
   
</div>



    
    </>
   ) 
}