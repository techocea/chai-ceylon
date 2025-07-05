import mongoose from "mongoose";

/* ---------- 1.  BANNERS ---------- */
const BannerSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageSrc: { type: String, required: true }, // uploadthing URL
  },
  { timestamps: true }
);
export const Banner = mongoose.model("Banner", BannerSchema);

/* ---------- 2.  ABOUT US ---------- */
const AboutSchema = new mongoose.Schema({
  type: { type: String, required: true },
  imageSrc: { type: String, required: true }, // uploadthing URL
  title: { type: String, required: true },
  description: { type: String, required: true },
});
export const About = mongoose.model("About", AboutSchema);

/* ---------- 3.  FOOTER  ---------- */
const FooterSchema = new mongoose.Schema({
  aboutText: { type: String, maxLength: 600, required: true },
  workingHours: { type: String, required: true },
  quickLinks: { type: String },
  socialMediaLinks: { type: String },
});
export const Footer = mongoose.model("Footer", FooterSchema);

/* ---------- 4.  MENU  ---------- */
const MenuItemSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    products: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);
export const MenuItem = mongoose.model("MenuItem", MenuItemSchema);

/* ---------- 5.  GALLERY ---------- */
const GallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    images: { type: String, required: true },
  },
  { timestamps: true }
);
export const GalleryItem = mongoose.model("GalleryItem", GallerySchema);

/* ---------- 6.  CONTACT US ---------- */
const ContactPageSchema = new mongoose.Schema(
  {
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    workingHours: { type: String, required: true },
    locations: { type: String },
  },
  { timestamps: true }
);
export const ContactPage = mongoose.model("ContactPage", ContactPageSchema);
