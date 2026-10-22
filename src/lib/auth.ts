import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession, type Role } from "@/lib/session";

export const dashboardPath: Record<Role, string> = {
  ADMIN: "/lms/admin",
  TEACHER: "/lms/teacher",
  STUDENT: "/lms/student",
};

// Logged-in user ka data (password ke baghair)
export const getCurrentUser = cache(async () => {
  const session = await getSession();
  if (!session) return null;

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      studentId: true,
      courses: true,
    },
  });
});

// Har dashboard page ke shuru mein call hota hai
export async function requireRole(role: Role) {
  const user = await getCurrentUser();
  if (!user) redirect("/lms/login");
  if (user.role !== role) redirect(dashboardPath[user.role]);
  return user;
}