import Link from "next/link";
import Heading from "../common/Heading";
import { Button } from "../ui/button";
import ImageGallery from "./ImageGallery";
import { ArrowRight } from "lucide-react";
import React from "react";

const GallerySection = () => {
  return (
    <section className="wrapper lg:pb-0">
      <div className="lg:mb-12 mb-10 flex items-center justify-between w-full">
        <Heading title="our gallery" />
        <div className="flex-center justify-center">
          <Button variant="link" className="flex items-center justify-center">
            <Link href="/events">View Events</Link>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ImageGallery />
    </section>
  );
};

export default GallerySection;
