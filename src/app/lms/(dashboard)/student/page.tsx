import type { Metadata } from "next";
import { IdCard, Mail } from "lucide-react";
import { requireRole } from "@/lib/auth";
import MyCourses from "@/components/lms/MyCourses";

export const metadata: Metadata = { title: "My Learning" };

export default async function StudentDashboard() {
  const user = await requireRole("STUDENT");

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-ink">
        Welcome, {user.name.split(" ")[0]} 👋
      </h1>
      <p className="mt-1 text-slate-500">Continue your learning journey.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="bg-brand-gradient rounded-3xl p-6 text-white shadow-lg shadow-violet-500/20">
          <IdCard className="h-6 w-6 text-white/80" />
          <p className="mt-3 text-sm text-white/80">Student ID</p>
          <p className="font-display text-2xl font-bold">{user.studentId ?? "—"}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <Mail className="h-6 w-6 text-brand-purple" />
          <p className="mt-3 text-sm text-slate-500">Registered Email</p>
          <p className="font-display text-lg font-bold text-ink">{user.email}</p>
        </div>
      </div>

      <h2 className="font-display mt-10 text-xl font-bold text-ink">My Courses</h2>
      <div className="mt-4">
        <MyCourses slugs={user.courses} emptyText="You are not enrolled in any course yet." />
      </div>
    </div>
  );
}