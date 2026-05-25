const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    PNR:        { type: Number, required: true, unique: true },
    payment_id: { type: String },
    order_id:   { type: String },
    price:      { type: Number },

    train_no:   { type: Number },
    train_name: { type: String },

    from_station: { type: String },
    to_station:   { type: String },
    distance_km:  { type: Number },
    category:     { type: String },

    // ✅ FLAT FIELDS — DB se match
    passenger_name:   { type: String },
    passenger_phone:  { type: String },
    passenger_age:    { type: Number },
    passenger_gender: { type: String },

    start_time: { type: String },
    end_time:   { type: String },
    status:     { type: String, default: "Booked" },

   user_id: { 
  type: mongoose.Schema.Types.ObjectId, 
  ref: "User" 
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);