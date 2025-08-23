import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/common/HeroSection";
import ContactSectionWrapper from "@/components/landing/ContactSectionWrapper";



export default async function ContactPage() {
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
          title={banners[4].title}
          description={banners[4].description}
          buttonText="Explore Bends"
          imageUrl={banners[4].imageUrl}
        />

        <ContactSectionWrapper />
      </div>
    </main>
  );
}
