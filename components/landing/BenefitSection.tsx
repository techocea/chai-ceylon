import { BENEFITS } from "@/lib/constants";
import Image from "next/image";
import Heading from "@/components/common/Heading";
import { cn } from "@/lib/utils";

const BenefitSection = () => {
  return (
    <section className="wrapper lg:pb-0 h-full">
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <Heading
          title="Benefits"
          description="It`s a comforting blend of spices that energizes your body, supports
            digestion, boosts immunity, and soothes the soul"
          className="text-black"
        />
        <div className="w-full mt-10 flex flex-col space-y-4 sm:max-w-6xl sm:relative sm:h-[600px]">
          <div className="hidden sm:block absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[388px] h-[375px]">
            <Image
              src="/images/tea-type3.png"
              width={388}
              height={375}
              alt="best chai tea"
              className="w-full h-full object-cover"
            />
          </div>

          {BENEFITS.map((item, idx) => {
            const positions = [
              "sm:top-8 sm:left-12",
              "sm:top-16 sm:right-16",
              "sm:top-1/2 sm:right-8 sm:transform sm:-translate-y-1/2",
              "sm:bottom-16 sm:right-24",
              "sm:bottom-20 sm:left-20",
              "sm:top-1/2 sm:left-8 sm:transform sm:-translate-y-1/2",
            ];
            const position = positions[idx % positions.length];

            return (
              <div
                key={idx}
                className={cn(
                  "flex items-center justify-start h-16 p-4 w-full text-primary shadow bg-primary/10 border-l-8 border-primary sm:w-[300px] sm:absolute sm:border-[2px] sm:border-primary sm:bg-secondary sm:text-white sm:border-l-0",
                  position
                )}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitSection;
