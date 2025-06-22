import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  message: z.string().min(1, "Message is required"),
});

export type FormSchema = z.infer<typeof formSchema>;
