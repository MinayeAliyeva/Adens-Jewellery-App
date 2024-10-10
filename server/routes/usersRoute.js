const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../middlware/auth");
const isAdmin = require("../middlware/isAdmin");
const cors = require('cors');


//! ALL USERS 
router.get("/", [auth, isAdmin], async (req, res) => {
  let users = await User.find();
  res.status(200).send(users);
});

//api/users POST
// router.post("/register", async (req, res) => {

//   let user = await User.findOne({ email: req.body.email });
//   if (user) {
//     return res.status(400).send("This email already exsits!!!");
//   }
//   const hashedPassword = await bcrypt.hash(req.body.password, 10);
//   user = new User({
//     firstName: req?.body?.firstName,
//     lastName: req?.body?.lastName,
//     phone: req?.body?.phone,
//     email: req?.body?.email,
//     password: hashedPassword,
//     // profile
//     isAdmin: req?.body?.isAdmin ?? false,
//   });
//   //
//   await user.save();

//   const token = user.createAuthToken();
//   console.log('server token',token);

//   const responseUser = {...user};
//   delete responseUser.isAdmin;
//   res.status(201).header("Authorization", token).send(responseUser);
// });
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
  let user = await User.findOne({ email: req.body.email });
  console.log("server user", user);

  if (!user) {
    return res.status(400).send("Hatali Email ya Parala");
  }
  const isSucces = await bcrypt.compare(req.body.password, user.password);
  if (!isSucces) {
    return res.status(400).send("Hatali Email ya Parala");
  }
  const token = user.createAuthToken();

  console.log("serevr token",token);
  

  res.send(token);
});
// router.post("/auth", async (req, res) => {
//   let user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return res.status(400).send("Hatali Email ya Parola");
//   }

//   const isSucces = await bcrypt.compare(req.body.password, user.password);
//   if (!isSucces) {
//     return res.status(400).send("Hatali Email ya Parola");
//   }

//   const token = user.createAuthToken();
//   console.log("server token", token);
  
//   // JSON formatında token'ı geri döndür
//   res.status(200).json({ token });
// });


module.exports = router;
