// middlewares/optionalAuth.js
const jwt = require("jsonwebtoken");

module.exports = function optionalAuth(req, res, next) {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) return next();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = decoded;
    next();
  } catch {
    next();
  }
};
