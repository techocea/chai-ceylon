import Image from "next/image";

const ImageGallery = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 grid-rows-3 gap-2 md:h-[700px]">
      <div className="relative w-full h-40 sm:h-full sm:col-span-2 sm:row-span-2 group">
        <Image
          src="/images/tea-type2.jpg"
          fill
          priority
          alt="tea type"
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
      <div className="relative w-full h-40 sm:h-full group">
        <Image
          src="/images/banner2.jpg"
          fill
          priority
          alt="tea type"
          className="object-cover "
          sizes="(max-width: 640px) 100vw, 25vw"
        />
      </div>
      <div className="relative w-full h-40 sm:h-full group">
        <Image
          src="/images/banner3.jpg"
          fill
          priority
          alt="tea type"
          className="object-cover "
          sizes="(max-width: 640px) 100vw, 25vw"
        />
      </div>
      <div className="relative w-full h-40 sm:h-full sm:col-span-2 group">
        <Image
          src="/images/banner5.jpg"
          fill
          priority
          alt="tea type"
          className="object-cover "
          sizes="(max-width: 640px) 100vw, 25vw"
        />
      </div>
      <div className="relative w-full h-40 sm:h-full sm:col-span-2 group">
        <Image
          src="/images/tea-type.jpg"
          fill
          priority
          alt="tea type"
          className="object-cover "
          sizes="(max-width: 640px) 100vw, 25vw"
        />
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
      </div>
      <div className="relative w-full h-40 sm:h-full group">
        <Image
          src="/images/banner2.jpg"
          fill
          priority
          alt="tea type"
          className="object-cover "
          sizes="(max-width: 640px) 100vw, 25vw"
        />
      </div>
    </div>
  );
};

export default ImageGallery;
