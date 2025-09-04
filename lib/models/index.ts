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
  clientLogoUrls: [
    {
      name: { type: String },
      imageUrl: { type: String },
    },
  ],
});
export const SiteConfig =
  mongoose.models.SiteConfig || mongoose.model("SiteConfig", SiteConfigSchema);

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

/* ---------- 4.  MENU  ---------- */
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);
export const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

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
const LocationSchema = new mongoose.Schema({
  label: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const ContactPageSchema = new mongoose.Schema(
  {
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    workingHours: { type: String, required: true },
    locations: [{ type: LocationSchema, required: true }],
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

/* ---------- 9.  OUR CONCEPTS ---------- */
const ConceptSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    points: [{ type: String, required: true }],
  },
  { timestamps: true }
);
export const Concepts =
  mongoose.models.Concepts || mongoose.model("Concepts", ConceptSchema);

const PackageTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const PackageType =
  mongoose.models.PackageType ||
  mongoose.model("PackageType", PackageTypeSchema);

/* ---------- 10.  OUR PACKAGES  ---------- */
const PackageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    packageTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PackageType",
      required: true,
    },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);
export const Packages =
  mongoose.models.Packages || mongoose.model("Packages", PackageSchema);
