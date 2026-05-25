const TicketCategoryRate = require(
  "../models/ticketCategory"
);

// CREATE CATEGORY RATE
const createCategoryRate = async (
  req,
  res
) => {
  try {

    const {
      category_name,
      price_per_km,
    } = req.body;

    // CHECK EXISTING
    const existing =
      await TicketCategoryRate.findOne({
        category_name,
      });

    if (existing) {
      return res.status(400).json({
        success: false,
        message:
          "Category already exists",
      });
    }

    // CREATE
    const category =
      await TicketCategoryRate.create({
        category_name,
        price_per_km,
      });

    res.status(201).json({
      success: true,
      message:
        "Category rate created",
      category,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET ALL CATEGORY RATES
const getCategoryRates = async (
  req,
  res
) => {
  try {

    const categories =
      await TicketCategoryRate.find();

    res.json({
      success: true,
      count: categories.length,
      categories,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET SINGLE CATEGORY
const getSingleCategory = async (
  req,
  res
) => {
  try {

    const category =
      await TicketCategoryRate.findById(
        req.params.id
      );

    // NOT FOUND
    if (!category) {
      return res.status(404).json({
        success: false,
        message:
          "Category not found",
      });
    }

    res.json({
      success: true,
      category,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// UPDATE CATEGORY RATE
const updateCategoryRate = async (
  req,
  res
) => {
  try {

    const {
      category_name,
      price_per_km,
    } = req.body;

    const updatedCategory =
      await TicketCategoryRate.findByIdAndUpdate(
        req.params.id,
        {
          category_name,
          price_per_km,
        },
        {
          new: true,
        }
      );

    // NOT FOUND
    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message:
          "Category not found",
      });
    }

    res.json({
      success: true,
      message:
        "Category updated",
      category:
        updatedCategory,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// DELETE CATEGORY
const deleteCategoryRate = async (
  req,
  res
) => {
  try {

    const deletedCategory =
      await TicketCategoryRate.findByIdAndDelete(
        req.params.id
      );

    // NOT FOUND
    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message:
          "Category not found",
      });
    }

    res.json({
      success: true,
      message:
        "Category deleted",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createCategoryRate,
  getCategoryRates,
  getSingleCategory,
  updateCategoryRate,
  deleteCategoryRate,
};