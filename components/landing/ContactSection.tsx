"use client";

import { useEffect, useState } from "react";
import Heading from "../common/Heading";
import ContactForm from "./ContactForm";
import axios from "axios";
import { Clock, MailCheck, MapPin, PhoneCall } from "lucide-react";
import dynamic from "next/dynamic";

// Update the Location type to match the new data structure
type Location = {
  _id?: string;
  label: string;
  latitude: number;
  longitude: number;
};

interface ContactPageDataProps {
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  locations: Location[];
}

const ContactMap = dynamic(() => import("./ContactMap"), {
  ssr: false,
});

const ContactSection = () => {
  const [contactPageData, setContactPageData] = useState<ContactPageDataProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactPageData = async () => {
      try {
        const res = await axios.get("/api/contact-page");
        if (res.data.contactPageContent?.length > 0) {
          setContactPageData(res.data.contactPageContent[0]);
        } else {
          console.error("No contact page content found.");
        }
      } catch (error) {
        console.error("Error fetching Contact Page Content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactPageData();
  }, []);

  return (
    <section className="wrapper">
      <Heading
        title="Contact Us"
        description="Get in touch with us for any inquiries or support."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        <div className="flex flex-col items-center justify-center h-48 py-4 px-1.5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="bg-primary w-16 h-16 flex items-center justify-center">
            <MapPin className="text-white" size={32} />
          </div>
          <p className="mt-2 text-primary font-playfair-display text-lg font-bold">Address</p>
          <p className="mt-1 text-muted-foreground text-sm text-center">
            {contactPageData?.address || (loading ? "Loading..." : "-")}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-48 py-4 px-1.5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="bg-primary w-16 h-16 flex items-center justify-center">
            <PhoneCall className="text-white" size={32} />
          </div>
          <p className="mt-2 text-primary font-playfair-display text-lg font-bold">Contact</p>
          <p className="mt-1 text-muted-foreground text-sm text-center">
            {contactPageData?.phone || (loading ? "Loading..." : "-")}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-48 py-4 px-1.5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="bg-primary w-16 h-16 flex items-center justify-center">
            <MailCheck className="text-white" size={32} />
          </div>
          <p className="mt-2 text-primary font-playfair-display text-lg font-bold">Email</p>
          <p className="mt-1 text-muted-foreground text-sm text-center">
            {contactPageData?.email || (loading ? "Loading..." : "-")}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-48 py-4 px-1.5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="bg-primary w-16 h-16 flex items-center justify-center">
            <Clock className="text-white" size={32} />
          </div>
          <p className="mt-2 text-primary font-playfair-display text-lg font-bold">Working Hours</p>
          <p className="mt-1 text-muted-foreground text-sm text-center">
            {contactPageData?.workingHours || (loading ? "Loading..." : "-")}
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-10 lg:gap-0 lg:flex-row w-full lg:mt-32 mt-16">
        <div className="flex-1 mt-16 lg:mt-0">
          {loading ? (
            <div className="flex justify-center items-center h-96 bg-gray-100 rounded-lg">
              <p>Loading map...</p>
            </div>
          ) : (
            <ContactMap locations={contactPageData?.locations || []} />
          )}
        </div>
        <div className="flex-1 mt-16 lg:mt-0">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;