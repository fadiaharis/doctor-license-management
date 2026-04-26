import { z } from "zod";

export const doctorSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  specialization: z
    .string()
    .trim()
    .min(1, "Specialization is required"),

  licenseNumber: z
    .string()
    .trim()
    .min(1, "License number is required"),

  licenseExpiryDate: z
    .string()
    .min(1, "License expiry date is required"),

  status: z.enum(["Active", "Suspended", "Expired"], {
    message: "Status is required",
  }),
});

export type DoctorFormValues = z.infer<typeof doctorSchema>;