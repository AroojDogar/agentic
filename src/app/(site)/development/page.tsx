import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading from "@/components/shared/SectionHeading";
import CallToAction from "@/components/home/CallToAction";
import {
  offerings,
  processSteps,
  techStack,
  projects,
} from "@/data/development";

export const metadata: Metadata = {
  title: "AI Development Centre",
  description:
    "Custom AI agents, chatbots, web and mobile applications built by the Agentic development team.",
};

export default function DevelopmentPage() {
  return (
    <>
      <PageHeader
        badge="AI Development Centre"
        title="We build intelligent software that"
        highlight="works for you"
        description="From AI agents to full-scale web platforms, our development team turns your ideas into reliable, production-ready products."
      />

      {/* What We Build */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Build"
            title="Solutions for"
            highlight="modern businesses"
            description="Everything you need to bring AI and software into your organization."
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${item.color} text-white shadow-md transition group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display mt-5 text-xl font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-slate-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-ink py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            eyebrow="Our Process"
            title="How we turn ideas into"
            highlight="products"
            description="A clear, transparent process from the first meeting to launch and beyond."
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 transition hover:border-brand-purple"
              >
                <p className="font-display text-gradient text-4xl font-bold leading-tight">
                  {item.step}
                </p>
                <h3 className="font-display mt-4 text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Tech Stack"
            title="Built with"
            highlight="modern technology"
          />

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-brand-purple hover:text-brand-purple"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Work"
            title="Featured"
            highlight="projects"
            description="A few examples of what our team has built."
          />

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.title}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`flex h-40 items-end bg-linear-to-br ${project.color} p-6`}
                >
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-slate-600">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-24">
        <CallToAction />
      </div>
    </>
  );
}