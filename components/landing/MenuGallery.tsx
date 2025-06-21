import Image from "next/image";
import React from "react";

const MenuGallery = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-full md:max-w-lg h-full md:h-[495px]">
      <div className="relative w-full h-40 sm:h-full sm:col-span-2 group">
        <Image
          src="/images/tea-type.jpg"
          fill
          priority
          alt="tea type"
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <span className="text-white text-xl font-semibold">
            Signature Chai
          </span>
        </div>
      </div>
      <div className="relative w-full h-40 sm:h-full group">
        <Image
          src="/images/tea-type2.jpg"
          fill
          priority
          alt="tea type"
          className="object-cover "
          sizes="(max-width: 640px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/40  opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <span className="text-white text-xl font-semibold">Herbal Chai</span>
        </div>
      </div>
      <div className="relative w-full h-40 sm:h-full group">
        <Image
          src="/images/tea-type3.png"
          fill
          priority
          alt="tea type"
          className="object-cover "
          sizes="(max-width: 640px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/40  opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <span className="text-white text-xl font-semibold">Spice Chai</span>
        </div>
      </div>
    </div>
  );
};

export default MenuGallery;
