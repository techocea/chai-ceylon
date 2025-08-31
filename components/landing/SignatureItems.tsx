"use client";

import React, { useState } from "react";
import Heading from "@/components/common/Heading";
import Image from "next/image";

type SignatureItem = {
  id: number;
  imageSrc: string;
  overlayedText: string;
  name: string;
};

type SignatureItemsProps = {
  title: string;
  content: SignatureItem[];
};

const SignatureItems = ({ title, content }: SignatureItemsProps) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  
  return (
    <section className="wrapper">
      <div className="flex-center">
        <Heading title={title} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-full mt-10">
          {content.map(({ id, imageSrc, name, overlayedText }) => (
            <div key={id} className="relative w-full h-48  group">
              <Image
                src={imageSrc || "/images/tea-type.jpg"}
                fill
                priority
                alt={name}
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div
                className={`absolute inset-0 bg-black/40 flex items-center justify-center duration-300 ${activeId === id
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                  }`}
                tabIndex={0}
                onClick={() => setActiveId(id)}
                onTouchStart={() => setActiveId(id)}
              >
                <span className="max-w-2xs text-white text-lg text-center font-semibold">
                  {overlayedText || "Signature Chai"}
                </span>
              </div>

              <div className="text-center my-2.5">{name || "spicy milk"}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureItems;
