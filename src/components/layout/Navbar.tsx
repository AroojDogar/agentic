"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles, ArrowUpRight } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/development", label: "AI Development" },
  { href: "/learning", label: "AI Learning" },
  { href: "/services", label: "Services" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll hone par navbar ka style badalta hai
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      {/* Bahar wala div gradient border banata hai */}
      <div
        className={`mx-auto max-w-6xl rounded-2xl p-px transition-all duration-300 ${
          scrolled
            ? "bg-brand-gradient shadow-xl shadow-violet-500/20"
            : "bg-white/50 shadow-lg shadow-slate-900/5"
        }`}
      >
        <nav
          className={`flex h-16 items-center justify-between rounded-[15px] px-4 transition-all duration-300 sm:px-6 ${
            scrolled ? "bg-white/90 backdrop-blur-xl" : "bg-white/60 backdrop-blur-md"
          }`}
        >
          {/* Logo */}
          <Link href="/" onClick={() => setOpen(false)} className="group flex items-center gap-2.5">
            <span className="relative flex h-10 w-10 items-center justify-center">
              <span className="bg-brand-gradient absolute inset-0 rounded-xl opacity-50 blur-md transition duration-300 group-hover:opacity-100" />
              <span className="bg-brand-gradient relative flex h-10 w-10 items-center justify-center rounded-xl text-white">
                <Sparkles className="h-5 w-5 transition duration-500 group-hover:rotate-180" />
              </span>
            </span>
            <span className="leading-none">
              <span className="font-display text-gradient block text-xl font-bold">Agentic</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                AI Studio
              </span>
            </span>
          </Link>

          {/* Desktop links: ek pill ke andar */}
          <ul className="hidden items-center gap-1 rounded-xl border border-slate-200/70 bg-slate-100/60 p-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? "bg-white text-brand-purple shadow-sm"
                      : "text-slate-600 hover:bg-white/70 hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <Link
            href="/lms/login"
            className="bg-brand-gradient group hidden items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:shadow-violet-500/50 md:inline-flex"
          >
            LMS Portal
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>

          {/* Mobile button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="rounded-xl border border-slate-200 bg-white/70 p-2 text-slate-700 transition hover:text-brand-purple md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur-xl md:hidden">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive(link.href)
                      ? "bg-violet-50 text-brand-purple"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/lms/login"
            onClick={() => setOpen(false)}
            className="bg-brand-gradient mt-2 flex items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-sm font-semibold text-white"
          >
            LMS Portal <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </header>
  );
}