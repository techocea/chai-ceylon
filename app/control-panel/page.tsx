"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { footerContentSchema, FooterContentValues } from "@/lib/zodSchema";

const ControlPanelPage = () => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FooterContentValues>({
    resolver: zodResolver(footerContentSchema),
  });

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const res = await axios.get("/api/footer");
        if (res.status === 200 && res.data) {
          setIsEditing(true);
          reset(res.data.footerContent[0]);
        }
        console.log(res.data.footerContent[0]);
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
        setIsEditing(false);
      }
    };

    fetchFooterData();
  }, []);

  const onSubmit = async (data: FooterContentValues) => {
    setLoading(true);
    try {
      const res = isEditing
        ? await axios.patch("/api/footer/update", data)
        : await axios.post("/api/footer", data);

      if (res.status === 200) {
        alert("Footer content saved successfully");
      } else {
        alert("Error in saving Footer Content");
      }
    } catch (error) {
      alert("Error in publishing Footer Content");
      console.error("Error in publishing Footer Content:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-4">
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

          <div className="flex float-right">
            <Button type="submit" disabled={loading}>
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

export default ControlPanelPage;
