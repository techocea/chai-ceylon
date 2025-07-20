import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/common/HeroSection";
import AboutSection from "@/components/common/AboutSection";
import CTASection from "@/components/common/CTASection";
import WhatMakesUsSpecial from "@/components/landing/WhatMakesUsSpecial";
import SignatureItems from "@/components/landing/SignatureItems";
import BrandHighlights from "@/components/common/BrandHighlights";
import { SIGNATURE_OFFERINGS, US_SPECIAL_DATA } from "@/lib/constants";

export default async function AboutPage() {
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
      <div className="pb-32">
        <HeroSection
          title={banners[1].title}
          description={banners[1].description}
          buttonText="Explore Bends"
          imageUrl={banners[1].imageUrl}
        />

        <AboutSection />

        <WhatMakesUsSpecial
          title="What Makes Us Special?"
          content={US_SPECIAL_DATA}
        />

        <CTASection
          renderType="newsletter"
          title="The Best Tea Quality"
          description="high-quality, freshly prepared tea and snacks — quickly, affordably, and without compromise."
          CTATitle="Love chai? Stay in the loop."
          CTADescription="Get the latest updates, promos, and recipes—fresh in your inbox every week."
        />

        <SignatureItems
          title="Our Signature Offerings"
          content={SIGNATURE_OFFERINGS}
        />

        <BrandHighlights
          renderType="about"
          title="Where to Find Us?"
          description="You’ll find Chaiyo Ceylon at food stalls, mobile tea carts, events, and pop-up locations across Sri Lanka. Whether it's a tea break on a busy street or a warm drink at a celebration, we’re always ready to serve."
        />

        <BrandHighlights
          renderType="about"
          title="Our Promise"
          description="We don't just make tea — we create moments. With every cup of Chaiyo, you're sipping tradition, care, and community."
        />
      </div>
    </main>
  );
}
