const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../middlware/auth");
const isAdmin = require("../middlware/isAdmin");
const cors = require('cors');


//! ALL USERS 
//[auth, isAdmin] sildim yazmaliyam
router.get("/",  async (req, res) => {
  console.log("res",res);
  
  let users = await User.find();
  res.status(200).send(users);
});

router.post("/register", async (req, res) => {
  let user = await User.findOne({ email: req.body.email }); 
  console.log({registerUser: user});
  
  if (user?.email) {
    return res.status(400).send("This email already exists!!!");
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    password: hashedPassword,
    isAdmin: req.body.isAdmin ?? false,
  });

  await user.save();

  const token = user.createAuthToken();

  const resPonseUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    email: user.email,
  }

  console.log({resPonseUser});
  res.status(201).header("Authorization", `Bearer ${token}`).send({ user: resPonseUser });
});

router.post("/auth", async (req, res) => {
  let user = await User?.findOne({ email: req.body.email });
  console.log("server user", user);

  if (!user) {
    return res.status(400).send("Hatali Email ya Parala");
  }
  const isSucces = await bcrypt.compare(req?.body?.password, user?.password);
  if (!isSucces) {
    return res.status(400).send("Hatali Email ya Parala");
  }
  const token = user.createAuthToken();

  console.log("serevr token",token);
  

  res.send(token);
});

router.get("/profile", async (req, res) => {
  console.log("profile", req.body);
  
  const user = await User.findOne({email: req.body.email}).populate("orders").select("-password");;
  delete user.password;
  console.log("updated user profile", user);

  res.send(user);
});



module.exports = router;
