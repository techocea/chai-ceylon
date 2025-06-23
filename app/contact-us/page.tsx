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
          subTitle="We’d love to hear from you — let’s talk tea."
          buttonText="Reach Out"
          socialIcons={false}
          imageSrc="/images/banner4.jpg"
        />

        <ContactSection />
      </div>
    </main>
  );
};

export default ContactPage;
