const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Check if the Authorization header is present
  const token = req.header("Authorization")
    ? req.header("Authorization").replace("Bearer ", "")
    : null;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "khalil"); // Replace 'khalil' with your secret key
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
