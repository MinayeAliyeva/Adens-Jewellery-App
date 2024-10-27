const mongoose = require("mongoose");
const randomText = Math.random().toString(36).substring(7).toLocaleLowerCase();
const randomNumbers = Math.floor(1000 + Math.random() * 900);
const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
    orderItems: [{ type: Object, require: true }],
    shippingAdress: {
      type: Object,
    },
    totalQualityBuying: Number,
    orderNumber: {
      type: String,

      default: randomText + randomNumbers,
    },
    paymentStatus: {
      type: String,

      default: "Not paid",
    },
    paymentMethod: {
      type: Number,
      default: 0.0,
    },
    totalPrice: {
      type: String,

      default: "Not specified",
    },
    currency: {
      type: String,
      require: true,
    },

    dliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
