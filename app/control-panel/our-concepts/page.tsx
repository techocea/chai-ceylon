"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConceptBlock from "@/components/control-panel/ConceptBlock";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

interface Concept {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  points: string[];
}

interface ConceptFormValues {
  concepts: Concept[];
}

const ConceptsPage = () => {
  const methods = useForm<ConceptFormValues>({
    defaultValues: {
      concepts: [
        {
          title: "",
          description: "",
          imageUrl: "",
          points: [],
        },
      ],
    },
    mode: "onBlur",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = methods;

  const {
    fields: conceptFields,
    append: appendConcept,
    remove: removeConcept,
    replace,
  } = useFieldArray({
    control,
    name: "concepts",
    keyName: "formId",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchConcepts();
  }, [reset]);

  const fetchConcepts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/our-concepts");

      if (res.data && res.status === 200 && Array.isArray(res.data?.concepts)) {
        reset({ concepts: res.data?.concepts });
        replace(res.data?.concepts);
      } else {
        reset({
          concepts: [
            {
              title: "",
              description: "",
              imageUrl: "",
              points: [],
            },
          ],
        });
        replace([
          {
            title: "",
            description: "",
            imageUrl: "",
            points: [],
          },
        ]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      // reset({
      //   concept: [
      //     {
      //       title: "",
      //       description: "",
      //       imageUrls: [],
      //       date: "",
      //     },
      //   ],
      // });
      // replace([
      //   {
      //     title: "",
      //     description: "",
      //     imageUrls: [],
      //     date: "",
      //   },
      // ]);
      console.log("Failed to load concepts. Please refresh or try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ConceptFormValues) => {
    try {
      const promises = data.concepts.map((item) => {
        if (item._id) {
          return axios.patch(`/api/our-concepts/${item._id}/update`, item);
        } else {
          return axios.post("/api/our-concepts", item);
        }
      });

      await Promise.all(promises);
      toast.success(
        data.concepts.some((item) => item._id)
          ? "Concepts updated successfully!"
          : "Concept(s) saved successfully!"
      );
      fetchConcepts();
    } catch (error) {
      console.error("Error saving concept:", error);
      toast.error("Failed to save concept!");
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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {conceptFields.map((conceptField, conceptIndex) => (
          <ConceptBlock
            key={conceptField._id || conceptField.formId}
            conceptIndex={conceptIndex}
            removeConcept={removeConcept}
          />
        ))}

        <div className="flex justify-center gap-2 float-end items-center">
          <Button
            type="button"
            variant="outline"
            className="border-primary"
            onClick={() =>
              appendConcept({
                title: "",
                description: "",
                imageUrl: "",
                points: [],
              })
            }
          >
            + Create Concept
          </Button>

          <Button type="submit" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? (
              <div className="flex gap-2 items-center">
                <p>Please wait</p>
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ConceptsPage;
