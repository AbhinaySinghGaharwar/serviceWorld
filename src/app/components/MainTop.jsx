// Updated MainTop component with full Light & Dark Mode color system
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
      className="relative py-10 sm:py-16 md:py-20 px-4 sm:px-8 md:px-10 lg:px-14 overflow-hidden 
                 bg-[#F5F7FA] dark:bg-[#0F1117]"
    >
      {/* Floating Background Particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(35)].map((_, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -40, 0], opacity: [0.15, 0.7, 0.15] }}
            transition={{ duration: 4 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 2 }}
            className="absolute w-1 h-1 bg-[#4A6CF7] rounded-full"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, filter: "blur(1px)" }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        {/* LEFT — LOGIN SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6 p-6 sm:p-8 bg-white dark:bg-[#1A1F2B] rounded-2xl shadow-xl 
                     text-[#1A1A1A] dark:text-white"
        >
          <p className="text-[#4A6CF7] font-semibold text-lg">{websiteName}</p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold leading-tight drop-shadow"
          >
            SMM Panel – Fastest & Cheapest Services Worldwide
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}
            className="text-[#4A5568] dark:text-[#A0AEC3] text-lg"
          >
            Over{" "}
            <motion.span
              animate={{ textShadow: ["0 0 6px #4A6CF7", "0 0 12px #4A6CF7", "0 0 6px #4A6CF7"] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[#4A6CF7] font-semibold"
            >
              82,045,541+
            </motion.span>{" "}
            orders processed!
          </motion.p>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={`w-full px-4 py-3 bg-white dark:bg-[#1A1F2B] text-[#1A1A1A] dark:text-white 
                placeholder-[#4A5568] dark:placeholder-[#A0AEC3] border
                ${errors.email ? "border-red-500" : "border-[#4A6CF7]/30"}
                rounded-xl focus:ring-2 focus:ring-[#4A6CF7]`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className={`w-full px-4 py-3 bg-white dark:bg-[#1A1F2B] text-[#1A1A1A] dark:text-white 
                placeholder-[#4A5568] dark:placeholder-[#A0AEC3] border
                ${errors.password ? "border-red-500" : "border-[#4A6CF7]/30"}
                rounded-xl focus:ring-2 focus:ring-[#4A6CF7]`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* CAPTCHA */}
            <div className="w-full flex justify-center">
              <div className="scale-90 sm:scale-100">
                <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""} />
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="flex justify-between items-center text-sm text-[#4A5568] dark:text-[#A0AEC3]">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#4A6CF7]" /> Remember me
              </label>
              <a href="/resetpassword" className="text-[#4A6CF7] hover:underline">Forgot password?</a>
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl text-white font-semibold bg-[#4A6CF7] hover:bg-[#3f5ed8] shadow-lg"
            >
              {loading ? "Signing in..." : "Sign in"}
            </motion.button>

            {message && <p className="text-center text-[#4A6CF7] text-sm">{message}</p>}

            <p className="text-center text-sm text-[#4A5568] dark:text-[#A0AEC3]">
              Don’t have an account?{" "}
              <a href="/auth/signup" className="text-[#4A6CF7] font-semibold">Sign up</a>
            </p>
          </form>
        </motion.div>

        {/* RIGHT HERO IMAGE */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
          className="relative flex justify-center md:justify-end"
        >
          <motion.div
            animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.9, 1.05, 0.9] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute w-[350px] h-[350px] bg-[#4A6CF7]/20 blur-3xl rounded-full -z-10"
          />

          <motion.div animate={{ rotate: [0, 1.5, -1.5, 0] }} transition={{ duration: 6, repeat: Infinity }}
            className="relative w-64 h-64 md:w-[360px] md:h-[360px]"
          >
            <Image src="https://storage.perfectcdn.com/81013d/cisiri3e4fe0qu1o.webp" alt="hero" fill className="object-contain" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}