"use client";

import { useEffect, useState } from "react";
import Heading from "../common/Heading";
import ContactForm from "./ContactForm";
import axios from "axios";
import { Clock, MailCheck, MapPin, PhoneCall } from "lucide-react";

interface ContactPageDataProps {
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  location: string;
}

const ContactSection = () => {
  const [contactPageData, setContactPageData] =
    useState<ContactPageDataProps | null>(null);

  useEffect(() => {
    const fetchContactPageData = async () => {
      try {
        const res = await axios.get("/api/contact-page");
        if (res.data && res.status === 200) {
          setContactPageData(res.data.contactPageContent[0]);
        } else {
          console.error("Error in fetching Contact Page Content");
        }
      } catch (error) {
        console.error("Error in fetching Contact Page Content:", error);
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
          <div className="bg-primary w-16 h-16 flex items-center justify-center ">
            <MapPin className="text-white" size={32} />
          </div>
          <p className="mt-2 text-primary font-playfair-display text-lg font-bold">
            Address
          </p>
          <p className="mt-1 text-muted-foreground text-sm text-center">
            {contactPageData?.address || "-"}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-48 py-4 px-1.5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="bg-primary w-16 h-16 flex items-center justify-center ">
            <PhoneCall className="text-white" size={32} />
          </div>
          <p className="mt-2 text-primary font-playfair-display text-lg font-bold">
            Contact
          </p>
          <p className="mt-1 text-muted-foreground text-sm text-center">
            {contactPageData?.phone || "-"}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-48 py-4 px-1.5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="bg-primary w-16 h-16 flex items-center justify-center ">
            <MailCheck className="text-white" size={32} />
          </div>
          <p className="mt-2 text-primary font-playfair-display text-lg font-bold">
            Email
          </p>
          <p className="mt-1 text-muted-foreground text-sm text-center">
            {contactPageData?.email || "-"}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-48 py-4 px-1.5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="bg-primary w-16 h-16 flex items-center justify-center ">
            <Clock className="text-white" size={32} />
          </div>
          <p className="mt-2 text-primary font-playfair-display text-lg font-bold">
            Working Hours
          </p>
          <p className="mt-1 text-muted-foreground text-sm text-center">
            {contactPageData?.workingHours || "-"}
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-10 lg:gap-0 lg:flex-row w-full lg:mt-32 mt-16">
        <div className="flex-1 mt-16 lg:mt-0">
          <iframe
            src={
              contactPageData?.location ||
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15843.59044481431!2d79.84483923314275!3d6.902846641849903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25961265f9517%3A0x70b4d5a5cf6c452e!2sBambalapitiya%2C%20Colombo!5e0!3m2!1sen!2slk!4v1750600399892!5m2!1sen!2slk"
            }
            className="lg:max-w-lg w-full min-h-[420px]"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
        <div className="flex-1 mt-16 lg:mt-0">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
