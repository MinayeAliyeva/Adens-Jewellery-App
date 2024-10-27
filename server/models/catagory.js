const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, 
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
