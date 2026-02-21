"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface LeadFormProps {
  brandSlug: string;
  brandName: string;
}

export default function LeadForm({ brandSlug, brandName }: LeadFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const { error } = await supabase.from("leads").insert([
      {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        comments: formData.get("comments"),
        brand_slug: brandSlug,
        brand_name: brandName,
      },
    ]);

    if (error) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    e.currentTarget.reset();
    setStep(1);
  }

  if (success) {
    return (
      <div className="w-full lg:max-w-md mx-auto bg-green-50 border border-green-200 rounded-2xl p-6 shadow-sm">
        <p className="text-green-700 font-medium text-center">
          ✅ Your cancellation request has been submitted.
          Our support team will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full lg:max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8 transition-all duration-300">



      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          Get Help Cancelling {brandName}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Complete the short form below and our support team will assist you.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Step {step} of 2</span>
          <span>{step === 1 ? "Your Details" : "Issue Details"}</span>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className={`bg-indigo-600 h-2 transition-all duration-500 ${
              step === 1 ? "w-1/2" : "w-full"
            }`}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">

            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                name="name"
                required
                placeholder="John Doe"
                className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
                hover:border-indigo-300 transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="john@email.com"
                className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
                hover:border-indigo-300 transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Phone Number (Optional)
              </label>
              <input
                name="phone"
                placeholder="(555) 000-0000"
                className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
                hover:border-indigo-300 transition"
              />
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl
              transition duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              Continue →
            </button>

          </div>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">

            <div>
              <label className="text-sm font-medium text-gray-700">
                Additional Comments
              </label>
              <textarea
                name="comments"
                rows={4}
                required
                placeholder={`Describe your issue cancelling ${brandName}...`}
                className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
                hover:border-indigo-300 transition"
              />
            </div>

            <div className="flex gap-3">

              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-300 rounded-xl py-3 font-medium hover:bg-gray-50 transition"
              >
                ← Back
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3
                rounded-xl transition duration-200 shadow-md hover:shadow-lg active:scale-[0.98]
                disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>

            </div>

          </div>
        )}

        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

      </form>

      <p className="text-xs text-gray-600 mt-6 text-center">
        🔒 Your information is secure and never shared.
        Submitting this form does not create any paid obligation. If optional paid assistance is available, details will be explained clearly before any charge.

      </p>

    </div>
  );
}
