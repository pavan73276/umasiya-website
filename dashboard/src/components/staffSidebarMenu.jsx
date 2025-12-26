import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaUsers,
  FaDoorOpen,
  FaPlus,
  FaTrashAlt,
  FaBook,
  FaSignOutAlt,
} from "react-icons/fa"; // Import icons from react-icons
import { useDispatch } from "react-redux";
import { staffLogout } from "../store/slices/userSlice";

const StaffSidebarMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(""); // State to track the active link

  const handleLinkClick = (link) => {
    setActiveLink(link); // Update active link state
  };

  const handleLogout = async () => {
    await dispatch(staffLogout());
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li>hi</li>
          </ul>
        </nav>
      </div>

      {/* Bottom Section (Logout Button) */}
      <div className="p-4 border-t border-gray-700">
        <Link
          onClick={handleLogout}
          className="flex items-center py-2 px-4 rounded hover:bg-red-700"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </Link>
      </div>
    </div>
  );
};

export default StaffSidebarMenu;
