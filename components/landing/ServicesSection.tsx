"use client";

import { StickyScroll } from "../ui/sticky-scroll";
import { CONTENT } from "@/lib/constants";

const ServicesSection = () => {
  return (
    <div className="w-full">
      <StickyScroll content={CONTENT} />
    </div>
  );
};

export default ServicesSection;
