"use client";

import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/common/HeroSection";
import MenuSection from "@/components/landing/MenuSection";
import { getBannerData } from "@/app/hooks/getBannerData";

const MenuPage = () => {
  const banner = getBannerData("products");

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

        <div className="wrapper w-full">
          <MenuSection renderType="menu" />
        </div>
      </div>
    </main>
  );
};

export default MenuPage;
