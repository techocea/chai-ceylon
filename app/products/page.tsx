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
          title="Our Products"
          subTitle="Discover our handcrafted blends, curated with bold flavor and warmth."
          buttonText="Explore Menu"

          imageSrc="/images/banner5.jpg"
        />

        <MenuSection renderType="menu" data={MENU_SECTIONS} />
      </div>
    </main>
  );
};

export default MenuPage;
