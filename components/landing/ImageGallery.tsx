"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

const ImageGallery = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("/api/gallery");
        if (Array.isArray(res.data?.imageUrls)) {
          setImages(res.data.imageUrls);
        }
      } catch (err) {
        console.error("Failed to load gallery images", err);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 grid-rows-3 gap-2 md:h-[700px]">
      {images.slice(0, 7).map((url, index) => {
        const layout = [
          "sm:col-span-2 sm:row-span-2", // 1st image
          "", // 2nd image
          "", // 3rd image
          "sm:col-span-2", // 4th image
          "sm:col-span-2", // 5th image
          "", // 6th image
          "", // 7th image
        ];

        return (
          <div
            key={index}
            className={`relative w-full h-40 sm:h-full group overflow-hidden ${
              layout[index] || ""
            }`}
          >
            <Image
              src={url}
              fill
              priority
              alt={`gallery-image-${index}`}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 25vw"
            />
          </div>
        );
      })}
    </div>
  );
};

export default ImageGallery;
