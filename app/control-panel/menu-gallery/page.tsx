"use client";

import axios from "axios";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadButton } from "@/app/utils/uploadthing";
import { menuGallerySchema, MenuGalleryValues } from "@/lib/zodSchema";

const MenuGallery = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isDirty },
  } = useForm<MenuGalleryValues>({
    resolver: zodResolver(menuGallerySchema),
    defaultValues: { gallery: [] },
  });

  const { fields, replace } = useFieldArray({
    name: "gallery",
    control,
    keyName: "formId",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuGallery = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/menu-gallery");
        if (res.status === 200 && Array.isArray(res.data.gallery)) {
          replace(res.data.gallery);
        }
      } catch (error) {
        alert("Failed to load Menu Gallery content. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMenuGallery();
  }, [replace]);

  const handleImageDelete = (index: number) => {
    setValue(`gallery.${index}.imageUrl` as const, "", {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit = async (data: MenuGalleryValues) => {
    setLoading(true);
    try {
      await axios.post("/api/menu-gallery", data);
      alert("Gallery saved!");
      reset(data);
    } catch {
      alert("Failed to save gallery.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[90vh] w-full flex items-center justify-center">
        <div className="flex gap-2 items-center">
          <p>Please wait</p>
          <Loader2 className="animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {fields.map((field, i) => (
        <div
          key={field.formId}
          className="bg-gray-50 p-4 rounded border space-y-4"
        >
          {watch(`gallery.${i}.imageUrl`) ? (
            <div className="relative w-full h-60 overflow-hidden mb-4">
              <Image
                src={watch(`gallery.${i}.imageUrl`)}
                alt="Menu Image"
                fill
                className="object-cover"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 bg-red-600 text-white"
                onClick={() => handleImageDelete(i)}
              >
                <XIcon size={18} />
              </Button>
            </div>
          ) : (
            <div className="border flex items-center justify-center w-full h-60">
              <UploadButton
                endpoint="imageUploader"
                className="ut-button:px-4 ut-button:py-2 ut-button:bg-blue-500 ut-button:hover:bg-blue-600 ut-button:ut-readying:bg-blue-400"
                onClientUploadComplete={(res) => {
                  const uploadUrl = res[0].ufsUrl;
                  setValue(`gallery.${i}.imageUrl`, uploadUrl, {
                    shouldDirty: true,
                  });
                }}
                onUploadError={(error: Error) => {
                  alert(`Upload Error: ${error.message}`);
                }}
              />
            </div>
          )}
          <div className="w-full">
            <Label className="block mb-1 text-sm font-medium text-muted-foreground">
              Slug
            </Label>
            <Input
              {...register(`gallery.${i}.slug`)}
              placeholder="Enter Slug"
              className="w-full"
            />
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <Button type="submit" disabled={loading || !isDirty}>
          {loading ? (
            <div className="flex items-center gap-2">
              Please Wait
              <Loader2 className="animate-spin transition-all duration-200" />
            </div>
          ) : (
            "Update"
          )}
        </Button>
      </div>
    </form>
  );
};

export default MenuGallery;
