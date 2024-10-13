const mongoose = require("mongoose");
// Yorumların alt şeması
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

// Ana ürün şeması

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
  measure: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  color: String,
  comments: [commentSchema], // Yorumlar şema olarak referans edilir
  mainImageUrl: mongoose.Schema.Types.Mixed,
  additionalImages: mongoose.Schema.Types.Mixed,
  // favorite: {
  //   userId: String,
  //   isFavorite: Boolean,
  //   favoriteId: String,
  // },
  // viewing: Number,
  material: String,
  popularity: Number,
  description: String,
  discount: String,
  stock: Number,
  weight: Number,
  dimensions: Number,
  warrantyDuration: Number,
  certification: String,
  returnPolicy: String,
  totalSales: Number,
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
});
// const productSchema = new mongoose.Schema({
//   name: String,
//   price: String,
// });
// Modeli oluştur
const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
