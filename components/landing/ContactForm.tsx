"use client";

import React, { useState } from "react";
import { formSchema, FormSchema } from "@/lib/zodSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    setLoading(true);
    setSuccess("");
    setServerError("");
    console.log(data);
    setTimeout(() => {
      setSuccess("Thank you for submitting! We will get back to you soon.");
      setLoading(false);
      reset();
    }, 1500);
  };

  const getValidationErrorMessage = () => {
    const errorMessages = (Object.keys(errors) as (keyof FormSchema)[]).map(
      (key) => errors[key]?.message as string | undefined
    );
    const filteredMessages = errorMessages.filter(Boolean);
    return filteredMessages.length > 0
      ? filteredMessages.join(". ") + "."
      : null;
  };

  const validationErrorMessage = getValidationErrorMessage();
  const currentErrorMessage = validationErrorMessage || serverError;

  return (
    <div className="lg:max-w-md lg:ml-6 space-y-6">
      {(success || currentErrorMessage) && (
        <NotificationMessage success={success} error={currentErrorMessage} />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {!success && !currentErrorMessage && (
          <p className="text-muted-foreground font-medium mb-8">
            Fill out the form below and we’ll get back to you as soon as
            possible.
          </p>
        )}
        <div className="space-y-3">
          <Label>Name</Label>
          <Input  {...register("name")} placeholder="Enter your name" />
        </div>
        <div className="space-y-3">
          <Label>Phone</Label>
          <Input {...register("phone")} placeholder="Enter your phone number" />
        </div>
        <div className="space-y-3">
          <Label>Message</Label>
          <Textarea {...register("message")} placeholder="Enter your message" />
        </div>
        <div className="w-full">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              "Sending..."
            ) : (
              <span className="flex items-center gap-4 uppercase text-base tracking-wide">
                Send Message <Send />
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

function NotificationMessage({
  success,
  error,
}: {
  success?: string;
  error?: string;
}) {
  return (
    <div
      className={`border-l-4 px-4 py-3 rounded mb-4 ${
        success
          ? "border-green-500 bg-green-100 text-green-700"
          : "border-red-500 bg-red-100 text-red-700"
      }`}
      role="alert"
    >
      {success || error}
    </div>
  );
}
