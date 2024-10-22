const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { Product } = require("../models/product");
const { Basket } = require("../models/basket");
const auth = require("../middlware/auth");

router.post("/",  async (req, res) => {
  const { productId, quantity, userId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let basket = await Basket.findOne({ user: user._id }).populate(
      "products.productId",
      "productName price"
    );

    if (!basket) {
      basket = new Basket({ user: user._id, products: [], totalPrice: 0 });
    }

    const existingProduct = basket.products.find((p) =>
      p.productId.equals(productId)
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      basket.products.push({ productId, quantity, price: product.price });
    }

    basket.totalPrice = basket.products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await basket.save();

    res.status(200).json({ message: "Product added to basket", basket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const basket = await Basket.find({})
      .populate("user", "-password")
      .populate("products.productId");

    res.status(200).json(basket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:userId", /*auth, */ async (req, res) => {
  console.log("req.params.userId", req.params.userId);

  try {
    const basket = await Basket.findOne({ user: req.params.userId }).populate(
      "products.productId"
    );
    console.log("basket", basket);

    res.status(200).json(basket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // İstifadəçinin səbətində məhsulu tapır və silir
    const basket = await Basket.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { productId: productId } } },
      { new: true } // yenilənmiş səbəti qaytarır
    );

    if (!basket) {
      return res.status(404).json({ message: "Basket or product not found" });
    }

    // Səbətin müvəffəqiyyətlə yeniləndiyini bildirir
    res.status(200).json({ message: "Product removed from basket", basket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:userId/:productId",  async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body; // `body`-dən quantity dəyərini alırıq
 console.log("quantity", quantity);
 
  try {
    // İlk olaraq məhsulun mövcudluğunu yoxlayırıq
    const basket = await Basket.findOne({
      user: userId,
      "products.productId": productId,
    });

    if (!basket) {
      return res.status(404).json({ message: "Basket or product not found" });
    }

    // Cari məhsulun miqdarını alırıq
    const product = basket.products.find(
      (p) => p.productId.toString() === productId
    );

    if (product) {
      // Məhsulun cari miqdarı
      const currentQuantity = product.quantity;

      // Əgər cari miqdar 1-dirsə, onu dəyişdirmirik
      if (currentQuantity === 1) {
        return res.status(200).json({
          message: "Product quantity cannot be reduced below 1",
          quantity: currentQuantity,
        });
      } else {
        // `quantity`-ni artırırıq
        const updatedBasket = await Basket.findOneAndUpdate(
          { user: userId, "products.productId": productId },
          { $inc: { "products.$.quantity": quantity } }, // `quantity`-ni artırır
          { new: true } // Yenilənmiş səbəti qaytarır
        );

        return res
          .status(200)
          .json({ message: "Product quantity updated", basket: updatedBasket });
      }
    }

    res.status(404).json({ message: "Product not found in basket" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
