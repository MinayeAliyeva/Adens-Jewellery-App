// const express = require("express");
// const auth = require("../middlware/auth");
// const router = express.Router();
// const { Order } = require("../models/order");
// const { User } = require("../models/user");
// const { Product } = require("../models/product");

// router.get("/", auth, async (req, res) => {
//   const orders = await Order.find({}).populate("user", "-password");
//   res.status(200).send(orders);
// });

// router.get("/:id", auth, async (req, res) => {
//   const order = await Order.findById(req.params.id).populate("user", "-password");
//   res.status(200).send({ success: true, message: "Single Order", order });
// });

// router.post("/", auth, async (req, res) => {
//   const { orderItems, shippingAddress } = req.body;

//   // Kullanıcıyı bul
//   const user = await User.findOne({ email: req.body.user.email });
//   if (!user) {
//     return res.status(404).send("Kullanıcı bulunamadı.");
//   }

//   // Eğer hiç ürün yoksa hata döndür
//   if (!orderItems || orderItems.length === 0) {
//     return res.status(400).send("Ürün yok!!!");
//   }

//   // Gelen ürünleri bul
//   const products = await Product.find({ _id: { $in: orderItems.map(item => item._id) } });

//   // Var olan siparişi bul
//   let existingOrder = await Order.findOne({ user: user._id });

//   // Toplam fiyatı hesapla
//   let totalPrice = 0;

//   // Eğer sipariş zaten varsa, ürün miktarlarını ve toplam fiyatı güncelle
//   if (existingOrder) {
//     orderItems.forEach(async (orderItem) => {
//       const product = products.find(p => p._id.toString() === orderItem._id.toString());

//       if (product) {
//         // Eğer ürün zaten siparişte varsa, sipariş miktarını artır
//         const existingProductInOrder = existingOrder?.orderItems?.find(item => item._id.toString() === product._id.toString());

//         const orderQuantity = orderItem.quantity || 1; // Miktar yoksa 1 olarak varsay

//         if (existingProductInOrder) {
//           existingProductInOrder.totalQualityBuying = (existingProductInOrder.totalQualityBuying || 0) + orderQuantity;
//         } else {
//           // Eğer ürün siparişte yoksa, siparişe yeni ürün ekle ve miktarı ayarla
//           existingOrder.orderItems.push({
//             product, // Ürün ID'sini kaydet
//             totalQualityBuying: orderQuantity
//           });
//         }

//         // Toplam fiyatı güncelle
//         totalPrice += Number(product.price) * orderQuantity;

//         // Ürünün toplam satın alma miktarını artır
//         product.totalQualityBuying = (product.totalQualityBuying || 0) + orderQuantity;
//         await product.save();
//       }
//     });

//     // Toplam fiyatı güncelle
//     existingOrder.totalPrice += totalPrice;
//     await existingOrder.save();

//     res.status(200).send({ success: true, message: "Sipariş güncellendi", order: existingOrder });
//   } else {
//     // Eğer sipariş yoksa yeni sipariş oluştur
//     orderItems.forEach(orderItem => {
//       const product = products.find(p => p._id.toString() === orderItem._id.toString());
//       const orderQuantity = orderItem.quantity || 1; // Miktar yoksa 1 olarak varsay
//       totalPrice += Number(product.price) * orderQuantity; // Toplam fiyatı hesapla
//     });

//     let newOrder = await Order.create({
//       user: user._id,
//       orderItems: orderItems.map(orderItem => {
//         const product = products.find(p => p._id.toString() === orderItem._id.toString());
//         return {
//           ...product,
//           totalQualityBuying: orderItem.quantity || 1 // Miktar yoksa 1 olarak varsay
//         }
//       }),
//       shippingAddress,
//       totalPrice
//     });

//     user.orders.push(newOrder._id);
//     await user.save();

//     res.status(200).send({ success: true, message: "Sipariş oluşturuldu", order: newOrder });
//   }
// });

// module.exports = router;

const express = require("express");
const auth = require("../middlware/auth");
const router = express.Router();
const { Order } = require("../models/order");
const { User } = require("../models/user");
const { Product } = require("../models/product");
// const bcrypt = require("bcrypt");
// const auth = require("../middlware/auth");
// const isAdmin = require("../middlware/isAdmin");
// const cors = require("cors");

router.get("/", auth, async (req, res) => {
  const orders = await Order.find({}).populate("user", "-password");
  //const product = await Product.find({_id: })
  res.status(200).send(orders);
});

router.get("/:id", auth, async (req, res) => {
  const order = await Order.findById({_id: req.params.id}).populate("user", "-password");

  res.status(200).send({success: true, message:"Single Order", order});
});

router.post("/", auth, async (req, res) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;
  const user = await User.findOne({ email: req.body.user.email });
  //   const user = await User.findById({ req.body.userId });
  if (orderItems?.length <= 0) {
    res?.send("Urun yok!!!");
  }
  const products = await Product.find({ _id: { $in: orderItems } });

  orderItems.map(async (order) => {
    const product = products.find(
      (p) => p._id.toString() === order._id.toString()
    );
    if(product){
      product.totalQty +=1;
    }
    await product.save();
  });
  
 

  let order = await Order.create({
    user: user?._id,
    orderItems: products,
    shippingAddress,
    totalPrice,
  });

  user.orders.push(order?._id);
  await user.save();
  
  res
    .status(200)
    .send({ success: true, message: "Order created", order, user });
});

module.exports = router;

