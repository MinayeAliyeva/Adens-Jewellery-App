const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
  },
  rating: { type: Number, min: 0, max: 5 },
  comments: [
    {
      comment: { type: String, required: true },
      rating: { type: Number, min: 0, max: 5, default: 0 },
    },
  ],
  date: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = { Review };
