"use client";

import axios from "axios";
import { Loader2, Plus } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactPageContentSchema,
  ContactPageContentValues,
} from "@/lib/zodSchema";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<ContactPageContentValues>({
    resolver: zodResolver(contactPageContentSchema),
    defaultValues: {
      locations: [{ label: "", latitude: 0, longitude: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "locations",
  });

  useEffect(() => {
    const fetchContactPageContent = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/contact-page");
        if (res.data.contactPageContent?.length > 0) {
          setIsEditing(true);
          reset(res.data.contactPageContent[0]);
        }
      } catch (error) {
        console.error("Error in fetching Contact Page Content:", error);
        toast.error("Failed to fetch content");
      } finally {
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
        toast.success("Saved successfully");
      } else {
        toast.error("Error in saving content");
      }
    } catch (error) {
      toast.error("Failed to save content");
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
          {/* Static form fields for address, phone, email, etc. */}
          <div className="flex flex-col gap-3">
            <Label
              htmlFor="address"
              className="font-medium uppercase text-muted-foreground"
            >
              Address
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
              Phone
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
              Email
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
              Opening Hours
            </Label>
            <Input id="workingHours" {...register("workingHours")} />
            {errors.workingHours && (
              <p className="text-sm text-red-500">
                {errors.workingHours.message}
              </p>
            )}
          </div>

          {/* Dynamic location fields */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between w-full">
              <Label
                htmlFor="locations"
                className="font-medium uppercase text-muted-foreground"
              >
                Outlet Locations
              </Label>
              <Button
                type="button"
                variant="outline"
                className="border-primary"
                onClick={() => append({ label: "", latitude: 0, longitude: 0 })}
              >
                <Plus size={16} /> Add Location
              </Button>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-4 relative"
              >
                <Button
                  type="button"
                  variant="link"
                  className="text-red-500 absolute top-2 right-2"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>

                <div className="flex flex-col gap-3">
                  <Label
                    htmlFor={`locations.${index}.label`}
                    className="font-medium text-sm"
                  >
                    Location Name
                  </Label>
                  <Input
                    placeholder="e.g., Colombo Outlet"
                    {...register(`locations.${index}.label`)}
                  />
                  {errors.locations?.[index]?.label && (
                    <p className="text-sm text-red-500">
                      {errors.locations[index]?.label?.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col gap-3 w-1/2">
                    <Label
                      htmlFor={`locations.${index}.latitude`}
                      className="font-medium text-sm"
                    >
                      Latitude
                    </Label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="e.g., 6.927079"
                      {...register(`locations.${index}.latitude`, {
                        valueAsNumber: true,
                      })}
                    />
                    {errors.locations?.[index]?.latitude && (
                      <p className="text-sm text-red-500">
                        {errors.locations[index]?.latitude?.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 w-1/2">
                    <Label
                      htmlFor={`locations.${index}.longitude`}
                      className="font-medium text-sm"
                    >
                      Longitude
                    </Label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="e.g., 79.861244"
                      {...register(`locations.${index}.longitude`, {
                        valueAsNumber: true,
                      })}
                    />
                    {errors.locations?.[index]?.longitude && (
                      <p className="text-sm text-red-500">
                        {errors.locations[index]?.longitude?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
