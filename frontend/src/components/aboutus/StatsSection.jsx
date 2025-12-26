import React from "react";
import { FaGlobeAmericas, FaUsers, FaRegSmile } from "react-icons/fa";

const StatsSection = () => {
  const stats = [
    {
      title: "10+ Global Offices",
      description: "Across multiple continents",
      icon: <FaGlobeAmericas className="text-blue-900 text-xl" />,
    },
    {
      title: "5,000+ Employees",
      description: "Diverse and dedicated teams",
      icon: <FaUsers className="text-blue-900 text-xl" />,
    },
    {
      title: "150,000+ Customers",
      description: "Worldwide satisfied clients",
      icon: <FaRegSmile className="text-blue-900 text-xl" />,
    },
  ];

  return (
    <div className="bg-white pt-12 pb-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-10">
          Umasiya by the <span className="text-blue-400">Numbers</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((item, index) => (
            <div
              key={index}
              className="w-72 h-48 bg-blue-100/30 backdrop-blur-md border border-blue-200/50 rounded-xl shadow-sm flex flex-col items-center justify-center mx-auto transition hover:scale-105 duration-300"
            >
              <div className="mb-2">{item.icon}</div>
              <h3 className="text-base font-semibold text-blue-900 mb-1">{item.title}</h3>
              <p className="text-sm text-blue-800">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
