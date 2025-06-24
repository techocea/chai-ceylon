import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subTitle: string;
  buttonText: string;
  socialIcons?: boolean;
  imageSrc: string;
}

const HeroSection = ({
  title,
  subTitle,
  buttonText,
  socialIcons,
  imageSrc,
}: HeroSectionProps) => {
  return (
    <section className="relative h-[50rem] lg:h-screen">
      <div className="absolute inset-0 z-0 lg:[clip-path:polygon(0_0,100%_0,100%_100%,0_80%)]">
        <Image
          src={imageSrc}
          alt="Chaiyo Ceylon Tea"
          fill
          className="object-cover h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="absolute w-screen h-[40rem] z-10 bg-primary/80 top-0 left-0 lg:left-10 lg:max-w-xl lg:rounded-none lg:shadow-none lg:top-0 lg:h-[496px] [clip-path:polygon(0_0,100%_0,100%_100%,0_90%)] lg:[clip-path:polygon(0_0,100%_0,100%_100%,0_90%)]">
        <div className="w-full absolute lg:pr-2 z-20 space-y-8 lg:space-y-4 top-1/2 left-4 transform -translate-y-1/2 text-white max-w-xs lg:max-w-lg">
          <h1 className="title">{title}</h1>
          <p className="text-sm">{subTitle}</p>

          <div>
            <Link href="/menu" passHref>
              <Button variant="outline" className="flex items-center gap-2">
                {buttonText}
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>

          <div className="flex space-x-4 mt-10">
            {socialIcons && (
              <>
                <Link
                  href="https://www.facebook.com/ChaiyoCeylon"
                  target="_blank"
                >
                  <Image
                    src="/icons/facebook.svg"
                    width={28}
                    height={28}
                    alt="Facebook"
                  />
                </Link>
                <Link
                  href="https://www.instagram.com/ChaiyoCeylon"
                  target="_blank"
                >
                  <Image
                    src="/icons/instagram.svg"
                    width={28}
                    height={28}
                    alt="Instagram"
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
