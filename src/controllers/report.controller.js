import Billing from "../models/billing.js";
import Appointment from "../models/appointment.js";

export const getRevenueReport = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const match = { status: "paid" };

    if (startDate && endDate) {
      match.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const result = await Billing.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
          totalTransactions: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: result[0] || { totalRevenue: 0, totalTransactions: 0 }
    });

  } catch (error) {
    next(error);
  }
};

export const getAppointmentReport = async (req, res, next) => {
  try {
    const { status, doctorId, startDate, endDate } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (doctorId) filter.doctor = doctorId;

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const totalAppointments = await Appointment.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        totalAppointments
      }
    });

  } catch (error) {
    next(error);
  }
};

export const getDoctorSummary = async (req, res, next) => {
  try {
    const doctorId = req.user.id;

    const totalAppointments = await Appointment.countDocuments({
      doctor: doctorId
    });

    const completedAppointments = await Appointment.countDocuments({
      doctor: doctorId,
      status: "completed"
    });

    res.status(200).json({
      success: true,
      data: {
        totalAppointments,
        completedAppointments
      }
    });

  } catch (error) {
    next(error);
  }
};