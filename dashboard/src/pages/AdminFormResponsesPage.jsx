import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFormById,
  fetchFormResponses,
  clearFormState,
} from "../store/slices/formSlice";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

const AdminFormResponsesPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    form,
    responses,
    error,
  } = useSelector((state) => state.form);

  /* ===============================
     FETCH FORM + RESPONSES
  =============================== */
  useEffect(() => {
    if (id) {
      dispatch(fetchFormById(id));
      dispatch(fetchFormResponses(id));
    }

    return () => {
      dispatch(clearFormState());
    };
  }, [id, dispatch]);

  /* ===============================
     ERROR HANDLING
  =============================== */
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  /* ===============================
     UI STATES
  =============================== */
  if (loading || !form) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-600 text-lg">Loading responses...</p>
      </div>
    );
  }

  /* ===============================
     MAIN UI
  =============================== */
  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
      >
        <FaArrowLeft />
        Back to Forms
      </button>

      {/* Form Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {form.title}
        </h1>
        {form.description && (
          <p className="text-gray-600 mt-1">
            {form.description}
          </p>
        )}
      </div>

      {/* No Responses */}
      {responses.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <p className="text-gray-500 text-lg text-center">
            No responses submitted yet.
          </p>
        </div>
      )}

      {/* Responses List */}
      <div className="space-y-6">
        {responses.map((response, index) => (
          <div
            key={response._id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            {/* Submission Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-800">
                Submission #{index + 1}
              </h2>
              <span className="text-sm text-gray-500">
                {new Date(response.createdAt).toLocaleString()}
              </span>
            </div>

            {/* Response Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {response.responses.map((field, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-lg p-4 border"
                >
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </p>
                  <p className="text-gray-800 break-words">
                    {String(field.value) || "—"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFormResponsesPage;
