"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, XIcon } from "lucide-react";

interface EventCardProps {
  title: string;
  description: string;
  imageUrls: string[];
  date: string;
}

const ImageSlider = ({
  images,
  onClose,
}: {
  images: string[];
  onClose: () => void;
}) => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <Button
        variant="ghost"
        className="absolute top-4 right-4"
        onClick={onClose}
      >
        <XIcon size={32} className="text-white" />
      </Button>
      <Button
        variant="ghost"
        className="text-white text-3xl px-4"
        onClick={prev}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Image
        src={images[current]}
        alt={`Event image ${current + 1}`}
        width={600}
        height={400}
        className="object-contain max-h-[80vh] max-w-[70%]"
      />
      <Button
        variant="ghost"
        className="text-white text-3xl px-4"
        onClick={next}
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

const EventCard = ({ title, description, imageUrls, date }: EventCardProps) => {
  const [showSlider, setShowSlider] = useState(false);

  return (
    <>
      <Card
        className="bg-white rounded-lg border-b-primary border-b-[6px] shadow-md overflow-hidden flex flex-col pt-0 cursor-pointer"
        onClick={() => setShowSlider(true)}
      >
        <CardHeader className="p-0">
          <Image
            src={imageUrls?.[0] as string}
            alt={title}
            width={500}
            height={300}
            className="h-48 w-full object-cover"
          />
        </CardHeader>
        <CardContent className="p-0">
          <div className="px-3 flex-1 flex flex-col">
            <h3 className="text-lg font-semibold mb-2 capitalize">{title}</h3>
            <p className="text-gray-600 text-sm mb-4 flex-1">{description}</p>
            <div className="text-xs text-gray-400 mt-auto">
              Date: {new Date(date).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>
      {showSlider && (
        <ImageSlider images={imageUrls} onClose={() => setShowSlider(false)} />
      )}
    </>
  );
};

export default EventCard;
