"use server";

import { prisma } from "@/lib/prisma";
import { sendEmail, emailTemplate } from "@/lib/email";
import { admissionSchema } from "@/lib/validations";
import { getCourseBySlug } from "@/data/courses";

export type ActionResult = { success: true } | { success: false; error: string };

export async function submitAdmission(formData: FormData): Promise<ActionResult> {
  // 1. Data check karein
  const parsed = admissionSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid form data." };
  }
  const data = parsed.data;

  const course = getCourseBySlug(data.courseSlug);
  if (!course) {
    return { success: false, error: "Selected course was not found." };
  }

  // 2. Database mein save karein
  try {
    const existing = await prisma.admission.findFirst({
      where: { email: data.email, courseSlug: course.slug, status: "PENDING" },
    });

    if (existing) {
      return {
        success: false,
        error: "You have already applied for this course. Our team will contact you soon.",
      };
    }

    await prisma.admission.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        country: data.country,
        city: data.city,
        education: data.education,
        experience: data.experience,
        motivation: data.motivation,
        courseSlug: course.slug,
        courseTitle: course.title,
      },
    });
  } catch (error) {
    console.error("Failed to save admission:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  // 3. Admin ko email bhejein (email fail ho to bhi admission save rahegi)
  try {
    await sendEmail({
      to: process.env.ADMIN_EMAIL!,
      replyTo: data.email,
      subject: `New Admission: ${data.fullName} – ${course.title}`,
      html: emailTemplate("New Admission Application", [
        ["Course", course.title],
        ["Full Name", data.fullName],
        ["Email", data.email],
        ["Phone", data.phone],
        ["Date of Birth", data.dateOfBirth],
        ["Country", data.country],
        ["City", data.city],
        ["Education", data.education],
        ["Experience", data.experience],
        ["Motivation", data.motivation],
      ]),
    });
  } catch (error) {
    console.error("Admission email failed:", error);
  }

  return { success: true };
}