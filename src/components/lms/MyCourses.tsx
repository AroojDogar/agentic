import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";
import { getCourseBySlug } from "@/data/courses";

type MyCoursesProps = {
  slugs: string[];
  emptyText: string;
};

export default function MyCourses({ slugs, emptyText }: MyCoursesProps) {
  const myCourses = slugs
    .map((slug) => getCourseBySlug(slug))
    .filter((course) => course !== undefined);

  if (myCourses.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <BookOpen className="h-10 w-10 text-slate-400" />
        <p className="mt-3 text-slate-500">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {myCourses.map((course) => {
        const Icon = course.icon;
        return (
          <div key={course.slug} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className={`flex h-28 items-center justify-center bg-linear-to-br ${course.color}`}>
              <Icon className="h-10 w-10 text-white" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-lg font-bold text-ink">{course.title}</h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <Clock className="h-4 w-4" /> {course.duration} · {course.modules.length} modules
              </p>
              <Link
                href={`/learning/${course.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-brand-purple hover:underline"
              >
                View curriculum →
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}