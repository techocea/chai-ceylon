import React from "react";
import Heading from "../common/Heading";
import Image from "next/image";

const OurPartners = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/site-config`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return (
      <div className="text-red-500 text-center p-4">
        Failed to load Site Configuration
      </div>
    );
  }

  const { SiteConfigContent = [] } = await res.json();
  const clientLogos = SiteConfigContent[0]?.clientLogoUrls || [];

  return (
    <div className="wrapper">
      <Heading title="our partners" />
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6 lg:mt-10">
        {clientLogos.map(
          (logo: { name: string; imageUrl: string }, index: number) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={logo.imageUrl}
                width={280}
                height={180}
                alt={logo.name || `Client Logo ${index + 1}`}
                className="object-contain"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default OurPartners;
