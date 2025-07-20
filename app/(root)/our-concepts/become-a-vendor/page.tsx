import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/common/HeroSection";
import VendorSection from "@/components/landing/VendorSection";
import BrandHighlights from "@/components/common/BrandHighlights";

export default async function JoinAsVendorPage() {
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
          renderType="vendor"
          title="Chaiyo Ceylon Business Models"
          description="To deliver high-quality, freshly prepared tea and snacks — quickly, affordably, and without compromise."
        />

        <VendorSection />
      </div>
    </main>
  );
}
