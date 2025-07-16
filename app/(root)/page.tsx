"use client";


import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/common/HeroSection";
import MenuSection from "@/components/landing/MenuSection";
import AboutSection from "@/components/common/AboutSection";
import BenefitSection from "@/components/landing/BenefitSection";
import GallerySection from "@/components/landing/GallerySection";

import { getBannerData } from "../hooks/getBannerData";

export default function Page() {
  const banner = getBannerData("home");

  return (
    <>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div>
        <HeroSection
          title={banner?.title}
          description={banner?.description}
          buttonText="Explore Bends"
          imageUrl={banner?.imageUrl || "/images/banner1.webp"}
        />

        <BenefitSection />

        <AboutSection />

        <MenuSection renderType="home" />

        <GallerySection />
      </div>
    </>
  );
}
