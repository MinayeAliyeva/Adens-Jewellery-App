const mongoose = require("mongoose");
const catagoryShema = mongoose.Schema({
  name: String,
});
module.exports = mongoose.model("Catagory", catagoryShema);
