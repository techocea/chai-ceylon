import Navbar from "@/components/common/Navbar";
import CTASection from "@/components/common/CTASection";
import HeroSection from "@/components/common/HeroSection";
import WhyUsSection from "@/components/common/WhyUsSection";
import ServicesSection from "@/components/landing/ServicesSection";

const ServicePage = () => {
  return (
    <main>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div>
        <HeroSection
          title="Our Services"
          subTitle="Chai experiences crafted for events, gifting, and everyday joy."
          buttonText="Explore More"
          socialIcons={false}
          imageSrc="/images/banner3.jpg"
        />

        <ServicesSection />

        <CTASection
          renderType="vendor"
          CTATitle="Be a Vendor and Earn with Us"
          CTADescription="Bring authentic chai to your area or event. It’s simple — sign up, serve, and start earning. "
        />

        <WhyUsSection />
      </div>
    </main>
  );
};

export default ServicePage;
