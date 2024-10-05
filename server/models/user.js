const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userShema = mongoose.Schema(
  {
    firstName: {
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
userShema.methods.createAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      isAdmin: this.isAdmin,
      email: this.email,
      phone: this?.phone,
    },
    "jwtPrivateKey"
  );
  return token;
};
const User = mongoose.model("User", userShema);

module.exports = { User };
