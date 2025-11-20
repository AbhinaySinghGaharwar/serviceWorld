"use client";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0F1117] text-gray-800 dark:text-gray-200 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#1A1F2B] border border-gray-300 dark:border-[#2B3143] rounded-2xl p-8 shadow">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

        <p className="mb-4">
          These Terms of Service govern your use of our SMM Panel. By creating an
          account or placing an order, you agree to the following conditions.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Using Our Panel</h2>
        <p className="mb-4">
          You must be at least 18 years old and agree to provide accurate account
          information. Misuse, bot attacks, or exploitation of system loopholes may
          result in account suspension.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Prohibited Activities</h2>
        <ul className="list-disc ml-6 mb-4 space-y-2">
          <li>Ordering for illegal, harmful, or abusive content</li>
          <li>Using fake accounts, bots, or scripts</li>
          <li>Creating disputes after successful order delivery</li>
          <li>Reselling panel vulnerabilities</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Order Delivery</h2>
        <p className="mb-4">
          Delivery times are estimates. Depending on service provider availability,
          delays may occur. We do not guarantee exact timelines or guarantee engagement
          quality unless explicitly mentioned.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Drops & Refill</h2>
        <p className="mb-4">
          Only services marked with “Refill” support drops. Refill duration varies
          depending on the provider. Refill requests submitted after the period ends
          will not be accepted.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Pricing</h2>
        <p className="mb-4">
          Prices may increase or decrease at any time due to API changes, provider
          rates, or market fluctuations. No refunds are provided for price changes.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Account Termination</h2>
        <p className="mb-4">
          We may suspend or terminate accounts violating our policies, abusing the
          system, or conducting fraudulent activity.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Liability Limitations</h2>
        <p className="mb-4">
          We are not responsible for:
        </p>
        <ul className="list-disc ml-6 mb-4 space-y-2">
          <li>Loss of followers, likes, or any social media performance</li>
          <li>Account bans due to unsafe user activities</li>
          <li>Issues caused by external APIs or network errors</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Edits to Terms</h2>
        <p className="mb-4">
          We may modify the Terms anytime. Continued use of the panel means you accept
          the updated conditions.
        </p>

        <p className="mt-8 font-semibold">Last Updated: {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}
