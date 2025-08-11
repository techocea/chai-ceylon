import axios from "axios";
import Image from "next/image";
import React from "react";

interface aboutUsContentProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default async function AboutSection() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/about`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="text-red-500 text-center p-4">
        Failed to About Content
      </div>
    );
  }

  const { aboutUsContent = [] } = await res.json();

  return (
    <section className="wrapper">
      <div className="flex-center lg:flex-row w-full gap-10 lg:gap-0">
        <div className="flex flex-col items-start space-y-6 flex-1">
          <div className="flex items-center justify-center gap-5">
            <h3 className="heading">{aboutUsContent[0].title}</h3>
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
            {aboutUsContent[0].description}
          </p>
        </div>
        <div className="lg:flex-1 w-[400px] h-[400px]">
          <Image
            src={aboutUsContent[0].imageUrl || "/images/banner2.jpg"}
            width={400}
            height={400}
            alt="about chaio ceylon"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
