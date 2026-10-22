"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Sparkles, Globe, ClipboardList, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Role = "ADMIN" | "TEACHER" | "STUDENT";
type NavItem = { href: string; label: string; icon: LucideIcon };

// Step 10 mein yahan aur links add karenge
const navByRole: Record<Role, NavItem[]> = {
  ADMIN: [
    { href: "/lms/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/lms/admin/admissions", label: "Admissions", icon: ClipboardList },
    { href: "/lms/admin/users", label: "Users", icon: Users },
  ],
  TEACHER: [{ href: "/lms/teacher", label: "Overview", icon: LayoutDashboard }],
  STUDENT: [{ href: "/lms/student", label: "My Learning", icon: LayoutDashboard }],
};

const roleLabel: Record<Role, string> = {
  ADMIN: "Admin Panel",
  TEACHER: "Teacher Portal",
  STUDENT: "Student Portal",
};

export default function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const items = navByRole[role];
  const home = items[0].href;

  const isActive = (href: string) =>
    href === home ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="bg-ink text-slate-300 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:shrink-0 lg:flex-col">
      <div className="flex items-center gap-2 px-6 py-5">
        <span className="bg-brand-gradient flex h-9 w-9 items-center justify-center rounded-xl text-white">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display text-lg font-bold text-white">Agentic</p>
          <p className="text-xs text-slate-400">{roleLabel[role]}</p>
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:pb-0">
        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
              isActive(href)
                ? "bg-brand-gradient text-white shadow-lg shadow-violet-500/20"
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="hidden border-t border-slate-800 p-3 lg:block">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-800 hover:text-white"
        >
          <Globe className="h-5 w-5" />
          Visit Website
        </Link>
      </div>
    </aside>
  );
}