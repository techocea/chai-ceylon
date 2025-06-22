import { z } from "zod";

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

export type FormSchema = z.infer<typeof formSchema>;
