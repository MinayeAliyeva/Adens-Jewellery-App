const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productsRouter = require("../server/routes/productRoute");
const usersRouter = require("../server/routes/usersRoute");
app.use(express.json());
//test
app.get("/", (req, res) => {
  res.send("Merhaba Dünya!");
});
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);



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
