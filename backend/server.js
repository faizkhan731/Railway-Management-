// const express = require("express");
// const app = express();
// const mysql = require("mysql2/promise"); // promise version
// const PORT = process.env.PORT || 5000;
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");

// // const bcrypt = require("bcrypt")

// const cors = require("cors");
// const session = require("express-session");
// const cookieParser = require("cookie-parser");
// const Razorpay = require("razorpay");

// const Secret_key = "faizkhan"
// const db = require("./db");

// const User = require("./models/userModels");
// const Train = require("./models/trainModel");
// const Ticket = require("./models/ticketModel");
// const TicketCategoryRate = require("./models/ticketcategory");
// const Station = require("./models/stationModel");
// const ContactQuery = require("./models/queryModel");
// // Middleware to verify JWT token
// const authenticateToken = (req, res, next) => {
//   const token = req.cookies.authToken;
//   if (!token) {
//     return res.status(401).json({ success: false, message: "Access denied" });
//   }
//   try {
//     const decoded = jwt.verify(token, Secret_key);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };


// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   session({
//     secret: Secret_key,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: true, // prevents JS access
//       secure: false,  // true only in HTTPS
//       maxAge: 1000 * 60 * 60 * 2, // 2 hours
//     },
//   })
// )


// db();

// // // MySQL pool
// // const db = mysql.createPool({
// //   host: "localhost",
// //   user: "root",
// //   password: "",
// //   database: "railway"
// // });

// // // Add user_id column to tickets table if not exists
// // db.query(`
// //   ALTER TABLE tickets 
// //   ADD COLUMN user_id INT,
// //   ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id)
// // `).catch(() => {
// //   // Ignore if column already exists
// // });
// // app.post("/api/create-order", async (req, res) => {
// //   try {
// //     const amount = Number(req.body.amount) * 100;  // paise conversion here

// //     // Fake order object
// //     const order = {
// //       id: "order_fake_" + Date.now(),
// //       amount: amount,
// //       currency: "INR",
// //       receipt: "rcpt_" + Date.now(),
// //     };

// //     res.json(order);

// //   } catch (err) {
// //     console.log("ORDER ERROR:", err);
// //     res.status(500).json({ error: "Order creation failed" });
// //   }
// // });

// // app.post("/api/verify-payment", authenticateToken, async (req, res) => {
// //   try {

// //     const { order_id, payment_id, signature, train, ticket, passenger } = req.body;
// //     const PNR = "PNR" + Date.now() + Math.floor(1000 + Math.random() * 9000)




// //     const sql = `
// //   INSERT INTO tickets (
// //     PNR, payment_id, order_id, price,
// //     train_no, train_name,
// //     from_station, to_station, distance_km,
// //     category,
// //     passenger_name, passenger_phone, passenger_age, passenger_gender,
// //     start_time, end_time,
// //     status, user_id
// //   )
// //   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
// // `;

// //     await db.query(sql, [
// //       PNR,
// //       payment_id,
// //       order_id,

// //       ticket.price,

// //       train.train_number,
// //       train.train_name,

// //       ticket.from,
// //       ticket.to,
// //       ticket.distance_km,

// //       ticket.category,

// //       passenger.name,
// //       passenger.phone,
// //       passenger.age,
// //       passenger.gender,

// //       train.start_time,
// //       train.end_time,

// //       "CONFIRMED",
// //       req.user.id
// //     ]);


// //     res.json({
// //       success: true,
// //       message: "Payment Verified & Ticket Saved!",
// //       ticket: {
// //         pnr: PNR,
// //         payment_id,
// //         order_id,

// //         train: {
// //           number: train.train_number,
// //           name: train.train_name,
// //           from: ticket.from,
// //           to: ticket.to,
// //           start_time: train.start_time,
// //           end_time: train.end_time,
// //           distance: ticket.distance_km
// //         },

// //         category: ticket.category,
// //         price: ticket.price,

// //         passenger: {
// //           name: passenger.name,
// //           phone: passenger.phone,
// //           age: passenger.age,
// //           gender: passenger.gender
// //         },

// //         status: "CONFIRMED"
// //       }
// //     });


// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // });


// // app.get("/api/me", (req, res) => {
// //   try {
// //     const token = req.cookies.authToken;

// //     if (!token) {
// //       return res.status(401).json({ success: false });
// //     }

// //     const decoded = jwt.verify(token, Secret_key);

// //     res.json({
// //       success: true,
// //       user: decoded,
// //     });
// //   } catch {
// //     res.status(401).json({ success: false });
// //   }
// // });
// // //LOGIN API
// // app.post("/api/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     // Step 1: Check if user exists
// //     const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
// //     const user = rows[0]; // first record

// //     if (!user) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "User not found"
// //       });
// //     }

// //     // Step 2: Match password (no bcrypt)
// //     if (user.password !== password) {
// //       return res.status(401).json({
// //         success: false,
// //         message: "Invalid password"
// //       });
// //     }

// //     // Step 3: Generate JWT token
// //     const token = jwt.sign(
// //       { id: user.id, email: user.email, role: user.role },
// //       Secret_key,
// //       { expiresIn: "2h" }
// //     );

// //     res.cookie("authToken", token, {
// //       httpOnly: true,
// //       secure: false,
// //       sameSite: "lax",
// //       maxAge: 1000 * 60 * 60 * 2,
// //     });

// //     // Step 4: Create user object to send to frontend
// //     const userData = {
// //       id: user.id,
// //       name: user.name,
// //       email: user.email,
// //       role: user.role,
// //     };

// //     // Step 5: Response to frontend
// //     return res.status(200).json({
// //       success: true,
// //       message: "Login successful",
// //       user: userData,
// //     });

// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // });

// // // REGISTER API
// // app.post("/api/register", async (req, res) => {
// //   try {
// //     const { name, email, password, phone, gender, role } = req.body;

// //     const [userExists] = await db.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
// //     if (userExists.length) {
// //       return res.status(400).json({ message: "User already exists" });
// //     }

// //     const sql = `INSERT INTO users (name, email, password, phone, gender, role) VALUES (?, ?, ?, ?, ?, ?)`;
// //     const [result] = await db.query(sql, [name, email, password, phone, gender, role]);

// //     res.status(201).json({
// //       message: "User registered successfully",
// //       userId: result.insertId
// //     });

// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // });


// // // STATIONS API
// // app.get("/api/stations", async (req, res) => {
// //   try {
// //     const search = req.query.q || "";
// //     const sql = `
// //       SELECT * FROM stations
// //       WHERE station_name LIKE ? OR station_code LIKE ?
// //       LIMIT 10
// //     `;
// //     const [results] = await db.query(sql, [`%${search}%`, `%${search}%`]);
// //     res.json(results);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // });
// // app.get("/api/trains", async (req, res) => {
// //   try {
// //     const { from, to, date } = req.query;

// //     if (!from || !to) {
// //       return res.status(400).json({ success: false, message: "Please provide both 'from' and 'to' stations." });
// //     }

// //     // ✅ Step 1: Get the correct day name for the given date (or today if not provided)
// //     const queryDate = date ? date : new Date().toISOString().split("T")[0];
// //     const [[{ today }]] = await db.query("SELECT DAYNAME(?) AS today", [queryDate]);
// //     const dayMap = {
// //       Sunday: "Sun",
// //       Monday: "Mon",
// //       Tuesday: "Tue",
// //       Wednesday: "Wed",
// //       Thursday: "Thu",
// //       Friday: "Fri",
// //       Saturday: "Sat"
// //     };
// //     const todayShort = dayMap[today];
// //     console.log("🕓 Searching trains for day:", todayShort, "From:", from, "To:", to);

// //     // ✅ Step 2: Case-insensitive & partial match for route + train_status active
// //     const [trains] = await db.query(
// //       `SELECT 
// //           train_id, train_number, train_name, train_type,
// //           source_station, destination_station,
// //           route_stations, running_days,
// //           start_time, end_time, total_distance
// //        FROM trains
// //        WHERE 
// //           LOWER(route_stations) LIKE LOWER(CONCAT('%', ?, '%'))
// //           AND LOWER(route_stations) LIKE LOWER(CONCAT('%', ?, '%'))
// //           AND LOWER(running_days) LIKE LOWER(CONCAT('%', ?, '%'))
// //           AND train_status='Active'`,
// //       [from, to, todayShort]
// //     );

// //     // ✅ Step 3: No trains found
// //     if (trains.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: `No trains found for ${from} → ${to} on ${todayShort}.`,
// //       });
// //     }

// //     // ✅ Step 4: Filter correct direction
// //     const validTrains = trains.filter((train) => {
// //       const stations = train.route_stations.split(",").map((s) => s.trim().toLowerCase());
// //       const fromIndex = stations.findIndex((s) => s.includes(from.trim().toLowerCase()));
// //       const toIndex = stations.findIndex((s) => s.includes(to.trim().toLowerCase()));
// //       return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
// //     });

// //     if (validTrains.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "No trains found in the correct direction.",
// //       });
// //     }

// //     // ✅ Step 5: Success response
// //     res.json({
// //       success: true,
// //       count: validTrains.length,
// //       trains: validTrains.map((t) => ({
// //         train_number: t.train_number,
// //         train_name: t.train_name,
// //         type: t.train_type,
// //         from: from,
// //         to: to,
// //         departure_time: t.start_time,
// //         arrival_time: t.end_time,
// //         running_days: t.running_days,
// //         total_distance: t.total_distance,
// //       })),
// //     });
// //   } catch (error) {
// //     console.error("❌ Error fetching trains:", error);
// //     res.status(500).json({ success: false, message: "Server error occurred." });
// //   }
// // });

// // app.get("/api/train-tickets/:train_number", async (req, res) => {
// //   try {
// //     const { train_number } = req.params;
// //     const { from, to } = req.query;

// //     if (!from || !to) {
// //       return res.json({ success: false, message: "from and to required" });
// //     }

// //     const [trainData] = await db.query(
// //       `SELECT train_number, train_name, source_station, destination_station,
// //               route_stations, distance_km, start_time, end_time 
// //        FROM trains 
// //        WHERE train_number = ?`,
// //       [train_number]
// //     );

// //     if (trainData.length === 0) {
// //       return res.json({ success: false, message: "Train not found" });
// //     }

// //     const train = trainData[0];

// //     const stations = train.route_stations.split(",");
// //     const distances = train.distance_km.split(",").map(Number);

// //     const fromIndex = stations.indexOf(from);
// //     const toIndex = stations.indexOf(to);

// //     if (fromIndex === -1 || toIndex === -1 || fromIndex >= toIndex) {
// //       return res.json({ success: false, message: "Invalid from-to route" });
// //     }

// //     const km = distances[toIndex] - distances[fromIndex];

// //     const [categories] = await db.query(
// //       "SELECT category_name, price_per_km FROM ticket_category_rates"
// //     );

// //     const dynamicTickets = categories.map((cat) => ({
// //       from,
// //       to,
// //       distance_km: km,
// //       category: cat.category_name,
// //       price: (km * cat.price_per_km).toFixed(2),
// //     }));

// //     res.json({
// //       success: true,
// //       train: {
// //         train_number: train.train_number,
// //         train_name: train.train_name,
// //         source_station: train.source_station,
// //         destination_station: train.destination_station,
// //         start_time: train.start_time,
// //         end_time: train.end_time,
// //       },
// //       dynamicPrices: dynamicTickets,
// //     });

// //   } catch (error) {
// //     console.log("Error:", error);
// //     res.json({ success: false, message: "Server error" });
// //   }
// // });
// // // app.post("/api/create-order", async (req, res) => {
// // //   try {
// // //     const amount = Number(req.body.amount); // IMPORTANT

// // //     const options = {
// // //       amount: amount,      // paise
// // //       currency: "INR",
// // //       receipt: "rcpt_" + Math.floor(Math.random() * 100000),
// // //       payment_capture: 1
// // //     };

// // //     const order = await razorpay.orders.create(options);

// // //     console.log("ORDER:", order);
// // //     return res.json(order);
// // //   } catch (err) {
// // //     console.log("ORDER ERROR:", err);
// // //     return res.status(500).json({ error: "Order creation failed" });
// // //   }
// // // });



// // // POST /api/contact — Form submit
// // app.post("/api/contact", async (req, res) => {
// //   try {
// //     const { name, phone, email, pnr, query_type, message } = req.body;

// //     if (!name || !name.trim())
// //       return res.status(400).json({ success: false, message: "Name is required." });
// //     if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
// //       return res.status(400).json({ success: false, message: "Valid email is required." });
// //     if (!query_type || !query_type.trim())
// //       return res.status(400).json({ success: false, message: "Query type is required." });
// //     if (!message || message.trim().length < 6)
// //       return res.status(400).json({ success: false, message: "Message too short." });

// //     const sql = `
// //       INSERT INTO contact_queries (name, phone, email, pnr, query_type, message)
// //       VALUES (?, ?, ?, ?, ?, ?)
// //     `;

// //     const [result] = await db.query(sql, [
// //       name.trim(),
// //       phone?.trim() || null,
// //       email.trim(),
// //       pnr?.trim() || null,
// //       query_type.trim(),
// //       message.trim(),
// //     ]);

// //     return res.status(201).json({
// //       success: true,
// //       message: "Query submitted! We will respond within 2 hours.",
// //       id: result.insertId,
// //     });

// //   } catch (err) {
// //     console.error("POST /api/contact error:", err);
// //     return res.status(500).json({ success: false, message: "Server error. Please try again." });
// //   }
// // });

// // // GET /api/my-tickets — Get user's tickets
// // app.get("/api/my-tickets", authenticateToken, async (req, res) => {
// //   try {
// //     const userId = req.user.id;
// //     const sql = `
// //       SELECT 
// //         PNR, payment_id, order_id, price,
// //         train_no, train_name,
// //         from_station, to_station, distance_km,
// //         category,
// //         passenger_name, passenger_phone, passenger_age, passenger_gender,
// //         start_time, end_time,
// //         status
// //       FROM tickets
// //       WHERE user_id = ?
// //       ORDER BY id DESC
// //     `;
// //     const [tickets] = await db.query(sql, [userId]);
// //     res.json({
// //       success: true,
// //       tickets
// //     });
// //   } catch (err) {
// //     console.error("GET /api/my-tickets error:", err);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });

// // // GET /api/check-pnr — Check PNR status
// // app.get("/api/check-pnr", async (req, res) => {
// //   try {
// //     const { pnrNumber } = req.query;
// //     if (!pnrNumber) {
// //       return res.status(400).json({ success: false, message: "PNR number is required" });
// //     }

// //     const [rows] = await db.query("SELECT * FROM tickets WHERE PNR = ?", [pnrNumber]);
// //     if (rows.length === 0) {
// //       return res.status(404).json({ success: false, message: "PNR not found" });
// //     }

// //     const ticket = rows[0];
// //     const formattedTicket = {
// //       pnr: ticket.PNR,
// //       train: {
// //         number: ticket.train_no,
// //         name: ticket.train_name,
// //         from: ticket.from_station,
// //         to: ticket.to_station,
// //       },
// //       passenger: {
// //         name: ticket.passenger_name,
// //         age: ticket.passenger_age,
// //         gender: ticket.passenger_gender,
// //       },
// //       price: ticket.price,
// //       payment_id: ticket.payment_id,
// //       status: ticket.status,
// //     };

// //     res.json({ success: true, ticket: formattedTicket });
// //   } catch (err) {
// //     console.error("GET /api/check-pnr error:", err);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });





// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });





const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
require("dotenv").config();


const app = express();

// DATABASE
const connectDB = require("./db");

// ROUTES
const authRoutes = require("./routes/authRoutes");

const stationRoutes = require(
  "./routes/stationRoutes"
);

const trainRoutes = require(
  "./routes/trainRoutes"
);

const ticketRoutes = require(
  "./routes/ticketRoutes"
);

const contactRoutes = require(
  "./routes/contactRoutes"
);

const ticketCategoryRoutes = require(
  "./routes/ticketCategoryRoutes"
);

// PORT
const PORT = process.env.PORT || 5000;

// CONNECT DATABASE
connectDB();

// ======================
// MIDDLEWARE
// ======================

// CORS
app.use(
  cors({
    origin:[ "http://localhost:5174",
     "http://localhost:5174",
      "https://railway-management-three.vercel.app",

    ],
    credentials: true,
  })
);

// JSON
app.use(express.json());

// COOKIE PARSER
app.use(cookieParser());

// SESSION
app.use(
  session({
    secret: "faizkhan",

    resave: false,

    saveUninitialized: false,

    cookie: {
      httpOnly: true,

      secure: false,

      maxAge: 1000 * 60 * 60 * 2,
    },
  })
);

// ======================
// API ROUTES
// ======================

// AUTH
app.use("/api/auth", authRoutes);

// STATIONS
app.use(
  "/api/stations",
  stationRoutes
);

// TRAINS
app.use(
  "/api/trains",
  trainRoutes
);

// TICKETS
app.use(
  "/api/tickets",
  ticketRoutes
);

// CONTACT
app.use(
  "/api/contact",
  contactRoutes
);

// TICKET CATEGORY
app.use(
  "/api/ticket-categories",
  ticketCategoryRoutes
);

// ======================
// TEST ROUTE
// ======================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "Railway Backend API Running Successfully 🚆",
  });
});

// ======================
// 404 ROUTE
// ======================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ======================
// SERVER
// ======================

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}`
  );
});