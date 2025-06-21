import Navbar from "@/components/common/Navbar";
import AboutSection from "@/components/landing/AboutSection";
import BenefitSection from "@/components/landing/BenefitSection";
import GallerySection from "@/components/landing/GallerySection";
import HeroSection from "@/components/landing/HeroSection";
import MenuSection from "@/components/landing/MenuSection";

export default function Page() {
  return (
    <>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div>
        <HeroSection />
        <BenefitSection />
        <AboutSection />
        <MenuSection />
        <GallerySection />
      </div>
    </>
  );
}
