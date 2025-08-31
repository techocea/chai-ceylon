import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/common/HeroSection";
import PackagesSection from "@/components/landing/PackagesSection";

export default async function OurPackagesPage() {
    const bannerRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/banner`,
        {
            cache: "no-store",
        }
    );

    const packagesRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/our-packages`,
        {
            cache: "no-store",
        }
    );
    if (!packagesRes.ok || !bannerRes.ok) {
        return (
            <div className="text-red-500 text-center p-4">Failed to load Data</div>
        );
    }

    const { banners = [] } = await bannerRes.json();
    const { packages = [] } = await packagesRes.json();

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
                    <PackagesSection packages={packages} />
                </div>
            </div>
        </main>
    );
}
