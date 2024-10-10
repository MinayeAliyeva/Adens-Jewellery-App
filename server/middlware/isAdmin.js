module.exports = function (req, res, next) {
  if (!req?.user?.isAdmin) {
    return res.status(403).send("Bunu yapmaya yetkiniz yok!!!");
  }
  next();
};

// auth, isAdmin , async (req, res)=>{}