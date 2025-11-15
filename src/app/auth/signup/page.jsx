"use client";

import SignupForm from "@/app/user/components/Signup";
export default function SignupPage() {
  return (
    <div className="relative min-h-screen bg-[#0e0e0f] overflow-hidden">
  <div className="absolute inset-0 -z-10">
    <div className="w-[450px] h-[450px] bg-gradient-to-br from-yellow-600 via-yellow-400 to-yellow-700 blur-3xl rounded-full opacity-20 absolute top-1/3 left-1/3" />
  </div>

 
      <SignupForm />

</div>

     
 
  );
}
