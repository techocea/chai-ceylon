import Image from "next/image";
import React from "react";

interface AboutSectionProps {
  title: string;
  description: string;
  icon?: boolean;
  imageSrc: string;
}

const AboutSection = ({
  title,
  description,
  icon,
  imageSrc,
}: AboutSectionProps) => {
  return (
    <section className="wrapper py-0">
      <div className="flex-center lg:flex-row w-full">
        <div className="flex flex-col items-start space-y-6 flex-1">
          <div className="flex items-center justify-center gap-5">
            <h3 className="heading">{title}</h3>
            <span>
              {icon && (
                <img
                  src="/icons/Cup.png"
                  width={58}
                  height={58}
                  alt="about chaio ceylon"
                />
              )}
            </span>
          </div>

          <p className="max-w-lg text-start text-muted-foreground font-medium">
            {description}
          </p>
        </div>
        <div className="flex-1">
          <Image
            src={imageSrc}
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
