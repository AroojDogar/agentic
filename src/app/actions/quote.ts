"use server";

import { prisma } from "@/lib/prisma";
import { sendEmail, emailTemplate } from "@/lib/email";
import { quoteSchema } from "@/lib/validations";
import type { ActionResult } from "./admission";

export async function submitQuote(formData: FormData): Promise<ActionResult> {
  const parsed = quoteSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid form data." };
  }
  const data = parsed.data;

  try {
    await prisma.quoteRequest.create({ data });
  } catch (error) {
    console.error("Failed to save quote request:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  try {
    await sendEmail({
      to: process.env.ADMIN_EMAIL!,
      replyTo: data.email,
      subject: `New Quote Request: ${data.service} – ${data.name}`,
      html: emailTemplate("New Quote Request", [
        ["Service", data.service],
        ["Name", data.name],
        ["Email", data.email],
        ["Company", data.company],
        ["Budget", data.budget],
        ["Project Details", data.message],
      ]),
    });
  } catch (error) {
    console.error("Quote email failed:", error);
  }

  return { success: true };
}