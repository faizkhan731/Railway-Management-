const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema(
  {
    train_number: {
      type: Number,
      required: true,
      unique: true,
    },

    train_name: {
      type: String,
      required: true,
    },

    train_type: {
      type: String,
      enum: ["Express", "Superfast", "Passenger", "Local"],
      default: "Express",
    },

    direction: {
      type: String,
      enum: ["Up", "Down"],
    },

    source_station: {
      type: String,
      required: true,
    },

    destination_station: {
      type: String,
      required: true,
    },

    // ✅ Array of stations
    route_stations: [
      {
        type: String,
      },
    ],

    // ✅ Array of arrival times
    arrival_times: [
      {
        type: String,
      },
    ],

    // ✅ Array of departure times
    departure_times: [
      {
        type: String,
      },
    ],

    // ✅ Halt minutes
    halt_minutes: [
      {
        type: Number,
      },
    ],

    // ✅ Distance at each station
    distance_km: [
      {
        type: Number,
      },
    ],

    start_time: {
      type: String,
    },

    end_time: {
      type: String,
    },

    total_distance: {
      type: Number,
    },

    // ✅ Running days array
    running_days: [
      {
        type: String,
        enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    ],

    train_status: {
      type: String,
      enum: ["Active", "Cancelled", "Maintenance"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Train", trainSchema);