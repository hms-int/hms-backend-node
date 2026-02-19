import User from '../models/User.js';
import Patient from '../models/patient.js';
import Appointment from '../models/appointment.js';
import Billing from '../models/billing.js';

export const getAdminDashboardSummary = async (req, res, next) => {
  try {
    const totalDoctors = await User.countDocuments({ role: "doctor" });
    const totalPatients = await Patient.countDocuments();
    const totalAppointments = await Appointment.countDocuments();

    const revenueAgg = await Billing.aggregate([
      { $match: { status: "paid" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    const totalRevenue = revenueAgg.length ? revenueAgg[0].total : 0;

    const pendingAgg = await Billing.aggregate([
      { $match: { status: "pending" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    const pendingRevenue = pendingAgg.length ? pendingAgg[0].total : 0;

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const todayAppointments = await Appointment.countDocuments({
      createdAt: { $gte: todayStart, $lte: todayEnd }
    });

    res.status(200).json({
      success: true,
      data: {
        totalDoctors,
        totalPatients,
        totalAppointments,
        totalRevenue,
        pendingRevenue,
        todayAppointments
      }
    });

  } catch (error) {
    next(error);
  }
};