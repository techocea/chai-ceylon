"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CMS_NAV_ITEMS } from "@/lib/constants";

export default function ControlPanelLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-background px-6 py-8 text- border-r border-muted-foreground/40">
        <div className="mb-8 flex items-center bg-foreground justify-center">
          <Image
            src="/images/logo.png"
            alt="Chaiyo Ceylon"
            width={150}
            height={75}
            priority
          />
        </div>
        <nav>
          <ul className="space-y-2 text-base font-medium">
            {CMS_NAV_ITEMS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <motion.li
                  key={link.href}
                  initial={false}
                  whileHover={{ scale: 1.03 }}
                  className={`rounded-none ${
                    isActive
                      ? "bg-foreground text-white font-bold"
                      : "hover:bg-foreground hover:text-white"
                  } transition-colors duration-200`}
                >
                  <Link href={link.href} className="block px-4 py-2 w-full">
                    {link.label}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-scroll">
        <header className="px-4 py-6 lg:px-10 bg-background shadow-sm flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">
            Content Management System
          </h1>
        </header>
        <Separator />
        <main className="flex-1 px-4 py-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
