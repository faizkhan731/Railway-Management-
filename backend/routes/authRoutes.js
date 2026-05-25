const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/authController");

const authenticateToken = require("../middleware/authMiddleware");

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

// GET LOGGED IN USER
router.get("/me", authenticateToken, getMe);

module.exports = router;