import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFormById,
  submitFormResponse,
  clearFormState,
} from "../store/slices/formSlice";
import { toast } from "react-toastify";

const FormRenderer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    loading,
    form: selectedForm,
    successMessage,
    error,
  } = useSelector((state) => state.form);

  const [responses, setResponses] = useState({});

  /* ===============================
     FETCH FORM
  =============================== */
  useEffect(() => {
    if (id) {
      dispatch(fetchFormById(id));
    }

    return () => {
      dispatch(clearFormState());
    };
  }, [id, dispatch]);

  /* ===============================
     HANDLE SIDE EFFECTS
  =============================== */
  useEffect(() => {
    if (successMessage) {
      toast.success("Form submitted successfully!");
      setResponses({});
      dispatch(clearFormState());
    }

    if (error) {
      toast.error(error);
    }
  }, [successMessage, error, dispatch]);

  /* ===============================
     HANDLERS
  =============================== */

  const handleChange = (label, value) => {
    setResponses((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  // validate required fields
  for (let field of selectedForm.fields) {
    if (field.required && !responses[field.label]) {
      return toast.error(`${field.label} is required`);
    }
  }

  // 🔥 Transform object → array
  const formattedResponses = Object.entries(responses).map(
    ([label, value]) => ({
      label,
      value,
    })
  );

  dispatch(
    submitFormResponse({
      formId: selectedForm._id,
      responses: formattedResponses,
    })
  );
};

  /* ===============================
     UI STATES
  =============================== */

  if (loading || !selectedForm) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600">Loading form...</p>
      </div>
    );
  }

  /* ===============================
     UI
  =============================== */

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {selectedForm.title}
          </h1>
          {selectedForm.description && (
            <p className="text-gray-600 mt-2">{selectedForm.description}</p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {selectedForm.fields.map((field, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) => handleChange(field.label, e.target.value)}
                />
              ) : (
                <input
                  type={field.type}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) => handleChange(field.label, e.target.value)}
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Form"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormRenderer;
