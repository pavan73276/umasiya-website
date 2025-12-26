import React from "react";

const MapSection = () => {
  return (
    <div className="w-full bg-[#e5e7eb] py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-[#0a1d3a] text-center mb-8">
        Our Head Office Location
      </h2>
      <div className="w-full max-w-5xl mx-auto h-[450px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1382.6956631520336!2d85.01441851865734!3d24.81323139550074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f32b0025ded74b%3A0x4b8e6939597f6eae!2sUmasiya%20international%20service%20private%20limited!5e1!3m2!1sen!2sin!4v1749800243071!5m2!1sen!2sin"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl shadow-lg"
          title="Head Office Location"
        />
      </div>
    </div>
  );
};

export default MapSection;
