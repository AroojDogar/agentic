import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const pillars = [
  {
    title: "AI Development Centre",
    description:
      "Custom AI agents, assistants and software, designed around how your team already works.",
    href: "/development",
    linkLabel: "See what we build",
    points: ["AI agents and assistants", "Web and mobile applications", "Integrations with your tools"],
  },
  {
    title: "AI Learning",
    description:
      "Project-based courses for students and professionals who want to build with AI, not only use it.",
    href: "/learning",
    linkLabel: "Browse courses",
    points: ["Beginner to advanced", "Online and on-campus", "Your own LMS account"],
  },
  {
    title: "AI Services",
    description:
      "Automation, consulting and long-term support for organisations adopting AI.",
    href: "/services",
    linkLabel: "View services",
    points: ["Workflow automation", "AI strategy and training", "Maintenance and support"],
  },
];

export default function Pillars() {
  return (
    <section className="border-t border-spruce/10 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-spruce sm:text-4xl">
          Three ways to work with us
        </h2>

        <div className="mt-14">
          {pillars.map((pillar) => (
            <Link
              key={pillar.href}
              href={pillar.href}
              className="group grid gap-6 border-t border-spruce/15 px-2 py-10 transition-colors last:border-b hover:bg-white sm:px-6 lg:grid-cols-12 lg:gap-10"
            >
              <h3 className="text-2xl font-semibold tracking-tight text-spruce lg:col-span-4 lg:text-3xl">
                {pillar.title}
              </h3>
              <p className="text-lg leading-relaxed text-stone lg:col-span-5">{pillar.description}</p>
              <div className="lg:col-span-3">
                <ul className="space-y-1.5 text-sm text-spruce/80">
                  {pillar.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-spruce underline decoration-saffron decoration-2 underline-offset-4">
                  {pillar.linkLabel}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}