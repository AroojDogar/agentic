"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { sendEmail, emailTemplate } from "@/lib/email";
import { generatePassword, generateStudentId } from "@/lib/credentials";
import { courses } from "@/data/courses";

export type Credentials = {
  name: string;
  email: string;
  loginId: string;
  password: string | null;
  emailSent: boolean;
  note?: string;
};

export type AdminActionResult =
  | { success: true; credentials?: Credentials }
  | { success: false; error: string };

function loginUrl() {
  return `${process.env.APP_URL ?? "http://localhost:3000"}/lms/login`;
}

// Email bhejne ki koshish karta hai, fail ho to false deta hai
async function trySendEmail(options: Parameters<typeof sendEmail>[0]) {
  try {
    await sendEmail(options);
    return true;
  } catch (error) {
    console.error("Email failed:", error);
    return false;
  }
}

/* ---------------- Approve Admission ---------------- */

export async function approveAdmission(admissionId: string): Promise<AdminActionResult> {
  await requireRole("ADMIN");

  const admission = await prisma.admission.findUnique({ where: { id: admissionId } });
  if (!admission) return { success: false, error: "Admission not found." };
  if (admission.status !== "PENDING") {
    return { success: false, error: "This admission has already been reviewed." };
  }

  const email = admission.email.toLowerCase();
  const existingUser = await prisma.user.findUnique({ where: { email } });

  // Case 1: Pehle se student hai, bas naya course add karein
  if (existingUser) {
    if (existingUser.role !== "STUDENT") {
      return { success: false, error: "This email belongs to a staff account." };
    }

    const updatedCourses = Array.from(new Set([...existingUser.courses, admission.courseSlug]));

    await prisma.$transaction([
      prisma.user.update({
        where: { id: existingUser.id },
        data: { courses: updatedCourses },
      }),
      prisma.admission.update({
        where: { id: admission.id },
        data: { status: "APPROVED", reviewedAt: new Date(), userId: existingUser.id },
      }),
    ]);

    const loginId = existingUser.studentId ?? email;
    const emailSent = await trySendEmail({
      to: email,
      subject: `You're enrolled in ${admission.courseTitle} 🎉`,
      html: emailTemplate("New Course Added to Your Account", [
        ["Course", admission.courseTitle],
        ["Login ID", loginId],
        ["Password", "Use your existing password"],
        ["Login Here", loginUrl()],
      ]),
    });

    return {
      success: true,
      credentials: {
        name: existingUser.name,
        email,
        loginId,
        password: null,
        emailSent,
        note: "Existing student: the course was added to their account.",
      },
    };
  }

  // Case 2: Naya student, account banayein
  const password = generatePassword();
  const studentId = await generateStudentId();
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: admission.fullName,
          email,
          password: hashedPassword,
          role: "STUDENT",
          studentId,
          courses: [admission.courseSlug],
        },
      });

      await tx.admission.update({
        where: { id: admission.id },
        data: { status: "APPROVED", reviewedAt: new Date(), userId: user.id },
      });
    });
  } catch (error) {
    console.error("Approve failed:", error);
    return { success: false, error: "Could not create the student account. Please try again." };
  }

  const emailSent = await trySendEmail({
    to: email,
    subject: "Your Agentic admission is approved 🎉",
    html: emailTemplate("Welcome to Agentic LMS", [
      ["Name", admission.fullName],
      ["Course", admission.courseTitle],
      ["Student ID", studentId],
      ["Password", password],
      ["Login Here", loginUrl()],
    ]),
  });

  return {
    success: true,
    credentials: { name: admission.fullName, email, loginId: studentId, password, emailSent },
  };
}

/* ---------------- Reject Admission ---------------- */

export async function rejectAdmission(admissionId: string): Promise<AdminActionResult> {
  await requireRole("ADMIN");

  const admission = await prisma.admission.findUnique({ where: { id: admissionId } });
  if (!admission) return { success: false, error: "Admission not found." };
  if (admission.status !== "PENDING") {
    return { success: false, error: "This admission has already been reviewed." };
  }

  await prisma.admission.update({
    where: { id: admission.id },
    data: { status: "REJECTED", reviewedAt: new Date() },
  });

  await trySendEmail({
    to: admission.email,
    subject: `Update on your application – ${admission.courseTitle}`,
    html: emailTemplate("Application Update", [
      ["Course", admission.courseTitle],
      ["Status", "Not approved at this time"],
      [
        "Message",
        "Thank you for your interest in Agentic. Unfortunately we cannot offer you a place right now. You are welcome to apply again in the future.",
      ],
    ]),
  });

  return { success: true };
}

/* ---------------- Create Teacher / Staff ---------------- */

const staffSchema = z.object({
  name: z.string().trim().min(3, "Please enter the full name."),
  email: z.email("Please enter a valid email address."),
  role: z.enum(["TEACHER", "ADMIN"], { message: "Please select a role." }),
  courses: z.array(z.string()),
});

export type CreateUserState = AdminActionResult | undefined;

export async function createStaffUser(
  _prevState: CreateUserState,
  formData: FormData
): Promise<CreateUserState> {
  await requireRole("ADMIN");

  const parsed = staffSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    role: formData.get("role"),
    courses: formData.getAll("courses"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { name, role } = parsed.data;
  const email = parsed.data.email.toLowerCase();
  const validSlugs = new Set(courses.map((c) => c.slug));
  const assignedCourses = role === "TEACHER" ? parsed.data.courses.filter((s) => validSlugs.has(s)) : [];

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { success: false, error: "A user with this email already exists." };

  const password = generatePassword();
  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, password: hashedPassword, role, courses: assignedCourses },
  });

  revalidatePath("/lms/admin/users");

  const emailSent = await trySendEmail({
    to: email,
    subject: "Your Agentic LMS account is ready",
    html: emailTemplate("Welcome to the Agentic Team", [
      ["Name", name],
      ["Role", role === "TEACHER" ? "Teacher" : "Administrator"],
      ["Login ID", email],
      ["Password", password],
      ["Login Here", loginUrl()],
    ]),
  });

  return {
    success: true,
    credentials: { name, email, loginId: email, password, emailSent },
  };
}