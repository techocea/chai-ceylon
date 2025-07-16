"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface AboutDataProps {
  title: string;
  description: string;
  imageUrl: string;
}

const AboutSection = () => {
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
    <section className="wrapper">
      <div className="flex-center lg:flex-row w-full gap-10 lg:gap-0">
        <div className="flex flex-col items-start space-y-6 flex-1">
          <div className="flex items-center justify-center gap-5">
            <h3 className="heading">{data?.title}</h3>
            <span>
              <Image
                src="/icons/Cup.png"
                width={58}
                height={58}
                alt="about chaio ceylon"
              />
            </span>
          </div>

          <p className="max-w-lg text-start text-muted-foreground font-medium">
            {data?.description}
          </p>
        </div>
        <div className="lg:flex-1 w-[400px] h-[400px]">
          <Image
            src={data?.imageUrl || "/images/banner2.jpg"}
            width={400}
            height={400}
            alt="about chaio ceylon"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
