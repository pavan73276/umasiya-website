import { Notice } from "../models/noticeSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

// POST: Admin adds a new notice
export const createNotice = catchAsyncErrors(async (req, res, next) => {
  const { message, url, postedBy } = req.body;

  if (!message || !url) {
    return next(new ErrorHandler("Please provide both message and URL", 400));
  }

  const notice = await Notice.create({ message, url, postedBy });

  res.status(201).json({
    success: true,
    message: "Notice posted successfully!",
    notice,
  });
});

// GET: Get all notices (for user display)
export const getNotices = catchAsyncErrors(async (req, res, next) => {
  const notices = await Notice.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    notices,
  });
});
