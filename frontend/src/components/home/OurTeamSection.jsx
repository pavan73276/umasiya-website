import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Briefcase, UserCog, Users, Code2, Brain, Megaphone, Palette, ClipboardList } from "lucide-react";

import member1 from "../../assets/homepg/teams/m1.jpeg";
import member2 from "../../assets/homepg/teams/m2.jpeg";
import member3 from "../../assets/homepg/teams/m3.jpeg";
import member4 from "../../assets/homepg/teams/m4.jpeg";
import member5 from "../../assets/homepg/teams/m5.jpeg";


const teamMembers = [
  { name: "Sachin Kumar Singh", img: member1, role: "Chief Editor", icon: Briefcase },
  { name: "Pavan Kumar (B.Tech)", img: member2, role: "Software Developer", icon: Code2 },
  { name: "Atul pandey (M.B.A)", img: member3, role: "Financial Analyst", icon: Brain },
  { name: "Aditya Raj (M.Com)", img: member4, role: "Management of Director", icon: Users },
  { name: "Sushant Kumar (B.Com)", img: member5, role: "HR Manager", icon: Megaphone },

];

const OurTeamSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const slidesToShow = 3;
  const slidesToScroll = 2;
  const totalMembers = teamMembers.length;

  const getNextIndex = (index) => (index + slidesToScroll) % totalMembers;
  const getPrevIndex = (index) =>
    (index - slidesToScroll + totalMembers) % totalMembers;

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => getNextIndex(prev));
    }, 10000);
  };

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => getPrevIndex(prev));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => getNextIndex(prev));
  };

  const visibleMembers = [];
  for (let i = 0; i < slidesToShow; i++) {
    visibleMembers.push(teamMembers[(currentIndex + i) % totalMembers]);
  }

  return (
    <div className="w-full py-16 bg-gray-100">
      {/* 🔵 Heading */}
      <h2 className="text-5xl font-bold text-center mb-12" style={{ color: "#0a1d3a" }}>
        Our Team
      </h2>

      <div className="relative w-[70vw] mx-auto">
        {/* 🔵 Arrow Left */}
        <button
          onClick={() => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
          }}
          className="absolute left-[-2rem] top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-200"
        >
          <ChevronLeft className="w-6 h-6 text-[#0a1d3a]" />
        </button>

        {/* 🟢 Carousel */}
        <div className="flex gap-6 justify-center transition-transform duration-500 ease-in-out">
          {visibleMembers.map((member, idx) => {
            const Icon = member.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center bg-white p-4 rounded-xl shadow-lg hover:scale-105 transition w-full max-w-[300px]"
              >
                {/* 🖼️ Image */}
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-52 h-52 object-cover rounded-full shadow-lg"
                />

                {/* 🧑 Name */}
                <div
                  className="mt-4 text-lg font-semibold text-white px-4 py-2 rounded text-center"
                  style={{ backgroundColor: "#0a1d3a" }}
                >
                  {member.name}
                </div>

                {/* 🏷️ Role (permanent, beautiful) */}
                <div className="mt-2 flex items-center gap-2 text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium shadow-sm">
                  <Icon className="w-4 h-4" />
                  {member.role}
                </div>
              </div>
            );
          })}

        </div>

        {/* 🔵 Arrow Right */}
        <button
          onClick={() => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
          }}
          className="absolute right-[-2rem] top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-200"
        >
          <ChevronRight className="w-6 h-6 text-[#0a1d3a]" />
        </button>
      </div>
    </div>
  );
};

export default OurTeamSection;
