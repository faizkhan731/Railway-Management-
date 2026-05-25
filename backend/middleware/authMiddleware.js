const jwt = require("jsonwebtoken");

const Secret_key = "faizkhan";

const authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied",
    });
  }

  try {
    const decoded = jwt.verify(token, Secret_key);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = authenticateToken;