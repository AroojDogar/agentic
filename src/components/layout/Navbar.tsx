import Link from "next/link";
import { Sparkles, Mail, Phone, MapPin } from "lucide-react";

const exploreLinks = [
  { href: "/development", label: "AI Development Centre" },
  { href: "/learning", label: "AI Learning" },
  { href: "/services", label: "Services" },
  { href: "/lms/login", label: "LMS Portal" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-brand-gradient flex h-9 w-9 items-center justify-center rounded-xl text-white">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold text-white">Agentic</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Building intelligent AI solutions, training future AI developers, and
            helping businesses grow with automation.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Explore
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-brand-cyan">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-brand-cyan" /> info@agentic.com
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-brand-cyan" /> +92 300 0000000
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-brand-cyan" /> Sargodha, Pakistan
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Agentic. All rights reserved.
      </div>
    </footer>
  );
}