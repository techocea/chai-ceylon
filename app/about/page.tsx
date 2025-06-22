import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/common/HeroSection";
import AboutSection from "@/components/common/AboutSection";
import CTASection from "@/components/common/CTASection";
import WhyUsSection from "@/components/common/WhyUsSection";

const AboutPage = () => {
  return (
    <main>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div>
        <HeroSection
          title="About Us"
          subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
          buttonText="Learn More"
          socialIcons={false}
          imageSrc="/images/banner2.jpg"
        />
        <AboutSection
          imageSrc="/images/about-image.png"
          title="Feel The Taste Of The Best Tea Making Just In Our Tea House"
          description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In enim justo, rhoncus ut, imperdiet a, venenatis.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In enim justo, rhoncus ut, imperdiet a, venenatis."
        />
        <CTASection
          renderType="newsletter"
          title="The Best Tea Quality"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
          CTATitle="Love chai? Stay in the loop."
          CTADescription="Get the latest updates, promos, and recipes—fresh in your inbox every week."
        />

        <WhyUsSection />
      </div>
    </main>
  );
};

export default AboutPage;
