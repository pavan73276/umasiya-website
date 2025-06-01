import React from "react";

const announcements = [
  "🎉 New semester begins from June 15!",
  "📢 Exam results declared for all branches.",
  "🛠️ Website maintenance on June 1, 12 AM–2 AM.",
  "🎓 Convocation ceremony on July 20th.",
];

const AnnouncementTicker = () => {
  return (
    <div className="bg-orange-500 text-white py-3 overflow-hidden whitespace-nowrap relative">
      <h2 className="text-xl font-bold pl-4 mb-2">Announcements:</h2>
      <div className="animate-marquee inline-block whitespace-nowrap">
        {announcements.map((text, index) => (
          <span key={index} className="mx-8 text-base font-medium">
            {text}
          </span>
        ))}
        {/* Repeat for loop effect */}
        {announcements.map((text, index) => (
          <span key={index + 100} className="mx-8 text-base font-medium">
            {text}
          </span>
        ))}
      </div>
      <style>
        {`
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default AnnouncementTicker;
