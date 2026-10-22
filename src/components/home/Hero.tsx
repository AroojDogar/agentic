import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const stats = [
  { value: "50+", label: "AI Projects Delivered" },
  { value: "1,000+", label: "Students Trained" },
  { value: "20+", label: "Global Clients" },
  { value: "24/7", label: "AI Support" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      {/* Colourful background blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-purple/30 blur-3xl" />
      <div className="pointer-events-none absolute top-20 -right-32 h-96 w-96 rounded-full bg-brand-cyan/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-brand-pink/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-1.5 text-sm font-medium text-brand-purple shadow-sm">
          <Sparkles className="h-4 w-4" />
          Building the Future with Agentic AI
        </span>

        <h1 className="font-display mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
          Develop. Learn. Automate.{" "}
          <span className="text-gradient">All with AI.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Agentic is an AI development centre, learning academy and service
          provider, helping businesses build intelligent solutions and
          empowering people with future-ready AI skills.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/services"
            className="bg-brand-gradient inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:opacity-90"
          >
            Explore Services <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/learning"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 font-semibold text-ink transition hover:border-brand-purple hover:text-brand-purple"
          >
            Browse Courses
          </Link>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white bg-white/70 p-5 shadow-sm backdrop-blur"
            >
              <p className="font-display text-gradient text-3xl font-bold leading-tight">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}