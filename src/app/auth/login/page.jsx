"use client";
import LoginForm from "@/app/components/Login";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
export default function LoginPage() {
  return (
    <div className=" min-h-screen bg-gradient-to-r from-purple-400 to-indigo-500">
      <Header/>
    <LoginForm/>
    <Footer/> 
    </div>
  );
}
