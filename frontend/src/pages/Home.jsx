import React from "react";
import ImageSlider from "../components/home/ImageSlider";
import FeatureBoxes from "../components/home/FeatureBoxes";
import AnnouncementTicker from "../components/home/AnnouncementTicker";
import WelcomeSection from "../components/home/WelcomeSection";
import OurTeamSection from "../components/home/OurTeamSection";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* 🔹 Fullscreen Image Slider with padding and top spacing */}
      <section className="relative w-full pt-20">
        <div className="w-full px-4 md:px-8 lg:px-16 mx-auto rounded-xl overflow-hidden">
          <ImageSlider />
        </div>
      </section>

      {/* 🔹 Feature Section directly below slider */}
      <section className="relative z-20 -mt-12">
        <FeatureBoxes />
      </section>

      {/* 🔹 Remaining Sections */}
      <section className="relative z-10 mt-4">
        <AnnouncementTicker />
        <WelcomeSection />
        <OurTeamSection />
      </section>
    </div>
  );
};

export default Home;
