"use client";

import React from "react";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { UploadButton } from "@/app/utils/uploadthing";
import { useFieldArray, useFormContext } from "react-hook-form";
import axios from "axios";

interface Event {
  _id?: string;
  title: string;
  description: string;
  imageUrls: string[];
  date: string;
}

interface EventFormValues {
  event: Event[];
}

interface EventBlockProps {
  eventIndex: number;
  removeEvent: (index: number) => void;
}

const EventBlock = ({ eventIndex, removeEvent }: EventBlockProps) => {
  const {
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<EventFormValues>();

  // Remove useFieldArray's remove, use the prop removeEvent instead
  useFieldArray({
    control,
    name: "event",
    keyName: "formId",
  });

  const images = watch(`event.${eventIndex}.imageUrls`) ?? [];

  const handleImageDelete = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);
    setValue(`event.${eventIndex}.imageUrls`, updated, { shouldDirty: true });
  };

  const handleEventDelete = async () => {
    const eventId = watch(`event.${eventIndex}._id`);
    if (!eventId) {
      removeEvent(eventIndex);
      return;
    }
    try {
      const res = await axios.delete(`/api/events/${eventId}/delete`);
      if (res.status === 200) {
        removeEvent(eventIndex);
      } else {
        alert("Failed to delete event.");
      }
    } catch (error) {
      alert("Error deleting event.");
    }
  };

  return (
    <div className="bg-gray-50 p-6 mb-8 border border-gray-200 shadow-sm">
      <div className="mb-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="sub-heading">New Event</h3>
          <div>
            <Button
              type="button"
              variant="destructive"
              onClick={handleEventDelete}
              size="sm"
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Label
            htmlFor={`event.${eventIndex}.title`}
            className="font-medium uppercase text-muted-foreground"
          >
            Title
          </Label>
          <Input id="title" {...register(`event.${eventIndex}.title`)} />
          {errors.event?.[eventIndex]?.title && (
            <p className="text-sm text-red-500">
              {errors.event?.[eventIndex]?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Label
            htmlFor={`event.${eventIndex}.description`}
            className="font-medium uppercase text-muted-foreground"
          >
            Description
          </Label>
          <Input
            id="description"
            {...register(`event.${eventIndex}.description`)}
          />
          {errors.event?.[eventIndex]?.description && (
            <p className="text-sm text-red-500">
              {errors.event?.[eventIndex]?.description?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Label className="font-medium uppercase text-muted-foreground">
            Images
          </Label>

          {errors.event?.[eventIndex]?.imageUrls && (
            <p className="text-sm text-red-500">
              {errors.event?.[eventIndex]?.message}
            </p>
          )}

          {images.length === 0 ? (
            <div className="h-32 flex border items-center justify-center w-full">
              <p className="text-sm text-gray-500">
                No images uploaded yet. Please upload images.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {images.map((url, i) => (
                <div key={i} className="relative w-48 h-48">
                  <Image
                    src={url}
                    alt={`Event Image ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-1 right-1 bg-red-600 text-white"
                    onClick={() => handleImageDelete(i)}
                  >
                    <XIcon size={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Label className="font-medium uppercase text-muted-foreground">
              Upload an Image
            </Label>

            <div className="h-32 flex border items-center justify-center w-full">
              <UploadButton
                endpoint="imageUploader"
                className="ut-button:px-2 ut-button:py-1.5 ut-button:bg-blue-500 ut-button:hover:bg-blue-500/50 ut-button:ut-readying:bg-blue-500/50"
                onClientUploadComplete={(res) => {
                  console.log("Upload response:", res);
                  const urls = res.map((file) => file.ufsUrl);
                  setValue(
                    `event.${eventIndex}.imageUrls`,
                    [...images, ...urls],
                    {
                      shouldDirty: true,
                    }
                  );
                }}
                onUploadError={(error: Error) => {
                  alert(`Upload Error: ${error.message}`);
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Label className="font-medium uppercase text-muted-foreground">
              Event Date
            </Label>

            <Input
              type="date"
              {...register(`event.${eventIndex}.date`)}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBlock;
