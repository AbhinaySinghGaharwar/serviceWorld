"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, Send } from "lucide-react";

export default function ContactSupportPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.target);

    // Example API endpoint (you can replace)
    const res = await fetch("/api/support", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!data.success) setMessage("❌ " + data.message);
    else setMessage("✔ Message sent successfully! Our team will reply soon.");

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0F1117] text-gray-800 dark:text-gray-200 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">Contact Support</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Have questions or need help with your order? We're here for you.
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          <div className="bg-white dark:bg-[#1A1F2B] p-6 border border-gray-300 dark:border-[#2B3143] rounded-xl shadow text-center">
            <Mail className="mx-auto mb-3 h-8 w-8 text-gray-700 dark:text-gray-300" />
            <h3 className="font-semibold text-lg">Email Support</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              support@yoursmmpanel.com
            </p>
          </div>

          <div className="bg-white dark:bg-[#1A1F2B] p-6 border border-gray-300 dark:border-[#2B3143] rounded-xl shadow text-center">
            <MessageCircle className="mx-auto mb-3 h-8 w-8 text-gray-700 dark:text-gray-300" />
            <h3 className="font-semibold text-lg">Chat / WhatsApp</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              +91 9876543210
            </p>
          </div>

          <div className="bg-white dark:bg-[#1A1F2B] p-6 border border-gray-300 dark:border-[#2B3143] rounded-xl shadow text-center">
            <Phone className="mx-auto mb-3 h-8 w-8 text-gray-700 dark:text-gray-300" />
            <h3 className="font-semibold text-lg">Phone Support</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Mon–Fri, 10AM to 6PM IST
            </p>
          </div>

        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-[#1A1F2B] border border-gray-300 dark:border-[#2B3143] rounded-2xl p-8 shadow">
          <h2 className="text-xl font-bold mb-6">Send us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block font-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="w-full mt-1 bg-gray-100 dark:bg-[#0F1117] border border-gray-300 dark:border-[#2B3143] rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block font-semibold">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="w-full mt-1 bg-gray-100 dark:bg-[#0F1117] border border-gray-300 dark:border-[#2B3143] rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block font-semibold">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="w-full mt-1 bg-gray-100 dark:bg-[#0F1117] border border-gray-300 dark:border-[#2B3143] rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block font-semibold">Message</label>
              <textarea
                name="message"
                rows="5"
                placeholder="Write your message..."
                required
                className="w-full mt-1 bg-gray-100 dark:bg-[#0F1117] border border-gray-300 dark:border-[#2B3143] rounded-lg px-4 py-2"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 bg-gray-800 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition"
            >
              {loading ? "Sending..." : "Send Message"}
              <Send className="w-5 h-5" />
            </button>

            {message && (
              <p
                className={`text-center mt-3 ${
                  message.startsWith("✔") ? "text-green-500" : "text-red-400"
                }`}
              >
                {message}
              </p>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}
