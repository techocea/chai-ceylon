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
import { siteConfigSchema, SiteConfigValues } from "@/lib/zodSchema";
import { UploadButton } from "@/app/utils/uploadthing";

// interface LinkItem {
//   label: string;
//   href: string;
// }

// interface SiteConfigValues {
//   aboutText: string;
//   quickLinks: LinkItem[];
//   socialMediaLinks: LinkItem[];
//   workingHours: string;
//   logoUrl: string;
// }

const SiteConfigPage = () => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
    reset,
    trigger,
  } = useForm<SiteConfigValues>({
    resolver: zodResolver(siteConfigSchema),
  });

  useEffect(() => {
    const fetchSiteConfigData = async () => {
      try {
        const res = await axios.get("/api/site-config");
        if (res.status === 200 && res.data) {
          setIsEditing(true);
          reset(res.data.SiteConfigContent[0]);
        } else {
          console.error("Failed to fetch SiteConfig data:");
        }
        console.log(res.data.SiteConfigContent);
      } catch (error) {
        console.error("Failed to fetch SiteConfig data:", error);
        setIsEditing(false);
      }
    };

    fetchSiteConfigData();
  }, [reset]);

  const onSubmit = async (data: SiteConfigValues) => {
    setLoading(true);
    try {
      const res = isEditing
        ? await axios.patch("/api/site-config", data)
        : await axios.post("/api/site-config", data);

      if (res.status === 200) {
        alert("SiteConfig content saved successfully");
      } else {
        alert("Error in saving SiteConfig Content");
      }
    } catch (error) {
      alert("Error in publishing SiteConfig Content");
      console.error("Error in publishing SiteConfig Content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageDelete = () => {
    setValue("logoUrl", "", {
      shouldDirty: true,
      shouldValidate: true,
    }),
      trigger("logoUrl");
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
              htmlFor="aboutText"
              className="font-medium uppercase text-muted-foreground"
            >
              footer content
            </Label>
            <Input id="aboutText" {...register("aboutText")} />
            {errors.aboutText && (
              <p className="text-sm text-red-500">{errors.aboutText.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Label
              htmlFor="quickLinks"
              className="font-medium uppercase text-muted-foreground"
            >
              quick links
            </Label>
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  id={`quickLinks-label-${index}`}
                  placeholder="Label"
                  {...register(`quickLinks.${index}.label` as const)}
                />
                <Input
                  id={`quickLinks-href-${index}`}
                  placeholder="Href"
                  {...register(`quickLinks.${index}.href` as const)}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Label
              htmlFor="socialMediaLinks"
              className="font-medium uppercase text-muted-foreground"
            >
              social media links
            </Label>
            {[0, 1].map((index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  id={`socialMediaLinks-label-${index}`}
                  placeholder="Label"
                  {...register(`socialMediaLinks.${index}.label` as const)}
                />
                <Input
                  id={`socialMediaLinks-href-${index}`}
                  placeholder="Href"
                  {...register(`socialMediaLinks.${index}.href` as const)}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Label
              htmlFor="workingHours"
              className="font-medium uppercase text-muted-foreground"
            >
              working hours
            </Label>
            <Input id="workingHours" {...register("workingHours")} />
            {errors.workingHours && (
              <p className="text-sm text-red-500">
                {errors.workingHours.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Label className="font-medium uppercase text-muted-foreground">
              logo
            </Label>

            {errors.logoUrl && (
              <p className="text-sm text-red-500">{errors.logoUrl?.message}</p>
            )}

            {watch("logoUrl") ? (
              <div className="relative w-full border h-28 overflow-hidden">
                <Image
                  src={watch("logoUrl")}
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
              <div className="border flex items-center justify-center w-full h-28">
                <UploadButton
                  endpoint="imageUploader"
                  className="ut-button:px-2 ut-button:py-1.5 ut-button:bg-blue-500 ut-button:hover:bg-blue-500/50 ut-button:ut-readying:bg-blue-500/50"
                  onClientUploadComplete={(res) => {
                    const uploadUrl = res[0].ufsUrl;
                    setValue("logoUrl", uploadUrl, {
                      shouldDirty: true,
                    });
                    alert("Image uploaded successfully!");
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading || !isDirty}>
              {loading ? (
                <div className="flex items-center gap-2">
                  Please Wait{" "}
                  <Loader2 className="animate-spin transition-all duration-200" />
                </div>
              ) : (
                <>Update</>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SiteConfigPage;
