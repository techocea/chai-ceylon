"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventBlock from "@/components/control-panel/EventBlock";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

interface Event {
  _id?: string;
  title: string;
  description: string;
  imageUrls: string[];
  date: string;
}

interface EventFormValues {
  event: Event[];
}

const EventsPage = () => {
  const methods = useForm<EventFormValues>({
    defaultValues: {
      event: [
        {
          title: "",
          description: "",
          imageUrls: [],
          date: "",
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
    fields: eventFields,
    append: appendEvent,
    remove: removeEvent,
    replace,
  } = useFieldArray({
    control,
    name: "event",
    keyName: "formId",
  });

  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/events");

      if (res.data && res.status === 200 && Array.isArray(res.data?.events)) {
        const parsedEvents = res.data.events.map((ev: any) => ({
          ...ev,
          date: ev.date.split("T")[0],
        }));

        reset({ event: parsedEvents });
        replace(parsedEvents);
      } else {
        reset({
          event: [
            {
              title: "",
              description: "",
              imageUrls: [],
              date: "",
            },
          ],
        });
        replace([
          {
            title: "",
            description: "",
            imageUrls: [],
            date: "",
          },
        ]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      reset({
        event: [
          {
            title: "",
            description: "",
            imageUrls: [],
            date: "",
          },
        ],
      });
      replace([
        {
          title: "",
          description: "",
          imageUrls: [],
          date: "",
        },
      ]);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [reset]);

  const onSubmit = async (data: EventFormValues) => {
    try {
      const promises = data.event.map((item) => {
        if (item._id) {
          return axios.put(`/api/events/${item._id}/update`, item);
        } else {
          return axios.post("/api/events", item);
        }
      });

      await Promise.all(promises);
      toast.success(
        data.event.some((item) => item._id)
          ? "Events updated successfully!"
          : "Event(s) saved successfully!"
      );
      fetchEvents();
    } catch (error) {
      console.error("Error saving event:", error);
      toast.error("Failed to save event!");
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
        {eventFields.map((eventField, eventIndex) => (
          <EventBlock
            key={eventField._id || eventField.formId}
            eventIndex={eventIndex}
            removeEvent={removeEvent}
          />
        ))}

        <div className="flex justify-center gap-2 float-end items-center">
          <Button
            type="button"
            variant="outline"
            className="border-primary"
            onClick={() =>
              appendEvent({
                title: "",
                description: "",
                imageUrls: [],
                date: "",
              })
            }
          >
            + Create Event
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

export default EventsPage;
