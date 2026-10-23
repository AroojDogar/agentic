"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/development", label: "Development" },
  { href: "/learning", label: "Learning" },
  { href: "/services", label: "Services" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className={`relative h-7 w-7 rounded-md ${light ? "bg-white" : "bg-spruce"}`}>
        <span className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full bg-saffron" />
      </span>
      <span className={`text-xl font-bold tracking-tight ${light ? "text-white" : "text-spruce"}`}>
        agentic
      </span>
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open ? "border-spruce/10 bg-paper/95 backdrop-blur" : "border-transparent bg-paper"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" onClick={() => setOpen(false)} aria-label="Agentic home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-spruce after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-saffron"
                    : "text-stone hover:text-spruce"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/lms/login"
          className="hidden rounded-full bg-spruce px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pine md:inline-flex"
        >
          LMS Portal
        </Link>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="p-2 text-spruce md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-spruce/10 bg-paper px-4 pb-8 pt-4 md:hidden">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-2xl font-semibold tracking-tight ${
                    isActive(link.href) ? "text-spruce" : "text-stone"
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
            className="mt-6 block rounded-full bg-spruce px-5 py-3.5 text-center font-semibold text-white"
          >
            LMS Portal
          </Link>
        </div>
      )}
    </header>
  );
}