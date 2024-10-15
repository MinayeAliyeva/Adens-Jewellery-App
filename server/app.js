const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productsRouter = require("../server/routes/productRoute");
const usersRouter = require("../server/routes/usersRoute");
const catagoryRouter = require("../server/routes/catagoryRoute");
const brandRouter = require("../server/routes/brandRoute");
const orderRouter = require("../server/routes/orderRoute");
const basketRouter = require("../server/routes/basketRoute");
const wishListRouter = require("../server/routes/wishList");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// const corsOptions = {
//   exposedHeaders: ['Authorization'],
// };
app.options("*");
app.use(
  cors({
    exposedHeaders: ["Authorization"], // Authorization başlığını expose ediyoruz
  })
);
//test
// app.get("/", (req, res) => {
//   res.send("Merhaba Dünya!");
// });
app.use("/api/products", productsRouter);
//middleware
app.use("/api/users", usersRouter);
//catagories
app.use("/api/catagories", catagoryRouter);
app.use("/api/brands", brandRouter);
app.use("/api/orders", orderRouter);
app.use("/api/basket", basketRouter);
app.use("/api/wishList", wishListRouter);

app.use("/public", express.static(path.join(__dirname, "public")));

const connectInfo = {
  USER_NAME: "eliyevaminayee",
  PASSWORD: "mongodb12345",
  DATABASE_NAME: "adensdb",
};
(async () => {
  console.log("daxil");
  try {
    await mongoose.connect(
      `mongodb+srv://${connectInfo?.USER_NAME}:${connectInfo?.PASSWORD}@cluster0.pp6ku.mongodb.net/${connectInfo?.DATABASE_NAME}?retryWrites=true&w=majority`
    );

    console.log(" mongodb baglantisi kuruldu");
  } catch (error) {
    console.log(error);
  }
})();

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
