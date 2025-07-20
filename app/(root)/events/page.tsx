import HeroSection from "@/components/common/HeroSection";
import Navbar from "@/components/common/Navbar";
import EventCard from "@/components/landing/EventCard";
import React from "react";

export default async function EventsPage() {
  const bannerData = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/banner`,
    {
      cache: "no-store",
    }
  );

  const eventsData = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/events`,
    {
      cache: "no-store",
    }
  );

  if (!bannerData.ok) {
    return (
      <div className="text-red-500 text-center p-4">Failed to load Banners</div>
    );
  }

  if (!eventsData.ok) {
    return (
      <div className="text-red-500 text-center p-4">Failed to load Events</div>
    );
  }

  const { banners = [] } = await bannerData.json();
  const { events = [] } = await eventsData.json();

  return (
    <main>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div>
        <HeroSection
          title={banners[5]?.title}
          description={banners[5]?.description}
          buttonText="Explore Bends"
          imageUrl={banners[5]?.imageUrl}
        />

        <section className="wrapper space-y-16">
          <div>
            <h2 className="text-2xl font-bold mb-8 text-center">
              Recent Events
            </h2>

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
            <h2 className="text-2xl font-bold mb-8 text-center">
              Upcoming Events
            </h2>

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
      </div>
    </main>
  );
}
