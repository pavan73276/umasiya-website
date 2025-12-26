import React from "react";
import contactBg from "../../assets/contactpg/p1.jpg";
import { Headphones } from "lucide-react";

const ContactHero = () => {
  return (
    <div
      className="w-full h-[100vh] relative bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${contactBg})`,
      }}
    >
      {/* Overlay to improve text contrast */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Centered Content */}
      <div className="relative z-10 text-center px-4">
        {/* Main Heading with icon */}
        <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
          <Headphones className="w-10 h-10 text-white" />
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold">
            Contact Us
          </h1>
        </div>

        {/* Supporting Subtext */}
        <div className="flex items-center justify-center gap-3 flex-wrap max-w-3xl mx-auto px-4">
          <Headphones className="w-6 h-6 text-white" />
          <p className="text-white text-md sm:text-lg md:text-xl font-medium text-center">
            We’re here to support you! If you have any questions or need assistance, reach out—we’ll respond as quickly as possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactHero;
