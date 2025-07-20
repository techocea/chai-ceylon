import Image from "next/image";
import React from "react";

export default async function MenuGallery() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/menu-gallery`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <div className="text-red-500 text-center p-4">
        Failed to load menu gallery
      </div>
    );
  }

  const { gallery = [] } = await res.json();

  if (gallery.length < 3) {
    return (
      <div className="text-yellow-500 text-center p-4">
        Not enough gallery items. Please add more in CMS.
      </div>
    );
  }

  return (
    <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-full md:max-w-xl h-full md:h-[495px]">
      <GalleryCard data={gallery[0]} spanFull />

      {gallery.slice(1, 3).map((item: any, i: number) => (
        <GalleryCard key={i} data={item} />
      ))}
    </div>
  );
}

type GalleryItem = {
  imageUrl: string;
  slug: string;
};

function GalleryCard({
  data,
  spanFull = false,
}: {
  data: GalleryItem;
  spanFull?: boolean;
}) {
  return (
    <div
      className={`relative w-full h-40 sm:h-full group ${
        spanFull ? "sm:col-span-2" : ""
      }`}
    >
      <Image
        src={data.imageUrl}
        fill
        priority
        alt={data.slug}
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
        <span className="text-white text-xl font-semibold">{data.slug}</span>
      </div>
    </div>
  );
}
