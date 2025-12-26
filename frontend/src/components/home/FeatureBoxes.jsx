import React from "react";
import { useNavigate } from "react-router-dom";

const FeatureBoxes = () => {
  const navigate = useNavigate();

  const boxes = [
    {
      icon: "💡",
      title: "Innovative Ideas",
      points: ["Creative Solutions", "Out-of-the-box Thinking", "Smart Designs"],
    },
    {
      icon: "⚙️",
      title: "Efficient Systems",
      points: ["Optimized Code", "Fast Performance", "Scalable Architecture"],
    },
    {
      icon: "📈",
      title: "Growth Driven",
      points: ["User Engagement", "Revenue Focus", "Continuous Improvement"],
    },
  ];

  return (
    <div className="px-4 md:px-10 lg:px-32 xl:px-48 mt-24 mb-64">
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-10">
        {boxes.map((box, index) => (
          <div
            key={index}
            className="relative group bg-[#0a1d3a] text-white p-10 min-h-[300px] rounded-2xl flex-1 min-w-[300px] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            {/* Underline on hover */}
            <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 bg-white transition-all duration-300 rounded-bl-xl rounded-br-xl"></div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="text-5xl">{box.icon}</div>
              <h3 className="text-2xl font-bold">{box.title}</h3>
              <ul className="list-disc list-inside space-y-2 text-base text-left mt-4">
                {box.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureBoxes;
