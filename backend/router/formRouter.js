import express from "express";
import {
  createForm,
  getAllForms,
  getFormById,
  submitForm,
  getFormResponses,
} from "../controller/formController.js";

import {
  isAdminAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

/**
 * ==============================
 * ADMIN ROUTES
 * ==============================
 */

// Create a new form
router.post("/create", isAdminAuthenticated, createForm);

// Get all responses of a form
router.get("/responses/:id", isAdminAuthenticated, getFormResponses);

/**
 * ==============================
 * PUBLIC ROUTES
 * ==============================
 */

// Get all active forms
router.get("/getall", getAllForms);

// Get a single form by ID
router.get("/:id", getFormById);

// Submit a form
router.post("/submit/:id", submitForm);

export default router;
