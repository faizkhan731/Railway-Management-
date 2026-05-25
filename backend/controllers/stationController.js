const Station = require("../models/stationModel");

// GET STATIONS / SEARCH STATIONS
const getStations = async (req, res) => {
  try {

    // SEARCH QUERY
    const search = req.query.q || "";

    // FIND STATIONS
    const stations = await Station.find({
      $or: [
        {
          station_name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          station_code: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    })
      .limit(10);

    // RESPONSE
    res.json(stations);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getStations,
};
