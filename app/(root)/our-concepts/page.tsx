import Navbar from "@/components/common/Navbar";
import CTASection from "@/components/common/CTASection";
import HeroSection from "@/components/common/HeroSection";
import WhyUsSection from "@/components/common/WhyUsSection";
import ServicesSection from "@/components/landing/ServicesSection";
import BrandHighlights from "@/components/common/BrandHighlights";
import { BRANDING_HIGHLIGHTS } from "@/lib/constants";

export default async function ServicePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/banner`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="text-red-500 text-center p-4">Failed to load Banners</div>
    );
  }

  const { banners = [] } = await res.json();

  return (
    <main>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div>
        <HeroSection
          title={banners[2].title}
          description={banners[2].description}
          buttonText="Explore Bends"
          imageUrl={banners[2].imageUrl}
        />

        <BrandHighlights
          renderType="services"
          content={BRANDING_HIGHLIGHTS}
          title="At Chaiyo Ceylon, our vision is simple yet strong"
          description="To deliver high-quality, freshly prepared tea and snacks — quickly, affordably, and without compromise."
        />

        <ServicesSection />

        <CTASection
          renderType="vendor"
          title="Tradition Meets Convenience"
          description="Bring the Chaiyo Ceylon experience to your neighborhood or events."
          CTATitle="Be a Vendor and Earn with Us"
          CTADescription="Bring authentic chai to your area or event. It’s simple — sign up, serve, and start earning. "
        />

        <WhyUsSection />
      </div>
    </main>
  );
}
