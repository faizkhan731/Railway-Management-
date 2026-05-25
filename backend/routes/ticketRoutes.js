const express = require("express");

const router = express.Router();

const {
  verifyPayment,
  getMyTickets,
  checkPNR,
} = require("../controllers/ticketController");

const authenticateToken = require(
  "../middleware/authMiddleware"
);

// VERIFY PAYMENT
router.post(
  "/verify-payment",
  authenticateToken,
  verifyPayment
);

// MY TICKETS
router.get(
  "/my-tickets",
  authenticateToken,
  getMyTickets
);

// CHECK PNR
router.get(
  "/check-pnr",
  checkPNR
);

module.exports = router;