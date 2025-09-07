import React from "react";
import EventCard from "@/components/landing/EventCard";

export default async function EventSection() {
  const eventsData = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/events`,
    {
      cache: "no-store",
    }
  );

  const { events = [] } = await eventsData.json();
  if (events.length === 0) return <div className="wrapper flex-center text-4xl font-bold">No events</div>

  if (!eventsData.ok) {
    return (
      <div className="text-red-500 text-center p-4">Failed to load Events</div>
    );
  }



  return (
    <section className="wrapper space-y-16">
      <div>
        <h2 className="text-2xl font-bold mb-8 text-center">Recent Events</h2>

        {events.filter((event: any) => new Date(event.date) < new Date())
          .length < 1 ? (
          <div className="text-center text-gray-500">
            No recent events available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events
              .filter((event: any) => new Date(event.date) < new Date())
              .map((event: any) => (
                <EventCard
                  key={event._id}
                  title={event.title}
                  description={event.description}
                  imageUrls={event.imageUrls}
                  date={event.date}
                />
              ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-8 text-center">Upcoming Events</h2>

        {events.filter((event: any) => new Date(event.date) > new Date())
          .length < 1 ? (
          <div className="text-center text-gray-500">
            No upcoming events available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events
              .filter((event: any) => new Date(event.date) > new Date())
              .map((event: any) => (
                <EventCard
                  key={event._id}
                  title={event.title}
                  description={event.description}
                  imageUrls={event.imageUrls}
                  date={event.date}
                />
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
