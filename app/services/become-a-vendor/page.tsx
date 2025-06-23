import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/common/HeroSection";
import VendorSection from "@/components/landing/VendorSection";
import BrandHighlights from "@/components/common/BrandHighlights";

const JoinAsVendorPage = () => {
  return (
    <main>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div>
        <HeroSection
          title="How to earn with Chaiyo Ceylon"
          subTitle="Serve the magic of chai, grow with us — one cup at a time."
          buttonText="Explore More"
          socialIcons={false}
          imageSrc="/images/banner3.jpg"
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
