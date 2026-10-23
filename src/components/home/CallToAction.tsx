import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-3xl bg-spruce px-8 py-14 text-white lg:grid-cols-12 lg:items-end lg:px-14 lg:py-20">
        <div className="lg:col-span-8">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Tell us what you want to automate.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-white/70">
            We reply within one working day with questions, a rough plan and an estimate.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
          <Link
            href="/services#quote"
            className="rounded-full bg-saffron px-7 py-3.5 text-center font-semibold text-spruce transition hover:brightness-110"
          >
            Discuss a project
          </Link>
          <Link
            href="/learning"
            className="rounded-full border border-white/25 px-7 py-3.5 text-center font-semibold text-white transition hover:bg-white/10"
          >
            Apply for a course
          </Link>
        </div>
      </div>
    </section>
  );
}