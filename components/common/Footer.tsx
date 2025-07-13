"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Clock } from "lucide-react";

interface LinkItem {
  label: string;
  href: string;
}

interface FooterContentProps {
  aboutText: string;
  quickLinks: LinkItem[];
  socialMediaLinks: LinkItem[];
  workingHours: string;
}

const Footer = () => {
  const [footerData, setFooterData] = useState<FooterContentProps | null>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const res = await axios.get("/api/footer");
        if (res.status === 200 && res.data) {
          setFooterData(res.data.footerContent[0]);
        } else {
          console.error("Error in fetching footer content");
        }
      } catch (error) {
        console.error("Error in fetching footer content:", error);
      }
    };
    fetchFooterData();
  }, []);

  return (
    <footer className="relative text-white bg-black">
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
            <p>{footerData?.aboutText}</p>
            <div className="flex space-x-4">
              {footerData?.socialMediaLinks?.map((social, idx) => (
                <Link key={idx} href={social.href} target="_blank">
                  <Image
                    src={
                      social.label.toLowerCase().includes("facebook")
                        ? "/icons/facebook.svg"
                        : social.label.toLowerCase().includes("instagram")
                          ? "/icons/instagram.svg"
                          : "/icons/facebook.svg"
                    }
                    width={32}
                    height={32}
                    alt={social.label}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-6">
            <h3 className="text-2xl font-playfair-display border-b-[3px] border-mud-green">
              Quick Links
            </h3>
            <ul className="space-y-2 grid grid-cols-1 sm:grid-cols-2 justify-start">
              {footerData?.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="block">
                    <Button
                      variant="ghost"
                      className="pl-0 text-white hover:text-mud-green"
                      asChild
                    >
                      <span>&gt; {link.label}</span>
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start gap-6">
            <h3 className="text-2xl font-playfair-display border-b-[3px] border-mud-green">
              Working Hours
            </h3>
            <span className="flex items-center gap-3">
              <Clock className="text-mud-green" />
              <p>{footerData?.workingHours}</p>
            </span>
          </div>
        </div>
        <div className="w-full text-center py-4 border-t border-mud-green text-sm">
          Designed and Developed by{" "}
          <Link
            href="https://www.webizera.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-mud-green"
          >
            Webizera
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
