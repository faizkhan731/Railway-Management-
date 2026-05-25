const ContactQuery = require("../models/contactQueryModel");

// SUBMIT CONTACT QUERY
const submitContactQuery = async (
  req,
  res
) => {
  try {

    const {
      name,
      phone,
      email,
      pnr,
      query_type,
      message,
    } = req.body;

    // CREATE QUERY
    const query =
      await ContactQuery.create({
        name,
        phone,
        email,
        pnr,
        query_type,
        message,
      });

    res.status(201).json({
      success: true,
      message:
        "Query submitted successfully",
      query,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET ALL QUERIES
const getAllQueries = async (
  req,
  res
) => {
  try {

    const queries =
      await ContactQuery.find().sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      count: queries.length,
      queries,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET SINGLE QUERY
const getSingleQuery = async (
  req,
  res
) => {
  try {

    const query =
      await ContactQuery.findById(
        req.params.id
      );

    // NOT FOUND
    if (!query) {
      return res.status(404).json({
        success: false,
        message:
          "Query not found",
      });
    }

    res.json({
      success: true,
      query,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// UPDATE QUERY STATUS
const updateQueryStatus = async (
  req,
  res
) => {
  try {

    const { status } = req.body;

    // UPDATE
    const updatedQuery =
      await ContactQuery.findByIdAndUpdate(
        req.params.id,
        {
          status,
        },
        {
          new: true,
        }
      );

    // NOT FOUND
    if (!updatedQuery) {
      return res.status(404).json({
        success: false,
        message:
          "Query not found",
      });
    }

    res.json({
      success: true,
      message:
        "Status updated successfully",
      query: updatedQuery,
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
  submitContactQuery,
  getAllQueries,
  getSingleQuery,
  updateQueryStatus,
};