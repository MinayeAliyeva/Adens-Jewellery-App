const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userShema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      //   require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    profile: {
      type: String,
      //   require: true,
    },
    isAdmin: Boolean,
  },
  { timestamps: true }
);
userShema.methods.createAuthToken = () => {
  const token = jwt.sign(
    { _id: this._id, name: this.name, isAdmin: this.isAdmin },
    "jwtPrivateKey"
  );
  return token;
};
const User = mongoose.model("User", userShema);

module.exports = { User };
