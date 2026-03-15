import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

let razorpay;

if (process.env.NODE_ENV === "test") {
  razorpay = {
    orders: {
      create: async () => ({
        id: "test_order_id",
        status: "created"
      })
    }
  };
} else {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

export default razorpay;