import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../store/slices/messageSlice";
import { toast } from "react-toastify";

const Contact = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.message);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(sendMessage(formData)).unwrap();
      toast.success("Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      toast.error(err.message || "Failed to send message");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-[#0a1d3a] mb-6 text-center">
          Send Us a Message
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
            className="col-span-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a1d3a]"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
            className="col-span-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a1d3a]"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="col-span-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a1d3a]"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="col-span-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a1d3a]"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            className="col-span-1 md:col-span-2 border border-gray-300 p-3 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#0a1d3a]"
          />

          <button
            type="submit"
            disabled={loading}
            className="col-span-1 md:col-span-2 bg-[#0a1d3a] text-white p-3 rounded-lg font-semibold hover:bg-[#0a254d] transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
