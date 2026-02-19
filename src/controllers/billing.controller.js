import Billing from '../models/billing.js';
import billingService from '../services/billing.service.js';

const createBilling = async (req, res, next) => {
  try {
    const { patient, appointment, amount } = req.body;

    if (!patient || !amount) {
      return res.status(400).json({
      success: false,
      message: "Patient and amount are required",
      });
    }

    const billing = await Billing.create({
      patient,
      appointment,
      amount,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: billing,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBilling = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const bills = await Billing.find()
      .populate("patient", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Billing.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        bills,
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateBillingStatus = async (req, res, next) => {
  try {
    const { status, paymentMethod, transactionId } = req.body;

    const bill = await Billing.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Billing record not found",
      });
    }

    if (!["pending", "paid"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    if (bill.status === "paid" && status === "pending") {
      return res.status(400).json({
        success: false,
        message: "Cannot revert paid billing to pending",
      });
    }

    bill.status = status;

    if (status === "paid") {
      bill.paymentMethod = paymentMethod;
      bill.transactionId = transactionId;
      bill.paidAt = new Date();
    }

    await bill.save();

    res.status(200).json({
      success: true,
      data: bill,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBilling = async (req, res, next) => {
  try {
    const bill = await Billing.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Billing record not found",
      });
    }

    await bill.deleteOne();

    res.status(200).json({
      success: true,
      message: "Billing deleted",
    });
  } catch (error) {
    next(error);
  }
};

// Staff CRUD for admin

const createBillingStaff = async (req, res, next) => {
  try {
    const billing = await billingService.createBillingStaff(req.body);
    res.status(201).json(billing);
  } catch (error) {
    next(error)  
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const result = await billingService.changePassword(
      req.user.id, 
      oldPassword, 
      newPassword);
    res.status(200).json(result);
  } catch (err) {
    next(err)
  }
};

const getAllBillingStaff = async (req, res, next) => {
  try {
    const billing = await billingService.getAllBillingStaff();
    res.json(billing);
  } catch (err) {
    next(err)
  }
};

const updateBillingStaff = async (req, res, next) => {
  try {
    const { id } = req.params;
    const billing = await billingService.updateBillingStaff(id, req.body);
    res.json(billing);
  } catch (err) {
    next(err)
  }
};

const deleteBillingStaff = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await billingService.deleteBillingStaff(id);
    res.json(result);
  } catch (err) {
    next(err)
  }
};

export {
  // Billing operations
  createBilling,
  getAllBilling,
  updateBillingStatus,
  deleteBilling,

  // Staff CRUD for admin

  createBillingStaff,
  changePassword,
  getAllBillingStaff,
  updateBillingStaff,
  deleteBillingStaff
}