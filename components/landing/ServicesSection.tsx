"use client";

import { StickyScroll } from "../ui/sticky-scroll";
import { CONTENT } from "@/lib/constants";

const ServicesSection = () => {
  return (
    <div className="w-full sm:mt-28 lg:mt-32">
      <StickyScroll content={CONTENT} />
    </div>
  );
};

export default ServicesSection;
