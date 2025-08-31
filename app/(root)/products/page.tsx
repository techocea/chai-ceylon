import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/common/HeroSection";
import MenuSection from "@/components/landing/MenuSection";

export default async function ProductsPage() {
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
          title={banners[3].title}
          description={banners[3].description}
          buttonText="Explore Bends"
          imageUrl={banners[3].imageUrl}
        />

        <div className="wrapper">
          <MenuSection renderType="menu" />
        </div>
      </div>
    </main>
  );
}
