// const crypto = require("crypto");

// const Ticket = require("../models/ticketModel");

// const Train = require("../models/trainModel");

// const TicketCategoryRate = require(
//   "../models/ticketcategory"
// );

// // VERIFY PAYMENT & BOOK TICKET
// const verifyPayment = async (
//   req,
//   res
// ) => {
//   try {

//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,

//       train_no,
//       train_name,

//       from_station,
//       to_station,

//       category,

//       passenger_name,
//       passenger_phone,
//       passenger_age,
//       passenger_gender,

//       start_time,
//       end_time,
//     } = req.body;

//     // VERIFY SIGNATURE
//     const body =
//       razorpay_order_id +
//       "|" +
//       razorpay_payment_id;

//     const expectedSignature =
//       crypto
//         .createHmac(
//           "sha256",
//           process.env.RAZORPAY_SECRET
//         )
//         .update(body.toString())
//         .digest("hex");

//     // PAYMENT FAILED
//     if (
//       expectedSignature !==
//       razorpay_signature
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Payment verification failed",
//       });
//     }

//     // FIND TRAIN
//     const train =
//       await Train.findOne({
//         train_number: train_no,
//       });

//     if (!train) {
//       return res.status(404).json({
//         success: false,
//         message:
//           "Train not found",
//       });
//     }

//     // DISTANCE
//     const fromIndex =
//       train.route_stations.indexOf(
//         from_station
//       );

//     const toIndex =
//       train.route_stations.indexOf(
//         to_station
//       );

//     const distance =
//       train.distance_km[toIndex] -
//       train.distance_km[fromIndex];

//     // CATEGORY RATE
//     const rate =
//       await TicketCategoryRate.findOne({
//         category_name: category,
//       });

//     if (!rate) {
//       return res.status(404).json({
//         success: false,
//         message:
//           "Category rate not found",
//       });
//     }

//     // TOTAL PRICE
//     const totalPrice =
//       distance *
//       rate.price_per_km;

//     // GENERATE PNR
//     const PNR =
//       Math.floor(
//         1000000000 +
//         Math.random() *
//         9000000000
//       ).toString();

//     // SAVE TICKET
//     const ticket =
//       await Ticket.create({
//         PNR,

//         payment_id:
//           razorpay_payment_id,

//         order_id:
//           razorpay_order_id,

//         price: totalPrice,

//         train_no,
//         train_name,

//         from_station,
//         to_station,

//         distance_km: distance,

//         category,

//         passenger: {
//           name:
//             passenger_name,

//           phone:
//             passenger_phone,

//           age:
//             passenger_age,

//           gender:
//             passenger_gender,
//         },

//         start_time,
//         end_time,

//         status: "Booked",

//         user_id:
//           req.user.id,
//       });

//     // RESPONSE
//     res.status(201).json({
//       success: true,

//       message:
//         "Ticket booked successfully",

//       ticket,
//     });

//   } catch (err) {

//     console.log(err);

//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// // GET MY TICKETS
// const getMyTickets = async (req, res) => {
//   try {
//     const tickets = await Ticket.find({
//       user_id: req.user.id  // ← seedha use karo, $or mat lagao
//     }).sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       tickets,
//     });

//   } catch (err) {
//     console.log("ERROR:", err.message);
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// // CHECK PNR
// // const checkPNR = async (
// //   req,
// //   res
// // ) => {
// //   try {

// //     const { pnr } = req.query;

// //     // VALIDATION
// //     if (!pnr) {
// //       return res.status(400).json({
// //         success: false,
// //         message:
// //           "PNR required",
// //       });
// //     }

// //     // FIND TICKET
// //     const ticket = await Ticket.findOne({
// //   $or: [
// //     { PNR: pnr },          // string match
// //     { PNR: Number(pnr) },  // number match
// //   ]
// // });
// //     // NOT FOUND
// //     if (!ticket) {
// //       return res.status(404).json({
// //         success: false,
// //         message:
// //           "Ticket not found",
// //       });
// //     }

// //     // RESPONSE
// //     res.json({
// //       success: true,
// //       ticket,
// //     });

// //   } catch (err) {

// //     console.log(err);

// //     res.status(500).json({
// //       success: false,
// //       message: "Server Error",
// //     });
// //   }
// // };
// // CHECK PNR
// const checkPNR = async (req, res) => {
//   try {
//     const { pnr } = req.query;

//     if (!pnr) {
//       return res.status(400).json({
//         success: false,
//         message: "PNR required",
//       });
//     }

//     const ticket = await Ticket.findOne({
//       $or: [
//         { PNR: pnr },
//         { PNR: Number(pnr) },
//       ]
//     });

//     if (!ticket) {
//       return res.status(404).json({
//         success: false,
//         message: "Ticket not found",
//       });
//     }

//     // ✅ SAHI FORMAT — Pnr.jsx ke hisab se
//     res.json({
//       success: true,
//       ticket: {
//         pnr:        ticket.PNR,
//         status:     ticket.status,
//         price:      ticket.price,
//         payment_id: ticket.payment_id,
//         train: {
//           number: ticket.train_no,
//           name:   ticket.train_name,
//           from:   ticket.from_station,
//           to:     ticket.to_station,
//         },
//         passenger: {
//       name:   ticket.passenger_name,   // ✅ FIXED
//       age:    ticket.passenger_age,    // ✅ FIXED
//       gender: ticket.passenger_gender, // ✅ FIXED
//       phone:  ticket.passenger_phone,  // ✅ FIXED
//     },
//       },
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// module.exports = {
//   verifyPayment,
//   getMyTickets,
//   checkPNR,
// };


const Ticket = require("../models/ticketModel");

// VERIFY PAYMENT & BOOK TICKET
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      train_no,
      train_name,
      from_station,
      to_station,
      category,
      passenger_name,
      passenger_phone,
      passenger_age,
      passenger_gender,
      start_time,
      end_time,
      price,
      distance_km,
    } = req.body;

    // GENERATE PNR
    const PNR = Math.floor(
      1000000000 + Math.random() * 9000000000
    ).toString();

    // SAVE TICKET
    const ticket = await Ticket.create({
      PNR,
      payment_id:       razorpay_payment_id,
      order_id:         razorpay_order_id,
      price:            price || 0,
      train_no,
      train_name,
      from_station,
      to_station,
      distance_km:      distance_km || 0,
      category,
      passenger_name,
      passenger_phone,
      passenger_age,
      passenger_gender,
      start_time,
      end_time,
      status:           "Booked",
      user_id:          req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Ticket booked successfully",
      ticket,
    });

  } catch (err) {
    console.log("VERIFY ERROR:", err.message);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET MY TICKETS
const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      user_id: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      tickets,
    });

  } catch (err) {
    console.log("MY TICKETS ERROR:", err.message);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// CHECK PNR
const checkPNR = async (req, res) => {
  try {
    const { pnr } = req.query;

    if (!pnr) {
      return res.status(400).json({
        success: false,
        message: "PNR required",
      });
    }

    const ticket = await Ticket.findOne({
      $or: [
        { PNR: pnr },
        { PNR: Number(pnr) },
      ]
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.json({
      success: true,
      ticket: {
        pnr:        ticket.PNR,
        status:     ticket.status,
        price:      ticket.price,
        payment_id: ticket.payment_id,
        train: {
          number: ticket.train_no,
          name:   ticket.train_name,
          from:   ticket.from_station,
          to:     ticket.to_station,
        },
        passenger: {
          name:   ticket.passenger_name,
          age:    ticket.passenger_age,
          gender: ticket.passenger_gender,
          phone:  ticket.passenger_phone,
        },
      },
    });

  } catch (err) {
    console.log("PNR ERROR:", err.message);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  verifyPayment,
  getMyTickets,
  checkPNR,
};