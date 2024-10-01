const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { Product } = require("../models/product");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

// Multer storage ayarları
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images')); // Yükleme klasörü
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Dosya adı
  },
});

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 5 }});

// Ürün listeleme
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.status(200).send(products);
});

// Ürün oluşturma ve resim yükleme
router.post("/", upload.array("images"), async (req, res) => {
  console.log({file: req.file});
  
  const files = req.files;
  
  if (!files || files.length === 0) {
    return res.status(400).send("No images in the request");
  }

  // Resmin URL'sini oluşturma
  const basePath = `${req.protocol}://${req.get("host")}/public/images/`;
  const imageUrls = files.map(file => `${basePath}${file.filename}`); // Tüm dosya isimlerini al


  const product = new Product({
    id: req.body.id,
    productName: req.body.productName,
    size: req.body.size,
    price: req.body.price,
    measure: req.body.measure,
    categoryName: req.body.categoryName,
    color: req.body.color,
    comments: req.body.comments,
    mainImageUrl: imageUrls[0], // Resim URL'si
    additionalImages: imageUrls.slice(1),
    brand: req.body.brand,
    material: req.body.material,
    popularity: req.body.popularity,
    description: req.body.description,
    discount: req.body.discount,
    stock: req.body.stock,
    weight: req.body.weight,
    dimensions: req.body.dimensions,
    warranty: req.body.warranty,
    certification: req.body.certification,
    returnPolicy: req.body.returnPolicy,
    relatedProducts: req.body.relatedProducts,
    totalSales: req.body.totalSales,
    creationDate: req.body.creationDate,
    lastUpdated: req.body.lastUpdated,
    reviewsCount: req.body.reviewsCount,
    averageRating: req.body.averageRating,
    productAvailability: req.body.productAvailability,
    repairService: req.body.repairService,
    priceHistory: req.body.priceHistory,
  });

  try {
    const result = await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
