import Navbar from "@/components/common/Navbar";
import AboutSection from "@/components/common/AboutSection";
import BenefitSection from "@/components/landing/BenefitSection";
import GallerySection from "@/components/landing/GallerySection";
import HeroSection from "@/components/common/HeroSection";
import MenuSection from "@/components/landing/MenuSection";
import { MENU_SECTIONS } from "@/lib/constants";

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
          description="At Chaiyo Ceylon, we celebrate the art of tea — not just as a drink, but as a comfort, culture, and connection. Born in the heart of Sri Lanka, our brand brings the rich heritage of Ceylon tea to life through ready-made tea and coffee blends that are easy to enjoy and impossible to forget. We blend tradition with convenience — offering handcrafted milk teas, herbal infusions, and spiced coffees made from locally-sourced ingredients, brewed with love, and served with pride."
        />
        <MenuSection renderType="home" data={MENU_SECTIONS} />
        <GallerySection />
      </div>
    </>
  );
}
