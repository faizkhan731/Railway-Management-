// import React, { useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import "./TicketPage.css";
// import { useAuth } from "../context/AuthContext.jsx";
// const TicketPage = () => {
//   const [train, setTrain] = React.useState({});
//   const [tickets, setTickets] = React.useState([]);
//   const { train_number } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { from, to } = location.state || {};
//   const { user } = useAuth();

//   const handleBooking = (ticket) => {
//     if (!user) {
//       alert("Please login to book tickets.");
//       navigate("/login");
//       return;
//     } else {
//       navigate(`/book-ticket/${train.train_number}`, {
//         state: { train, ticket },
//       });
//     }
//   };

//   useEffect(() => {
//     const fetchTicketDetails = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/train-tickets/${train_number}?from=${from}&to=${to}`
//         );

//         if (res.data.success) {
//           setTrain(res.data.train);
//           setTickets(res.data.dynamicPrices);
//         }
//       } catch (error) {
//         console.error("Error fetching ticket details:", error);
//       }
//     };

//     fetchTicketDetails();
//   }, [train_number, from, to]);

//   return (
//     <div className="ticket-container">
//       <div className="ticket-wrap">
//         {/* Train Info Card */}
//         <div className="train-card">
//           <div className="train-title">{train.train_name}</div>
//           <div className="train-number">Train No: {train.train_number}</div>

//           <div className="route-details">
//             <div className="route-item">
//               <span>From</span>
//               <strong>{from}</strong>
//             </div>

//             <div className="route-item">
//               <span>To</span>
//               <strong>{to}</strong>
//             </div>

//             <div className="route-item">
//               <span>Departure</span>
//               <strong>{train.start_time}</strong>
//             </div>

//             <div className="route-item">
//               <span>Arrival</span>
//               <strong>{train.end_time}</strong>
//             </div>
//           </div>
//         </div>

//         {/* Ticket prices table */}
//         <div className="ticket-table-card">
//           <div className="ticket-title">Available Ticket Categories</div>

//           <table className="ticket-table">
//             <thead>
//               <tr>
//                 <th>From</th>
//                 <th>To</th>
//                 <th>Category</th>
//                 <th>Distance</th>
//                 <th>Price (₹)</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {tickets.map((ticket, index) => (
//                 <tr key={index}>
//                   <td>{ticket.from}</td>
//                   <td>{ticket.to}</td>
//                   <td>{ticket.category}</td>
//                   <td>{ticket.distance_km} KM</td>
//                   <td>₹{ticket.price}</td>
//                   <td>
//                     <button
//                       className="btn-book"
//                       onClick={() => handleBooking(ticket)}
//                     >
//                       Book Now
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TicketPage;

import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const TicketPage = () => {
  const [train, setTrain] = React.useState({});
  const [tickets, setTickets] = React.useState([]);
  const { train_number } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { from, to } = location.state || {};
  const { user } = useAuth();

  const handleBooking = (ticket) => {
    if (!user) {
      alert("Please login to book tickets.");
      navigate("/login");
      return;
    } else {
      navigate(`/book-ticket/${train.train_number}`, {
        state: { train, ticket },
      });
    }
  };

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/trains/tickets/${train_number}?from=${from}&to=${to}`,
        );
        if (res.data.success) {
          setTrain(res.data.train);
          setTickets(res.data.dynamicPrices);
        }
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    };
    fetchTicketDetails();
  }, [train_number, from, to]);

  // Category color + icon mapping
  const categoryStyle = (cat = "") => {
    const c = cat.toLowerCase();
    if (c.includes("1a") || c.includes("first ac"))
      return {
        color: "#f59e0b",
        bg: "rgba(245,158,11,0.1)",
        border: "rgba(245,158,11,0.25)",
        icon: "👑",
      };
    if (c.includes("2a") || c.includes("second ac"))
      return {
        color: "#6366f1",
        bg: "rgba(99,102,241,0.1)",
        border: "rgba(99,102,241,0.25)",
        icon: "⭐",
      };
    if (c.includes("3a") || c.includes("third ac"))
      return {
        color: "#0ea5e9",
        bg: "rgba(14,165,233,0.1)",
        border: "rgba(14,165,233,0.25)",
        icon: "🔵",
      };
    if (c.includes("sl") || c.includes("sleeper"))
      return {
        color: "#10b981",
        bg: "rgba(16,185,129,0.1)",
        border: "rgba(16,185,129,0.25)",
        icon: "🌙",
      };
    if (c.includes("cc") || c.includes("chair"))
      return {
        color: "#f97316",
        bg: "rgba(249,115,22,0.1)",
        border: "rgba(249,115,22,0.25)",
        icon: "💺",
      };
    return {
      color: "#9a9186",
      bg: "rgba(154,145,134,0.1)",
      border: "rgba(154,145,134,0.25)",
      icon: "🎫",
    };
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .tp-root {
          min-height: 100vh;
          background: #f0ece4;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── DARK HEADER ── */
        .tp-header {
          background: #1a2332;
          position: relative;
          overflow: hidden;
          padding: 36px 32px 48px;
        }

        .tp-header::before {
          content: '';
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(
            -55deg, transparent, transparent 28px,
            rgba(255,255,255,0.02) 28px, rgba(255,255,255,0.02) 29px
          );
        }

        .tp-header::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #f97316, #fb923c, #fdba74);
        }

        .tp-header-inner {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .tp-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          padding: 7px 14px;
          color: rgba(255,255,255,0.6);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          margin-bottom: 24px;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .tp-back-btn:hover { background: rgba(255,255,255,0.12); color: #fff; }

        /* TRAIN IDENTITY */
        .tp-train-identity {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 28px;
        }

        .tp-train-icon-box {
          width: 52px; height: 52px;
          background: #f97316;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
        }

        .tp-train-num-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 4px;
        }

        .tp-train-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(28px, 4vw, 44px);
          color: #fff;
          letter-spacing: 0.04em;
          line-height: 1;
        }

        /* ROUTE STRIP */
        .tp-route-strip {
          display: flex;
          align-items: center;
          gap: 0;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          overflow: hidden;
        }

        .tp-route-cell {
          flex: 1;
          padding: 14px 20px;
        }

        .tp-route-cell + .tp-route-cell {
          border-left: 1px solid rgba(255,255,255,0.07);
        }

        .tp-route-cell-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 5px;
        }

        .tp-route-cell-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          color: #fff;
          letter-spacing: 0.04em;
          line-height: 1;
        }

        .tp-route-cell-sub {
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          font-weight: 300;
          margin-top: 2px;
        }

        .tp-route-arrow-cell {
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
        }

        .tp-route-arrow-line {
          width: 40px; height: 2px;
          background: linear-gradient(90deg, rgba(249,115,22,0.5), #f97316);
          border-radius: 2px;
          position: relative;
        }

        .tp-route-arrow-line::after {
          content: '▶';
          position: absolute;
          right: -8px; top: 50%;
          transform: translateY(-50%);
          color: #f97316;
          font-size: 9px;
        }

        /* ── BODY ── */
        .tp-body {
          max-width: 1000px;
          margin: 0 auto;
          padding: 36px 32px 60px;
        }

        .tp-section-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #9a9186;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .tp-section-label::after {
          content: '';
          flex: 1; height: 1px;
          background: #e0d9d0;
        }

        /* ── TICKET CARD ── */
        .tp-ticket-card {
          background: #fff;
          flex-wrap: wrap;
          border-radius: 16px;
          border: 1.5px solid #e8e2da;
          margin-bottom: 14px;
          display: flex;
          align-items: stretch;
          overflow: hidden;
          transition: box-shadow 0.2s, transform 0.2s;
          position: relative;
        }

        @media (max-width: 768px) {
  .tp-ticket-action {
    width: 100%;
    flex: 0 0 100%;
  }
}


.tp-ticket-body {
  flex: 1;
  min-width: 0;
}


        .tp-ticket-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }

        /* left color bar */
        .tp-ticket-bar {
          width: 5px;
          flex-shrink: 0;
        }

        /* perforated edge */
        .tp-ticket-perf {
          width: 24px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          padding: 8px 0;
          background: #faf8f5;
          border-right: 1.5px dashed #e0d9d0;
        }

        .tp-perf-dot {
          width: 8px; height: 8px;
          background: #f0ece4;
          border-radius: 50%;
          border: 1px solid #e0d9d0;
        }

        /* ticket body */
        .tp-ticket-body {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr auto;
          align-items: center;
          padding: 20px 24px;
          gap: 0;
        }

        .tp-tc-cell { padding: 0 16px; }
        .tp-tc-cell:first-child { padding-left: 0; }

        .tp-tc-divider {
          width: 1px;
          align-self: stretch;
          background: #f0ece4;
          margin: 4px 0;
        }

        .tp-tc-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #b8b0a5;
          margin-bottom: 5px;
        }

        .tp-tc-value {
          font-size: 15px;
          font-weight: 600;
          color: #1a2332;
          line-height: 1.2;
        }

        .tp-tc-sub {
          font-size: 11px;
          color: #9a9186;
          font-weight: 300;
          margin-top: 2px;
        }

        /* category badge */
        .tp-cat-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border-radius: 8px;
          padding: 5px 10px;
          border: 1.5px solid;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        /* price */
        .tp-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          letter-spacing: 0.04em;
          line-height: 1;
          color: #1a2332;
        }

        .tp-price-sub {
          font-size: 10px;
          color: #9a9186;
          font-weight: 400;
          margin-top: 3px;
          letter-spacing: 0.05em;
        }

        /* action */
        .tp-ticket-action {
          padding: 20px 24px;
          border-left: 1.5px dashed #e0d9d0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-width: 140px;
          background: #faf8f5;
        }

        .tp-book-btn {
          width: 100%;
          background: #1a2332;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 11px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, transform 0.15s;
          position: relative;
          overflow: hidden;
        }

        .tp-book-btn:hover { background: #243044; transform: translateY(-1px); }
        .tp-book-btn:active { transform: translateY(0); }

        .tp-book-btn-dot {
          width: 20px; height: 20px;
          background: #f97316;
          border-radius: 5px;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
          flex-shrink: 0;
        }

        .tp-avail-tag {
          font-size: 10px;
          font-weight: 600;
          color: #4ade80;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .tp-avail-dot {
          width: 5px; height: 5px;
          background: #4ade80;
          border-radius: 50%;
          box-shadow: 0 0 0 2px rgba(74,222,128,0.2);
        }

        /* empty / loading */
        .tp-center-msg {
          text-align: center;
          padding: 80px 0;
        }

        .tp-center-icon {
          font-size: 52px;
          display: block;
          margin-bottom: 16px;
          opacity: 0.4;
        }

        .tp-center-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          color: #1a2332;
          letter-spacing: 0.04em;
        }

        .tp-center-sub {
          font-size: 13px;
          color: #9a9186;
          font-weight: 300;
          margin-top: 6px;
        }

        @media (max-width: 768px) {
          .tp-ticket-body {
            grid-template-columns: 1fr 1fr;
            gap: 14px;
          }
          .tp-tc-divider { display: none; }
          .tp-ticket-action {
            border-left: none;
            border-top: 1.5px dashed #e0d9d0;
            flex-direction: row;
          }
          .tp-route-strip { flex-direction: column; }
          .tp-route-arrow-cell { padding: 8px 0; transform: rotate(90deg); }
          .tp-body { padding: 24px 16px 48px; }
          .tp-header { padding: 24px 20px 36px; }
        }
      `}</style>

      <div className="tp-root">
        {/* ── DARK HEADER ── */}
        <div className="tp-header">
          <div className="tp-header-inner">
            <button className="tp-back-btn" onClick={() => navigate(-1)}>
              ← Back to Results
            </button>

            {/* Train Name + Number */}
            <div className="tp-train-identity">
              {/* <div className="tp-train-icon-box">🚆</div> */}
              <div>
                <div className="tp-train-num-tag">
                  Train No. {train.train_number}
                </div>
                <div className="tp-train-title">
                  {train.train_name || "Loading..."}
                </div>
              </div>
            </div>

            {/* Route Strip */}
            <div className="tp-route-strip">
              <div className="tp-route-cell">
                <div className="tp-route-cell-label">From</div>
                <div className="tp-route-cell-value">{from}</div>
                <div className="tp-route-cell-sub">
                  Departure · {train.start_time || "—"}
                </div>
              </div>

              <div className="tp-route-arrow-cell">
                <div className="tp-route-arrow-line" />
              </div>

              <div className="tp-route-cell">
                <div className="tp-route-cell-label">To</div>
                <div className="tp-route-cell-value">{to}</div>
                <div className="tp-route-cell-sub">
                  Arrival · {train.end_time || "—"}
                </div>
              </div>

              <div
                className="tp-route-cell"
                style={{
                  borderLeft: "1px solid rgba(255,255,255,0.07)",
                  flex: "0 0 auto",
                  minWidth: 120,
                }}
              >
                <div className="tp-route-cell-label">Status</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 4,
                  }}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      background: "#4ade80",
                      borderRadius: "50%",
                      boxShadow: "0 0 0 3px rgba(74,222,128,0.2)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 18,
                      color: "#4ade80",
                      letterSpacing: "0.04em",
                    }}
                  >
                    On Time
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="tp-body">
          <div className="tp-section-label">
            Select Ticket Category — {tickets.length} options available
          </div>

          {tickets.length === 0 ? (
            <div className="tp-center-msg">
              <span className="tp-center-icon">🎫</span>
              <div className="tp-center-title">No Tickets Available</div>
              <div className="tp-center-sub">
                No ticket categories found for this route
              </div>
            </div>
          ) : (
            tickets.map((ticket, index) => {
              const style = categoryStyle(ticket.category);
              return (
                <div className="tp-ticket-card" key={index}>
                  {/* Left color bar */}
                  <div
                    className="tp-ticket-bar"
                    style={{ background: style.color }}
                  />

                  {/* Perforated edge */}
                  <div className="tp-ticket-perf">
                    {[...Array(6)].map((_, i) => (
                      <div className="tp-perf-dot" key={i} />
                    ))}
                  </div>

                  {/* Main content */}
                  <div className="tp-ticket-body">
                    {/* CATEGORY */}
                    <div className="tp-tc-cell">
                      <div className="tp-tc-label">Class</div>
                      <div
                        className="tp-cat-badge"
                        style={{
                          color: style.color,
                          background: style.bg,
                          borderColor: style.border,
                        }}
                      >
                        <span>{style.icon}</span>
                        {ticket.category}
                      </div>
                    </div>

                    <div className="tp-tc-divider" />

                    {/* ROUTE */}
                    <div className="tp-tc-cell">
                      <div className="tp-tc-label">Route</div>
                      <div className="tp-tc-value">
                        {ticket.from} → {ticket.to}
                      </div>
                      <div className="tp-tc-sub">{ticket.distance_km} KM</div>
                    </div>

                    <div className="tp-tc-divider" />

                    {/* DISTANCE */}
                    <div className="tp-tc-cell">
                      <div className="tp-tc-label">Distance</div>
                      <div className="tp-tc-value">
                        {ticket.distance_km}{" "}
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 400,
                            color: "#9a9186",
                          }}
                        >
                          KM
                        </span>
                      </div>
                      <div className="tp-tc-sub">Total journey</div>
                    </div>

                    <div className="tp-tc-divider" />

                    {/* PRICE */}
                    <div className="tp-tc-cell">
                      <div className="tp-tc-label">Fare</div>
                      <div className="tp-price" style={{ color: style.color }}>
                        ₹{ticket.price}
                      </div>
                      <div className="tp-price-sub">Per passenger</div>
                    </div>
                  </div>

                  {/* ACTION */}
                  <div className="tp-ticket-action">
                    <div className="tp-avail-tag">
                      <div className="tp-avail-dot" />
                      Available
                    </div>
                    <button
                      className="tp-book-btn"
                      onClick={() => handleBooking(ticket)}
                    >
                      <div className="tp-book-btn-dot">→</div>
                      Book Now
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default TicketPage;
