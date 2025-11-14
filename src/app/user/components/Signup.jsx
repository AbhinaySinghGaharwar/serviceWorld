"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { checkEmail, checkUsername, registerUser } from "@/lib/authentication";

const schema = yup.object().shape({
  username: yup.string().min(3, "Min 3 chars").required("Username required"),
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup.string().min(6, "Min 6 chars").required("Password required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
});

export default function SignupForm() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } =
    useForm({ resolver: yupResolver(schema) });

  const usernameValue = watch("username");
  const emailValue = watch("email");
  const passwordValue = watch("password");

  // Username availability check
  useEffect(() => {
    if (!usernameValue || usernameValue.length < 3) return setUsernameExists(false);
    const delay = setTimeout(async () => {
      const res = await checkUsername(usernameValue);
      setUsernameExists(res.status);
    }, 500);
    return () => clearTimeout(delay);
  }, [usernameValue]);

  // Email availability check
  useEffect(() => {
    if (!emailValue) return setEmailExists(false);
    const delay = setTimeout(async () => {
      const res = await checkEmail(emailValue);
      setEmailExists(res.status);
    }, 500);
    return () => clearTimeout(delay);
  }, [emailValue]);

  // Password Strength
  const getStrength = () => {
    if (!passwordValue) return 0;
    let s = 0;
    if (passwordValue.length >= 6) s++;
    if (/[A-Z]/.test(passwordValue)) s++;
    if (/[0-9]/.test(passwordValue)) s++;
    if (/[^A-Za-z0-9]/.test(passwordValue)) s++;
    return s;
  };

  // Submit Handler
  const onSubmit = async (data) => {
    if (usernameExists) return setMessage("Username already exists");
    if (emailExists) return setMessage("Email already exists");
    if (!captchaValue) return setMessage("Please complete CAPTCHA");

    setLoading(true);
    try {
      const res = await registerUser({ ...data, captcha: captchaValue });
      setMessage(res.message);
      router.push("/user/dashboard");
    } catch (err) {
      setMessage(err.error || "Signup failed");
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 bg-[#0e0e0f]">

      {/* 📌 WRAPPER: Vertical on mobile, Horizontal on large screen */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-12">

        {/* ⭐ LEFT PANEL (visible only on large screens) */}
        <div className="hidden lg:flex flex-col items-start justify-center w-1/2">
          <h2 className="text-4xl font-bold text-yellow-400 mb-4">
            Welcome to the Future 🚀
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Create your account and access our blazing-fast SMM dashboard,
            top-tier panel, exclusive services, and premium features.
          </p>
        </div>

        {/* ⭐ SIGNUP FORM (right side on large screens) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full p-8 bg-[#151517] border border-yellow-500/20 rounded-3xl shadow-[0_0_35px_rgba(255,221,64,0.15)] flex flex-col gap-4"
        >
          <h1 className="text-3xl font-bold text-center text-yellow-400">
            Create Account
          </h1>

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            className={`w-full px-4 py-3 bg-[#0e0e0f] border ${
              errors.username || usernameExists
                ? "border-red-500"
                : "border-yellow-500/20"
            } text-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none`}
          />
          {errors.username && <p className="text-red-400 text-sm">{errors.username.message}</p>}
          {usernameExists && <p className="text-red-400 text-sm">Username already taken</p>}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`w-full px-4 py-3 bg-[#0e0e0f] border ${
              errors.email || emailExists
                ? "border-red-500"
                : "border-yellow-500/20"
            } text-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none`}
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          {emailExists && <p className="text-red-400 text-sm">Email already exists</p>}

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className={`w-full px-4 py-3 bg-[#0e0e0f] border ${
                errors.password
                  ? "border-red-500"
                  : "border-yellow-500/20"
              } text-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none`}
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-yellow-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}

          {/* Password Strength */}
          <div className="h-2 w-full bg-[#0e0e0f] rounded border border-yellow-500/20">
            <div
              style={{ width: `${(getStrength() / 4) * 100}%` }}
              className="h-2 bg-yellow-400 rounded transition-all"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className={`w-full px-4 py-3 bg-[#0e0e0f] border ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-yellow-500/20"
              } text-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none`}
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-yellow-400"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm">{errors.confirmPassword.message}</p>
          )}

        {/* ReCAPTCHA */}
<div className="w-full flex justify-center">
  <div className="recaptcha-wrapper">
    <ReCAPTCHA
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      onChange={setCaptchaValue}
    />
  </div>
</div>


          {/* Submit Button */}
          <button
            onClick={handleSubmit(onSubmit)}
            className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-semibold shadow-[0_0_20px_rgba(255,221,64,0.4)] hover:shadow-[0_0_25px_rgba(255,221,64,0.6)] transition"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {/* Already have account */}
          <p className="text-center text-gray-400 mt-4">
            Already have an account?{" "}
            <a href="/auth/login" className="text-yellow-400 font-semibold">
              Login
            </a>
          </p>

          {/* Message */}
          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-yellow-400"
            >
              {message}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
