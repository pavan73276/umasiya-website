import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";
import otpGenerator from "otp-generator";
import { OTP } from "../models/otpSchema.js";

/* ===================== REGISTER ===================== */

export const userRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, dob, gender, password } = req.body;

  if (!firstName || !lastName || !email || !phone || !dob || !gender || !password) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User already Registered!", 400));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "User", // unchanged as per your structure
  });

  generateToken(user, "Registered Successfully!", 201, res);
});

/* ===================== LOGIN ===================== */

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }

  // 🔴 REQUIRED IN PRODUCTION
  if (user.role !== role) {
    return next(new ErrorHandler("Unauthorized role access", 403));
  }

  generateToken(user, "Login Successfully!", 200, res);
});

/* ===================== ADD ADMIN ===================== */

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, dob, gender, password } = req.body;

  if (!firstName || !lastName || !email || !phone || !dob || !gender || !password) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Admin With This Email Already Exists!", 400));
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "admin",
  });

  res.status(200).json({
    success: true,
    message: "New Admin Registered",
    admin,
  });
});

/* ===================== ADD STAFF ===================== */

export const addNewStaff = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, dob, gender, password } = req.body;

  if (!firstName || !lastName || !email || !phone || !dob || !gender || !password) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Staff With This Email Already Exists!", 400));
  }

  const staff = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "staff",
  });

  res.status(200).json({
    success: true,
    message: "New Staff Registered",
    staff,
  });
});

/* ===================== GET STAFF ===================== */

export const getAllStaffs = catchAsyncErrors(async (req, res) => {
  const staffs = await User.find({ role: "staff" });

  res.status(200).json({
    success: true,
    staffs,
  });
});

/* ===================== GET USER ===================== */

export const getUserDetails = catchAsyncErrors(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

/* ===================== LOGOUTS ===================== */

export const logoutAdmin = catchAsyncErrors(async (req, res) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(0),
    })
    .json({
      success: true,
      message: "Admin Logged Out Successfully.",
    });
});

export const logoutStaff = catchAsyncErrors(async (req, res) => {
  res
    .status(200)
    .cookie("staffToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(0),
    })
    .json({
      success: true,
      message: "Staff Logged Out Successfully.",
    });
});

export const logoutUser = catchAsyncErrors(async (req, res) => {
  res
    .status(200)
    .cookie("userToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(0),
    })
    .json({
      success: true,
      message: "User Logged Out Successfully.",
    });
});

/* ===================== PASSWORD ===================== */

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(currentPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email, role: "User" });
  if (!user) {
    return next(new ErrorHandler("User with given email does not exist", 400));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

/* ===================== OTP ===================== */

export const sendotp = catchAsyncErrors(async (req, res) => {
  const { email } = req.body;

  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  let result = await OTP.findOne({ otp });
  while (result) {
    otp = otpGenerator.generate(6, { upperCaseAlphabets: false });
    result = await OTP.findOne({ otp });
  }

  await OTP.create({ email, otp });

  res.status(200).json({
    success: true,
    message: "OTP Sent Successfully",
    otp,
  });
});
