const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productsRouter = require("../server/routes/product");

app.use(express.json());
//test
app.get("/", (req, res) => {
  res.send("Merhaba Dünya!");
});
app.use("/api/products", productsRouter);
const connectInfoEnum = {
  USER_NAME: "eliyevaminayee",
  PASSWORD: "mongodb12345",
  DATABASE_NAME: "adensdb",
};
(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${connectInfoEnum.USER_NAME}:${connectInfoEnum.PASSWORD}@cluster0.pp6ku.mongodb.net/${connectInfoEnum.DATABASE_NAME}?retryWrites=true&w=majority`
    );
    console.log(" mongodb baglantisi kuruldu");
  } catch (error) {
    console.log(err);
  }
})();

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
