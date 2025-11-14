"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { FaEye, FaEyeSlash ,FaGoogle  } from "react-icons/fa";
import { loginUser } from "@/lib/authentication";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup.string().required("Password required"),
});

export default function LoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
 const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    if (!captchaValue) {
      setMessage("⚠️ Please complete the CAPTCHA");
      return;
    }

    setLoading(true);
    try {
      const res = await loginUser({ ...data, captcha: captchaValue });
      if (res.error) {
        setMessage(res.error);
        setLoading(false);
        return;
      }

      setMessage(res.message);
      router.push("/user/dashboard");
    } catch {
      setMessage("❌ Login failed");
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e0e0f] px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#151517] border border-yellow-500/20 p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col gap-5"
      >
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-yellow-400 drop-shadow-md">
          Login
        </h1>

        {/* Email Input */}
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className={`w-full px-4 py-3 rounded-xl bg-[#0e0e0f] border border-yellow-500/20 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition ${
              errors.email ? "border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password")}
            className={`w-full px-4 py-3 rounded-xl bg-[#0e0e0f] border border-yellow-500/20 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition ${
              errors.password ? "border-red-500 focus:ring-red-500" : ""
            }`}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-yellow-400 transition cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>

          {errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* ReCAPTCHA */}
        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={(value) => setCaptchaValue(value)}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 
          text-black font-semibold rounded-xl shadow-[0_0_20px_rgba(255,255,0,0.15)]
          hover:shadow-[0_0_25px_rgba(255,255,0,0.35)] transition active:scale-[0.98] disabled:opacity-70"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup Link */}
        <p className="text-center text-gray-300 text-sm">
          Don’t have an account?{" "}
          <span
            className="text-yellow-400 font-semibold hover:underline cursor-pointer"
            onClick={() => router.push("/auth/signup")}
          >
            Sign Up
          </span>
        </p>
         {/* Google Sign Up */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 mt-2 rounded-xl flex items-center justify-center gap-2 bg-[#0e0e0f] border border-yellow-500/20 text-gray-300 font-semibold hover:text-yellow-400 hover:shadow-[0_0_20px_rgba(255,221,64,0.4)] transition"
        >
          <FaGoogle className="text-yellow-400" /> Sign up with Google
        </button>

        {/* Message */}
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-yellow-400 text-sm mt-2"
          >
            {message}
          </motion.p>
        )}
      </motion.div>
      
    </div>
  );
}
