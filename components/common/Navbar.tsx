"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Menu, XIcon } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navData, setNavData] = useState<{ logoUrl: string }>();

  useEffect(() => {
    const fetchNavbarContent = async () => {
      try {
        const res = await axios.get("/api/site-config");
        if (res.status === 200 && res.data) {
          setNavData(res.data.SiteConfigContent[0]);
        } else {
          console.error("Error in fetching footer content");
        }
      } catch (error) {
        console.error("Error in fetching footer content:", error);
      }
    };
    fetchNavbarContent();
  }, []);

  return (
    <header className="lg:max-w-6xl w-full mx-auto px-4 sm:px-4 lg:px-12">
      <div className="flex items-center justify-between w-full">
        <div className="relative w-[150px] h-[75px] flex items-center justify-center">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[150px] h-[120px] bg-white rounded-b-full shadow-md z-0" />
          <Link href="/" className="relative z-10">
            <Image
              src={navData?.logoUrl || "/images/chai.webp"}
              alt="Chaiyo Ceylon"
              width={120}
              height={75}
            />
          </Link>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-3 py-6 sm:py-5">
          {NAV_ITEMS.map(({ id, href, label }) => (
            <Button
              key={id}
              variant={id === 7 ? "outline" : "ghost"}
              className={cn("px-4 py-2")}
            >
              <Link
                href={href}
                className={`${id === 7
                  ? "text-white hover:text-secondary"
                  : " hover:underline text-white"
                  }`}
              >
                {label}
              </Link>
            </Button>
          ))}
        </nav>
        {/* Hamburger Icon */}
        <button
          className="lg:hidden flex items-center justify-center"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <XIcon className="text-white z-20" size={32} /> : <Menu className="text-white" size={32} />}
        </button>
      </div>
      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="lg:hidden h-120 z-10 top-0 flex flex-col gap-2 w-screen absolute left-0 bg-black p-4">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {NAV_ITEMS.map(({ id, href, label }) => (
              <Button
                key={id}
                variant={id === 7 ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start px-4 py-6",
                  id !== 7 && "hover:underline text-white"
                )}
                onClick={() => setMobileOpen(false)}
              >
                <Link href={href} className="text-white w-full">
                  {label}
                </Link>
              </Button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
