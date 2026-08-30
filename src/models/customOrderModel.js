import mongoose from "mongoose";

const customOrder = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    customer: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      address: { type: String, required: true },
      province: { type: String, required: true },
      city: { type: String, required: true },
    },
    frame: {
      id: String,
      name: String,
      price: Number,
      image: String,
      color: String,
    },
    lens: {
      id: String,
      name: String,
      image: String,
      price: Number,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentStatus: { type: String, default: "pending" },
    deliveryStatus: { type: String, default: "pending" },
    paymentMethod: {
      type: String,
      required: true,
      default: "COD", // Cash on Delivery
    },
    adminNotes: {
      type: String,
    },
    trx: {
      type: String,
    },
  },
  { timestamps: true },
);

const CustomOrder =
  mongoose.models.CustomOrder || mongoose.model("CustomOrder", customOrder);
export default CustomOrder;
