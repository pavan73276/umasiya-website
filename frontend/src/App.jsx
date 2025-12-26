import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import ContactPage from "./pages/contactPage";
import NoticesPage from "./pages/NoticePage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FormsPage from "./pages/FormsPage";   // ✅ ADD THIS
import FormRenderer from "./components/FormRenderer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getUser } from "./store/slices/userSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/notices" element={<NoticesPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        {/* ✅ Protected Form Route */}
        <Route
          path="/forms"
          element={
            <ProtectedRoute>
              <FormsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms/:id"
          element={
            <ProtectedRoute>
              <FormRenderer />
            </ProtectedRoute>
          }
        />
        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="" element={<Profile />} />
        </Route>
      </Routes>

      <Footer />
      <ToastContainer position="top-center" theme="dark" />
    </Router>
  );
};

export default App;
