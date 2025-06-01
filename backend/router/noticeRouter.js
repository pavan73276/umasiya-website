import express from "express";
import { createNotice, getNotices } from "../controller/noticeController.js";

const router = express.Router();

// Route: POST /notice/new
router.post("/new", createNotice);

// Route: GET /notice/all
router.get("/all", getNotices);

export default router;
