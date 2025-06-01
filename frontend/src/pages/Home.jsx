import React from "react";
import Navbar from "../components/Navbar";
import ImageSlider from "../components/home/ImageSlider";
import FeatureBoxes from "../components/home/FeatureBoxes";
import AnnouncementTicker from "../components/home/AnnouncementTicker";
import WelcomeSection from "../components/home/WelcomeSection";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Always visible Navbar */}
      

      {/* ImageSlider Section with FeatureBoxes overlay */}
      <section className="relative w-full h-[100vh] overflow-hidden">
        <ImageSlider>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[20%] w-full px-4 sm:px-8 lg:px-20 z-20">
            <FeatureBoxes />
          </div>
        </ImageSlider>
      </section>

      {/* Remaining sections */}
      <section className="relative z-20 mt-8">
        <AnnouncementTicker />
        <WelcomeSection />
      </section>
    </div>
  );
};

export default Home;
