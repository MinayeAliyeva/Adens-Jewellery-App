const express = require("express");
const router = express.Router();
const { Order } = require("../models/order");
const { User } = require("../models/user");
const { Product } = require("../models/product");

router.post("/", async (req, res) => {
  const { productItems, userId, shippingAddress, shippingFee, payment } =
    req.body;

  if (!productItems || productItems.length === 0) {
    return res.status(400).send({ message: "Ürün yok!!!" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send({ message: "Kullanıcı bulunamadı" });
  }

  try {
    const products = await Product.find({
      _id: { $in: productItems.map((item) => item.productId) },
    });

    const orderProducts = productItems.map((item) => {
      const product = products.find((p) => p._id.toString() === item.productId);
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product ? product.price : 0,
      };
    });

    const productsTotal = orderProducts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const totalAmount = productsTotal + shippingFee;

    const newOrder = new Order({
      userId,
      productItems: orderProducts.map(({ productId, quantity }) => ({
        productId,
        quantity,
      })),
      totalAmount,
      shippingAddress,
      payment,
      status: "pending",
      shippingFee,
    });

    const savedOrder = await newOrder.save();

    const populatedOrder = await Order.findById(savedOrder._id)
      .populate("userId", "-password")
      .populate("productItems.productId");

    res.status(201).json({
      success: true,
      message: "Sipariş oluşturuldu",
      order: populatedOrder,
      shippingFee,
    });
  } catch (error) {
    console.error("Sipariş oluşturulamadı:", error);
    res.status(500).json({
      message: "Sipariş oluşturulurken hata oluştu",
      error: error.message,
    });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "productItems.productId",
        populate: [
          {
            path: "brand",
            select: "name",
          },
          {
            path: "category",
            select: "name",
          },
        ],
      })
      .populate(
        "userId",
        "-password -isAdmin -isVerified -createdAt -updatedAt -__v -wishLists"
      );

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching orders.",
      error: error.message,
    });
  }
});

router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    const orders = await Order.find({ userId })
      .populate({
        path: "productItems.productId",
        populate: [
          {
            path: "brand",
            select: "name",
          },
          {
            path: "category",
            select: "name",
          },
        ],
      })
      .populate(
        "userId",
        "-password -isAdmin -isVerified -createdAt -updatedAt -__v -wishLists"
      );

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Siparişler alınamadı:", error);
    res.status(500).json({
      message: "Siparişler alınırken hata oluştu",
      error: error.message,
    });
  }
});

router.patch("/:orderId/status", async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatuses = [
    "pending",
    "fulfilled",
    "shipped",
    "delivered",
    "cancelled",
  ];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Geçersiz sipariş durumu" });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Sipariş bulunamadı" });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.status(200).json({
      success: true,
      message: "Sipariş durumu güncellendi",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Sipariş durumu güncellenemedi:", error);
    res.status(500).json({
      message: "Sipariş durumu güncellenirken hata oluştu",
      error: error.message,
    });
  }
});

router.delete("/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Sifariş tapılmadı" });
    }

    if (order.status === "delivered" || order.status === "cancelled") {
      await Order.findByIdAndDelete(orderId);
      return res.status(200).json({
        success: true,
        message: "Sifariş uğurla silindi",
      });
    } else {
      return res.status(400).json({
        message:
          "Yalnızca 'delivered' və ya 'cancelled' durumundakı sifarişlər silinə bilər",
      });
    }
  } catch (error) {
    console.error("Sifariş silinmədi:", error);
    return res.status(500).json({
      message: "Sifariş silinərkən xəta baş verdi",
      error: error.message,
    });
  }
});

router.delete("/:orderId/user", async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Sifariş tapılmadı" });
    }

    await Order.findByIdAndDelete(orderId);
    return res.status(200).json({
      success: true,
      message: "Sifariş uğurla silindi",
    });
  } catch (error) {
    console.error("Sifariş silinmədi:", error);
    return res.status(500).json({
      message: "Sifariş silinərkən xəta baş verdi",
      error: error.message,
    });
  }
});

module.exports = router;
