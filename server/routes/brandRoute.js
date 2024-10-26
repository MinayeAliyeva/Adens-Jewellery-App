const express = require("express");
const router = express.Router();
const { Brand } = require("../models/brand");

router.get("/", async (req, res) => {
  const brands = await Brand.find();
  res.send(brands);
});

router.get("/:id", async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return res.status(404).send("aradığınız brand yok.");
  }
  res.send(brand);
});

router.post("/", async (req, res) => {
  let findedBrand = await Brand.findOne({ name: req.body.name });

  if (findedBrand) {
    return res.status(400).send("Bele Brand artiq movcuddur !!!");
  }

  
  const brand = new Brand({
    name: req.body.name,
  });

  const newBrand = await brand.save();
  res.status(201).send(newBrand);
});

router.put("/:id", async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    return res.status(404).send("aradığınız brand yok.");
  }

  brand.name = req.body.name;

  const updatedBrand = await brand.save();
  res.send(updatedBrand);
});

router.delete("/:id", async (req, res) => {
  const brand = await Brand.findByIdAndDelete(req.params.id);
  if (!brand) {
    return res.status(400).send(error.details[0].message);
  }
  res.send(brand);
});

module.exports = router;
