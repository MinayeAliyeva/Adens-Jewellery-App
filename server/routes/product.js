const express = require("express");
const router = express.Router();

const { Product } = require("../models/product");

// router.get("/", (req, res) => {
//   res.status(200).send(products);
// });

router.post("/", async (req, res) => {
  console.log({ req });

  // const product = new Product({
  //   name: req?.body?.name,
  //   price: req?.body?.price
  // });

  const product = new Product({
    id: req?.body?.id,
    productName: req?.body?.productName,
    size: req?.body?.size,
    price: req?.body?.price,
    measure: req?.body?.measure,
    categoryName: req?.body?.categoryName,
    color: req?.body?.color,
    comments: req?.body?.comments,
    imagesUrl: req?.body?.imagesUrl,
    favorite: req?.body?.favorite,
    brand: req?.body?.brand,
    viewing: req?.body?.viewing,
    material: req?.body?.material,
    popularity: req?.body?.popularity,
    description: req?.body?.description,
    discount: req?.body?.discount,
    stock: req?.body?.stock,
    weight: req?.body?.weight,
    dimensions: req?.body?.dimensions,
    warranty: req?.body?.warranty,
    certification: req?.body?.certification,
    returnPolicy: req?.body?.returnPolicy,
    relatedProducts: req?.body?.relatedProducts,
    totalSales: req?.body?.totalSales,
    creationDate: req?.body?.creationDate,
    lastUpdated: req?.body?.lastUpdated,
    reviewsCount: req?.body?.reviewsCount,
    averageRating: req?.body?.averageRating,
    productAvailability: req?.body?.productAvailability,
    repairService: req?.body?.repairService,
    priceHistory: req?.body?.priceHistory,
  });

  try {
    const result = await product.save();
    console.log({ product });

    res.status(201).send(product);
  } catch (error) {
    console.log("product error", error);
    res.status(400).send(error);
  }
});

module.exports = router;
