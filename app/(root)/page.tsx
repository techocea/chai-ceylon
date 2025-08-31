import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/common/Navbar";
import Heading from "@/components/common/Heading";
import CTASection from "@/components/common/CTASection";
import HeroSection from "@/components/common/HeroSection";
import MenuSection from "@/components/landing/MenuSection";
import AboutSection from "@/components/common/AboutSection";
import BenefitSection from "@/components/landing/BenefitSection";
import GallerySection from "@/components/landing/GallerySection";
import OurPartners from "@/components/landing/OurPartners";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/banner`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="text-red-500 text-center p-4">Failed to load Banners</div>
    );
  }

  const { banners = [] } = await res.json();
  let renderType: "home" | "menu" = "home";

  return (
    <>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div className="pb-32">
        <HeroSection
          title={banners[0].title}
          description={banners[0].description}
          buttonText="Explore Bends"
          imageUrl={banners[0].imageUrl}
        />

        <BenefitSection />

        <AboutSection />

        <div className="wrapper pb-0">
          <div className="px-4 lg:px-0 flex items-center justify-between w-full mb-8">
            <Heading title="our products" />
            {renderType === "home" && (
              <div className="flex-center justify-center">
                <Button
                  variant="link"
                  className="flex items-center justify-center"
                >
                  <Link href="/products">View All</Link>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <MenuSection renderType="home" />
        </div>

        <CTASection
          renderType="vendor"
          title=""
          description=""
          CTATitle="Be a Vendor and Earn with Us"
          CTADescription="Bring authentic chai to your area or event. It’s simple — sign up, serve, and start earning. "
        />

        <GallerySection />

        <OurPartners />
      </div>
    </>
  );
}
