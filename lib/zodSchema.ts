import { z } from "zod";

export const authFormSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(8, { message: "Password should be 8 characters" }),
});

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .transform((val) => val.replace(/[\s-()+\.]/g, ""))
    .refine((val) => /^\d+$/.test(val), "Phone number must contain only digits")
    .refine((val) => val.length == 10, "Phone number must be 10 digits long"),
  message: z.string().min(1, "Message is required"),
});

export const footerContentSchema = z.object({
  aboutText: z
    .string()
    .max(255, "Cannot exceed 255 characters")
    .min(10, "Should be atleast 10 characters long"),
  quickLinks: z.array(
    z.object({
      label: z.string().min(1, "Label is required"),
      href: z.string().min(1, "Href is required"),
    })
  ),
  socialMediaLinks: z.array(
    z.object({
      label: z.string().min(1, "Label is required"),
      href: z.string().min(1, "Href is required"),
    })
  ),
  workingHours: z
    .string()
    .max(64, "Cannot exceed 64 characters")
    .min(10, "Should be atleast 10 characters long"),
});

export const contactPageContentSchema = z.object({
  address: z
    .string()
    .max(255, "Cannot exceed 255 characters")
    .min(10, "Should be atleast 10 characters long"),
  email: z.string().email(),
  phone: z
    .string()
    .max(16, "Should not exceed 16 characters")
    .min(10, "Should contain 10 digits"),
  workingHours: z
    .string()
    .max(64, "Cannot exceed 64 characters")
    .min(10, "Should be atleast 10 characters long"),
  location: z
    .string()
    .max(255, "Cannot exceed 255 characters")
    .min(10, "Should be atleast 10 characters long"),
});

export type FormValues = z.infer<typeof formSchema>;
export type AuthFormValues = z.infer<typeof authFormSchema>;
export type FooterContentValues = z.infer<typeof footerContentSchema>;
export type ContactPageContentValues = z.infer<typeof contactPageContentSchema>;
