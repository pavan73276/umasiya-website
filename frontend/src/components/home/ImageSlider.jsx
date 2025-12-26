import React, { useEffect, useState, useRef } from "react";
import v1 from "../../assets/homepg/autoslider/s1.mp4";
import v2 from "../../assets/homepg/autoslider/s2.mp4";
import v3 from "../../assets/homepg/autoslider/s3.mp4";
import v4 from "../../assets/homepg/autoslider/s4.mp4";
import v5 from "../../assets/homepg/autoslider/s5.mp4";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { video: v1, heading: ["IT", "INFORMATION TECHNOLOGY"] },
  { video: v2, heading: ["HK", "HOUSE KEEPING"] },
  { video: v3, heading: ["FMS", "FACULTY MANAGEMENT SERVICES"] },
  { video: v4, heading: ["CWS", "CIVIL WORK SERVICES"] },
  { video: v5, heading: ["HRM", "HUMAN RESOURCE MANAGEMENT"] },
];

const ImageSlider = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const videoRefs = useRef([]);

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  useEffect(() => {
    resetTimer();
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  // Handle video play/pause when slide changes
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      
      if (i === index) {
        video.play().catch(e => console.error("Video play failed:", e));
      } else {
        video.pause();
        video.currentTime = 0; // Reset video to start
      }
    });
  }, [index]);

  const handleNext = () => setIndex((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[100vh] pt-[4.5rem] overflow-hidden">
      {/* 🔹 Video Slides */}
      {slides.map((slide, i) => (
        <video
          key={i}
          ref={el => videoRefs.current[i] = el}
          src={slide.video}
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100 z-0" : "opacity-0 z-[-1]"
          } brightness-[0.5]`}
        />
      ))}

      {/* 🔹 Text Overlay */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white z-10 px-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2 font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
          {slides[index].heading[0] && (
            <span className="text-yellow-300">{slides[index].heading[0]}</span>
          )}
          {slides[index].heading[0] && <span>|</span>}
          <span>{slides[index].heading[1]}</span>
        </div>
      </div>

      {/* 🔹 Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-6 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white"
      >
        <ChevronLeft size={32} />
      </button>

      {/* 🔹 Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-6 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
};

export default ImageSlider;