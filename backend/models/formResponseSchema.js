import mongoose from "mongoose";

const responseFieldSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },

    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { _id: false }
);

const formResponseSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },

    responses: {
      type: [responseFieldSchema],
      required: true,
    },

    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // public users may not be logged in
    },
  },
  {
    timestamps: true,
  }
);

export const FormResponse = mongoose.model(
  "FormResponse",
  formResponseSchema
);

