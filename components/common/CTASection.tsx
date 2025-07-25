import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Heading from "./Heading";

interface CTASectionProps {
  title: string;
  description: string;
  CTATitle: string;
  CTADescription: string;
  renderType: "newsletter" | "vendor";
}

const CTASection = ({
  title,
  description,
  CTATitle,
  CTADescription,
  renderType = "newsletter",
}: CTASectionProps) => {
  return (
    <section className="wrapper">
      <div className="relative bg-accent min-h-[420px] flex flex-col items-center justify-center py-10 sm:py-16 w-full px-2 sm:px-4">
        <Image
          src="/images/pattern.png"
          width={1920}
          height={400}
          className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none"
          alt="Pattern background"
          priority
        />
        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-2xl px-2 sm:px-4">
          <Heading
            title={title}
            description={description}
            className="text-white"
          />
        </div>
        <div className="relative z-20 w-full flex justify-center mt-8">
          <div
            className={cn(
              "bg-white shadow-lg p-4 sm:p-6 md:p-8 w-full lg:max-w-2xl space-y-4 flex flex-col items-center",
              renderType === "newsletter"
                ? "items-start text-left"
                : "items-center text-center"
            )}
          >
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold font-playfair-display w-full">
              {CTATitle}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground w-full">
              {CTADescription}
            </p>
            {renderType === "newsletter" ? (
              <form className="w-full flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 placeholder:text-sm"
                />
                <Button className="w-full sm:w-auto">Subscribe</Button>
              </form>
            ) : (
              <div className="w-full flex justify-center">
                <Link href="/our-concepts/become-a-vendor" passHref>
                  <Button className="w-full sm:w-auto">Become a vendor</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
