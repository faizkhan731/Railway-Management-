const mongoose = require("mongoose");

const contactQuerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    pnr: {
      type: String,
      trim: true,
    },

    query_type: {
      type: String,
      required: true,
      enum: [
        "Ticket Issue",
        "Refund",
        "Train Delay",
        "Payment Problem",
        "General Inquiry",
         "PNR / Reservation Status", 
    "Ticket Cancellation",       
    "Other",        
      ],
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "in_progress", "resolved"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ContactQuery",
  contactQuerySchema
);