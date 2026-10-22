import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, BarChart3, MonitorPlay } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading from "@/components/shared/SectionHeading";
import { courses, admissionSteps } from "@/data/courses";

export const metadata: Metadata = {
  title: "AI Learning",
  description:
    "Industry-focused AI and software development courses by Agentic. Apply online and learn through our LMS.",
};

export default function LearningPage() {
  return (
    <>
      <PageHeader
        badge="AI Learning Academy"
        title="Learn the skills that"
        highlight="shape the future"
        description="Practical, project-based courses in AI and software development, taught by industry experts and delivered through our own learning platform."
      />

      {/* Courses */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Courses"
            title="Choose your"
            highlight="learning path"
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              const Icon = course.icon;
              return (
                <Link
                  key={course.slug}
                  href={`/learning/${course.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className={`relative flex h-36 items-center justify-center bg-linear-to-br ${course.color}`}>
                    <Icon className="h-14 w-14 text-white/90 transition group-hover:scale-110" />
                    <span className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      {course.level}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-bold text-ink">{course.title}</h3>
                    <p className="mt-2 text-slate-600">{course.shortDescription}</p>

                    <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" /> {course.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MonitorPlay className="h-4 w-4" /> {course.mode}
                      </span>
                    </div>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
                      <span className="font-display text-2xl font-bold text-ink">{course.fee}</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-brand-purple">
                        View Course
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How Admission Works */}
      <section className="bg-ink py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            eyebrow="Admission Process"
            title="From application to"
            highlight="your first class"
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {admissionSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 transition hover:border-brand-purple"
              >
                <p className="font-display text-gradient text-4xl font-bold leading-tight">{item.step}</p>
                <h3 className="font-display mt-4 text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}