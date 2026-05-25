const express = require("express");

const router = express.Router();

const {
  getTrains,
  getTrainTickets,
} = require("../controllers/trainController");

// SEARCH TRAINS
router.get("/", getTrains);

// TRAIN TICKET DETAILS
router.get(
  "/tickets/:train_number",
  getTrainTickets
);

module.exports = router;