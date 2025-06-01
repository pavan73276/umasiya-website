import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4 mx-4 shadow-md rounded-xl overflow-hidden">
      <nav className="bg-white text-black w-full">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center min-h-[80px]">
          {/* Logo */}
          <div className="text-3xl font-extrabold tracking-wider text-gray-800">
            <Link to="/" className="hover:text-blue-800 transition duration-200">
              UMASiYA
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-lg font-medium">
            {[
              { label: "Home", path: "/" },
              { label: "About Us", path: "/aboutus" },
              { label: "Gallery", path: "/gallery" },
              { label: "Contact Us", path: "/contactus" },
              { label: "Notices", path: "/notices" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="relative text-black hover:text-blue-800 transition duration-200 pb-1
                             before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-0
                             before:bg-blue-800 before:transition-all before:duration-300 hover:before:w-full"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden text-2xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX /> : <HiMenu />}
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <ul className="md:hidden flex flex-col px-6 pb-4 space-y-4 text-base font-medium">
            {[
              { label: "Home", path: "/" },
              { label: "About Us", path: "/aboutus" },
              { label: "Gallery", path: "/gallery" },
              { label: "Contact Us", path: "/contactus" },
              { label: "Notices", path: "/notices" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="block text-black hover:text-blue-800 transition duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
