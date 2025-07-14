"use client";

import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/common/HeroSection";
import MenuSection from "@/components/landing/MenuSection";
import AboutSection from "@/components/common/AboutSection";
import BenefitSection from "@/components/landing/BenefitSection";
import GallerySection from "@/components/landing/GallerySection";
import { useEffect, useState } from "react";
import axios from "axios";

interface AboutDataProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function Page() {
  const [data, setData] = useState<AboutDataProps | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await axios.get("/api/about");
        if (
          res.data &&
          res.status === 200 &&
          Array.isArray(res.data.aboutUsContent) &&
          res.data.aboutUsContent.length > 0
        ) {
          setData(res.data.aboutUsContent[0]);
          console.log(res.data.aboutUsContent[0]);
        } else {
          alert("error in fetching data");
          console.log("Error in fetching about data:");
          setData(null);
        }
      } catch (error) {
        console.log("Error in fetching about data:", error);
        setData(null);
      }
    };
    fetchAboutData();
  }, []);

  return (
    <>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div>
        <HeroSection
          title="Experience the Soul of Ceylon in Every Sip"
          subTitle="Sip into something special — where every cup tells a Ceylon story."
          buttonText="Explore Blends"
          imageSrc="/images/banner2.jpg"
        />

        <BenefitSection />

        {data && (
          <AboutSection
            icon={true}
            title={data.title}
            description={data.description}
            imageUrl={data.imageUrl}
          />
        )}

        <MenuSection renderType="home" />

        <GallerySection />
      </div>
    </>
  );
}
