const express = require("express");
const router = express.Router();

const { Product, validateProduct } = require("../models/product");

// router.get("/", (req, res) => {
//   res.status(200).send(products);
// });

router.post("/", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    date: Date.now(),
    isActive: req.body.isActive,
    comments: [{ body: "MUkemmel!!!", date: new Date() }],
    star: 5,
    stock: 2,
  });
  try {
    const result = await product.save();
    res.status(201).send(product);
  } catch (error) {
    console.log("product error", error);
    res.status(400).send(error);
  }
});

module.exports = router;
