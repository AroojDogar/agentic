import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Sparkles, ArrowLeft, ShieldCheck, GraduationCap, Users } from "lucide-react";
import LoginForm from "@/components/lms/LoginForm";
import { getCurrentUser, dashboardPath } from "@/lib/auth";

export const metadata: Metadata = {
  title: "LMS Login",
};

export default async function LoginPage() {
  // Pehle se login ho to seedha dashboard par bhej dein
  const user = await getCurrentUser();
  if (user) redirect(dashboardPath[user.role]);

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left: brand panel */}
      <div className="bg-brand-gradient relative hidden overflow-hidden p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-white/10 blur-2xl" />

        <Link href="/" className="relative flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="font-display text-2xl font-bold">Agentic</span>
        </Link>

        <div className="relative">
          <h1 className="font-display text-4xl font-bold leading-tight">
            Welcome to the Agentic Learning Portal
          </h1>
          <p className="mt-4 max-w-md text-white/85">
            One platform for administrators, teachers and students to manage
            admissions, courses and learning.
          </p>

          <div className="mt-10 space-y-4">
            {[
              { icon: ShieldCheck, text: "Administrators manage admissions & users" },
              { icon: Users, text: "Teachers manage courses & students" },
              { icon: GraduationCap, text: "Students access their courses" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-white/90">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-sm text-white/70">© {new Date().getFullYear()} Agentic</p>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center bg-slate-50 px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand-purple"
          >
            <ArrowLeft className="h-4 w-4" /> Back to website
          </Link>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10">
            <h2 className="font-display text-3xl font-bold text-ink">Sign in</h2>
            <p className="mt-2 text-slate-500">
              Use the credentials sent to your email.
            </p>
            <div className="mt-8">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}