"use client";

import { openWhatsApp } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";

const VendorSection = () => {
  return (
    <section className="wrapper">
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-3 md:grid-rows-2 gap-16 place-items-center">
        <VendorDetails
          title="Tea Kiosk"
          subTitle="Compact, stylish, and full of flavor"
          description="Own a shop on a main road or in a crowded area? We’ll set up a kiosk at your location. You can either sell and earn directly, or let us provide staff and pay you rent."
        />
        <VendorDetails
          title="Tea Box"
          subTitle="A curated tea experience in a box"
          description="Have a bike? We’ll provide you with a custom Tea Box setup and all necessary materials to sell our tea around your local area."
        />
        <VendorDetails
          title="Tea Wheel"
          subTitle="A converted three-wheeler for outdoor events and mobile sales"
          description="A converted three-wheeler (tuk tuk) that serves as a mobile tea and snack vendor. Ideal for outdoor events, food festivals, street corners, or moving through busy town areas. Operates under a 2-year agreement with refundable deposit and terms."
        />
        <VendorDetails
          title="Tea Shop"
          subTitle="Permanent retail location offering the full Chaiyo experience"
          description="A full-fledged permanent store offering the complete Chaiyo Ceylon range. Designed for high-traffic commercial areas or urban neighborhoods. Includes dine-in or takeaway, and can serve as a brand anchor for franchise or city-level presence."
        />
        <VendorDetails
          title="Tea Bar"
          subTitle="A stylish sit-down setup for cafes, restaurants, and loungese"
          description="A stylish, sit-down service counter ideal for cafes, hotel lobbies, restaurants, or premium lounges. Offers a full menu with a focus on ambiance and presentation. Great for elevating tea culture with a dine-in experience."
        />
        <VendorDetails
          title="Tea Box"
          subTitle="A bicycle-mounted mobile tea unit for neighborhood routes"
          description="A bicycle-mounted mobile tea unit designed for neighborhood rounds or small commercial areas. Easy to operate, very low running cost, and perfect for early morning or evening sales around residential or office zones."
        />
      </div>
    </section>
  );
};

export default VendorSection;

function VendorDetails({
  title,
  subTitle,
  description,
}: {
  title: string;
  subTitle: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center w-full max-w-xs sm:max-w-sm md:max-w-md">
      <h2 className="title text-primary">{title}</h2>
      <p className="text-primary">{subTitle}</p>
      <p className="my-4 text-muted-foreground font-medium">{description}</p>
      <div>
        <Button onClick={() => openWhatsApp(title)}>
          Proceed Now
        </Button>
      </div>
    </div>
  );
}
