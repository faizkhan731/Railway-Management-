const mongoose = require("mongoose");

const ticketCategoryRateSchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
      unique: true,
    },

    price_per_km: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.TicketCategoryRate ||
  mongoose.model("TicketCategoryRate", ticketCategoryRateSchema);