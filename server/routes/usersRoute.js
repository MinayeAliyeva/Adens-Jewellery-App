const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
router.get("/", async (req, res) => {
  res.status(200).send();
});

//api/users POST
router.post("/register", async (req, res) => {
  
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("This email already exsits!!!");
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  user = new User({
    firstName: req?.body?.firstName,
    lastName: req?.body?.lastName,
    phone: req?.body?.phone,
    email: req?.body?.email,
    password: hashedPassword,
    // profile
    isAdmin: req?.body?.isAdmin ?? false,
  });
  await user.save();

  const token = user.createAuthToken();
  
  const responseUser = {...user};
  delete responseUser.isAdmin;
  res.status(201).header("Authorization", token).send(responseUser);
});

router.post("/auth", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Hatali Email ya Parala");
  }
  const isSucces = await bcrypt.compare(req.body.password, user.password);
  if (!isSucces) {
    return res.status(400).send("Hatali Email ya Parala");
  }
  const token = user.createAuthToken();
  
  res.send(token);
});

module.exports = router;
