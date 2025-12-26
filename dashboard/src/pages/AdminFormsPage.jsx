import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllForms, clearFormState } from "../store/slices/formSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminFormsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, forms, error } = useSelector((state) => state.form);

  /* ===============================
     FETCH FORMS
  =============================== */
  useEffect(() => {
    dispatch(fetchAllForms());

    return () => {
      dispatch(clearFormState());
    };
  }, [dispatch]);

  /* ===============================
     ERROR HANDLING
  =============================== */
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  /* ===============================
     HANDLERS
  =============================== */
  const openResponses = (formId) => {
    navigate(`/admin/forms/${formId}/responses`);
  };

  /* ===============================
     UI STATES
  =============================== */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-600 text-lg">Loading forms...</p>
      </div>
    );
  }

  if (!forms || forms.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">
          No forms have been created yet.
        </p>
      </div>
    );
  }

  /* ===============================
     MAIN UI
  =============================== */
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Forms & Responses
        </h1>
        <p className="text-gray-500 mt-1">
          View all forms and their submitted responses
        </p>
      </div>

      {/* Forms Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Created</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {forms.map((form) => (
              <tr key={form._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {form.title}
                </td>

                <td className="px-6 py-4 text-gray-600 max-w-md truncate">
                  {form.description || "—"}
                </td>

                <td className="px-6 py-4 text-gray-500 text-sm">
                  {new Date(form.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => openResponses(form._id)}
                    className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                  >
                    View Responses
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFormsPage;
