// const jwt = require("jsonwebtoken");
// const auth = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) {
//     return res.status(401).send("yetkiniz yok.");
//   }
//   try {
//     const decodedToken = jwt.verify(token, "jwtPrivateKey");
//     req.user = decodedToken;
//     next();
//   } catch (ex) {
//     res.status(400).send("hatali token.");
//   }
// };

// module.exports = auth;

// postman ile yoxlama
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.header("Authorization");

  // Token var mı kontrol ediliyor
  if (!token) {
    return res.status(401).send("yetkiniz yok.");
  }

  // 'Bearer ' ile başlıyorsa ön ekini temizle
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft(); // 'Bearer ' kısmını çıkar
  }

  try {
    // Token'ı doğrula
    const decodedToken = jwt.verify(token, "jwtPrivateKey");
    req.user = decodedToken;
    next();
  } catch (ex) {
    res.status(400).send("hatali token.");
  }
};

module.exports = auth;
