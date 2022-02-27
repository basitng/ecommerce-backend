const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) res.status(403).json("Token is invalid");
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("User not authenticated");
  }
};

const VerifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user);
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(401).json("You are not allowed to view this endpoint");
    }
  });
};

const VerifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401).json("You are not allowed to view this endpoint");
    }
  });
};
module.exports = { verifyToken, VerifyTokenAndAuthorization, VerifyAdmin };
