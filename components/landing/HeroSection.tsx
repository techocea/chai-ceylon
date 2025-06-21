import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0 z-0 lg:[clip-path:polygon(0_0,100%_0,100%_100%,0_80%)]">
        <Image
          src="/images/banner2.jpg"
          alt="Chaiyo Ceylon Tea"
          fill
          className="object-cover h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="absolute w-screen h-[596px] z-10 bg-secondary/80  top-0 left-0 lg:left-10 lg:max-w-md lg:rounded-none lg:shadow-none lg:top-0 lg:h-[496px] [clip-path:polygon(0_0,100%_0,100%_100%,0_90%)] lg:[clip-path:polygon(0_0,100%_0,100%_100%,0_90%)]">
        <div className="max-w-xs lg:max-w-full absolute pr-2 z-20 space-y-6 top-1/2 left-4 transform -translate-y-1/2 text-white">
          <h1 className="title">Experience the Soul of Ceylon in Every Sip</h1>
          <p className="text-lg">Crafted Chai. Comfort in Every Sip</p>
          <div>
            <Button variant="outline" className="flex gap-2">
              Explore Blends <ArrowRight />
            </Button>
          </div>
          <div className="flex space-x-4">
            <Link href="https://www.facebook.com/ChaiyoCeylon" target="_blank">
              <img src="/icons/facebook.svg" alt="chai shops near me" />
            </Link>
            <Link href="https://www.instagram.com/ChaiyoCeylon" target="_blank">
              <img src="/icons/instagram.svg" alt="chai shops near me" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
