import React from "react";
import directorImg from "../../assets/aboutuspg/p2.jpeg";

const DirectorSection = () => {
  return (
    <div className="bg-gray-100 pt-28 pb-10 px-2 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto bg-[#0a1d3a] rounded-2xl shadow-lg border-4 border-blue-200/30 transform skew-y-1 translate-x-10 transition duration-300 hover:scale-[1.015] hover:shadow-2xl p-6 md:p-8 flex flex-col-reverse md:flex-row items-center gap-6 md:gap-10">

        {/* Text Section */}
        <div className="w-full md:w-3/5 text-center md:text-left space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our <span className="text-blue-200">Director</span>
          </h2>
          <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed">
            Uma Kumari, our Director, brings over 20 years of experience in business development and operations.
            Her visionary leadership has been instrumental in shaping Umasiya’s success and guiding us through
            dynamic growth with integrity and innovation.
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-2/5 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-300 to-blue-500 rounded-lg opacity-60 blur-sm"></div>
            <img
              src={directorImg}
              alt="Director"
              className="relative rounded-lg border-2 border-white/80 shadow-md w-full max-w-[280px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorSection;
