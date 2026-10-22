"use client";

import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { login } from "@/app/actions/auth";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-ink outline-none transition focus:border-brand-purple focus:ring-4 focus:ring-violet-100";

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="identifier" className="mb-2 block text-sm font-medium text-slate-700">
          Email or Student ID
        </label>
        <input
          id="identifier"
          name="identifier"
          required
          autoComplete="username"
          className={inputClass}
          placeholder="you@example.com or AGT-2026-0001"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
          placeholder="••••••••"
        />
      </div>

      {state?.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="bg-brand-gradient inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-4 font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign In"}
        {!pending && <LogIn className="h-5 w-5" />}
      </button>
    </form>
  );
}