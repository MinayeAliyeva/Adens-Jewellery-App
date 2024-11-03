const express = require("express");
const router = express.Router();
const { Category } = require("../models/catagory");

router.get("/", async (req, res) => {
  const categories = await Category.find().populate("brand")
  res.send(categories);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).send("aradığınız kategori yok.");
  }
  res.send(category);
});

router.post("/", async (req, res) => {
  let findedCategory = await Category.findOne({ name: req.body.name });

  if (findedCategory) {
    return res.status(400).send("Bele category movcuddur !!!");
  }

  const category = new Category({
    name: req.body.name,
    brand: req.body.brand,
  });

  const newCategory = await category.save();
  res.status(201).send(newCategory);
});


router.put("/:id", async (req, res) => {

  const category = await Category.findById(req.params.id);

  
  if (!category) {
    return res.status(404).send("Aradığınız kategori yok.");
  }
  category.brand = req.body.brand;

  const updatedCategory = await category.save();
  res.send(updatedCategory);
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(400).send(error.details[0].message);
  }
  res.send(category);
});

module.exports = router;
