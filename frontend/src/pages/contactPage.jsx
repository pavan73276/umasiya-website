import React from "react";
import Contact from "../components/contact/Contact";
import ContactHero from "../components/contact/ContactHero";
import ContactDetailsGrid from "../components/contact/ContactDetailsGrid";
import MapSection from "../components/contact/MapSection"; // 👈 Make sure this import is correct

const ContactPage = () => {
  return (
    <div className="p-4 space-y-16">
      <ContactHero />
      <ContactDetailsGrid />

      {/* 🔁 Side-by-side layout for large screens, stacked on small */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch">
        {/* 🗺️ Map Section on the left */}
        <div className="w-full lg:w-1/2">
          <MapSection />
        </div>

        {/* 📝 Contact Form on the right */}
        <div className="w-full lg:w-1/2">
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
