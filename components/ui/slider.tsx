"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface SliderContent {
  title: string;
  description: string;
  imageUrl: string;
  points: string[];
}

interface SliderProps {
  content: SliderContent[];
}

export const Slider = ({ content }: SliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!content || content.length === 0) {
    return (
      <div className="text-center text-lg text-gray-500 py-10">
        No content available.
      </div>
    );
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((prev) =>
      newDirection === 1
        ? prev === content.length - 1
          ? 0
          : prev + 1
        : prev === 0
          ? content.length - 1
          : prev - 1
    );
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "spring" },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 },
    }),
  };

  const activeItem = content[activeIndex];

  return (
    <div className="relative flex flex-col items-center w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-primary-50 via-white to-secondary-100 rounded-2xl shadow-xl border border-primary-200">
      <div className="flex flex-col lg:flex-row items-center w-full">
        <div className="flex-1 w-full">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={{ variants }}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <h2 className="text-3xl font-extrabold text-primary font-playfair-display mb-3 drop-shadow">
                {activeItem.title}
              </h2>
              <p className="text-lg max-w-md text-secondary mb-5 font-medium">
                {activeItem.description}
              </p>
              <ul className="mt-4 space-y-3 text-base text-primary list-disc pl-6">
                {activeItem.points.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="font-semibold"
                  >
                    {point}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="relative h-[320px] w-[320px] overflow-hidden rounded-xl bg-white ml-0 lg:ml-12 mt-8 lg:mt-0">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeItem.imageUrl}
              custom={direction}
              variants={{ variants }}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
              style={{ position: "absolute" }}
            >
              <Image
                src={activeItem.imageUrl}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="h-full w-full object-cover"
                alt={activeItem.title}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="flex justify-center items-center mt-8 space-x-6">
        <Button
          onClick={() => paginate(-1)}
          className="px-5 py-2 bg-primary text-white rounded-full shadow hover:bg-primary-700 transition font-bold text-lg"
          aria-label="Previous"
        >
          <ArrowLeft />
        </Button>
        <span className="text-base text-primary font-semibold tracking-wide">
          {activeIndex + 1} / {content.length}
        </span>
        <Button
          onClick={() => paginate(1)}
          className="px-5 py-2 bg-primary text-white rounded-full shadow hover:bg-primary-700 transition font-bold text-lg"
          aria-label="Next"
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};
