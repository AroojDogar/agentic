import Link from "next/link";
import { Code2, GraduationCap, Briefcase, ArrowRight, Check } from "lucide-react";

const pillars = [
  {
    title: "AI Development Centre",
    description:
      "We design and build custom AI agents, chatbots and intelligent software for businesses worldwide.",
    href: "/development",
    icon: Code2,
    gradient: "from-violet-600 to-indigo-600",
    points: ["Custom AI Agents", "Web & Mobile Apps", "AI Integrations"],
  },
  {
    title: "AI Learning",
    description:
      "Industry-focused courses that turn students and professionals into skilled AI developers.",
    href: "/learning",
    icon: GraduationCap,
    gradient: "from-blue-600 to-cyan-500",
    points: ["Hands-on Courses", "Expert Instructors", "Certificates"],
  },
  {
    title: "AI Service Provider",
    description:
      "End-to-end AI and software services, from strategy and automation to deployment and support.",
    href: "/services",
    icon: Briefcase,
    gradient: "from-pink-500 to-orange-400",
    points: ["AI Automation", "Software Development", "Consulting & Support"],
  },
];

export default function Pillars() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-purple">
            What We Do
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Three pillars, <span className="text-gradient">one AI vision</span>
          </h2>
          <p className="mt-4 text-slate-600">
            From building AI products to training developers and delivering
            services, Agentic covers the complete AI journey.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.title}
                href={pillar.href}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Top colour strip */}
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-linear-to-r ${pillar.gradient}`} />

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${pillar.gradient} text-white shadow-lg`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="font-display mt-6 text-2xl font-bold text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-slate-600">{pillar.description}</p>

                <ul className="mt-6 space-y-2">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-slate-700">
                      <Check className="h-4 w-4 text-emerald-500" />
                      {point}
                    </li>
                  ))}
                </ul>

                <span className="mt-auto inline-flex items-center gap-2 pt-8 font-semibold text-brand-purple">
                  Explore
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}