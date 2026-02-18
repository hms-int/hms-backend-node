import mongoose from "mongoose";

const billingSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "online"],
    },

    transactionId: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Billing", billingSchema);