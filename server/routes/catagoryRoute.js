const express = require("express");
const router = express.Router();
const { Category } = require("../models/catagory");

router.get("/", async (req, res) => {
  const categories = await Category.find().populate("brand")
  res.send(categories);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  console.log("category", category);

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


// update category
router.put("/:id", async (req, res) => {

  
  // let findedCategory = await Category.findOne({ name: req.body.name });
  // console.log({findedCategory});
  
  
  // if (findedCategory && findedCategory?.brand?._id === req.body?.brand) {
  //   return res.status(400).send("Bele category movcuddur !!!");
  // }

  //  if(!findedCategory){
  //   res.status(400).send("Update Edeceyiniz Kategori Bulunamadı");
  //   return;
  //  }

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
