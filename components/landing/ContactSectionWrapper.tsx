"use client";

import dynamic from "next/dynamic";
import React from "react";

const ContactSection = dynamic(() => import("./ContactSection"), {
  ssr: false,
});

const ContactSectionWrapper = () => {
  return <ContactSection />;
};

export default ContactSectionWrapper;