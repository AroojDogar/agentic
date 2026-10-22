import type { Metadata } from "next";
import { requireRole } from "@/lib/auth";
import MyCourses from "@/components/lms/MyCourses";

export const metadata: Metadata = { title: "Teacher Dashboard" };

export default async function TeacherDashboard() {
  const user = await requireRole("TEACHER");

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
    </div>
  );
}