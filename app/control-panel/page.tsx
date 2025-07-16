"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UploadButton } from "@/app/utils/uploadthing";
import { bannerSchema, BannerValues } from "@/lib/zodSchema";

const bannerTypes = [
  "home",
  "about",
  "products",
  "our-concepts",
  "contact",
] as const;

export default function ControlPageBanners() {
  const {
    control,
    register,
    handleSubmit,
    formState,
    trigger,
    watch,
    setValue,
  } = useForm<BannerValues>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      banners: bannerTypes.map((type) => ({
        type,
        title: "",
        description: "",
        imageUrl: "",
      })),
    },
  });

  const { fields, replace } = useFieldArray({
    name: "banners",
    control,
    keyName: "formId",
  });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const getBannerData = async () => {
    axios
      .get("/api/banner")
      .then((res) => {
        if (Array.isArray(res.data.banners)) replace(res.data.banners);
      })
      .catch(() => {
        /* ignore */
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getBannerData();
  }, [replace]);

  const onSubmit = async (data: BannerValues) => {
    setSubmitting(true);
    try {
      const updatePromises = data.banners.map((item) => {
        if (item._id) {
          return axios.patch(`/api/banner/${item._id}`, item);
        } else {
          return axios.post("/api/banner", { banners: [item] });
        }
      });

      await Promise.all(updatePromises);
      alert("Banners saved!");
      await getBannerData();
    } catch (e) {
      console.error(e);
      alert("Failed to save");
    } finally {
      setSubmitting(false);
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
                  onUploadError={(err) => alert(err.message)}
                />
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <Button type="submit" disabled={!formState.isDirty || submitting}>
          {submitting ? (
            <div className="flex gap-2 items-center">
              <p>Please wait</p>
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            "Save Banners"
          )}
        </Button>
      </div>
    </form>
  );
}
