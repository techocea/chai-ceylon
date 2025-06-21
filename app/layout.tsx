import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/Footer";

const playFairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chaiyo Ceylon",
  description: "Experience the Soul of Ceylon in Every Sip",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playFairDisplay.variable} ${dmSans.variable} bg-background antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
