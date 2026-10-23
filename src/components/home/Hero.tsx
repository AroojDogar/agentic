import Link from "next/link";
import AgentPanel from "./AgentPanel";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-8">
        <div className="lg:col-span-7">
          <p className="flex items-center gap-2 text-sm font-medium text-stone">
            <span className="h-2 w-2 rounded-full bg-saffron" />
            Based in Pakistan, working with teams worldwide
          </p>

          <h1 className="mt-6 max-w-2xl text-5xl font-semibold leading-[1.02] tracking-tight text-spruce sm:text-6xl lg:text-7xl">
            We build AI agents that do real work.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-stone">
            Agentic is an AI development centre, academy and services company. We automate
            the work that slows organisations down, and we train the people who will build
            what comes next.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/services#quote"
              className="rounded-full bg-spruce px-7 py-3.5 text-center font-semibold text-white transition hover:bg-pine"
            >
              Discuss a project
            </Link>
            <Link
              href="/learning"
              className="rounded-full border border-spruce/20 px-7 py-3.5 text-center font-semibold text-spruce transition hover:border-spruce"
            >
              View courses
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <AgentPanel />
        </div>
      </div>
    </section>
  );
}