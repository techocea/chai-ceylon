import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface CTASectionProps {
  title?: string;
  description?: string;
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
    <div className="relative bg-accent h-[600px] lg:h-80 flex items-center justify-center mb-28 lg:my-32 w-full">
      <Image
        src="/images/pattern.png"
        width={1920}
        height={400}
        className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none"
        alt="Pattern background"
      />
      <div className="absolute top-16 flex-center text-center px-4 lg:px-0 lg:max-w-xl w-full text-white">
        <h2 className="title">{title}</h2>
        <p className="text-sm sm:text-lg">{description}</p>
      </div>
      <div className="absolute bottom-16 lg:-bottom-20 z-10 w-full flex justify-center">
        <div
          className={cn(
            "bg-white shadow-lg p-8 max-w-2xl w-full",
            renderType === "newsletter"
              ? "flex flex-col items-start"
              : "flex-center text-center"
          )}
        >
          <h2 className="text-2xl md:text-3xl font-bold font-playfair-display mb-2">
            {CTATitle}
          </h2>
          <p className="text-base md:text-sm text-gray-700 mb-6 lg:max-w-md">
            {CTADescription}
          </p>
          {renderType === "newsletter" ? (
            <form className="w-full flex flex-col sm:flex-row gap-3">
              <Input type="email" placeholder="Enter your email" />
              <Button>Subscribe</Button>
            </form>
          ) : (
            <div>
              <Button>
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
