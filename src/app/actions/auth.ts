"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";
import { dashboardPath } from "@/lib/auth";

const loginSchema = z.object({
  identifier: z.string().trim().min(1, "Please enter your email or Student ID."),
  password: z.string().min(1, "Please enter your password."),
});

export type LoginState = { error?: string } | undefined;

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { identifier, password } = parsed.data;

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: identifier.toLowerCase() },
        { studentId: identifier.toUpperCase() },
      ],
    },
  });

  const isValid = user ? await bcrypt.compare(password, user.password) : false;

  if (!user || !isValid) {
    return { error: "Invalid email/ID or password." };
  }

  await createSession({ userId: user.id, role: user.role });
  redirect(dashboardPath[user.role]);
}

export async function logout() {
  await deleteSession();
  redirect("/lms/login");
}