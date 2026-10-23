import Link from "next/link";
import { courses } from "@/data/courses";

export default function CoursesStrip() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-spruce sm:text-4xl">
              Courses open for admission
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-stone">
              Apply online. Our admissions team reviews every application and sends your LMS
              login once you are accepted.
            </p>
          </div>
          <Link
            href="/learning"
            className="text-sm font-semibold text-spruce underline decoration-saffron decoration-2 underline-offset-4"
          >
            All courses and fees
          </Link>
        </div>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-170 text-left">
            <thead>
              <tr className="border-b border-spruce/15 text-sm text-stone">
                <th className="py-3 pr-6 font-medium">Course</th>
                <th className="py-3 pr-6 font-medium">Level</th>
                <th className="py-3 pr-6 font-medium">Duration</th>
                <th className="py-3 pr-6 font-medium">Format</th>
                <th className="py-3"><span className="sr-only">Apply</span></th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.slug} className="border-b border-spruce/10">
                  <td className="py-5 pr-6">
                    <Link
                      href={`/learning/${course.slug}`}
                      className="text-lg font-semibold text-spruce decoration-saffron decoration-2 underline-offset-4 hover:underline"
                    >
                      {course.title}
                    </Link>
                    <p className="mt-1 text-sm text-stone">{course.shortDescription}</p>
                  </td>
                  <td className="py-5 pr-6 text-sm text-spruce">{course.level}</td>
                  <td className="py-5 pr-6 text-sm text-spruce">{course.duration}</td>
                  <td className="py-5 pr-6 text-sm text-spruce">{course.mode}</td>
                  <td className="py-5 text-right">
                    <Link
                      href={`/learning/${course.slug}#apply`}
                      className="rounded-full border border-spruce/20 px-4 py-2 text-sm font-semibold text-spruce transition hover:border-spruce hover:bg-spruce hover:text-white"
                    >
                      Apply
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}