import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: [true, "Field label is required"],
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["text", "number", "date", "email", "textarea"],
    },

    placeholder: {
      type: String,
      default: "",
    },

    required: {
      type: Boolean,
      default: false,
    },

    options: [
      {
        type: String,
      },
    ], // for future dropdown / radio fields
  },
  { _id: false }
);

const formSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Form title is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    fields: {
      type: [fieldSchema],
      validate: [
        {
          validator: function (value) {
            return value.length > 0;
          },
          message: "At least one field is required",
        },
      ],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Form = mongoose.model("Form", formSchema);
