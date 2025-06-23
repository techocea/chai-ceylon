import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/common/HeroSection";
import AboutSection from "@/components/common/AboutSection";
import CTASection from "@/components/common/CTASection";
import WhatMakesUsSpecial from "@/components/landing/WhatMakesUsSpecial";
import SignatureItems from "@/components/landing/SignatureItems";
import BrandHighlights from "@/components/common/BrandHighlights";
import { SIGNATURE_OFFERINGS, US_SPECIAL_DATA } from "@/lib/constants";

const AboutPage = () => {
  return (
    <main>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div>
        <HeroSection
          title="About Chaiyo Ceylon"
          subTitle="Our journey is brewed with passion, culture, and a love for chai"
          buttonText="Learn More"
          socialIcons={false}
          imageSrc="/images/banner2.jpg"
        />

        <AboutSection
          imageSrc="/images/about-image.png"
          title="About Chaiyo Ceylon - Every sip tells a story"
          description="At Chaiyo Ceylon, we celebrate the art of tea — not just as a drink, but as a comfort, culture, and connection. Born in the heart of Sri Lanka, our brand brings the rich heritage of Ceylon tea to life through ready-made tea and coffee blends that are easy to enjoy and impossible to forget. We blend tradition with convenience — offering handcrafted milk teas, herbal infusions, and spiced coffees made from locally-sourced ingredients, brewed with love, and served with pride."
        />

        <WhatMakesUsSpecial
          title="What Makes Us Special?"
          content={US_SPECIAL_DATA}
        />

        <CTASection
          renderType="newsletter"
          title="The Best Tea Quality"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
          CTATitle="Love chai? Stay in the loop."
          CTADescription="Get the latest updates, promos, and recipes—fresh in your inbox every week."
        />

        <SignatureItems
          title="Our Signature Offerings"
          content={SIGNATURE_OFFERINGS}
        />

        <BrandHighlights
          renderType="about"
          title="Where to Find Us?"
          description="You’ll find Chaiyo Ceylon at food stalls, mobile tea carts, events, and pop-up locations across Sri Lanka. Whether it's a tea break on a busy street or a warm drink at a celebration, we’re always ready to serve."
        />

        <BrandHighlights
          renderType="about"
          title="Our Promise"
          description="We don't just make tea — we create moments. With every cup of Chaiyo, you're sipping tradition, care, and community."
        />
      </div>
    </main>
  );
};

export default AboutPage;
