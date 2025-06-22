import ImageGallery from "./ImageGallery";
import Heading from "@/components/common/Heading";

const GallerySection = () => {
  return (
    <section className="wrapper pt-0">
      <Heading title="Our Gallery" description="Some enjoyable moments" />
      <div className="mt-12">
        <ImageGallery />
      </div>
    </section>
  );
};

export default GallerySection;
