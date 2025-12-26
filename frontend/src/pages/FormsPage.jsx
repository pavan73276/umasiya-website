import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllForms, clearFormState } from "../store/slices/formSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FormsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, forms, error } = useSelector((state) => state.form);

  useEffect(() => {
    dispatch(fetchAllForms());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearFormState());
    }
  }, [error, dispatch]);

  const handleOpenForm = (formId) => {
    navigate(`/forms/${formId}`);
  };

  /* ===============================
     UI STATES
  =============================== */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-gray-600">
          Loading forms...
        </p>
      </div>
    );
  }

  if (!forms || forms.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            No Forms Available
          </h2>
          <p className="text-gray-500 mt-2">
            Please check back later.
          </p>
        </div>
      </div>
    );
  }

  /* ===============================
     MAIN UI
  =============================== */

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Available Forms
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
            <div
              key={form._id}
              onClick={() => handleOpenForm(form._id)}
              className="cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {form.title}
              </h2>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {form.description || "No description provided."}
              </p>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>
                  {form.fields?.length || 0} fields
                </span>
                <span className="text-blue-600 font-medium">
                  Open →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormsPage;
