import type { Metadata } from "next";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCourseBySlug } from "@/data/courses";
import MyCourses from "@/components/lms/MyCourses";

export const metadata: Metadata = { title: "Teacher Dashboard" };

export default async function TeacherDashboard() {
  const user = await requireRole("TEACHER");

  // Sirf woh students jo is teacher ke kisi course mein hain
  const students =
    user.courses.length > 0
      ? await prisma.user.findMany({
          where: { role: "STUDENT", courses: { hasSome: user.courses } },
          select: { id: true, name: true, email: true, studentId: true, courses: true },
          orderBy: { name: "asc" },
        })
      : [];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-ink">
        Welcome, {user.name.split(" ")[0]} 👋
      </h1>
      <p className="mt-1 text-slate-500">Here are the courses you are teaching.</p>

      <div className="mt-8">
        <MyCourses
          slugs={user.courses}
          emptyText="No courses assigned yet. The administrator will assign your courses."
        />
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="font-display text-xl font-bold text-ink">My Students ({students.length})</h2>
        </div>

        {students.length === 0 ? (
          <p className="p-6 text-slate-500">No students enrolled in your courses yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Student</th>
                  <th className="px-6 py-3 font-medium">Student ID</th>
                  <th className="px-6 py-3 font-medium">Course</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((s) => (
                  <tr key={s.id}>
                    <td className="px-6 py-4">
                      <p className="font-medium text-ink">{s.name}</p>
                      <p className="text-slate-500">{s.email}</p>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-700">{s.studentId}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {s.courses
                        .filter((slug) => user.courses.includes(slug))
                        .map((slug) => getCourseBySlug(slug)?.title ?? slug)
                        .join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}