"use client";

import { UploadButton } from "@/app/utils/uploadthing";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { gallerySchema, GalleryValues } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const GalleryPage = () => {
  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<GalleryValues>({
    resolver: zodResolver(gallerySchema),
    defaultValues: { imageUrls: [] },
  });

  const images = watch("imageUrls") ?? [];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGalleryImages = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/gallery");
        if (Array.isArray(res.data?.imageUrls)) {
          reset({ imageUrls: res.data.imageUrls });
        }
      } catch (err) {
        console.error("Error fetching gallery:", err);
      } finally {
        setLoading(false);
      }
    };
    getGalleryImages();
  }, [reset]);

  const handleImageDelete = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);
    setValue("imageUrls", updated, { shouldDirty: true });
  };

  const onSubmit = async (data: GalleryValues) => {
    try {
      const res = await axios.patch("/api/gallery", data);
      if (res.status === 200) {
        alert("Gallery saved successfully!");
      }
    } catch (error) {
      console.error("Error saving gallery:", error);
      alert("Failed to save gallery");
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
    <div className="w-full">
      <div className="bg-gray-50 p-6 mb-8 border border-gray-200 shadow-sm space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-3">
            <Label className="font-medium uppercase text-muted-foreground">
              Image Gallery
            </Label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
              {images.map((url, i) => (
                <div key={i} className="relative w-48 h-48">
                  <Image
                    src={url}
                    alt={`Gallery Image ${i + 1}`}
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

            {images.length < 7 ? (
              <>
                <Label className="font-medium uppercase text-muted-foreground">
                  Upload an Image
                </Label>

                <div className="h-32 flex border items-center justify-center w-full">
                  <UploadButton
                    endpoint="imageUploader"
                    className="ut-button:px-2 ut-button:py-1.5 ut-button:bg-blue-500 ut-button:hover:bg-blue-500/50 ut-button:ut-readying:bg-blue-500/50"
                    onClientUploadComplete={(res) => {
                      const urls = res.map((file) => file.ufsUrl);
                      setValue("imageUrls", [...images, ...urls], {
                        shouldDirty: true,
                      });
                    }}
                    onUploadError={(error: Error) => {
                      alert(`Upload Error: ${error.message}`);
                    }}
                  />
                </div>
              </>
            ) : null}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading || isSubmitting}>
              {loading || isSubmitting ? (
                <div className="flex gap-2 items-center">
                  <p>Please wait</p>
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                "Save Gallery"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GalleryPage;
