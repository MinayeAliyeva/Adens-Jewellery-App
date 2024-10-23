const mongoose = require("mongoose");

const logoSchema = new mongoose.Schema({
  imageUrl: mongoose.Schema.Types.Mixed,
});

const Logo = mongoose.model("Logo", logoSchema);
module.exports ={Logo};
