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
  size: String,
  price: {
    type: Number,
    required: true,
  },
  measure: Number,
  categoryName: String,
  color: String,
  comments: [commentSchema], // Yorumlar şema olarak referans edilir
  imagesUrl: {
    mainImageUrl: {
      type: String,
      required: true,
    },
    additionalImages: [String],
  },
  favorite: {
    userId: String,
    isFavorite: Boolean,
    favoriteId: String,
  },
  brand: String,
  viewing: Number,
  material: String,
  popularity: Number,
  description: String,
  discount: {
    percentage: Number,
    newPrice: Number,
    oldPrice: Number,
  },
  stock: Number,
  weight: Number,
  dimensions: {
    ringDiameter: Number,
  },
  warranty: {
    duration: String,
    coverage: String,
  },
  certification: String,
  returnPolicy: {
    days: Number,
    condition: String,
  },
  relatedProducts: [
    {
      productId: String,
      productName: String,
    },
  ],
  totalSales: Number,
  creationDate: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: Date,
  reviewsCount: Number,
  averageRating: Number,
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
module.exports = {Product};

