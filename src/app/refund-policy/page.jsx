"use client";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0F1117] text-gray-800 dark:text-gray-200 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#1A1F2B] border border-gray-300 dark:border-[#2B3143] rounded-2xl p-8 shadow">
        <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>

        <p className="mb-4">
          This Refund Policy applies to all purchases made on our SMM Panel. By placing
          an order, you acknowledge and agree to the following terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. No Refunds After Order Starts</h2>
        <p className="mb-4">
          Once an order is submitted and processing has begun, refunds cannot be issued.
          The system automatically delivers orders through external service providers,
          making cancellation impossible.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Failed or Partial Orders</h2>
        <p className="mb-4">
          If an order fails or is partially delivered due to provider error, the
          remaining amount will be refunded to your account balance, not your payment
          method.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Refill Instead of Refund</h2>
        <p className="mb-4">
          Services marked with “Refill” provide replacement for drops. Refunds are not
          issued for refill-supported services unless the refill period is expired.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Balance Refunds</h2>
        <p className="mb-4">
          Funds added to your account balance are non-refundable under any
          circumstances, as they may already be used to reserve resources with service
          providers.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Chargebacks & Disputes</h2>
        <p className="mb-4">
          Opening chargebacks or payment disputes will result in instant account
          suspension. All proofs will be provided to the payment gateway to counter the
          dispute.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Unlawful Usage</h2>
        <p className="mb-4">
          If your order violates social media rules or local laws, no refund will be
          issued.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Cancellation</h2>
        <p className="mb-4">
          Orders that are “Pending” may sometimes be canceled upon request depending on
          API status, but this is not guaranteed.
        </p>

        <p className="mt-8 font-semibold">Last Updated: {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}
