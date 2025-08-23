"use client";

import axios from "axios";
import Image from "next/image";
import { Loader2, Plus, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { siteConfigSchema, SiteConfigValues } from "@/lib/zodSchema";
import { UploadButton } from "@/app/utils/uploadthing";

const SiteConfigPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    trigger,
  } = useForm<SiteConfigValues>({
    resolver: zodResolver(siteConfigSchema),
  });
  const [_, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

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
      const res = await axios.get("/api/site-config");
      const hasData =
        res.status === 200 &&
        res.data &&
        Array.isArray(res.data.SiteConfigContent) &&
        res.data.SiteConfigContent.length > 0;

      let response;
      if (hasData) {
        response = await axios.patch("/api/site-config", data);
      } else {
        response = await axios.post("/api/site-config", data);
      }

      if (response.status === 200) {
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
            <div className="flex items-center justify-between w-full">
              <Label
                htmlFor="socialMediaLinks"
                className="font-medium uppercase text-muted-foreground"
              >
                social media links
              </Label>
              <Button
                type="button"
                variant="outline"
                className="border-primary"
                onClick={() => {
                  const updated = [...(watch("socialMediaLinks") || [])];
                  updated.push({ label: "", href: "" });
                  setValue("socialMediaLinks", updated, { shouldDirty: true });
                }}
              >
                <Plus size={16} /> Add Link
              </Button>
            </div>

            {Array.isArray(watch("socialMediaLinks")) &&
              watch("socialMediaLinks").map((link, index) => (
                <div
                  key={index}
                  className="flex gap-2 mb-2 items-center relative"
                >
                  <Input
                    placeholder="Label"
                    value={link.label || ""}
                    onChange={(e) => {
                      const updated = [...(watch("socialMediaLinks") || [])];
                      updated[index].label = e.target.value;
                      setValue("socialMediaLinks", updated, {
                        shouldDirty: true,
                      });
                    }}
                  />
                  <Input
                    placeholder="Href"
                    value={link.href || ""}
                    onChange={(e) => {
                      const updated = [...(watch("socialMediaLinks") || [])];
                      updated[index].href = e.target.value;
                      setValue("socialMediaLinks", updated, {
                        shouldDirty: true,
                      });
                    }}
                  />
                  <Button
                    type="button"
                    variant="link"
                    className="text-red-500"
                    onClick={() => {
                      const updated = [...(watch("socialMediaLinks") || [])];
                      updated.splice(index, 1);
                      setValue("socialMediaLinks", updated, {
                        shouldDirty: true,
                      });
                    }}
                  >
                    Remove
                  </Button>
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

            {watch("logoUrl") ? (
              <div className="relative w-48 border h-32 overflow-hidden">
                <Image
                  src={watch("logoUrl")}
                  alt="Logo Url"
                  height={112}
                  width={192}
                  className="w-full h-full object-contain flex items-center justify-center"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 bg-red-600 text-white"
                  onClick={() => {
                    setValue("logoUrl", "", {
                      shouldDirty: true,
                      shouldValidate: true,
                    }),
                      trigger("logoUrl");
                  }}
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

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between w-full">
              <Label className="font-medium uppercase text-muted-foreground">
                Partner Logos
              </Label>
              <Button
                type="button"
                variant="outline"
                className="border-primary"
                onClick={() => {
                  const updated = [...(watch("clientLogoUrls") || [])];
                  updated.push({ name: "", imageUrl: "" });
                  setValue("clientLogoUrls", updated, { shouldDirty: true });
                }}
              >
                <Plus size={16} /> Add Partner
              </Button>
            </div>

            {Array.isArray(watch("clientLogoUrls")) &&
              watch("clientLogoUrls").map((logo, index) => (
                <div
                  key={index}
                  className="border p-3 rounded-none flex flex-col gap-2 relative"
                >
                  <Input
                    placeholder="Partner Name"
                    value={logo.name || ""}
                    onChange={(e) => {
                      const updated = [...(watch("clientLogoUrls") || [])];
                      updated[index].name = e.target.value;
                      setValue("clientLogoUrls", updated, {
                        shouldDirty: true,
                      });
                    }}
                  />

                  {logo.imageUrl ? (
                    <div className="relative w-full border h-32 overflow-hidden">
                      <Image
                        src={logo.imageUrl}
                        alt={logo.name || "Client Logo"}
                        fill
                        className="object-contain"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1 bg-red-600 text-white"
                        onClick={() => {
                          const updated = [...(watch("clientLogoUrls") || [])];
                          updated[index].imageUrl = "";
                          setValue("clientLogoUrls", updated, {
                            shouldDirty: true,
                          });
                        }}
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
                          const updated = [...(watch("clientLogoUrls") || [])];
                          updated[index].imageUrl = uploadUrl;
                          setValue("clientLogoUrls", updated, {
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
              ))}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  Please Wait
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
