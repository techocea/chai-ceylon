"use client";

import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/common/HeroSection";
import ContactSection from "@/components/landing/ContactSection";
import { getBannerData } from "@/app/hooks/getBannerData";

const ContactPage = () => {
  const banner = getBannerData("contact");
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
          imageUrl={banner?.imageUrl || "/images/banner4.jpg"}
        />

        <ContactSection />
      </div>
    </main>
  );
};

export default ContactPage;
