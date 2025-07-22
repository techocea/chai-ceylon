import HeroSection from "@/components/common/HeroSection";
import Navbar from "@/components/common/Navbar";
import EventSection from "@/components/landing/EventSection";
import React from "react";

export default async function EventsPage() {
  const bannerData = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/banner`,
    {
      cache: "no-store",
    }
  );

  if (!bannerData.ok) {
    return (
      <div className="text-red-500 text-center p-4">Failed to load Banners</div>
    );
  }

  const { banners = [] } = await bannerData.json();

  return (
    <main>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div>
        <HeroSection
          title={banners[5]?.title}
          description={banners[5]?.description}
          buttonText="Explore Bends"
          imageUrl={banners[5]?.imageUrl}
        />

        <EventSection />
      </div>
    </main>
  );
}
