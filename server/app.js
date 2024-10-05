const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productsRouter = require("../server/routes/productRoute");
const usersRouter = require("../server/routes/usersRoute");
const path = require('path');
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.options("*", cors());
//test
// app.get("/", (req, res) => {
//   res.send("Merhaba Dünya!");
// });
app.use("/api/products", productsRouter);
//middleware
app.use("/api/users", usersRouter);
app.use('/public', express.static(path.join(__dirname, 'public')));


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

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
