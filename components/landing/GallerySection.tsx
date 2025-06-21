import React from "react";
import ImageGallery from "./ImageGallery";

const GallerySection = () => {
  return (
    <section className="wrapper">
      <div className="flex-center">
        <h3 className="heading">Our Gallery</h3>
        <p className="sub-heading max-w-lg">Some enjoyable moments</p>
      </div>
      <div className="mt-12">
        <ImageGallery />
      </div>
    </section>
  );
};

export default GallerySection;
