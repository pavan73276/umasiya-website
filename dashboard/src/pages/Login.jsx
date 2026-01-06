import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, clearAllUserErrors } from "../store/slices/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated, user, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ===============================
     HANDLERS
  =============================== */

  const handleAdminLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password, role: "admin" }));
  };

  const handleStaffLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password, role: "staff" }));
  };

  /* ===============================
     SIDE EFFECTS
  =============================== */

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (!loading && isAuthenticated && user?.role) {
      toast.success("Login successful");

      if (user.role === "admin") {
        navigate("/admin/forms", { replace: true });
      } else if (user.role === "staff") {
        navigate("/staff", { replace: true });
      }
    }
  }, [isAuthenticated, user, loading, navigate]);

  /* ===============================
     UI
  =============================== */

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Section */}
      <div
        className="w-full lg:w-3/5 bg-teal-900 flex justify-center items-center"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center text-white">
          <img src="/logo.png" alt="Logo" className="w-24 mx-auto mb-4" />
          <h1 className="text-6xl font-semibold">Palace Regalia</h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-center items-center bg-white">
        <div className="bg-white p-8 w-full max-w-lg rounded-xl shadow-2xl">
          <h2 className="text-4xl font-bold mb-4 text-center text-teal-900">
            Welcome
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Login to Admin or Staff Dashboard
          </p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg focus:border-teal-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 border rounded-lg focus:border-teal-500"
          />

          <div className="flex gap-4">
            <button
              onClick={handleAdminLogin}
              disabled={loading}
              className="w-1/2 bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
            >
              Admin Login
            </button>

            <button
              onClick={handleStaffLogin}
              disabled={loading}
              className="w-1/2 bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
            >
              Staff Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
