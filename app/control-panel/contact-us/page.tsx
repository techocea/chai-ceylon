"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactPageContentSchema,
  ContactPageContentValues,
} from "@/lib/zodSchema";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
  } = useForm<ContactPageContentValues>({
    resolver: zodResolver(contactPageContentSchema),
  });

  useEffect(() => {
    const fetchContactPageContent = async () => {
      try {
        const res = await axios.get("/api/contact-page");
        if (res.status === 200 && res.data) {
          setIsEditing(true);
          reset(res.data.contactPageContent[0]);
        }
        console.log(res.data.contactPageContent[0]);
      } catch (error) {
        console.error("Error in fetching Contact Page Content:", error);
        setLoading(false);
      }
    };
    fetchContactPageContent();
  }, [reset]);

  const onSubmit = async (data: ContactPageContentValues) => {
    setLoading(true);
    try {
      const res = isEditing
        ? await axios.patch("/api/contact-page/update", data)
        : await axios.post("/api/contact-page", data);

      if (res.status === 200) {
        alert("Contact Page content saved successfully");
      } else {
        alert("Error in saving Contact Page Content");
      }
    } catch (error) {
      alert("Error in publishing Contact Page Content");
      console.error("Error in publishing Contact Page Content:", error);
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
    <div className="w-full">
      <div className="bg-gray-50 p-6 mb-8 border border-gray-200 shadow-sm space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-3">
            <Label
              htmlFor="address"
              className="font-medium uppercase text-muted-foreground"
            >
              address
            </Label>
            <Input id="address" {...register("address")} />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Label
              htmlFor="phone"
              className="font-medium uppercase text-muted-foreground"
            >
              phone
            </Label>
            <Input id="phone" {...register("phone")} />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Label
              htmlFor="email"
              className="font-medium uppercase text-muted-foreground"
            >
              email
            </Label>
            <Input id="email" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Label
              htmlFor="workingHours"
              className="font-medium uppercase text-muted-foreground"
            >
              opening time
            </Label>
            <Input id="workingHours" {...register("workingHours")} />
            {errors.workingHours && (
              <p className="text-sm text-red-500">
                {errors.workingHours.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Label
              htmlFor="location"
              className="font-medium uppercase text-muted-foreground"
            >
              outlet locations
            </Label>
            <Input id="location" {...register("location")} />
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading || !isDirty}>
              {loading ? (
                <div className="flex items-center gap-2">
                  Please Wait
                  <Loader2 className="animate-spin transition-all duration-200" />
                </div>
              ) : (
                <p>Update</p>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
