const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      isFavorite: { type: Boolean, default: false },
    },
  ],
}, { timestamps: true });

const WishList = mongoose.model("WishList", wishListSchema);
module.exports = { WishList };
