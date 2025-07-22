"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import axios from "axios";

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
    <header className="lg:max-w-6xl w-full mx-auto px-4 py-6 sm:px-4 sm:py-5 lg:px-12">
      <div className="flex items-center justify-between w-full">
        <div className="w-[150px] h-[75px]">
          <Link href="/">
            <Image
              src={navData?.logoUrl || "/images/logo.png"}
              alt="Chaiyo Ceylon"
              width={150}
              height={75}
            />
          </Link>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-3">
          {NAV_ITEMS.map(({ id, href, label }) => (
            <Button
              key={id}
              variant={id === 5 ? "default" : "ghost"}
              className={cn(
                "px-4 py-2",
                id !== 5 && "hover:underline text-white"
              )}
            >
              <Link href={href} className="text-white">
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
          {mobileOpen ? (
            // X Icon
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger Icon
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="lg:hidden h-96 mt-4 flex flex-col gap-2 w-screen absolute left-0 bg-black p-4">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {NAV_ITEMS.map(({ id, href, label }) => (
              <Button
                key={id}
                variant={id === 5 ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start px-4 py-6",
                  id !== 5 && "hover:underline text-white"
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
