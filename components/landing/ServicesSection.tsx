"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll";

const content = [
  {
    title: "Tea Kiosk",
    description: "Compact, stylish, and full of flavor",
    points: [
      "Ideal for malls, campuses, and coworking spaces",
      "Minimal footprint with high throughput",
      "Fully trained staff & operational setup",
      "Menu customization based on location",
      "Branding and co-partnering options available",
    ],
    imageSrc: "/images/tea-kiosk.jpg",
  },
  {
    title: "Tea Box",
    description: "A curated tea experience in a box",
    points: [
      "Includes 3–6 signature chai blends",
      "Comes with honey sticks, cinnamon, and a clay cup",
      "Beautifully packaged with personalized notes",
      "Bulk order discounts available",
      "Delivery across Sri Lanka",
    ],
    imageSrc: "/images/tea-box.jpg",
  },
  {
    title: "Tea Cart",
    description: "Bring the authentic taste to your event",
    points: [
      "Perfect for weddings, corporate events & private parties",
      "Professionally dressed chai servers",
      "Live brewing experience with authentic spices",
      "Customizable branding available",
      "Power & water supply options included",
    ],
    imageSrc: "/images/tea-cart.jpg",
  },
  {
    title: "Tea Bar",
    description: "The Ultimate Chai Lounge",
    points: [
      "Wide range of chai varieties: classic, iced, herbal, & more",
      "Instagrammable interior with traditional-modern blend",
      "Dine-in with fusion snacks and desserts",
      "Ideal for high-footfall areas or franchise models",
      "Barista-led experiences & chai-making workshops",
    ],
    imageSrc: "/images/banner3.jpg",
  },
];

const ServicesSection = () => {
  return (
    <div className="w-full sm:pt-28 lg:pt-32">
      <StickyScroll content={content} />
    </div>
  );
};

export default ServicesSection;
