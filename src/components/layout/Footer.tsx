import Link from "next/link";
import { Sparkles, Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { courses } from "@/data/courses";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/development", label: "AI Development Centre" },
  { href: "/learning", label: "AI Learning" },
  { href: "/services", label: "Services" },
  { href: "/lms/login", label: "LMS Portal" },
];

const contactItems = [
  { icon: Mail, label: "Email", value: "ak.development.pk@gmail.com", href: "mailto:ak.development.pk@gmail.com" },
  { icon: Phone, label: "Phone", value: "+92 300 0000000", href: "tel:+923000000000" },
  { icon: MapPin, label: "Location", value: "Pakistan" },
];

// Brand icons (SVG), kyunke lucide mein brand logos nahi hote
const socials = [
  {
    label: "LinkedIn",
    href: "#",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "GitHub",
    href: "#",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    label: "X",
    href: "#",
    path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-slate-300">
      {/* Gradient top line */}
      <div className="bg-brand-gradient h-1 w-full" />

      {/* Background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-brand-purple/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-brand-cyan/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <span className="bg-brand-gradient flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-lg shadow-violet-500/30">
                <Sparkles className="h-5 w-5 transition duration-500 group-hover:rotate-180" />
              </span>
              <span className="font-display text-2xl font-bold text-white">Agentic</span>
            </Link>
            <p className="mt-5 max-w-sm leading-relaxed text-slate-400">
              Building intelligent AI solutions, training the next generation of
              AI developers, and helping businesses grow with automation.
            </p>

            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:-translate-y-1 hover:border-transparent hover:bg-brand-purple hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group inline-flex items-center transition hover:text-white">
                    <ChevronRight className="-ml-4 h-4 w-4 text-brand-cyan opacity-0 transition-all group-hover:ml-0 group-hover:opacity-100" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Popular Courses
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {courses.slice(0, 5).map((course) => (
                <li key={course.slug}>
                  <Link
                    href={`/learning/${course.slug}`}
                    className="group inline-flex items-center transition hover:text-white"
                  >
                    <ChevronRight className="-ml-4 h-4 w-4 text-brand-cyan opacity-0 transition-all group-hover:ml-0 group-hover:opacity-100" />
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Get in Touch
            </h3>
            <ul className="mt-5 space-y-4">
              {contactItems.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-cyan transition group-hover:bg-brand-cyan group-hover:text-ink">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs text-slate-500">{label}</span>
                      <span className="block text-sm text-slate-300 transition group-hover:text-white">{value}</span>
                    </span>
                  </>
                );

                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} className="group flex items-center gap-3">
                        {content}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-3">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-sm text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Agentic. All rights reserved.</p>
          <p>AI Development · Learning · Services</p>
        </div>
      </div>

      {/* Big watermark */}
      <p
        aria-hidden="true"
        className="font-display pointer-events-none mb-[-3vw] select-none bg-linear-to-b from-white/10 to-transparent bg-clip-text text-center text-[20vw] font-bold leading-none tracking-tighter text-transparent lg:-mb-10 lg:text-[14rem]"
      >
        Agentic
      </p>
    </footer>
  );
}