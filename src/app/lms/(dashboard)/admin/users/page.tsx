import type { Metadata } from "next";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCourseBySlug } from "@/data/courses";
import CreateUserForm from "@/components/lms/CreateUserForm";

export const metadata: Metadata = { title: "Users" };

const roleStyles = {
  ADMIN: "bg-violet-100 text-violet-700",
  TEACHER: "bg-blue-100 text-blue-700",
  STUDENT: "bg-emerald-100 text-emerald-700",
};

export default async function UsersPage() {
  await requireRole("ADMIN");

  const users = await prisma.user.findMany({
    orderBy: [{ role: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      studentId: true,
      courses: true,
      createdAt: true,
    },
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-ink">Users</h1>
      <p className="mt-1 text-slate-500">Manage administrators, teachers and students.</p>

      <div className="mt-8">
        <CreateUserForm />
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="font-display text-xl font-bold text-ink">All Users ({users.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Login ID</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Courses</th>
                <th className="px-6 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="px-6 py-4">
                    <p className="font-medium text-ink">{u.name}</p>
                    <p className="text-slate-500">{u.email}</p>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-700">{u.studentId ?? u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${roleStyles[u.role]}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {u.courses.length === 0
                      ? "—"
                      : u.courses.map((slug) => getCourseBySlug(slug)?.title ?? slug).join(", ")}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{u.createdAt.toLocaleDateString("en-GB")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}