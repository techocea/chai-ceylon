"use client";

import axios from "axios";
import React from "react";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { UploadButton } from "@/app/utils/uploadthing";
import { useFieldArray, useFormContext } from "react-hook-form";

interface Concept {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  points: string[];
}

interface ConceptFormValues {
  concepts: Concept[];
}

interface ConceptBlockProps {
  conceptIndex: number;
  removeConcept: (index: number) => void;
}

const ConceptBlock = ({ conceptIndex, removeConcept }: ConceptBlockProps) => {
  const {
    register,
    watch,
    setValue,
    control,
    trigger,
    formState: { errors },
  } = useFormContext<ConceptFormValues>();

  const {
    fields: pointFields,
    append: appendPoint,
    remove: removePoint,
  } = useFieldArray({
    control,
    name: `concepts.${conceptIndex}.points` as any, // Temporary workaround for type error
    keyName: "formId",
  });

  const handleImageDelete = () => {
    setValue(`concepts.${conceptIndex}.imageUrl`, "", {
      shouldDirty: true,
      shouldValidate: true,
    });
    trigger(`concepts.${conceptIndex}.imageUrl`);
  };

  const handleConceptDelete = async () => {
    const conceptId = watch(`concepts.${conceptIndex}._id`);
    if (!conceptId) {
      removeConcept(conceptIndex);
      return;
    }
    try {
      const res = await axios.delete(`/api/our-concepts/${conceptId}/delete`);
      if (res.status === 200) {
        removeConcept(conceptIndex);
      } else {
        alert("Failed to delete concept.");
      }
    } catch (error) {
      alert("Error deleting concept.");
    }
  };

  return (
    <div className="bg-gray-50 p-6 mb-8 border border-gray-200 shadow-sm">
      <div className="mb-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="sub-heading">New Concept</h3>
          <div>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConceptDelete}
              size="sm"
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Label
            htmlFor={`concept.${conceptIndex}.title`}
            className="font-medium uppercase text-muted-foreground"
          >
            Title
          </Label>
          <Input id="title" {...register(`concepts.${conceptIndex}.title`)} />
          {errors.concepts?.[conceptIndex]?.title && (
            <p className="text-sm text-red-500">
              {errors.concepts?.[conceptIndex]?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Label
            htmlFor={`concept.${conceptIndex}.description`}
            className="font-medium uppercase text-muted-foreground"
          >
            Description
          </Label>
          <Input
            id="description"
            {...register(`concepts.${conceptIndex}.description`)}
          />
          {errors.concepts?.[conceptIndex]?.description && (
            <p className="text-sm text-red-500">
              {errors.concepts?.[conceptIndex]?.description?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Label className="font-medium uppercase text-muted-foreground">
            Points
          </Label>

          {pointFields.length === 0 && (
            <p className="text-gray-500 text-sm">No points added yet.</p>
          )}

          {pointFields.map((point, pointIndex) => (
            <div key={point.formId} className="flex items-center gap-2">
              <Input
                {...register(`concepts.${conceptIndex}.points.${pointIndex}`)}
                className="w-full"
                placeholder={`Point ${pointIndex + 1}`}
              />
              <Button
                type="button"
                variant="link"
                className="text-red-500"
                onClick={() => removePoint(pointIndex)}
              >
                Remove
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="default"
            className="w-fit"
            onClick={() => appendPoint("")}
          >
            + Add Point
          </Button>

          {errors.concepts?.[conceptIndex]?.points && (
            <p className="text-sm text-red-500">
              {errors.concepts?.[conceptIndex]?.points?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {watch(`concepts.${conceptIndex}.imageUrl`) ? (
            <>
              <Label className="font-medium uppercase text-muted-foreground">
                Image
              </Label>

              {errors.concepts?.[conceptIndex]?.imageUrl && (
                <p className="text-sm text-red-500">
                  {errors.concepts?.[conceptIndex]?.message}
                </p>
              )}
              <div className="relative w-48 h-48">
                <Image
                  src={watch(`concepts.${conceptIndex}.imageUrl`)}
                  alt={`concept Image ${conceptIndex}`}
                  fill
                  className="object-cover"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-1 right-1 bg-red-600 text-white"
                  onClick={() => handleImageDelete()}
                >
                  <XIcon size={16} />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <Label className="font-medium uppercase text-muted-foreground">
                Upload an Image
              </Label>

              <div className="h-32 flex border items-center justify-center w-full">
                <UploadButton
                  endpoint="imageUploader"
                  className="ut-button:px-2 ut-button:py-1.5 ut-button:bg-blue-500 ut-button:hover:bg-blue-500/50 ut-button:ut-readying:bg-blue-500/50"
                  onClientUploadComplete={(res) => {
                    const url = res[0].ufsUrl;
                    setValue(`concepts.${conceptIndex}.imageUrl`, url, {
                      shouldDirty: true,
                    });
                  }}
                  onUploadError={(error: Error) => {
                    alert(`Upload Error: ${error.message}`);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConceptBlock;
