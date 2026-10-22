"use client";

import { useState } from "react";
import { CheckCircle2, Copy, Check, AlertTriangle, Mail } from "lucide-react";
import type { Credentials } from "@/app/actions/admin";

type Props = {
  credentials: Credentials;
  onClose: () => void;
};

export default function CredentialsModal({ credentials, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  const rows: [string, string][] = [
    ["Name", credentials.name],
    ["Email", credentials.email],
    ["Login ID", credentials.loginId],
    ["Password", credentials.password ?? "Existing password (unchanged)"],
  ];

  async function handleCopy() {
    const text = [
      "Agentic LMS Login Details",
      ...rows.map(([label, value]) => `${label}: ${value}`),
      `Login: ${window.location.origin}/lms/login`,
    ].join("\n");

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-left shadow-2xl">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-10 w-10 text-emerald-500" />
          <div>
            <h3 className="font-display text-xl font-bold text-ink">Account ready</h3>
            <p className="text-sm text-slate-500">Login details generated successfully.</p>
          </div>
        </div>

        <dl className="mt-6 divide-y divide-slate-100 rounded-2xl border border-slate-200">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 px-4 py-3 text-sm">
              <dt className="text-slate-500">{label}</dt>
              <dd className="break-all text-right font-mono font-semibold text-ink">{value}</dd>
            </div>
          ))}
        </dl>

        {credentials.emailSent ? (
          <p className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <Mail className="h-4 w-4 shrink-0" /> Login details were emailed to {credentials.email}.
          </p>
        ) : (
          <p className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            Email could not be sent. Please copy these details and share them manually.
          </p>
        )}

        {credentials.note && <p className="mt-3 text-sm text-slate-500">{credentials.note}</p>}

        {credentials.password && (
          <p className="mt-3 text-xs text-slate-400">
            For security, this password is shown only once.
          </p>
        )}

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-ink transition hover:border-brand-purple hover:text-brand-purple"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy details"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-brand-gradient flex-1 rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}