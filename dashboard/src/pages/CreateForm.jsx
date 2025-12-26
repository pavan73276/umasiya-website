import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createForm, clearFormState } from "../store/slices/formSlice";

const fieldTypes = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "email", label: "Email" },
  { value: "textarea", label: "Textarea" },
];

const CreateForm = () => {
  const dispatch = useDispatch();
  const { loading, error, submitSuccess } = useSelector((state) => state.form);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState([
    { label: "", type: "text", required: false },
  ]);

  /* ===============================
     Side Effects
  =============================== */
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearFormState());
    }

    if (submitSuccess) {
      dispatch(clearFormState());
      setTitle("");
      setDescription("");
      setFields([{ label: "", type: "text", required: false }]);
    }
  }, [error, submitSuccess, dispatch]);

  /* ===============================
     Handlers
  =============================== */
  const handleAddField = () => {
    setFields([...fields, { label: "", type: "text", required: false }]);
  };

  const handleRemoveField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return toast.error("Form title is required");
    }

    if (fields.length === 0) {
      return toast.error("At least one field is required");
    }

    for (let field of fields) {
      if (!field.label.trim()) {
        return toast.error("All fields must have a label");
      }
    }

    dispatch(
      createForm({
        title,
        description,
        fields,
      })
    );
  };

  /* ===============================
     UI
  =============================== */
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Create New Form
        </h1>
        <p className="text-gray-500 mb-6">
          Build a custom form for users to fill
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Form Title
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter form title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Describe this form"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-800">Form Fields</h2>

            {fields.map((field, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50 relative"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Field Label</label>
                    <input
                      type="text"
                      className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
                      value={field.label}
                      onChange={(e) =>
                        handleFieldChange(index, "label", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Field Type</label>
                    <select
                      className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
                      value={field.type}
                      onChange={(e) =>
                        handleFieldChange(index, "type", e.target.value)
                      }
                    >
                      {fieldTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center mt-6">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600"
                      checked={field.required}
                      onChange={(e) =>
                        handleFieldChange(index, "required", e.target.checked)
                      }
                    />
                    <span className="ml-2 text-sm text-gray-600">Required</span>
                  </div>
                </div>

                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveField(index)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddField}
              className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
            >
              + Add Field
            </button>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Creating Form..." : "Create Form"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
