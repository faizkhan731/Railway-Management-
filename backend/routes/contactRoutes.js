const express = require("express");

const router = express.Router();

const {
  submitContactQuery,
  getAllQueries,
  getSingleQuery,
  updateQueryStatus,
} = require("../controllers/contactController");

// SUBMIT CONTACT QUERY
router.post("/", submitContactQuery);

// GET ALL QUERIES
router.get("/", getAllQueries);

// GET SINGLE QUERY
router.get("/:id", getSingleQuery);

// UPDATE STATUS
router.put("/:id", updateQueryStatus);

module.exports = router;