import Image from "next/image";
import Heading from "./Heading";
import { WHYUS_DATA } from "@/lib/constants";

const WhyUsSection = () => {
  return (
    <section className="wrapper pt-0">
      <Heading
        title="Why Taste From Chaiyo Ceylon ?"
        description="Organic & ethically sourced, Ground in small batches, Bold & authentic Sri Lankan flavor"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        {WHYUS_DATA.map(({ id, imageSrc, label }) => (
          <div
            key={id}
            className="flex-center h-48 py-4 px-1.5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Image
              src={imageSrc}
              width={64}
              height={64}
              alt={label}
              className="w-16 h-16"
            />
            <p className="mt-2 text-green-800 text-center font-playfair-display text-lg font-bold">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUsSection;
