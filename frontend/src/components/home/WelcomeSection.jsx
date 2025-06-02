import React from "react";
import { useNavigate } from "react-router-dom";

// ✅ Import the image properly
import welcomeImg from "../../assets/homepg/welcome.jpg";

const WelcomeSection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center px-6 py-12 bg-white gap-8">
      {/* Image Section */}
      <div className="w-full md:w-1/3 flex justify-center">
        <img
          src={welcomeImg}
          alt="Welcome"
          className="rounded-lg shadow-md w-full max-w-[300px] h-auto object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-2/3 text-center md:text-left">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Welcome to UMASiYA!</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          We are thrilled to welcome you to our platform where knowledge meets opportunity.
          Join us in shaping the future together!
        </p>
        <button
          onClick={() => navigate("/contactus")}
          className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default WelcomeSection;
