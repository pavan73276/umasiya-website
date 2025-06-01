import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import ContactPage from "./pages/contactPage";
import NoticesPage from "./pages/NoticePage";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/notices" element={<NoticesPage />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-center" theme="dark" />
    </Router>
  );
};

export default App;
