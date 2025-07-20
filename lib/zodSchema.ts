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

export const siteConfigSchema = z.object({
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
  logoUrl: z.string(),
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

export const aboutContentSchema = z.object({
  title: z
    .string()
    .max(64, "Should not exceed 64 characters")
    .min(6, "Should be atleast 6 characters long"),
  imageUrl: z.string(),
  description: z
    .string()
    .max(555, "Should not exceed 555 characters")
    .min(10, "Should be atleast 10 characters long"),
});

export const menuSchema = z.object({
  menu: z.array(
    z.object({
      category: z
        .string()
        .min(2, "Category name is too short")
        .max(255, "Category name too long"),
      products: z.array(
        z.object({
          name: z
            .string()
            .min(2, "Name is too short")
            .max(255, "Name too long"),
          price: z.coerce.number(),
          description: z.string().max(255),
          isAvailable: z.boolean(),
        })
      ),
    })
  ),
});

export const bannerSchema = z.object({
  banners: z.array(
    z.object({
      _id: z.string().optional(),
      type: z.string(),
      title: z.string(),
      description: z.string(),
      imageUrl: z.string(),
    })
  ),
});

export const gallerySchema = z.object({
  imageUrls: z.array(z.string().url()),
});

export const menuGallerySchema = z.object({
  gallery: z.array(
    z.object({
      _id: z.string().optional(),
      imageUrl: z.string(),
      slug: z.string(),
    })
  ),
});

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrls: z.array(z.string()),
  date: z.coerce.date(),
});

export type FormValues = z.infer<typeof formSchema>;
export type MenuValues = z.infer<typeof menuSchema>;
export type BannerValues = z.infer<typeof bannerSchema>;
export type AuthFormValues = z.infer<typeof authFormSchema>;
export type GalleryValues = z.infer<typeof gallerySchema>;
export type MenuGalleryValues = z.infer<typeof menuGallerySchema>;
export type AboutContentValues = z.infer<typeof aboutContentSchema>;
export type SiteConfigValues = z.infer<typeof siteConfigSchema>;
export type ContactPageContentValues = z.infer<typeof contactPageContentSchema>;
export type EventValues = z.infer<typeof eventSchema>;
