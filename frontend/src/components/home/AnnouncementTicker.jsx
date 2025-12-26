import React from "react";

const announcements = [
  "🎉 New semester begins from June 15!",
  "📢 Exam results declared for all branches.",
  "🛠️ Website maintenance on June 1, 12 AM–2 AM.",
  "🎓 Convocation ceremony on July 20th.",
];

const AnnouncementTicker = () => {
  return (
    <div className="max-w-full px-4 sm:px-6 lg:px-8 relative">
      {/* Title box with melted corner effect */}
      <div className="relative z-10 inline-block">
        <div 
          className="bg-[#0a1d3a] text-white py-3 px-6 shadow-lg"
          style={{
            borderRadius: '12px 12px 0 0',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
          }}
        >
          <h2 className="text-2xl md:text-3xl font-bold whitespace-nowrap">
            📢 Announcements
          </h2>
        </div>
        {/* Corner melt effect */}
        <div 
          className="absolute bottom-0 left-0 w-3 h-3 bg-[#0a1d3a]"
          style={{
            clipPath: 'polygon(0 0, 100% 100%, 0 100%)'
          }}
        ></div>
      </div>
      
      {/* Ticker box with matching melt effect */}
      <div 
        className="bg-orange-500 text-white py-3 -mt-1 pl-8 overflow-hidden whitespace-nowrap relative"
        style={{
          borderRadius: '0 8px 8px 8px',
          clipPath: 'polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)'
        }}
      >
        <div className="animate-marquee inline-block whitespace-nowrap">
          {announcements.map((text, index) => (
            <span key={index} className="mx-6 sm:mx-8 text-base sm:text-lg font-medium">
              {text}
            </span>
          ))}
          {announcements.map((text, index) => (
            <span key={`copy-${index}`} className="mx-6 sm:mx-8 text-base sm:text-lg font-medium">
              {text}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 640px) {
          .animate-marquee {
            animation-duration: 20s;
          }
        }
      `}</style>

    </div>
  );
};

export default AnnouncementTicker;