import express from "express";
import { protect, authorize } from "../middleware/authmiddleware.js";
import {
  getRevenueReport,
  getAppointmentReport,
  getDoctorSummary
} from "../controllers/report.controller.js";

const router = express.Router();

router.get(
  "/revenue",
  protect,
  authorize(["admin", "billing"]),
  getRevenueReport
);

router.get(
  "/appointments",
  protect,
  authorize(["admin"]),
  getAppointmentReport
);

router.get(
  "/my-summary",
  protect,
  authorize(["doctor"]),
  getDoctorSummary
);

export default router;