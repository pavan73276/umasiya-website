import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Sidebar from "./pages/Sidebar";
import AddNewForm from "./pages/AddNew";
import AllStaffs from "./pages/getAllStaffs";
import CreateForm from "./pages/CreateForm";
import AdminFormsPage from "./pages/AdminFormsPage";
import AdminFormResponsesPage from "./pages/AdminFormResponsesPage";

import "./App.css";
import ProtectedRoute from "../../frontend/src/components/ProtectedRoute";
import { getUser } from "./store/slices/userSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />

        {/* Staff Dashboard */}
        <Route
          path="/staff/*"
          element={
            <ProtectedRoute role="staff">
              <Sidebar role="staff" />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <Sidebar role="admin" />
            </ProtectedRoute>
          }
        >
          <Route path="addnew" element={<AddNewForm />} />
          <Route path="getallstaffs" element={<AllStaffs />} />
          <Route path="create-form" element={<CreateForm />} />
          <Route path="forms" element={<AdminFormsPage />} />
          <Route
            path="forms/:id/responses"
            element={<AdminFormResponsesPage />}
          />
        </Route>
      </Routes>

      <ToastContainer position="top-center" theme="dark" />
    </>
  );
}

export default App;
