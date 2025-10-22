"use client";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import SignupForm from "@/app/components/Signup";

export default function SignupPage() {
  return (
    <div className=" min-h-screen bg-gradient-to-r from-purple-400 to-indigo-500">
      <Header/>
      <SignupForm />
      <Footer/>
    </div>
  );
}
