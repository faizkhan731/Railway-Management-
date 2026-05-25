const express = require("express");

const router = express.Router();

const {
  createCategoryRate,
  getCategoryRates,
  getSingleCategory,
  updateCategoryRate,
  deleteCategoryRate,
} = require(
  "../controllers/ticketCategoryController"
);

// CREATE CATEGORY
router.post(
  "/",
  createCategoryRate
);

// GET ALL
router.get(
  "/",
  getCategoryRates
);

// GET SINGLE
router.get(
  "/:id",
  getSingleCategory
);

// UPDATE
router.put(
  "/:id",
  updateCategoryRate
);

// DELETE
router.delete(
  "/:id",
  deleteCategoryRate
);

module.exports = router;