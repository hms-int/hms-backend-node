import express from "express";
import { protect, authorize } from "../middleware/authmiddleware.js";
import { getAdminDashboardSummary } from '../controllers/dashboard.controller.js';

const router = express.Router();

router.get(
  "/summary",
  protect,
  authorize(["admin"]),
  getAdminDashboardSummary
);

export default router;