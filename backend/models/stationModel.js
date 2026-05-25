const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema(
  {
    station_code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    station_name: {
      type: String,
      required: true,
      trim: true,
    },

    station_city: {
      type: String,
      required: true,
      trim: true,
    },

    station_state: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Station", stationSchema);