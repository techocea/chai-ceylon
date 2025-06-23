import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="relative text-white bg-black h-full">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src="/images/pattern.png"
          alt="Pattern background"
          width={1920}
          height={400}
          className="w-full h-full object-cover opacity-15"
      />
      </div>
      <div className="relative z-10 footer-wrapper h-full flex flex-col justify-between">
        <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-16 lg:gap-0 py-8">
          <div className="flex flex-col items-start gap-6 max-w-xs">
            <Image
              src="/images/logo.png"
              alt="Chaiyo Ceylon"
              width={150}
              height={105}
            />
            <p>
              It’s a comforting blend of spices that energizes your body,
              supports digestion, boosts immunity, and soothes the soul
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/ChaiyoCeylon"
                target="_blank"
              >
                <Image
                  src="/icons/facebook.svg"
                  width={32}
                  height={32}
                  alt="chai shops near me"
                />
              </Link>
              <Link
                href="https://www.instagram.com/ChaiyoCeylon"
                target="_blank"
              >
                <Image
                  src="/icons/instagram.svg"
                  width={32}
                  height={32}
                  alt="chai shops near me"
                />
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start gap-6">
            <h3 className="text-2xl font-playfair-display border-b-[3px] border-mud-green">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>&gt;Home</li>
              <li>&gt;About</li>
              <li>&gt;Services</li>
              <li>&gt;Menu</li>
              <li>&gt;Contact</li>
            </ul>
          </div>
          <div className="flex flex-col items-start gap-6">
            <h3 className="text-2xl font-playfair-display border-b-[3px] border-mud-green">
              Working Hours
            </h3>
            <span className="flex items-center gap-3">
              <Clock className="text-mud-green" />
              <p>8:00 PM - 11:30 PM Monday - Saturday </p>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
