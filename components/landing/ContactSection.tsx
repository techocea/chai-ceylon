import React from "react";
import Heading from "../common/Heading";
import { CONTACT_DATA } from "@/lib/constants";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  return (
    <section className="wrapper">
      <Heading
        title="Contact Us"
        description="Get in touch with us for any inquiries or support."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        {CONTACT_DATA.map(({ id, icon: Icon, label, description }) => (
          <div
            key={id}
            className="flex flex-col items-center justify-center h-48 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="bg-primary w-16 h-16 flex items-center justify-center ">
              <Icon className="w-10 h-10 text-white" />
            </div>
            <p className="mt-2 text-primary font-playfair-display text-lg font-bold">
              {label}
            </p>
            <p className="mt-1 text-muted-foreground text-sm text-center">
              {description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col-reverse gap-10 lg:gap-0 lg:flex-row w-full lg:mt-32 mt-16">
        <div className="flex-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15843.59044481431!2d79.84483923314275!3d6.902846641849903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25961265f9517%3A0x70b4d5a5cf6c452e!2sBambalapitiya%2C%20Colombo!5e0!3m2!1sen!2slk!4v1750600399892!5m2!1sen!2slk"
            className="lg:max-w-lg w-full min-h-[420px]"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
        <div className="flex-1">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
