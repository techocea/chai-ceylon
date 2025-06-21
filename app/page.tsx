import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/landing/HeroSection";

export default function Page() {
  return (
    <>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <HeroSection />
    </>
  );
}
