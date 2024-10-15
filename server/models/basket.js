const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      price: Number,
    },
  ],
  totalPrice: Number,
});

const Basket = mongoose.model('Basket', basketSchema);
module.exports = { Basket };
