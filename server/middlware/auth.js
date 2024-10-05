const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send("yetkiniz yok.");
  }
  try {
    const decodedToken = jwt.verify(token, "jwtPrivateKey");
    req.user = decodedToken;
    next();
  } catch (ex) {
    res.status(400).send("hatali token.");
  }
};

module.exports = auth;
