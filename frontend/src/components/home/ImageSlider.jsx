import React, { useEffect, useState } from "react";

const slides = [
  { image: "src/assets/homepg/autoslider/s1.jpg" },
  { image: "src/assets/homepg/autoslider/s2.jpg" },
  { image: "src/assets/homepg/autoslider/s3.jpg" },
  { image: "src/assets/homepg/autoslider/s4.jpg" },
  { image: "src/assets/homepg/autoslider/s5.jpg" },
];

const ImageSlider = ({ children }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      {slides.map((slide, i) => (
        <img
          key={i}
          src={slide.image}
          alt={`Slide ${i}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-2000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          } brightness-[0.5]`}
        />
      ))}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
        {children}
      </div>
    </div>
  );
};

export default ImageSlider;
