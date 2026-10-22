"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { submitAdmission } from "@/app/actions/admission"; // 🆕 (a) server action import

type AdmissionFormProps = {
  courseSlug: string;
  courseTitle: string;
};

const educationOptions = [
  "Matric / O-Levels",
  "Intermediate / A-Levels",
  "Bachelor's Degree",
  "Master's Degree",
  "Other",
];

const experienceOptions = ["No experience", "Beginner", "Intermediate", "Professional"];

export default function AdmissionForm({ courseSlug, courseTitle }: AdmissionFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // 🆕 (b) error message ke liye

  // 🆕 (c) naya handleSubmit: ab data server par jata hai
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await submitAdmission(formData);

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
          Application submitted!
        </h3>
        <p className="mt-2 max-w-md text-slate-600">
          Thank you for applying to <strong>{courseTitle}</strong>. Once your
          admission is approved, you will receive your LMS login details by email.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-ink outline-none transition focus:border-brand-purple focus:ring-4 focus:ring-violet-100";
  const labelClass = "mb-2 block text-sm font-medium text-slate-700";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10"
    >
      {/* 🆕 (d) course ka naam chupke se server ko bhejne ke liye */}
      <input type="hidden" name="courseSlug" value={courseSlug} />

      <div className="mb-8 rounded-2xl bg-violet-50 px-5 py-4 text-sm text-slate-700">
        Applying for: <span className="font-semibold text-brand-purple">{courseTitle}</span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelClass}>Full Name *</label>
          <input id="fullName" name="fullName" required className={inputClass} placeholder="Your full name" />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>Email *</label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="you@example.com" />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>Phone / WhatsApp *</label>
          <input id="phone" name="phone" type="tel" required className={inputClass} placeholder="+92 300 0000000" />
        </div>

        <div>
          <label htmlFor="dateOfBirth" className={labelClass}>Date of Birth</label>
          <input id="dateOfBirth" name="dateOfBirth" type="date" className={inputClass} />
        </div>

        <div>
          <label htmlFor="country" className={labelClass}>Country *</label>
          <input id="country" name="country" required className={inputClass} placeholder="Pakistan" />
        </div>

        <div>
          <label htmlFor="city" className={labelClass}>City *</label>
          <input id="city" name="city" required className={inputClass} placeholder="Your city" />
        </div>

        <div>
          <label htmlFor="education" className={labelClass}>Highest Education *</label>
          <select id="education" name="education" required defaultValue="" className={inputClass}>
            <option value="" disabled>Select education</option>
            {educationOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="experience" className={labelClass}>Programming Experience</label>
          <select id="experience" name="experience" defaultValue="" className={inputClass}>
            <option value="" disabled>Select level</option>
            {experienceOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="motivation" className={labelClass}>Why do you want to join this course?</label>
          <textarea
            id="motivation"
            name="motivation"
            rows={4}
            className={inputClass}
            placeholder="Tell us about your goals..."
          />
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm text-slate-600">
        <input type="checkbox" required className="mt-1 h-4 w-4 accent-violet-600" />
        I confirm that the information provided is correct.
      </label>

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
        {loading ? "Submitting..." : "Submit Application"}
        {!loading && <Send className="h-5 w-5" />}
      </button>
    </form>
  );
}