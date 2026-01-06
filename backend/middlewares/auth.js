import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

/* ================= ADMIN AUTH ================= */
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.adminToken;

  if (!token) {
    return next(new ErrorHandler("Admin not authenticated", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new ErrorHandler("Admin not found", 404));
  }

  if (user.role !== "admin") {
    return next(new ErrorHandler("Unauthorized admin access", 403));
  }

  req.user = user;
  next();
});

/* ================= STAFF AUTH ================= */
export const isStaffAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.staffToken;

  if (!token) {
    return next(new ErrorHandler("Staff not authenticated", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new ErrorHandler("Staff not found", 404));
  }

  if (user.role !== "staff") {
    return next(new ErrorHandler("Unauthorized staff access", 403));
  }

  req.user = user;
  next();
});

/* ================= USER AUTH ================= */
export const isUserAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.userToken;

  if (!token) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (user.role !== "User") {
    return next(new ErrorHandler("Unauthorized user access", 403));
  }

  req.user = user;
  next();
});

/* ================= ROLE GUARD ================= */
export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.user.role} not allowed to access this resource`, 403)
      );
    }
    next();
  };
};
