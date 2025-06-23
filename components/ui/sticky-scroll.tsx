"use client";

import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import Image from "next/image";

export const StickyScroll = ({
  content,
}: {
  content: {
    title: string;
    description: string;
    imageSrc: string;
    points: string[];
  }[];
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = ["#F3F7F2"];

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex h-[30rem] justify-center space-x-10 overflow-y-auto p-10"
      ref={ref}
    >
      <div className="relative flex items-start px-4">
        <div className="max-w-3xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="-ml-6 text-2xl font-bold text-primary font-playfair-display"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="-ml-6 text-base max-w-sm text-muted-foreground"
              >
                {item.description}
              </motion.p>
              <motion.ul
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="mt-4 space-y-2 text-sm text-muted-foreground"
              >
                {item.points.map((point, i) => (
                  <li key={i} className="list-disc">
                    {point}
                  </li>
                ))}
              </motion.ul>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div className="sticky top-10 hidden h-[300px] w-[300px] overflow-hidden rounded-md bg-white lg:block">
        <Image
          src={content[activeCard].imageSrc}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-full w-full object-cover"
          alt="tea kiosk"
        />
      </div>
    </motion.div>
  );
};
