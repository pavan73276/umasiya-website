import React from "react";
import { useNavigate } from "react-router-dom";

const FeatureBoxes = () => {
  const navigate = useNavigate();

  const boxes = [
    { title: "Box 1", points: ["Point A", "Point B", "Point C"] },
    { title: "Box 2", points: ["Point D", "Point E", "Point F"] },
    { title: "Box 3", points: ["Point G", "Point H", "Point I"] },
  ];

  return (
    <div className="px-4 md:px-10 lg:px-32 xl:px-48 mt-[40vh] mb-[15vh]">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        {boxes.map((box, index) => (
          <div
            key={index}
            className="bg-blue-900 text-white p-6 rounded-xl flex-1 cursor-pointer hover:bg-blue-800 transition"
            onClick={() => navigate("/")}
          >
            <h3 className="text-2xl font-bold mb-4">{box.title}</h3>
            <ul className="list-disc list-inside space-y-2 text-base">
              {box.points.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureBoxes;
