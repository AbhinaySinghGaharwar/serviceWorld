"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup.string().required("Password required"),
});

export default function LoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    if (!captchaValue) { setMessage("Complete CAPTCHA"); return; }

    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", { ...data, captcha: captchaValue });
      setMessage(res.data.message);
      router.push("/dashboard");
    } catch (err) {
      setMessage(err.response?.data.error || "Login failed");
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg flex flex-col gap-4"
    >
      <h1 className="text-3xl font-bold text-center text-gray-900">Login</h1>

      <input type="email" placeholder="Email" {...register("email")}
        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.email ? "border-red-500" : ""}`} />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <input type="password" placeholder="Password" {...register("password")}
        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.password ? "border-red-500" : ""}`} />
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

      <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={value => setCaptchaValue(value)} />

      <button onClick={handleSubmit(onSubmit)}
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition">
        {loading ? "Logging in..." : "Login"}
      </button>

      {message && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-black">{message}</motion.p>}
    </motion.div>
  );
}
