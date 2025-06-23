import Navbar from "@/components/common/Navbar";
import AboutSection from "@/components/common/AboutSection";
import BenefitSection from "@/components/landing/BenefitSection";
import GallerySection from "@/components/landing/GallerySection";
import HeroSection from "@/components/common/HeroSection";
import MenuSection from "@/components/landing/MenuSection";

export default function Page() {
  return (
    <>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div>
        <HeroSection
          title="Experience the Soul of Ceylon in Every Sip"
          subTitle="Sip into something special — where every cup tells a Ceylon story."
          buttonText="Explore Blends"
          socialIcons={true}
          imageSrc="/images/banner2.jpg"
        />
        <BenefitSection />
        <AboutSection
          icon={true}
          title="About Us"
          imageSrc="/images/about-image.png"
          description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In enim justo, rhoncus ut, imperdiet a, venenatis.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In enim justo, rhoncus ut, imperdiet a, venenatis."
        />
        <MenuSection />
        <GallerySection />
      </div>
    </>
  );
}
