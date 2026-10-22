"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { services, budgetOptions } from "@/data/services";
import { submitQuote } from "@/app/actions/quote"; // 🆕 (a) server action import

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // 🆕 (b) error message ke liye

  // 🆕 (c) naya handleSubmit: ab data server par jata hai
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await submitQuote(formData);

    setLoading(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-emerald-200 bg-emerald-50 p-12 text-center">
        <CheckCircle2 className="h-14 w-14 text-emerald-500" />
        <h3 className="font-display mt-4 text-2xl font-bold text-ink">
          Request received!
        </h3>
        <p className="mt-2 max-w-md text-slate-600">
          Thank you for contacting Agentic. Our team will get back to you
          within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 font-semibold text-brand-purple hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-ink outline-none transition focus:border-brand-purple focus:ring-4 focus:ring-violet-100";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
            Full Name *
          </label>
          <input id="name" name="name" required className={inputClass} placeholder="John Smith" />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
            Email *
          </label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="john@company.com" />
        </div>

        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-medium text-slate-700">
            Company
          </label>
          <input id="company" name="company" className={inputClass} placeholder="Company name" />
        </div>

        <div>
          <label htmlFor="service" className="mb-2 block text-sm font-medium text-slate-700">
            Service *
          </label>
          <select id="service" name="service" required className={inputClass} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.title} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="budget" className="mb-2 block text-sm font-medium text-slate-700">
            Estimated Budget
          </label>
          <select id="budget" name="budget" className={inputClass} defaultValue="">
            <option value="" disabled>
              Select a range
            </option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
            Project Details *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className={inputClass}
            placeholder="Tell us about your project, goals and timeline..."
          />
        </div>
      </div>

      {/* 🆕 (d) agar server koi error bheje to yahan laal box mein dikhega */}
      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-brand-gradient mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-4 font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Sending..." : "Request a Quote"}
        {!loading && <Send className="h-5 w-5" />}
      </button>
    </form>
  );
}