"use client";

import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Loader2, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadButton } from "@/app/utils/uploadthing";
import { useForm, useFieldArray } from "react-hook-form";
import { bannerSchema, BannerValues } from "@/lib/zodSchema";
import toast from "react-hot-toast";

const bannerTypes = [
  "home",
  "about",
  "products",
  "our-concepts",
  "contact",
  "events",
] as const;

export default function ControlPageBanners() {
  const {
    control,
    register,
    handleSubmit,
    trigger,
    reset,
    watch,
    setValue,
    formState: { isDirty },
  } = useForm<BannerValues>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      banners: [],
      // banners: bannerTypes.map((type) => ({
      //   type,
      //   title: "",
      //   description: "",
      //   imageUrl: "",
      // })),
    },
  });

  const { fields } = useFieldArray({
    name: "banners",
    control,
    keyName: "formId",
  });
  const [loading, setLoading] = useState(true);

  const getBannerData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/banner");
      if (res.status === 200 && Array.isArray(res.data?.banners)) {
        // replace(res.data.banners);
        reset({ banners: res.data.banners });
      }
    } catch (error) {
      console.error("Error in fetching Banner Content:", error);
      toast.error("Error in fetching Banner Content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBannerData();
  }, [reset]);

  const onSubmit = async (data: BannerValues) => {
    setLoading(true);
    try {
      const updatePromises = data.banners.map((item) => {
        if (item._id) {
          return axios.patch(`/api/banner/${item._id}/update`, item);
        } else {
          return axios.post("/api/banner", { banners: [item] });
        }
      });

      await Promise.all(updatePromises);
      toast.success("Banners saved!");
      await getBannerData();
    } catch (error) {
      console.error("Error saving Banner:", error);
      toast.error("Failed to save banner");
    } finally {
      setLoading(false);
    }
  };

  const handleImageDelete = (index: number) => {
    setValue(`banners.${index}.imageUrl`, "", {
      shouldDirty: true,
      shouldValidate: true,
    });
    trigger(`banners.${index}.imageUrl`);
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
          <Input value={field.type} disabled className="bg-gray-200" />
          <div className="flex flex-col gap-3">
            <Label className="font-medium uppercase text-muted-foreground">
              Title
            </Label>
            <Input {...register(`banners.${i}.title`)} />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="font-medium uppercase text-muted-foreground">
              Description
            </Label>
            <Input {...register(`banners.${i}.description`)} />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="font-medium uppercase text-muted-foreground">
              Image
            </Label>
            {watch(`banners.${i}.imageUrl`) ? (
              <div className="relative w-full h-60 overflow-hidden">
                <Image
                  src={watch(`banners.${i}.imageUrl`)}
                  alt=""
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
            ) : (
              <div className="border flex items-center justify-center w-full h-60">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    const url = res[0].ufsUrl;
                    setValue(`banners.${i}.imageUrl`, url, {
                      shouldDirty: true,
                    });
                  }}
                  onUploadError={(err) => {
                    toast.error(err.message || "Upload failed");
                  }}
                />
              </div>
            )}
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
}
