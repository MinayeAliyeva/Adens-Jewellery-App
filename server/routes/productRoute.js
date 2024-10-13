const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middlware/auth");
const { Product } = require("../models/product");
const isAdmin = require("../middlware/isAdmin");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

// Multer storage ayarları
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images")); // Yükleme klasörü
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Dosya adı
  },
});

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 5 } });

// Ürün listeleme
// router.get("/", async (req, res) => {
//   const products = await Product.find();
//   res.status(200).send(products);
// });
//filterleme !! sayfalama limit() ile edilir select() ile ise data hisselerini select {} limit ise number qebul edir
//Catagory gore filter price gore min,max  name gore, price asc desc
//!color,brand ,weight,dimensions brand dimensions catagory arrey olacak 

router.get("/", async (req, res) => {
  try {
    const { category, productName, min, max } = req.query;
    if (!category && !productName && !min && !max) {
      const allProducts = await Product.find().populate('category').populate('brand');
      return res.status(200).send(allProducts);
    }

    const categories = category ? category.split(",") : null;

    const query = {
      ...(categories && { category: { $in: categories } }),
      ...(productName && { productName: new RegExp(productName, "i") }),
      ...(min && { price: { $gte: Number(min) } }),
      ...(max && { price: { $lte: Number(max) } }),
    };

    const products = await Product.find(query).populate('category').populate('brand');
    if (!products.length) {
      return res.status(200).send([]);
    }
    res.status(200).send(products);
  } catch (error) {
    console.error("Ürünleri alırken hata:", error);
    res.status(500).send("Sunucu Hatası");
  }
});

//Detail
router.get("/:id", async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  
  if (!product) {
    return res.status(404).send("Such product is not exsits...");
  }

  res.status(200).send(product);
});

// Ürün oluşturma ve resim yükleme
router.post(
  "/",
  [auth, isAdmin],
  upload.fields([
    { name: "mainImageUrl", maxCount: 1 }, // Tek ana resim
    { name: "additionalImages", maxCount: 10 }, // Çoklu ek resimler
  ]),

  async (req, res) => {
    // Dosyaların alınması
    const files = req.files;

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).send("No images in the request");
    }

    // Base URL'nin oluşturulması
    const basePath = `${req.protocol}://${req.get("host")}/public/images/`;

    // Resim URL'lerini oluşturma
    const mainImage = files.mainImageUrl
      ? `${basePath}${files.mainImageUrl[0].filename}`
      : null;
    const additionalImages = files.additionalImages
      ? files.additionalImages.map((file) => `${basePath}${file.filename}`)
      : [];

    // Yeni ürün nesnesinin oluşturulması
    const product = new Product({
      id: req.body.id,
      productName: req.body.productName,
      size: req.body.size ? req.body.size.split(",") : [], // Boyutlar virgülle ayrılmışsa diziye çevir
      price: req.body.price,
      measure: req.body.measure,
      category: req.body.category,
      color: req.body.color,
      comments: req.body.comments,
      mainImageUrl: mainImage, // Ana resim URL'si
      additionalImages: additionalImages, // Ek resim URL'leri
      brand: req.body.brand,
      material: req.body.material,
      popularity: req.body.popularity,
      description: req.body.description,
      discount: req.body.discount,
      stock: req.body.stock,
      weight: req.body.weight,
      dimensions: req.body.dimensions,
      warrantyDuration: req.body.warrantyDuration,
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
      // Ürün kaydedildiğinde yanıt döndürme
      const result = await product.save();
      res.status(201).send(result);
    } catch (error) {
      // Hata durumunda yanıt döndürme
      res.status(400).send({ message: "Error creating product", error });
    }
  }
);

router.delete("/:id", [auth, isAdmin], async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  // await Product.findByIdAndRemove(req.params.id)
  if (!deletedProduct) {
    return res
      .status(404)
      .send({ success: false, message: "product not found!" });
  }
  res.status(200).send({ success: true, message: "the product is deleted!" });
});

router.put(
  "/:id",
  [auth, isAdmin],
  upload.fields([
    { name: "mainImageUrl", maxCount: 1 }, // Tek dosya
    { name: "additionalImages", maxCount: 10 }, // Çoklu dosya
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const basePath = `${req.protocol}://${req.get("host")}/public/images/`;

      // Dosyaları ayrıştırıyoruz
      const mainImageUrl = req.files["mainImageUrl"]
        ? `${basePath}${req.files["mainImageUrl"][0].filename}`
        : null;
      const additionalImages = req.files["additionalImages"]
        ? req.files["additionalImages"].map(
            (file) => `${basePath}${file.filename}`
          )
        : [];

      // Ürünü buluyoruz
      const findedProduct = await Product.findById(id);
      if (!findedProduct) {
        return res.status(404).send("Product not found");
      }

      // Güncelleme işlemi
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          $set: {
            productName: req.body.productName,
            size: req.body.size,
            price: req.body.price,
            measure: req.body.measure,
            category: req.body.category,
            color: req.body.color,
            comments: req.body.comments,
            mainImageUrl: mainImageUrl || findedProduct.mainImageUrl, // Eğer yeni dosya yoksa eski dosyayı kullan
            additionalImages:
              additionalImages.length > 0
                ? additionalImages
                : findedProduct.additionalImages,
            brand: req.body.brand,
            material: req.body.material,
            popularity: req.body.popularity,
            description: req.body.description,
            discount: req.body.discount,
            stock: req.body.stock,
            weight: req.body.weight,
            dimensions: req.body.dimensions,
            warrantyDuration: req.body.warrantyDuration,
            certification: req.body.certification,
            returnPolicy: req.body.returnPolicy,
            relatedProducts: req.body.relatedProducts,
            totalSales: req.body.totalSales,
            creationDate: req.body.creationDate,
            lastUpdated: new Date(), // Son güncellenme tarihi
            reviewsCount: req.body.reviewsCount,
            averageRating: req.body.averageRating,
            productAvailability: req.body.productAvailability,
            repairService: req.body.repairService,
            priceHistory: req.body.priceHistory,
          },
        },
        { new: true }
      );
      console.log({updatedProduct});
      

      res.status(200).send(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

// .then(product =>{
//   if(product) {
//       return res.status(200).json({success: true, message: 'the product is deleted!'})
//   } else {
//       return res.status(404).json({success: false , message: "product not found!"})
//   }
// }).catch(err=>{
//  return res.status(500).json({success: false, error: err})
// })
