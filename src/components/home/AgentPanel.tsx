"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";

const steps = [
  "Read 42 new applications from the website",
  "Checked each one against the course requirements",
  "Shortlisted 12 applicants for Python for AI & ML",
  "Drafted personal replies in English and Urdu",
  "Sent 12 emails and updated the LMS",
];

export default function AgentPanel() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    // Jo log motion band rakhte hain, unhein seedha poora result dikhayein
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => setVisible(steps.length), 0);
      return () => clearTimeout(t);
    }

    let current = 0;
    const id = setInterval(() => {
      current = current >= steps.length + 3 ? 0 : current + 1;
      setVisible(Math.min(current, steps.length));
    }, 1100);
    return () => clearInterval(id);
  }, []);

  const done = visible === steps.length;

  return (
    <div className="rounded-2xl bg-spruce p-6 text-white shadow-[0_40px_80px_-30px_rgba(14,59,46,0.55)] sm:p-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <p className="text-sm font-medium">Admissions assistant</p>
        <span className="rounded-full bg-saffron px-2.5 py-1 text-xs font-semibold text-spruce">
          Example run
        </span>
      </div>

      <ol className="mt-6 space-y-4 font-mono text-[13px] leading-relaxed">
        {steps.map((step, i) => {
          const finished = i < visible;
          const running = i === visible;
          return (
            <li
              key={step}
              className={`flex items-start gap-3 transition-opacity duration-300 ${
                finished ? "opacity-100" : running ? "opacity-60" : "opacity-0"
              }`}
            >
              {finished ? (
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
              ) : (
                <Loader2 className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-white/60" />
              )}
              <span>{step}</span>
            </li>
          );
        })}
      </ol>

      <p
        className={`mt-6 border-t border-white/10 pt-4 text-sm text-white/70 transition-opacity duration-500 ${
          done ? "opacity-100" : "opacity-0"
        }`}
      >
        Finished in 38 seconds. Work that usually takes a staff member most of a morning.
      </p>
    </div>
  );
}