import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/common/HeroSection";
import ContactSection from "@/components/landing/ContactSection";

const ContactPage = () => {
  return (
    <main>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div>
        <HeroSection
          title="Contact Us"
          subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
          buttonText="Reach Out"
          socialIcons={false}
          imageSrc="/images/banner3.jpg"
        />

        <ContactSection />
      </div>
    </main>
  );
};

export default ContactPage;
