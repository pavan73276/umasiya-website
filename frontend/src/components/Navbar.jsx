import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { MdLogout, MdPerson, MdDescription } from "react-icons/md";
import logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/userSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [showNoticeText, setShowNoticeText] = useState(false);
  const dropdownRef = useRef(null);

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-3 w-full z-50 bg-white/80 backdrop-blur-md shadow-md rounded-b-xl px-5">
      <nav className="text-black w-full">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center min-h-[80px]">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-16 w-auto object-contain" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-lg font-medium items-center">
            {[
              { label: "Home", path: "/" },
              { label: "About Us", path: "/aboutus" },
              { label: "Gallery", path: "/gallery" },
              { label: "Contact", path: "/contactus" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="relative text-black hover:text-blue-800 transition pb-1
                             before:absolute before:left-0 before:bottom-0 before:h-[2px]
                             before:w-0 before:bg-blue-800 before:transition-all
                             hover:before:w-full"
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* ✅ Forms link (ONLY when logged in) */}
            {isAuthenticated && (
              <li>
                <Link
                  to="/forms"
                  className="relative text-black hover:text-blue-800 transition pb-1
                             before:absolute before:left-0 before:bottom-0 before:h-[2px]
                             before:w-0 before:bg-blue-800 before:transition-all
                             hover:before:w-full"
                >
                  Forms
                </Link>
              </li>
            )}

            {/* Notices */}
            <li
              className="relative flex items-center cursor-pointer"
              onMouseEnter={() => setShowNoticeText(true)}
              onMouseLeave={() => setShowNoticeText(false)}
            >
              <Link to="/notices" className="text-2xl hover:text-blue-800">
                <FaBell />
              </Link>
              {showNoticeText && (
                <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded-md">
                  Notices
                </span>
              )}
            </li>

            {/* Profile / Auth */}
            <li ref={dropdownRef} className="relative">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setDropdown(!dropdown)}
                    className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    {user?.avatar ? (
                      <img src={user.avatar} alt="profile" className="w-10 h-10 rounded-full" />
                    ) : (
                      <FaUserCircle className="text-2xl text-gray-700" />
                    )}
                  </button>

                  {dropdown && (
                    <div className="absolute right-0 mt-3 w-48 bg-white border rounded-md shadow-lg">
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 hover:bg-gray-100"
                        onClick={() => setDropdown(false)}
                      >
                        <MdPerson className="mr-2" />
                        Dashboard
                      </Link>
                      <Link
                        to="/forms"
                        className="flex items-center px-4 py-2 hover:bg-gray-100"
                        onClick={() => setDropdown(false)}
                      >
                        <MdDescription className="mr-2" />
                        Forms
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                      >
                        <MdLogout className="mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="px-4 py-2 border border-blue-600 rounded-lg text-blue-600">
                    Login
                  </Link>
                  <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    Sign Up
                  </Link>
                </div>
              )}
            </li>
          </ul>

          {/* Mobile Menu Icon */}
          <div className="md:hidden text-2xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX /> : <HiMenu />}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="md:hidden flex flex-col px-6 pb-4 space-y-4 font-medium">
            {[
              { label: "Home", path: "/" },
              { label: "About Us", path: "/aboutus" },
              { label: "Gallery", path: "/gallery" },
              { label: "Contact Us", path: "/contactus" },
            ].map((item) => (
              <li key={item.path}>
                <Link to={item.path} onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}

            {isAuthenticated && (
              <li>
                <Link to="/forms" onClick={() => setIsOpen(false)}>
                  Forms
                </Link>
              </li>
            )}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
