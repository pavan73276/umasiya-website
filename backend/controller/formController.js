import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Form } from "../models/formSchema.js";
import { FormResponse } from "../models/formResponseSchema.js";

/**
 * ==============================
 * ADMIN: Create a new form
 * ==============================
 */
export const createForm = catchAsyncErrors(async (req, res, next) => {
  const { title, description, fields } = req.body;

  if (!title || !fields || fields.length === 0) {
    return next(
      new ErrorHandler("Form title and at least one field are required!", 400)
    );
  }

  const form = await Form.create({
    title,
    description,
    fields,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Form created successfully!",
    form,
  });
});

/**
 * ==============================
 * PUBLIC: Get all active forms
 * ==============================
 */
export const getAllForms = catchAsyncErrors(async (req, res, next) => {
  const forms = await Form.find({ isActive: true }).select(
    "title description createdAt"
  );

  res.status(200).json({
    success: true,
    forms,
  });
});

/**
 * ==============================
 * PUBLIC: Get single form by ID
 * ==============================
 */
export const getFormById = catchAsyncErrors(async (req, res, next) => {
  const form = await Form.findById(req.params.id);

  if (!form || !form.isActive) {
    return next(new ErrorHandler("Form not found!", 404));
  }

  res.status(200).json({
    success: true,
    form,
  });
});

/**
 * ==============================
 * PUBLIC: Submit form response
 * ==============================
 */
export const submitForm = catchAsyncErrors(async (req, res, next) => {
  const { responses, forceSubmit = false } = req.body;
  const formId = req.params.id;
  const userId = req.user?._id || null;

  if (!responses || !Array.isArray(responses) || responses.length === 0) {
    return next(new ErrorHandler("Form responses are required!", 400));
  }

  const form = await Form.findById(formId);

  if (!form || !form.isActive) {
    return next(new ErrorHandler("Form not found or inactive!", 404));
  }

  /**
   * ==============================
   * DUPLICATE SUBMISSION CHECK
   * ==============================
   */
  if (userId && !forceSubmit) {
    const alreadySubmitted = await FormResponse.findOne({
      formId,
      submittedBy: userId,
    });

    if (alreadySubmitted) {
      return res.status(409).json({
        success: false,
        duplicate: true,
        message: "You have already submitted this form.",
      });
    }
  }

  /**
   * ==============================
   * VALIDATE FIELDS
   * ==============================
   */
  for (let field of form.fields) {
    const submittedField = responses.find(
      (r) => r.label === field.label
    );

    // Required field check
    if (
      field.required &&
      (!submittedField ||
        submittedField.value === undefined ||
        submittedField.value === null ||
        submittedField.value.toString().trim() === "")
    ) {
      return next(
        new ErrorHandler(`${field.label} is required`, 400)
      );
    }
  }

  /**
   * ==============================
   * SAVE RESPONSE
   * ==============================
   */
  await FormResponse.create({
    formId,
    responses,
    submittedBy: userId,
  });

  res.status(201).json({
    success: true,
    message: "Form submitted successfully!",
  });
});

/**
 * ==============================
 * ADMIN: Get responses of a form
 * ==============================
 */
export const getFormResponses = catchAsyncErrors(async (req, res, next) => {
  const formId = req.params.id;

  const responses = await FormResponse.find({ formId })
    .populate("submittedBy", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    responses,
  });
});
