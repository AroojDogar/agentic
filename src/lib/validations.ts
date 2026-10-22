import { z } from "zod";

// Khaali text ko undefined bana deta hai
const optionalText = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : undefined));

export const admissionSchema = z.object({
  courseSlug: z.string().min(1, "Course is required."),
  fullName: z.string().trim().min(3, "Please enter your full name."),
  email: z.email("Please enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a valid phone number."),
  dateOfBirth: optionalText,
  country: z.string().trim().min(2, "Please enter your country."),
  city: z.string().trim().min(2, "Please enter your city."),
  education: z.string().min(1, "Please select your education."),
  experience: optionalText,
  motivation: optionalText,
});

export const quoteSchema = z.object({
  name: z.string().trim().min(3, "Please enter your full name."),
  email: z.email("Please enter a valid email address."),
  company: optionalText,
  service: z.string().min(1, "Please select a service."),
  budget: optionalText,
  message: z.string().trim().min(10, "Please describe your project in a bit more detail."),
});