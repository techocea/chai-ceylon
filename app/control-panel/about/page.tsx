"use client";

import axios from "axios";
import Image from "next/image";
import { Loader2, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { aboutContentSchema, AboutContentValues } from "@/lib/zodSchema";
import { UploadButton } from "@/app/utils/uploadthing";
import toast from "react-hot-toast";

const AboutPage = () => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors, isDirty },
  } = useForm<AboutContentValues>({
    resolver: zodResolver(aboutContentSchema),
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutUsContent = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/about");

        if (res.status === 200 && res.data) {
          reset(res.data.aboutUsContent[0]);
          console.log("Fetched About Us content:", res.data.aboutUsContent[0]);
        } else {
          console.error(
            "No existing About Us content found or insufficient data. Initializing with default blocks."
          );
          toast.error("Failed to load About Us content");
        }
      } catch (error) {
        console.error("Error in fetching About Us Content:", error);
        toast.error("Failed to load About Us content");
      } finally {
        setLoading(false);
      }
    };
    fetchAboutUsContent();
  }, [reset]);

  const onSubmit = async (data: AboutContentValues) => {
    setLoading(true);
    try {
      const res = await axios.patch("/api/about/update", data);

      if (res.status === 200) {
        toast.success("Saved successfully!");
      } else {
        toast.error("Failed to save content");
      }
    } catch (error) {
      console.error("Error in saving About Us content:", error);
      toast.error("Failed to save content");
    } finally {
      setLoading(false);
    }
  };

  const handleImageDelete = () => {
    setValue("imageUrl", "", {
      shouldDirty: true,
      shouldValidate: true,
    });
    trigger("imageUrl");
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
            <Label
              htmlFor="title"
              className="font-medium uppercase text-muted-foreground"
            >
              Title
            </Label>
            <Input id="title" {...register("title")} />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title?.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Label
              htmlFor="description"
              className="font-medium uppercase text-muted-foreground"
            >
              Description
            </Label>
            <Input id="description" {...register("description")} />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Label className="font-medium uppercase text-muted-foreground">
              Image
            </Label>

            {errors.imageUrl && (
              <p className="text-sm text-red-500">{errors.imageUrl?.message}</p>
            )}

            {watch("imageUrl") ? (
              <div className="relative w-full h-60 overflow-hidden">
                <Image
                  src={watch("imageUrl")}
                  alt=""
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
            ) : (
              <div className="border flex items-center justify-center w-full h-60">
                <UploadButton
                  endpoint="imageUploader"
                  className="ut-button:px-2 ut-button:py-1.5 ut-button:bg-blue-500 ut-button:hover:bg-blue-500/50 ut-button:ut-readying:bg-blue-500/50"
                  onClientUploadComplete={(res) => {
                    const uploadUrl = res[0].ufsUrl;
                    setValue("imageUrl", uploadUrl, {
                      shouldDirty: true,
                    });
                    toast("Image uploaded successfully!");
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`Upload Failed! ${error.message}`);
                  }}
                />
              </div>
            )}
          </div>
          <div>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutPage;
