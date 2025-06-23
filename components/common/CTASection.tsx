import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

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
    <div className="relative bg-accent lg:h-[380px] h-[410px] flex items-center justify-center my-28 lg:my-32 w-full px-2 sm:px-4">
      <Image
        src="/images/pattern.png"
        width={1920}
        height={400}
        className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none"
        alt="Pattern background"
        priority
      />
      <div className="absolute top-8 md:top-12 flex flex-col items-center text-center px-2 sm:px-4 md:px-0 max-w-full md:max-w-xl w-full text-white">
        <h2 className="title">{title}</h2>
        <p className="text-sm sm:text-sm md:text-base lg:max-w-sm w-full mt-2">
          {description}
        </p>
      </div>
      <div className="absolute bottom-8 md:bottom-12 lg:-bottom-20 z-10 w-full flex justify-center px-2">
        <div
          className={cn(
            "bg-white shadow-lg p-4 sm:p-6 md:p-8 max-w-full sm:max-w-2xl w-full space-y-3",
            renderType === "newsletter"
              ? "flex flex-col items-start"
              : "flex flex-col items-center text-center"
          )}
        >
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold font-playfair-display">
            {CTATitle}
          </h2>
          <p className="text-sm sm:text-sm md:text-base lg:max-w-md w-full text-muted-foreground">
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
              <Button className="w-full sm:w-auto">
                <Link href="/services/become-a-vendor">Become a vendor</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CTASection;
