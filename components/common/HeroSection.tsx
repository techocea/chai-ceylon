import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  imageUrl: string;
}

const HeroSection = ({
  title,
  description,
  buttonText,
  imageUrl,
}: HeroSectionProps) => {
  return (
    <section className="relative min-h-[75vh] h-auto lg:min-h-screen">
      <div className="absolute inset-0 z-0 [clip-path:polygon(0_0,100%_0,100%_100%,0_90%)] lg:[clip-path:polygon(0_0,100%_0,100%_100%,0_80%)]">
        <Image
          src={imageUrl}
          alt="Chaiyo Ceylon Tea"
          fill
          className="object-cover h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="absolute w-full h-[63vh] max-w-full z-10 bg-primary/80 top-0 left-0 lg:left-10 xl:left-[25%] lg:max-w-lg lg:rounded-none lg:shadow-none lg:top-0 lg:min-h-[496px] [clip-path:polygon(0_0,100%_0,100%_100%,0_95%)] lg:[clip-path:polygon(0_0,100%_0,100%_100%,0_90%)] flex items-center justify-center">
        <div className="relative w-full sm:pr-2 z-20 space-y-8 lg:space-y-4 px-4 lg:pl-0 lg:pr-0 py-8 sm:py-4 lg:py-0 top-0 left-0 text-white sm:max-w-md flex flex-col justify-center h-auto">
          <h1 className="title">{title}</h1>
          <p className="text-sm">{description}</p>
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
