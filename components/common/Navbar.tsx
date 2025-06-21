import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="lg:max-w-6xl mx-auto p-4 sm:px-6 bg-transparent">
      <div className="flex items-center justify-between w-full">
        <div>
          <Image
            src="/images/logo.png"
            alt="Chaiyo Ceylon"
            width={150}
            height={75}
          />
        </div>
        <nav className="hidden lg:flex gap-3">
          {NAV_ITEMS.map(({ id, href, label }) => (
            <Button
              key={id}
              variant={id === 5 ? "secondary" : "ghost"}
              className={cn(
                "px-4 py-2",
                id !== 5 &&
                "hover:underline text-white"
              )}
            >
              <Link href={href} className="text-white">
                {label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
