import React from "react";
import officeImg from "../../assets/aboutuspg/p1.jpeg";

const OfficeSection = () => {
  return (
    <div className="bg-gray-100 pt-40 pb-10 px-2 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto bg-[#0a1d3a] rounded-2xl shadow-lg border-4 border-blue-200/30 transform -skew-y-1 -translate-x-10 transition duration-300 hover:scale-[1.015] hover:shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10">

        
        {/* Image Section */}
        <div className="w-full md:w-2/5 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-300 to-blue-500 rounded-lg opacity-60 blur-sm"></div>
            <img
              src={officeImg}
              alt="Our Office"
              className="relative rounded-lg border-2 border-white/80 shadow-md w-full max-w-[280px] object-cover"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-3/5 text-center md:text-left space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About Our <span className="text-blue-200">Office</span>
          </h2>
          <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed">
            Our headquarters stands as a symbol of innovation and collaboration.
            Designed to inspire creativity, our workspaces foster a culture of
            excellence and teamwork. We believe in building an environment
            where ideas flourish and teams grow stronger together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfficeSection;
