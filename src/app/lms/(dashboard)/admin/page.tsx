import type { Metadata } from "next";
import { ClipboardList, GraduationCap, Users, MessageSquare } from "lucide-react";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Admin Dashboard" };

const statusStyles = {
  PENDING: "bg-amber-100 text-amber-700",
  APPROVED: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-red-100 text-red-700",
};

export default async function AdminDashboard() {
  const user = await requireRole("ADMIN");

  const [pending, students, teachers, quotes, recentAdmissions] = await Promise.all([
    prisma.admission.count({ where: { status: "PENDING" } }),
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.user.count({ where: { role: "TEACHER" } }),
    prisma.quoteRequest.count(),
    prisma.admission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const stats = [
    { label: "Pending Admissions", value: pending, icon: ClipboardList, color: "from-amber-500 to-orange-500" },
    { label: "Students", value: students, icon: GraduationCap, color: "from-violet-600 to-indigo-600" },
    { label: "Teachers", value: teachers, icon: Users, color: "from-blue-600 to-cyan-500" },
    { label: "Quote Requests", value: quotes, icon: MessageSquare, color: "from-pink-500 to-rose-500" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-ink">
        Welcome back, {user.name.split(" ")[0]} 👋
      </h1>
      <p className="mt-1 text-slate-500">Here is what is happening at Agentic today.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${color} text-white`}>
              <Icon className="h-6 w-6" />
            </div>
            <p className="font-display mt-4 text-3xl font-bold text-ink">{value}</p>
            <p className="text-sm text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="font-display text-xl font-bold text-ink">Recent Admissions</h2>
        </div>

        {recentAdmissions.length === 0 ? (
          <p className="p-6 text-slate-500">No admissions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Course</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentAdmissions.map((a) => (
                  <tr key={a.id}>
                    <td className="px-6 py-4">
                      <p className="font-medium text-ink">{a.fullName}</p>
                      <p className="text-slate-500">{a.email}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{a.courseTitle}</td>
                    <td className="px-6 py-4 text-slate-500">
                      {a.createdAt.toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[a.status]}`}>
                        {a.status}
                      </span>
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