import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});
export const User = mongoose.models.User || mongoose.model("User", UserSchema);

/* ---------- 1.  BANNERS ---------- */
const BannerSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true }, // uploadthing URL
  },
  { timestamps: true }
);
export const Banner =
  mongoose.models.Banner || mongoose.model("Banner", BannerSchema);

/* ---------- 2.  ABOUT US ---------- */
const AboutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true }, // uploadthing URL
    description: { type: String, required: true },
  },
  { timestamps: true }
);
export const About =
  mongoose.models.About || mongoose.model("About", AboutSchema);

/* ---------- 3.  SiteConfig  ---------- */
const SiteConfigSchema = new mongoose.Schema({
  aboutText: { type: String, maxLength: 600, required: true },
  workingHours: { type: String, required: true },
  quickLinks: [
    {
      label: { type: String, required: true },
      href: { type: String, required: true },
    },
  ],
  socialMediaLinks: [
    {
      label: { type: String, required: true },
      href: { type: String, required: true },
    },
  ],
  logoUrl: { type: String, required: true },
});
export const SiteConfig =
  mongoose.models.SiteConfig || mongoose.model("SiteConfig", SiteConfigSchema);

/* ---------- 4.  MENU  ---------- */
const MenuItemSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    products: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String },
        isAvailable: { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true }
);
export const MenuItem =
  mongoose.models.MenuItem || mongoose.model("MenuItem", MenuItemSchema);

/* ---------- 5.  GALLERY ---------- */
const GallerySchema = new mongoose.Schema(
  {
    imageUrls: [{ type: String, required: true }],
  },
  { timestamps: true }
);
export const GalleryItem =
  mongoose.models.GalleryItem || mongoose.model("GalleryItem", GallerySchema);

/* ---------- 6.  GALLERY ---------- */
const MenuGallerySchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    slug: { type: String, required: true },
  },
  { timestamps: true }
);
export const MenuGalleryItem =
  mongoose.models.MenuGalleryItem ||
  mongoose.model("MenuGalleryItem", MenuGallerySchema);

/* ---------- 7.  CONTACT US ---------- */
const ContactPageSchema = new mongoose.Schema(
  {
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    workingHours: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);
export const ContactPage =
  mongoose.models.ContactPage ||
  mongoose.model("ContactPage", ContactPageSchema);

/* ---------- 8.  EVENTS ---------- */
  const EventSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      imageUrls: [{ type: String, required: true }],
      date: { type: Date, required: true },
    },
    { timestamps: true }
  );
export const Events =
  mongoose.models.Events || mongoose.model("Events", EventSchema);
