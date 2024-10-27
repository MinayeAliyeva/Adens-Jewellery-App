const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  body: [
    {
      content: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
    },
  ],
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  size: [String],
  price: {
    type: Number,
    required: true,
  },
  totalQty:{
    type: Number,
    default: 0,
  },
  totalSold: {
    type: Number, 
    default: 0
  },
  measure: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  color: String,
  rating: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
  },
  comments: [commentSchema],
  mainImageUrl: mongoose.Schema.Types.Mixed,
  additionalImages: mongoose.Schema.Types.Mixed,
  material: String,
  popularity: Number,
  description: String,
  discount: String,
  weight: Number,
  dimensions: Number,
  warrantyDuration: Number,
  certification: String,
  returnPolicy: String,
  creationDate: String,
  lastUpdated: Date,
  reviewsCount: Number,
  averageRating: Number,
  color: String,
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
  productAvailability: {
    online: Boolean,
    stores: [String],
  },
  repairService: {
    available: Boolean,
    details: String,
  },
  priceHistory: [
    {
      date: Date,
      price: Number,
    },
  ],
},{timestamps: true, toJSON:{virtuals: true}});

const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
