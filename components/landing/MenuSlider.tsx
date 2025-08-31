"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { openWhatsApp } from "@/lib/whatsapp";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  isAvailable: boolean;
  imageUrl: string;
}

const MenuSlider = ({ products }: { products: Product[] }) => {
  return (
    <div className="w-full max-w-xl lg:max-w-6xl lg:mb-24 lg:mx-auto">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full mb-24"
      >
        <CarouselContent className="space-x-2">
          {products.map((product) => (
            <CarouselItem
              key={product._id}
              className="rounded-lg border-1 border-primary border-b-primary border-b-[6px] shadow-md flex flex-col basis-[80vw] xs:basis-[320px] md:basis-1/2 lg:basis-1/4 mx-1 lg:ml-4"
            >
              <div className="h-40 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={360}
                  height={160}
                  className="object-cover h-full rounded-sm w-full"
                />
              </div>
              <div className="p-4 flex flex-col text-center items-center justify-center flex-1 gap-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>

                <p className="text-gray-500 text-sm line-clamp-3">
                  {product.description}
                </p>

                <div
                  className="flex items-center justify-between
                    w-full mt-4"
                >
                  {product.isAvailable && (
                    <span className="text-primary font-bold">
                      {product.price} LKR
                    </span>
                  )}
                  <div
                    className={`${product.isAvailable ? "block" : "hidden"}`}
                  >
                    <Button
                      variant="outline"
                      className="border-primary"
                      onClick={() => openWhatsApp("94753102400", product.name)}
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="hidden sm:block">
          <CarouselPrevious className="border-2 border-primary bg-gray-50 absolute left-2 top-1/2 -translate-y-1/2" />
          <CarouselNext className="border-2 border-primary bg-gray-50 absolute right-2 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex sm:hidden justify-center gap-4 mt-8">
          <CarouselPrevious className="border-2 border-primary static" />
          <CarouselNext className="border-2 border-primary static" />
        </div>
      </Carousel>
    </div>
  );
};

export default MenuSlider;
