import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subTitle: string;
  buttonText: string;
  imageSrc: string;
}

const HeroSection = ({
  title,
  subTitle,
  buttonText,
  imageSrc,
}: HeroSectionProps) => {
  return (
    <section className="relative min-h-[75vh] h-auto lg:min-h-screen">
      <div className="absolute inset-0 z-0 [clip-path:polygon(0_0,100%_0,100%_100%,0_90%)] lg:[clip-path:polygon(0_0,100%_0,100%_100%,0_80%)]">
        <Image
          src={imageSrc}
          alt="Chaiyo Ceylon Tea"
          fill
          className="object-cover h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative w-full h-[65vh] max-w-full z-10 bg-primary/80 top-0 left-0 lg:absolute lg:left-10 lg:max-w-xl lg:rounded-none lg:shadow-none lg:top-0 lg:min-h-[496px] [clip-path:polygon(0_0,100%_0,100%_100%,0_95%)] lg:[clip-path:polygon(0_0,100%_0,100%_100%,0_90%)] pt-24 lg:pt-10">
        <div className="relative w-full sm:pr-2 z-20 space-y-8 lg:space-y-4 mx-auto px-4 lg:px-0 py-8 sm:py-4 lg:py-0 top-0 left-0 text-white max-w-md sm:max-w-lg flex flex-col justify-center h-full">
          <h1 className="title">{title}</h1>
          <p className="text-sm">{subTitle}</p>

          <div>
            <Link href="/products">
              <Button variant="outline" className="flex items-center gap-2">
                {buttonText}
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
