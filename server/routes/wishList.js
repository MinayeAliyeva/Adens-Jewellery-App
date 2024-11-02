const express = require("express");
const router = express.Router();
const { WishList } = require("../models/wishList");
const { Product } = require("../models/product");
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const { productId, userId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const wishList = await WishList.findOne({ user: userId });

    if (wishList) {
      const existingProductIndex = wishList.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (existingProductIndex !== -1) {
        wishList.products.splice(existingProductIndex, 1);
      } else {
        wishList.products.push({
          productId,
          isFavorite: true,
        });
      }
    } else {
      const newFavorite = new WishList({
        user: userId,
        products: [{ productId, isFavorite: true }],
      });

      await newFavorite.save();
      return res.status(201).json({ message: "Product added to favorites", wishList: newFavorite });
    }

    await wishList.save();
    res.status(200).json({ message: "Favorites updated", wishList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:userId",async (req, res) => {
  try {
    const wishList = await WishList.findOne({ user: req.params.userId })
      .populate("products.productId");

    if (!wishList) {
      return res.status(200).json({ message: "Favorites not found" , wishList: []});
    }

    res.status(200).json(wishList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/", async (req, res) => {
  const { productId, userId } = req.body;

  try {
    const wishList = await WishList.findOne({ user: userId });

    if (!wishList) {
      return res.status(404).json({ message: "Favorites not found" });
    }

    const productIndex = wishList.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not in favorites" });
    }

    wishList.products.splice(productIndex, 1);
    await wishList.save();

    res.status(200).json({ message: "Product removed from favorites", wishList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
