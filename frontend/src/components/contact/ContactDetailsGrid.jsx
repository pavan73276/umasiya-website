import React from "react";
import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";

const ContactDetailsGrid = () => {
  const contactDetails = [
    {
      title: "Head Office",
      icon: <MapPin className="w-10 h-10 text-[#0a1d3a] mb-2" />,
      hoverText: "Ramshila More, Chhoti Road, Ramshila, Nawada, Gaya, Bihar 823002",
      link: "https://www.google.com/maps?q=umasiya international service private limited",
    },
    {
      title: "Email Us",
      icon: <Mail className="w-10 h-10 text-[#0a1d3a] mb-2" />,
      hoverText: "umasiyaspil@gmail.com",
      link: "mailto: umasiyaspil@gmail.com",
    },
    {
      title: "Call Us",
      icon: <Phone className="w-10 h-10 text-[#0a1d3a] mb-2" />,
      hoverText: "+91 6205812522",
      link: "tel:+916205812522",
    },
    {
      title: "WhatsApp",
      icon: <MessageCircle className="w-10 h-10 text-[#0a1d3a] mb-2" />,
      hoverText: "+91 62058 12522",
      link: "https://wa.me/916205812522",
    },
  ];

  return (
    <div className="w-full bg-[#eeeeee] py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactDetails.map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#0a1d3a] p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center transition duration-300 group hover:shadow-xl hover:scale-105"
          >
            {item.icon}
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="opacity-0 group-hover:opacity-100 text-sm mt-2 text-center transition-opacity duration-300">
              {item.hoverText}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactDetailsGrid;
