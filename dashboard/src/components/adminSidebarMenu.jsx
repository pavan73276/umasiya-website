import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaBook,
  FaClipboardList,
  FaWpforms,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { adminLogout } from "../store/slices/userSlice";

const AdminSidebarMenu = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(adminLogout());
    navigate("/login");
  };

  // Active route checker
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-3">
            {/* Add New */}
            <li>
              <Link
                to="/admin/addnew"
                className={`flex items-center py-2 px-4 rounded transition ${
                  isActive("/admin/addnew")
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
              >
                <FaUserPlus className="mr-3" />
                Add New
              </Link>
            </li>

            {/* Get All Staffs */}
            <li>
              <Link
                to="/admin/getallstaffs"
                className={`flex items-center py-2 px-4 rounded transition ${
                  isActive("/admin/getallstaffs")
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
              >
                <FaBook className="mr-3" />
                Get All Staffs
              </Link>
            </li>

            {/* Create Form */}
            <li>
              <Link
                to="/admin/create-form"
                className={`flex items-center py-2 px-4 rounded transition ${
                  isActive("/admin/create-form")
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
              >
                <FaClipboardList className="mr-3" />
                Create Form
              </Link>
            </li>

            {/* Forms & Responses */}
            <li>
              <Link
                to="/admin/forms"
                className={`flex items-center py-2 px-4 rounded transition ${
                  isActive("/admin/forms")
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
              >
                <FaWpforms className="mr-3" />
                Forms
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex w-full items-center py-2 px-4 rounded hover:bg-red-700 transition"
        >
          <FaSignOutAlt className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebarMenu;
