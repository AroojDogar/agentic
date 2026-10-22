import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  BarChart3,
  MonitorPlay,
  Wallet,
  CheckCircle2,
} from "lucide-react";
import AdmissionForm from "@/components/learning/AdmissionForm";
import SectionHeading from "@/components/shared/SectionHeading";
import { courses, getCourseBySlug } from "@/data/courses";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "Course not found" };
  return { title: course.title, description: course.shortDescription };
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) notFound();

  const Icon = course.icon;
  const details = [
    { label: "Duration", value: course.duration, icon: Clock },
    { label: "Level", value: course.level, icon: BarChart3 },
    { label: "Mode", value: course.mode, icon: MonitorPlay },
    { label: "Fee", value: course.fee, icon: Wallet },
  ];

  return (
    <>
      {/* Course Hero */}
      <section className={`bg-linear-to-br ${course.color} text-white`}>
        <div className="mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8 lg:pt-36 lg:pb-20">
          <Link
            href="/learning"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> All Courses
          </Link>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                <Icon className="h-8 w-8" />
              </div>
              <h1 className="font-display mt-6 text-4xl font-bold leading-tight sm:text-5xl">
                {course.title}
              </h1>
              <p className="mt-4 text-lg text-white/85">{course.description}</p>
            </div>

            <Link
              href="#apply"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-ink shadow-xl transition hover:bg-slate-100"
            >
              Apply Now
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {details.map((d) => {
              const DIcon = d.icon;
              return (
                <div key={d.label} className="rounded-2xl bg-white/15 p-5 backdrop-blur">
                  <DIcon className="h-5 w-5 text-white/80" />
                  <p className="mt-3 text-sm text-white/70">{d.label}</p>
                  <p className="font-display text-lg font-bold">{d.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Outcomes + Curriculum */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-ink">What you will learn</h2>
            <ul className="mt-8 space-y-4">
              {course.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span className="text-slate-700">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold text-ink">Course curriculum</h2>
            <ol className="mt-8 space-y-3">
              {course.modules.map((module, index) => (
                <li
                  key={module}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${course.color} font-display font-bold text-white`}
                  >
                    {index + 1}
                  </span>
                  <span className="font-medium text-slate-700">{module}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Admission Form */}
      <section id="apply" className="scroll-mt-20 bg-slate-50 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Admission"
            title="Apply for"
            highlight={course.title}
            description="Fill in your details below. Our admissions team will review your application and send your LMS login by email."
          />
          <div className="mt-12">
            <AdmissionForm courseSlug={course.slug} courseTitle={course.title} />
          </div>
        </div>
      </section>
    </>
  );
}