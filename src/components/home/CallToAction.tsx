import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <div className="bg-brand-gradient mx-auto max-w-7xl rounded-3xl px-8 py-16 text-center text-white shadow-xl shadow-violet-500/20">
        <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
          Ready to build the future with AI?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/85">
          Whether you need an AI solution for your business or want to become
          an AI developer, Agentic is here to help.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/services"
            className="rounded-xl bg-white px-7 py-3.5 font-semibold text-brand-purple transition hover:bg-slate-100"
          >
            Start a Project
          </Link>
          <Link
            href="/learning"
            className="rounded-xl border border-white/60 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
          >
            Enroll in a Course
          </Link>
        </div>
      </div>
    </section>
  );
}