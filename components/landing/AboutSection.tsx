import Image from "next/image";
import React from "react";

const AboutSection = () => {
  return (
    <section className="wrapper">
      <div className="flex-center lg:flex-row w-full">
        <div className="flex flex-col items-start space-y-6 flex-1">
          <div className="flex items-center justify-center gap-5">
            <h3 className="heading">About Us</h3>
            <span>
              <img
                src="/icons/cup.png"
                width={58}
                height={58}
                alt="about chaio ceylon"
              />
            </span>
          </div>

          <p className="max-w-lg text-start text-muted-foreground font-medium">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            In enim justo, rhoncus ut, imperdiet a, venenatis. Lorem ipsum dolor
            sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
            dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. In enim justo, rhoncus
            ut, imperdiet a, venenatis.
          </p>
        </div>
        <div className="flex-1">
          <Image
            src="/images/about-image.png"
            width={500}
            height={500}
            alt="about chaio ceylon"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
