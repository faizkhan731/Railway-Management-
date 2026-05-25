const Train = require("../models/trainModel");
// const TicketCategoryRate = require("../models/ticketCategory");
const TicketCategoryRate = require("../models/ticketCategory");


// GET TRAINS
const getTrains = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: "Please provide from and to stations",
      });
    }

    const trains = await Train.find({
      source_station: { $regex: from, $options: "i" },
      destination_station: { $regex: to, $options: "i" },
    });

    if (trains.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No trains found",
      });
    }

    res.json({
      success: true,
      count: trains.length,
      trains: trains.map((t) => ({
        train_number: String(t.train_number),   // ✅ FIXED
        train_name: t.train_name,
        from: t.source_station,
        to: t.destination_station,
        departure_time: t.start_time,
        arrival_time: t.end_time,
        running_days: t.running_days,
      })),
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

// GET TRAIN TICKET DETAILS
const getTrainTickets = async (req, res) => {
  try {
    const { train_number } = req.params;

    // ✅ FIXED — train_number se dhundho
    const train = await Train.findOne({
      train_number: Number(train_number),
    });

    if (!train) {
      return res.status(404).json({
        success: false,
        message: "Train not found",
      });
    }

    const categories = await TicketCategoryRate.find();

    const dynamicTickets = categories.map((cat) => ({
      category: cat.category_name,
      price: (train.total_distance * cat.price_per_km).toFixed(2),
    }));

    res.json({
      success: true,
      train: {
        train_number: train.train_number,  // ✅ FIXED
        train_name: train.train_name,
        from_station: train.source_station,
        to_station: train.destination_station,
        start_time: train.start_time,
        end_time: train.end_time,
      },
      dynamicPrices: dynamicTickets,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

module.exports = { getTrains, getTrainTickets };