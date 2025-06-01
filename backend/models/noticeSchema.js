import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, "Notice message is required"],
  },
  url: {
    type: String,
    required: [true, "URL is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: String,
    default: "Admin", // Optional: can add admin email if needed
  },
});

export const Notice = mongoose.model("Notice", noticeSchema);
