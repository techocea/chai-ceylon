"use client";

import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/common/HeroSection";
import VendorSection from "@/components/landing/VendorSection";
import BrandHighlights from "@/components/common/BrandHighlights";
import { getBannerData } from "@/app/hooks/getBannerData";

const JoinAsVendorPage = () => {
  const banner = getBannerData("our-concepts");
  return (
    <main>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div>
        <HeroSection
          title={banner?.title}
          description={banner?.description}
          buttonText="Explore Bends"
          imageUrl={banner?.imageUrl || "/images/banner5.jpg"}
        />

        <BrandHighlights
          renderType="vendor"
          title="Chaiyo Ceylon Business Models"
          description="To deliver high-quality, freshly prepared tea and snacks — quickly, affordably, and without compromise."
        />

        <VendorSection />
      </div>
    </main>
  );
};

export default JoinAsVendorPage;
