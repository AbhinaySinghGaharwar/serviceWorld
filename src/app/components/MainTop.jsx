"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUser } from "@/lib/authentication";

const schema = yup.object().shape({
  email: yup.string().email("Enter a valid email").required("Email required"),
  password: yup.string().required("Password required"),
});

export default function MainTop({ websiteName }) {
  const router = useRouter();
  const recaptchaRef = useRef(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setMessage("");
    const captcha = recaptchaRef.current?.getValue();

    if (!captcha) {
      setMessage("Please complete the CAPTCHA.");
      return;
    }

    setLoading(true);

    try {
      const res = await loginUser({ ...data, captcha });

      if (!res.success) {
        setMessage(res.message || res.error);
      } else {
        router.replace("/user/dashboard");
      }
    } catch (err) {
      setMessage(err?.message || "Login failed.");
    } finally {
      recaptchaRef.current?.reset();
      setLoading(false);
    }
  };

  return (
    <section
      id="main-top"
      className="relative  py-10 sm:py-16 md:py-20 px-4 sm:px-8 md:px-10 lg:px-14 overflow-hidden "
    >
      {/* ✨ Floating Golden Particles Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(35)].map((_, i) => (
          <motion.span
            key={i}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.9, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

        {/* LEFT — LOGIN BOX */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6  p-6 sm:p-8"
        >
          <p className="text-yellow-400 font-semibold text-lg">
            {websiteName}
          </p>

          <motion.h1
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8 }}
  className="text-3xl md:text-4xl font-bold text-gray-200 leading-tight
             drop-shadow-[0_0_20px_rgba(255,221,64,0.25)]"
>
  SMM Panel – Fastest & Cheapest Services Worldwide
</motion.h1>

<motion.p
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1, delay: 0.2 }}
  className="text-gray-400 text-lg"
>
  Over{" "}
  <motion.span
    animate={{ textShadow: ["0 0 4px #FFDD40", "0 0 10px #FFDD40", "0 0 4px #FFDD40"] }}
    transition={{ repeat: Infinity, duration: 2 }}
    className="text-yellow-400 font-semibold"
  >
    82,045,541+
  </motion.span>{" "}
  orders processed!
</motion.p>


          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={`w-full px-4 py-3 bg-[#0e0e0f] border ${
                  errors.email ? "border-red-500" : "border-yellow-500/20"
                } text-gray-300 placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className={`w-full px-4 py-3 bg-[#0e0e0f] border ${
                  errors.password ? "border-red-500" : "border-yellow-500/20"
                } text-gray-300 placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none`}
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* reCAPTCHA */}
            <div className="w-full flex justify-center">
              <div className="recaptcha-wrapper scale-90 sm:scale-100">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                />
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-xs sm:text-sm text-gray-400">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="border-yellow-500/20" />
                Remember me
              </label>
              <a href="/resetpassword" className="text-yellow-400 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl text-black font-semibold
                         bg-gradient-to-r from-yellow-600 to-yellow-400
                         shadow-[0_0_20px_rgba(255,221,64,0.4)]
                         hover:shadow-[0_0_25px_rgba(255,221,64,0.6)]
                         transition"
            >
              {loading ? "Signing in..." : "Sign in"}
            </motion.button>

            {message && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-yellow-400 text-sm"
              >
                {message}
              </motion.p>
            )}

            <p className="text-center text-gray-400 text-sm">
              Don’t have an account?{" "}
              <a href="/auth/signup" className="text-yellow-400 font-semibold">
                Sign up
              </a>
            </p>
          </form>
        </motion.div>

        {/* RIGHT — HERO IMAGE WITH GLOW AURA */}
         {/* RIGHT SIDE — Animated Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center md:justify-end"
        >
          {/* Glowing Aura */}
          <motion.div
            animate={{
              opacity: [0.15, 0.35, 0.15],
              scale: [0.9, 1.05, 0.9],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute w-[350px] h-[350px] bg-yellow-500/20 blur-3xl rounded-full -z-10"
          />

          {/* Image */}
          <motion.div
            animate={{ rotate: [0, 1.5, -1.5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="relative w-64 h-64 md:w-[360px] md:h-[360px]"
          >
            <Image
              src="https://storage.perfectcdn.com/81013d/cisiri3e4fe0qu1o.webp"
              alt="hero"
              fill
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
