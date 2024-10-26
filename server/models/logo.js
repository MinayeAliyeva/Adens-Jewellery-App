const mongoose = require("mongoose");

const logoSchema = new mongoose.Schema({
  logos: [{
    url: {
      type: String,
      required: true,
    },
  }],
  currentlyLogo: {
    type: String,
    required: true,
  },
});

const Logo = mongoose.model("Logo", logoSchema);
module.exports = { Logo };


