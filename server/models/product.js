const mongoose = require("mongoose");
const productShema = mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  imageUrl: String,
  date: {
    type: Date,
    default: Date.now,
  },
  isActive: Boolean,
  comments: [{ body: String, date: Date }],
  star: Number,
  stock: Number,
});
const Product = mongoose.model("Product", productShema);
module.exports = { Product };
