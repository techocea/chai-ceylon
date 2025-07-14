"use client";

import axios from "axios";
import Image from "next/image";
import { Loader2, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { aboutContentSchema } from "@/lib/zodSchema";
import { UploadButton } from "@/app/utils/uploadthing";

interface AboutUsItem {
  _id?: string;
  page: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface AboutContentValues {
  aboutUsContent: AboutUsItem[];
}

const AboutPage = () => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    formState: { isDirty, errors },
  } = useForm<AboutContentValues>({
    resolver: zodResolver(aboutContentSchema),
    defaultValues: {
      aboutUsContent: [
        { page: "about", title: "", description: "", imageUrl: "" },
        { page: "about", title: "", description: "", imageUrl: "" },
      ],
    },
    mode: "onBlur",
  });

  const imageUrl0 = watch("aboutUsContent.0.imageUrl");
  const imageUrl1 = watch("aboutUsContent.1.imageUrl");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutUsContent = async () => {
      try {
        setLoading(true);
        const res = await axios.get<{ aboutUsContent: AboutUsItem[] }>(
          "/api/about"
        );

        if (
          res.status === 200 &&
          res.data &&
          Array.isArray(res.data.aboutUsContent) &&
          res.data.aboutUsContent.length > 0
        ) {
          reset({ aboutUsContent: res.data.aboutUsContent });
          console.log("Fetched About Us content:", res.data.aboutUsContent);
        } else {
          console.warn(
            "No existing About Us content found or insufficient data. Initializing with default blocks."
          );
          reset({
            aboutUsContent: [
              { page: "about", title: "", description: "", imageUrl: "" },
              { page: "about", title: "", description: "", imageUrl: "" },
            ],
          });
        }
      } catch (error) {
        console.error("Error in fetching About Us Content:", error);
        reset({
          aboutUsContent: [
            { page: "about", title: "", description: "", imageUrl: "" },
            { page: "about", title: "", description: "", imageUrl: "" },
          ],
        });
        alert("Failed to load About Us content. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAboutUsContent();
  }, [reset]);

  const onSubmit = async (data: AboutContentValues) => {
    setLoading(true);
    try {
      const promises = data.aboutUsContent.map((item) => {
        if (item._id) {
          return axios.patch(`/api/about/${item._id}`, item);
        } else {
          return axios.post("/api/about", item);
        }
      });

      await Promise.all(promises);

      const res = await axios.get<{ aboutUsContent: AboutUsItem[] }>(
        "/api/about"
      );
      if (res.data && Array.isArray(res.data.aboutUsContent)) {
        reset({ aboutUsContent: res.data.aboutUsContent.slice(0, 2) });
      }

      alert("About Us content saved successfully!");
    } catch (error) {
      console.error("Error saving About Us content:", error);
      alert(
        "Failed to save About Us content. Please check your inputs and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderAboutUsBlock = (
    index: 0 | 1,
    currentImageUrl: string | undefined
  ) => {
    return (
      <div
        className="bg-gray-50 p-6 mb-8 border border-gray-200 shadow-sm space-y-6 relative"
        key={`about-block-${index}`}
      >
        <div className="flex flex-col gap-3">
          <Label className="font-medium uppercase text-muted-foreground">
            Page Type
          </Label>
          <Input
            id={`aboutUsContent.${index}.page`}
            {...register(`aboutUsContent.${index}.page`)}
            disabled
          />
          {errors.aboutUsContent?.[index]?.page && (
            <p className="text-sm text-red-500">
              {errors.aboutUsContent?.[index]?.page?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Label
            htmlFor={`aboutUsContent.${index}.title`}
            className="font-medium uppercase text-muted-foreground"
          >
            Title
          </Label>
          <Input
            id={`aboutUsContent.${index}.title`}
            {...register(`aboutUsContent.${index}.title`)}
          />
          {errors.aboutUsContent?.[index]?.title && (
            <p className="text-sm text-red-500">
              {errors.aboutUsContent?.[index]?.title?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Label
            htmlFor={`aboutUsContent.${index}.description`}
            className="font-medium uppercase text-muted-foreground"
          >
            Description
          </Label>
          <Input
            id={`aboutUsContent.${index}.description`}
            {...register(`aboutUsContent.${index}.description`)}
          />
          {errors.aboutUsContent?.[index]?.description && (
            <p className="text-sm text-red-500">
              {errors.aboutUsContent?.[index]?.description?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Label className="font-medium uppercase text-muted-foreground">
            Image
          </Label>
          <Input
            id={`aboutUsContent.${index}.imageUrl`}
            {...register(`aboutUsContent.${index}.imageUrl`)}
            className="hidden"
            readOnly
          />
          {errors.aboutUsContent?.[index]?.imageUrl && (
            <p className="text-sm text-red-500">
              {errors.aboutUsContent?.[index]?.imageUrl?.message}
            </p>
          )}

          {currentImageUrl ? (
            <div className="relative w-[920px] h-[400px] mt-4 overflow-hidden">
              <Image
                src={currentImageUrl}
                width={800}
                height={400}
                className="h-full w-full object-cover"
                alt={`About Us Image Block ${index + 1}`}
                onError={(e) => {
                  e.currentTarget.src = "/images/placeholder.png";
                  e.currentTarget.alt = "Image not found";
                }}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 rounded-full"
                onClick={() => {
                  setValue(`aboutUsContent.${index}.imageUrl`, "", {
                    shouldDirty: true,
                  });
                }}
                title="Remove image"
              >
                <XCircle className="h-5 w-5" />
              </Button>
              <div className="absolute bottom-2 left-2 right-2">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res.length > 0) {
                      setValue(
                        `aboutUsContent.${index}.imageUrl`,
                        res[0].ufsUrl,
                        {
                          shouldDirty: true,
                        }
                      );
                      alert("Image uploaded successfully!");
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                  className="w-full ut-button:bg-blue-500 ut-button:ut-readying:bg-blue-400 ut-button:ut-uploading:bg-blue-300 ut-button:ut-disabled:bg-gray-400"
                >
                  Change Image
                </UploadButton>
              </div>
            </div>
          ) : (
            <Input type="file" />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {renderAboutUsBlock(0, imageUrl0)}
          {renderAboutUsBlock(1, imageUrl1)}

          <div className="flex justify-end ">
            <Button type="submit" disabled={loading || !isDirty}>
              {loading ? (
                <div className="flex items-center gap-2">
                  Please Wait{" "}
                  <Loader2 className="animate-spin transition-all duration-200" />
                </div>
              ) : (
                <>Save All Changes</>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutPage;
