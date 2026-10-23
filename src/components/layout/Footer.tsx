import Link from "next/link";
import { courses } from "@/data/courses";
import { Logo } from "@/components/layout/Navbar";

const companyLinks = [
  { href: "/development", label: "AI Development Centre" },
  { href: "/learning", label: "AI Learning" },
  { href: "/services", label: "AI Services" },
  { href: "/lms/login", label: "LMS Portal" },
];

// Asli links mil jayein to yahan daalein, warna yeh list khaali kar dein
const socials = [
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-spruce text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 border-b border-white/10 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <Logo light />
            <p className="mt-10 max-w-md text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Have a project in mind, or want to learn?
            </p>
            <a
              href="mailto:ak.development.pk@gmail.com"
              className="mt-6 inline-block text-lg font-medium text-saffron underline decoration-saffron/40 underline-offset-4 transition hover:decoration-saffron"
            >
              ak.development.pk@gmail.com
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h3 className="text-sm font-medium text-white/50">Company</h3>
              <ul className="mt-5 space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/80 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-white/50">Courses</h3>
              <ul className="mt-5 space-y-3">
                {courses.slice(0, 5).map((course) => (
                  <li key={course.slug}>
                    <Link href={`/learning/${course.slug}`} className="text-white/80 transition hover:text-white">
                      {course.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-white/50">Contact</h3>
              <ul className="mt-5 space-y-3 text-white/80">
                <li>Pakistan</li>
                {socials.map((social) => (
                  <li key={social.label}>
                    <a href={social.href} className="transition hover:text-white">
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-6 text-sm text-white/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Agentic. All rights reserved.</p>
          <p>Built in Pakistan for clients worldwide.</p>
        </div>
      </div>
    </footer>
  );
}