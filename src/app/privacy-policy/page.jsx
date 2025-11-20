"use client";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0F1117] text-gray-800 dark:text-gray-200 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#1A1F2B] border border-gray-300 dark:border-[#2B3143] rounded-2xl p-8 shadow">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          This Privacy Policy explains how we collect, use, and protect your information
          when you use our SMM Panel services. By accessing our platform, you agree to
          the practices described here.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          We collect essential data such as your email address, username, IP address,
          order history, and payment details. We never store full payment card data.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc ml-6 mb-4 space-y-2">
          <li>To process and deliver SMM orders</li>
          <li>To provide customer support</li>
          <li>To improve system performance and security</li>
          <li>To prevent fraud, abuse, or unauthorized access</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Cookies</h2>
        <p className="mb-4">
          We use cookies to enhance user experience, store login sessions, and track
          panel performance. You may disable cookies, but some features may not work
          properly.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Protection</h2>
        <p className="mb-4">
          We use advanced security measures including encryption, firewalls, and secure
          servers. However, no system is 100% secure, and we cannot guarantee absolute
          data protection.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Third-Party Services</h2>
        <p className="mb-4">
          Our panel may use external APIs and third-party providers to complete SMM
          orders. These services may collect limited data required for processing.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Data Sharing</h2>
        <p className="mb-4">
          We do NOT sell or share personal data with any third party except:
        </p>
        <ul className="list-disc ml-6 mb-4 space-y-2">
          <li>Legal authorities when required</li>
          <li>Trusted service providers for order processing</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. User Rights</h2>
        <p className="mb-4">
          You may request data deletion, modification, or account closure anytime by
          contacting support.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this policy periodically. Continued use of the panel means you
          accept the new terms.
        </p>

        <p className="mt-8 font-semibold">Last Updated: {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}
