import { MENU_SECTIONS } from "@/lib/constants";
import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/common/HeroSection";
import MenuSection from "@/components/landing/MenuSection";

const MenuPage = () => {
  return (
    <main>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div>
        <HeroSection
          title="Our Menu"
          subTitle="Discover our handcrafted blends, curated with bold flavor and warmth."
          buttonText="Explore Menu"
          socialIcons={false}
          imageSrc="/images/banner5.jpg"
        />

        <MenuSection data={MENU_SECTIONS} />
      </div>
    </main>
  );
};

export default MenuPage;
