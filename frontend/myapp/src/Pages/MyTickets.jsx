// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { downloadTicket } from "../utils/downloadTicket";

// const MyTickets = () => {
//   const [tickets, setTickets] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/my-tickets", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         setTickets(res.data.tickets);
//       })
//       .catch(() => {
//         alert("Please login first");
//       });
//   }, []);

//   return (
//     <div style={{ padding: 30 }}>
//       <h2>My Tickets</h2>

//       {tickets.length === 0 && <p>No tickets found.</p>}

//       {tickets.map((ticket) => (
//         <div
//           key={ticket.id}
//           style={{
//             border: "1px solid #ddd",
//             padding: 15,
//             marginBottom: 10,
//             borderRadius: 6,
//           }}
//         >
//           <strong>{ticket.train_name}</strong>
//           <p>PNR: {ticket.PNR}</p>
//           <p>
//             {ticket.from_station} → {ticket.to_station}
//           </p>

//           <p>₹{ticket.price}</p>
//           <button
//             onClick={() => downloadTicket(ticket)}
//             style={{
//               padding: "8px 12px",
//               backgroundColor: "#007bff",
//               color: "#fff",
//               border: "none",
//               borderRadius: 4,
//               cursor: "pointer",
//             }}
//           >
//             Download Ticket
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyTickets;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { downloadTicket } from "../utils/downloadTicket";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .mt-page {
    min-height: 100vh;
    background: #f0ece4;
    font-family: 'DM Sans', sans-serif;
  }

  /* ══════════════════════════════
     HEADER
  ══════════════════════════════ */
  .mt-header {
    background: #1a2332;
    position: relative;
    overflow: hidden;
    padding: 20px 32px 28px;
  }

  .mt-header::before {
    content: '';
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      -55deg, transparent, transparent 28px,
      rgba(255,255,255,0.015) 28px, rgba(255,255,255,0.015) 29px
    );
    pointer-events: none;
  }

  .mt-header::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #f97316, #fdba74);
  }

  .mt-header-inner {
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .mt-eyebrow {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 8px;
  }

  .mt-header-title-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .mt-icon-box {
    width: 40px; height: 40px;
    background: #f97316;
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }

  .mt-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(26px, 4vw, 38px);
    color: #fff;
    letter-spacing: 0.06em;
    line-height: 1;
  }

  .mt-title-sub {
    font-size: 11px;
    color: rgba(255,255,255,0.3);
    font-weight: 300;
    margin-top: 3px;
  }

  /* ══════════════════════════════
     BODY
  ══════════════════════════════ */
  .mt-body {
    max-width: 1100px;
    margin: 0 auto;
    padding: 28px 32px 60px;
  }

  .mt-section-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #9a9186;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .mt-section-label::after {
    content: ''; flex: 1; height: 1px; background: #e0d9d0;
  }

  /* ══════════════════════════════
     EMPTY STATE
  ══════════════════════════════ */
  .mt-empty {
    background: #fff;
    border: 1.5px solid #e8e2da;
    border-radius: 14px;
    padding: 60px 24px;
    text-align: center;
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    position: relative;
    overflow: hidden;
  }

  .mt-empty::before {
    content: '';
    position: absolute;
    left: 0; top: 0;
    width: 4px; height: 100%;
    background: linear-gradient(180deg, #f97316, #fdba74);
  }

  .mt-empty-icon { font-size: 40px; margin-bottom: 12px; opacity: 0.4; }

  .mt-empty p {
    font-size: 14px;
    color: #9a9186;
    font-weight: 300;
  }

  /* ══════════════════════════════
     TICKET CARDS
  ══════════════════════════════ */
  .mt-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .mt-card {
    background: #fff;
    border-radius: 14px;
    border: 1.5px solid #e8e2da;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    position: relative;
    transition: box-shadow 0.2s, transform 0.18s;
    animation: mtCardIn 0.4s ease both;
  }

  @keyframes mtCardIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .mt-card:hover {
    box-shadow: 0 8px 28px rgba(0,0,0,0.1);
    transform: translateY(-2px);
  }

  .mt-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0;
    width: 4px; height: 100%;
    background: linear-gradient(180deg, #f97316, #fdba74);
  }

  /* ── Card Header ── */
  .mt-card-header {
    background: #1a2332;
    padding: 12px 20px 12px 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }

  .mt-card-header::before {
    content: '';
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      -55deg, transparent, transparent 22px,
      rgba(255,255,255,0.012) 22px, rgba(255,255,255,0.012) 23px
    );
    pointer-events: none;
  }

  .mt-card-header-left {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

  .mt-card-train-icon {
    width: 30px; height: 30px;
    background: #f97316;
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
  }

  .mt-card-train-label {
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 2px;
  }

  .mt-card-train-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    color: #fff;
    letter-spacing: 0.05em;
    line-height: 1;
  }

  .mt-price-tag {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 30px;
    color: #f97316;
    letter-spacing: 0.04em;
    line-height: 1;
    position: relative;
    z-index: 1;
  }

  /* ── Card Body ── */
  .mt-card-body {
    padding: 16px 20px 16px 26px;
  }

  .mt-route-strip {
    display: flex;
    align-items: center;
    background: #faf8f5;
    border: 1.5px solid #e0d9d0;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 14px;
  }

  .mt-route-cell {
    flex: 1;
    padding: 10px 16px;
  }

  .mt-route-cell + .mt-route-cell {
    border-left: 1px solid #e0d9d0;
  }

  .mt-route-cell-label {
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #9a9186;
    margin-bottom: 4px;
  }

  .mt-route-cell-value {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 17px;
    color: #1a2332;
    letter-spacing: 0.04em;
    line-height: 1;
  }

  .mt-route-arrow {
    padding: 0 10px;
    color: #f97316;
    font-size: 11px;
    opacity: 0.7;
    flex-shrink: 0;
  }

  .mt-card-footer {
    display: flex;
    align-items: stretch;
    gap: 14px;
  }

  .mt-info-rows {
    flex: 1;
    border: 1.5px solid #e0d9d0;
    border-radius: 10px;
    overflow: hidden;
  }

  .mt-info-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 13px;
    background: #faf8f5;
  }
  .mt-info-row + .mt-info-row { border-top: 1px solid #e0d9d0; }

  .mt-info-key {
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: #9a9186;
  }

  .mt-info-val {
    font-size: 13px;
    font-weight: 600;
    color: #1a2332;
  }

  /* ── Download Button ── */
  .mt-download-btn {
    background: #1a2332;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 12px 18px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.2s, transform 0.15s;
    min-width: 90px;
  }

  .mt-download-btn .btn-dot {
    width: 26px; height: 26px;
    background: #f97316;
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
  }

  .mt-download-btn:hover { background: #243044; transform: translateY(-1px); }
  .mt-download-btn:active { transform: translateY(0); }

  /* ── Count Footer ── */
  .mt-count-row {
    margin-top: 24px;
    display: flex;
    justify-content: flex-end;
  }

  .mt-count-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #1a2332;
    color: rgba(255,255,255,0.45);
    border-radius: 7px;
    padding: 5px 14px;
    font-size: 11px;
    font-weight: 500;
  }

  .mt-count-badge span {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    color: #f97316;
    letter-spacing: 0.04em;
  }

  /* ══════════════════════════════
     RESPONSIVE
  ══════════════════════════════ */
  @media (max-width: 600px) {
    .mt-header { padding: 16px 16px 24px; }
    .mt-body { padding: 20px 14px 48px; }
    .mt-card-footer { flex-direction: column; }
    .mt-download-btn { flex-direction: row; justify-content: center; }
    .mt-route-strip { flex-wrap: wrap; }
  }
`;

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    axios
      .get("http://localhost:5000/api/my-tickets", { withCredentials: true })
      .then((res) => setTickets(res.data.tickets))
      .catch(() => alert("Failed to load tickets"));
  }, [user, navigate]);

  return (
    <>
      <style>{styles}</style>
      <div className="mt-page">
        {/* ── HEADER ── */}
        <div className="mt-header">
          <div className="mt-header-inner">
            <div className="mt-eyebrow">Rail Booking System</div>
            <div className="mt-header-title-row">
              {/* <div className="mt-icon-box">🎫</div> */}
              <div>
                <div className="mt-title">My Tickets</div>
                <div className="mt-title-sub">All your booked journeys</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="mt-body">
          <div className="mt-section-label">Booked Journeys</div>

          {tickets.length === 0 ? (
            <div className="mt-empty">
              {/* <div className="mt-empty-icon">🎫</div> */}
              <p>No tickets found. Book your first journey!</p>
            </div>
          ) : (
            <>
              <div className="mt-list">
                {tickets.map((ticket, i) => (
                  <div
                    className="mt-card"
                    key={ticket.id}
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    {/* Header: train name + price */}
                    <div className="mt-card-header">
                      <div className="mt-card-header-left">
                        {/* <div className="mt-card-train-icon">🚆</div> */}
                        <div>
                          <div className="mt-card-train-label">Train Name</div>
                          <div className="mt-card-train-name">
                            {ticket.train_name}
                          </div>
                        </div>
                      </div>
                      <div className="mt-price-tag">₹{ticket.price}</div>
                    </div>

                    {/* Body */}
                    <div className="mt-card-body">
                      {/* Route */}
                      <div className="mt-route-strip">
                        <div className="mt-route-cell">
                          <div className="mt-route-cell-label">From</div>
                          <div className="mt-route-cell-value">
                            {ticket.from_station}
                          </div>
                        </div>
                        <div className="mt-route-arrow">▶</div>
                        <div className="mt-route-cell">
                          <div className="mt-route-cell-label">To</div>
                          <div className="mt-route-cell-value">
                            {ticket.to_station}
                          </div>
                        </div>
                      </div>

                      {/* Info + Download */}
                      <div className="mt-card-footer">
                        <div className="mt-info-rows">
                          <div className="mt-info-row">
                            <span className="mt-info-key">PNR Number</span>
                            <span className="mt-info-val">{ticket.PNR}</span>
                          </div>
                          <div className="mt-info-row">
                            <span className="mt-info-key">Fare</span>
                            <span className="mt-info-val">₹{ticket.price}</span>
                          </div>
                        </div>

                        <button
                          className="mt-download-btn"
                          onClick={() => downloadTicket(ticket)}
                        >
                          <div className="btn-dot">↓</div>
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-count-row">
                <div className="mt-count-badge">
                  Total &nbsp;<span>{tickets.length}</span>&nbsp; Ticket
                  {tickets.length !== 1 ? "s" : ""}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MyTickets;
