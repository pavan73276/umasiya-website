import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaBuilding } from "react-icons/fa";
import logo from "../assets/logof.png";

const Footer = () => {
  return (
    <footer className="bg-[#0a1d3a] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Logo */}
        <div>
          <img src={logo} alt="UMASIYA Logo" className="w-72 h-auto mb-3" />
          <p className="text-sm text-center sm:text-left mt-1">
            Empowering knowledge, enabling growth. Join our journey!
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            {["Consulting", "Workshops", "Research", "Partnerships", "Support"].map((item, idx) => (
              <li key={idx}>
                <Link to="/" className="hover:text-blue-400 transition">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Home", path: "/" },
              { label: "About Us", path: "/aboutus" },
              { label: "Gallery", path: "/gallery" },
              { label: "Contact Us", path: "/contactus" },
              { label: "Notices", path: "/notices" },
            ].map((item, idx) => (
              <li key={idx}>
                <Link to={item.path} className="hover:text-blue-400 transition">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1 text-blue-400" />
              Head Office: Ramshila More, Chhoti Road, Ramshila, Nawada, Gaya, Bihar 823002
            </li>
            <li className="flex items-start gap-2">
              <FaBuilding className="mt-1 text-blue-400" />
              Corporate Office: Ramshila More, Chhoti Road, Ramshila, Nawada, Gaya, Bihar 823002
            </li>
            <li className="flex items-start gap-2">
              <FaEnvelope className="mt-1 text-blue-400" />
              umasiyaspil@gmail.com
            </li>
            <li className="flex items-start gap-2">
              <FaPhone className="mt-1 text-blue-400" />
              +91 6205812522
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 text-center text-sm text-gray-300">
        &copy; {new Date().getFullYear()} UMASiYA. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
