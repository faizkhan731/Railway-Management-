// import "./TrainResults.css";
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const TrainResults = () => {
//   const [trains, setTrains] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { from = "", to = "", date = "" } = location.state || {};

//   useEffect(() => {
//     if (!from || !to) {
//       navigate("/");
//       return;
//     }

//     const fetchTrains = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `http://localhost:5000/api/trains?from=${encodeURIComponent(
//             from,
//           )}&to=${encodeURIComponent(to)}&date=${date}`,
//         );

//         if (res.data.success) {
//           setTrains(res.data.trains);
//         } else {
//           setTrains([]);
//         }
//       } catch (err) {
//         console.error("Error fetching trains:", err);
//         setTrains([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrains();
//   }, [from, to, date, navigate]);

//   return (
//     <div className="train-results-container">
//       <div>
//         <h2>
//           Available Trains From <span style={{ color: "#2563eb" }}>{from}</span>{" "}
//           to <span style={{ color: "#2563eb" }}>{to}</span>
//         </h2>

//         {loading ? (
//           <p className="loading">Loading trains...</p>
//         ) : trains.length === 0 ? (
//           <p className="no-trains-message">No trains found for this route</p>
//         ) : (
//           <table className="train-results-table">
//             <thead>
//               <tr>
//                 <th>Train No</th>
//                 <th>Name</th>
//                 <th>From</th>
//                 <th>Departure</th>
//                 <th>To</th>
//                 <th>Arrival</th>
//                 <th>Days</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {trains.map((train, index) => (
//                 <tr key={index}>
//                   <td>{train.train_number}</td>
//                   <td>{train.train_name}</td>
//                   <td>{train.from}</td>
//                   <td>{train.departure_time}</td>
//                   <td>{train.to}</td>
//                   <td>{train.arrival_time}</td>
//                   <td>{train.running_days}</td>

//                   <td>
//                     <button
//                       className="view-ticket-btn"
//                       onClick={() =>
//                         navigate(`/ticket/${train.train_number}`, {
//                           state: { from, to },
//                         })
//                       }
//                     >
//                       View Ticket
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TrainResults;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TrainResults = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { from = "", to = "", date = "" } = location.state || {};

  useEffect(() => {
    if (!from || !to) {
      navigate("/");
      return;
    }

    const fetchTrains = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://railway-management-0pvq.onrender.com/api/trains?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}`,
        );
        setTrains(res.data.success ? res.data.trains : []);
      } catch (err) {
        console.error("Error fetching trains:", err);
        setTrains([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrains();
  }, [from, to, date, navigate]);

  const formatDate = (d) => {
    if (!d) return "Any Date";
    const dt = new Date(d);
    return dt.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Day abbreviations display
  const dayMap = {
    Mon: "M",
    Tue: "T",
    Wed: "W",
    Thu: "T",
    Fri: "F",
    Sat: "S",
    Sun: "S",
  };

  return (
    <>
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }

          .tr-root {
            min-height: 100vh;
            background: #f0ece4;
            font-family: 'DM Sans', sans-serif;
          }

          /* ── HERO HEADER ── */
          .tr-header {
            background: #1a2332;
            position: relative;
            overflow: hidden;
 padding: 28px 16px 40px;
           }

           @media (min-width: 768px) {
  .tr-header {
    padding: 40px 32px 52px;
  }
}

          .tr-header::before {
            content: '';
            position: absolute; inset: 0;
            background-image: repeating-linear-gradient(
              -55deg, transparent, transparent 28px,
              rgba(255,255,255,0.02) 28px, rgba(255,255,255,0.02) 29px
            );
          }

          .tr-header::after {
            content: '';
            position: absolute;
            bottom: 0; left: 0; right: 0;
            height: 4px;
            background: linear-gradient(90deg, #f97316, #fb923c, #fdba74);
          }

          .tr-header-inner {
            max-width: 1100px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          @media (max-width: 768px) {
  .tr-card-action {
    width: 100%;
    flex: 0 0 100%;
  }
}
  @media (max-width: 768px) {
  .tr-card-action {
    width: 100%;
    flex: 0 0 100%;
  }
}

          .tr-back-btn {
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
            letter-spacing: 0.05em;
            cursor: pointer;
            margin-bottom: 24px;
            transition: all 0.2s;
            font-family: 'DM Sans', sans-serif;
          }
          .tr-back-btn:hover { background: rgba(255,255,255,0.12); color: #fff; }

          .tr-route-row {
            display: flex;
            align-items: center;
            gap: 16px;
            flex-wrap: wrap;
          }

          .tr-route-city {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(36px, 5vw, 56px);
            color: #fff;
            letter-spacing: 0.04em;
            line-height: 1;
          }

          .tr-route-arrow {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 3px;
          }

          .tr-arrow-line {
            width: 60px; height: 2px;
            background: linear-gradient(90deg, #f97316, rgba(249,115,22,0.3));
            border-radius: 2px;
            position: relative;
          }

          .tr-arrow-line::after {
            content: '▶';
            position: absolute;
            right: -8px; top: 50%;
            transform: translateY(-50%);
            color: #f97316;
            font-size: 10px;
          }

          .tr-arrow-label {
            font-size: 9px;
            font-weight: 600;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.25);
          }

          .tr-meta-row {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-top: 14px;
            flex-wrap: wrap;
          }

          .tr-meta-pill {
            display: flex;
            align-items: center;
            gap: 6px;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 100px;
            padding: 5px 12px;
            font-size: 12px;
            color: rgba(255,255,255,0.5);
            font-weight: 400;
          }

          .tr-count-badge {
            background: #f97316;
            color: #fff;
            font-size: 11px;
            font-weight: 700;
            padding: 3px 10px;
            border-radius: 100px;
            letter-spacing: 0.04em;
          }

          /* ── CONTENT AREA ── */
          .tr-body {
            max-width: 1100px;
            margin: 0 auto;
 padding: 24px 16px 48px;
           }
 @media (min-width: 768px) {
  .tr-body {
    padding: 36px 32px 60px;
  }
}

          .tr-section-label {
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

          .tr-section-label::after {
            content: '';
            flex: 1;
            height: 1px;
            background: #e0d9d0;
          }

          /* ── TRAIN CARD ── */
          .tr-card {
            background: #fff;
            border-radius: 16px;
            border: 1.5px solid #e8e2da;
            margin-bottom: 16px;
            overflow: hidden;
            transition: box-shadow 0.2s, transform 0.2s;
          }

          .tr-card:hover {
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            transform: translateY(-2px);
          }

          .tr-card-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 18px 24px 14px;
            border-bottom: 1px solid #f0ece4;
            gap: 12px;
            flex-wrap: wrap;
          }

          .tr-train-id {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .tr-train-icon {
            width: 40px; height: 40px;
            background: #1a2332;
            border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            font-size: 18px;
            flex-shrink: 0;
          }

          .tr-train-number {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.12em;
            color: #f97316;
            text-transform: uppercase;
          }

          .tr-train-name {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 20px;
            color: #1a2332;
            letter-spacing: 0.04em;
            line-height: 1.1;
          }

          .tr-days-row {
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .tr-days-label {
            font-size: 10px;
            font-weight: 500;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #b8b0a5;
            margin-right: 4px;
          }

          .tr-day-chip {
            width: 26px; height: 26px;
            border-radius: 6px;
            background: #f7f4f0;
            border: 1px solid #e0d9d0;
            display: flex; align-items: center; justify-content: center;
            font-size: 10px;
            font-weight: 700;
            color: #c4bcb3;
          }

          /* ── JOURNEY TIMELINE ── */
          .tr-card-body {
            display: grid;
 display: grid;
  grid-template-columns: 1fr auto 1fr auto;
              align-items: center;
            padding: 20px 24px;
            gap: 0;
          }
            @media (max-width: 768px) {
  .tr-card-body {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
}

          .tr-station { }

          .tr-station-time {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 36px;
            color: #1a2332;
            letter-spacing: 0.04em;
            line-height: 1;
          }

          .tr-station-name {
            font-size: 12px;
            color: #9a9186;
            font-weight: 400;
            margin-top: 4px;
            max-width: 160px;
          }

          .tr-station-tag {
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #f97316;
            margin-bottom: 4px;
          }

          /* timeline middle */
          // .tr-timeline {
          //   display: flex;
          //   flex-direction: column;
          //   align-items: center;
          //   padding: 0 24px;
          //   gap: 4px;
          // }
          @media (max-width: 768px) {
  .tr-timeline {
    display: none;
  }
}

          .tr-tl-line {
            width: 80px; height: 2px;
            background: linear-gradient(90deg, #e0d9d0, #f97316, #e0d9d0);
            border-radius: 2px;
            position: relative;
          }

          .tr-tl-dot {
            width: 8px; height: 8px;
            background: #f97316;
            border-radius: 50%;
            border: 2px solid #fff;
            box-shadow: 0 0 0 2px #f97316;
          }

          .tr-tl-label {
            font-size: 9px;
            font-weight: 600;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #c4bcb3;
          }

          /* action column */
          .tr-card-action {
            padding: 20px 24px;
            border-left: 1px solid #f0ece4;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            min-width: 120px;
          }

          @media (max-width: 768px) {
  .tr-card-action {
    width: 100%;
    border-left: none;
    border-top: 1px solid #f0ece4;
    flex-direction: row;
    justify-content: space-between;
  }
}

          .tr-book-btn {
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
            position: relative;
            overflow: hidden;
            transition: background 0.2s, transform 0.15s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }

          .tr-book-btn:hover { background: #243044; transform: translateY(-1px); }

          .tr-book-btn-dot {
            width: 20px; height: 20px;
            background: #f97316;
            border-radius: 5px;
            display: flex; align-items: center; justify-content: center;
            font-size: 11px;
            flex-shrink: 0;
          }

          .tr-avail-tag {
            font-size: 10px;
            font-weight: 600;
            color: #4ade80;
            letter-spacing: 0.08em;
            display: flex;
            align-items: center;
            gap: 4px;
          }

          .tr-avail-dot {
            width: 5px; height: 5px;
            background: #4ade80;
            border-radius: 50%;
            box-shadow: 0 0 0 2px rgba(74,222,128,0.2);
          }

          /* ── LOADING ── */
          .tr-loading {
            text-align: center;
            padding: 80px 0;
          }

          .tr-loading-train {
            font-size: 48px;
            display: block;
            margin-bottom: 16px;
            animation: tr-chug 0.8s ease-in-out infinite alternate;
          }

          @keyframes tr-chug {
            from { transform: translateX(-6px); }
            to   { transform: translateX(6px); }
          }

          .tr-loading-text {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 24px;
            color: #1a2332;
            letter-spacing: 0.06em;
          }

          .tr-loading-sub {
            font-size: 13px;
            color: #9a9186;
            font-weight: 300;
            margin-top: 6px;
          }

          /* ── EMPTY STATE ── */
          .tr-empty {
            text-align: center;
            padding: 80px 0;
          }

          .tr-empty-icon {
            font-size: 56px;
            display: block;
            margin-bottom: 20px;
            opacity: 0.4;
          }

          .tr-empty-title {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 28px;
            color: #1a2332;
            letter-spacing: 0.04em;
          }

          .tr-empty-sub {
            font-size: 13px;
            color: #9a9186;
            font-weight: 300;
            margin-top: 8px;
          }

          .tr-empty-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-top: 24px;
            background: #1a2332;
            color: #fff;
            border: none;
            border-radius: 10px;
            padding: 11px 22px;
            font-family: 'DM Sans', sans-serif;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
          }

          .tr-empty-btn:hover { background: #243044; }

          @media (max-width: 700px) {
            .tr-card-body { grid-template-columns: 1fr 1fr; gap: 16px; }
            .tr-timeline { display: none; }
            .tr-card-action { border-left: none; border-top: 1px solid #f0ece4; flex-direction: row; }
            .tr-body { padding: 24px 16px 48px; }
            .tr-header { padding: 28px 20px 40px; }
          }
        `}</style>

      <div className="tr-root">
        {/* ── DARK HEADER ── */}
        <div className="tr-header">
          <div className="tr-header-inner">
            <button className="tr-back-btn" onClick={() => navigate("/")}>
              ← Back to Search
            </button>

            <div className="tr-route-row">
              <span className="tr-route-city">{from}</span>
              <div className="tr-route-arrow">
                <div className="tr-arrow-line" />
                <span className="tr-arrow-label">Direct</span>
              </div>
              <span className="tr-route-city">{to}</span>
            </div>

            <div className="tr-meta-row">
              <div className="tr-meta-pill"> {formatDate(date)}</div>
              {!loading && (
                <div className="tr-meta-pill">
                  <span className="tr-count-badge">{trains.length}</span>
                  {trains.length === 1 ? " Train Found" : " Trains Found"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="tr-body">
          {loading ? (
            <div className="tr-loading">
              <span className="tr-loading-train">🚆</span>
              <div className="tr-loading-text">Fetching Trains...</div>
              <div className="tr-loading-sub">
                Please wait while we search available trains
              </div>
            </div>
          ) : trains.length === 0 ? (
            <div className="tr-empty">
              <span className="tr-empty-icon">🛤️</span>
              <div className="tr-empty-title">No Trains Found</div>
              <div className="tr-empty-sub">
                No trains available for this route on the selected date
              </div>
              <button className="tr-empty-btn" onClick={() => navigate("/")}>
                ← Search Again
              </button>
            </div>
          ) : (
            <>
              <div className="tr-section-label">
                Available Trains — {from} to {to}
              </div>

              {trains.map(
                (train, index) => (
                  console.log("TRAIN OBJECT:", train),
                  (
                    <div className="tr-card" key={index}>
                      {/* CARD TOP — Train name + running days */}
                      <div className="tr-card-top">
                        <div className="tr-train-id">
                          {/* <div className="tr-train-icon">🚆</div> */}
                          <div>
                            <div className="tr-train-number">
                              #{train.train_number}
                            </div>
                            <div className="tr-train-name">
                              {train.train_name}
                            </div>
                          </div>
                        </div>

                        <div className="tr-days-row">
                          <span className="tr-days-label">Runs:</span>
                          <span
                            style={{
                              fontSize: 12,
                              color: "#6b6358",
                              fontWeight: 400,
                            }}
                          >
                            {train.running_days}
                          </span>
                        </div>
                      </div>

                      {/* CARD BODY — Journey timeline + Action */}
                      {/* <div style={{ display: "flex", alignItems: "stretch" }}> */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "stretch",
                          flexWrap: "wrap",
                        }}
                      >
                        <div className="tr-card-body" style={{ flex: 1 }}>
                          {/* FROM STATION */}
                          <div className="tr-station">
                            <div className="tr-station-tag">Departure</div>
                            <div className="tr-station-time">
                              {train.departure_time}
                            </div>
                            <div className="tr-station-name">{train.from}</div>
                          </div>

                          {/* TIMELINE */}
                          <div className="tr-timeline">
                            <div className="tr-tl-dot" />
                            <div className="tr-tl-line" />
                            <div className="tr-tl-label">Direct</div>
                            <div
                              className="tr-tl-line"
                              style={{ transform: "scaleX(-1)" }}
                            />
                            <div className="tr-tl-dot" />
                          </div>

                          {/* TO STATION */}
                          <div className="tr-station">
                            <div className="tr-station-tag">Arrival</div>
                            <div className="tr-station-time">
                              {train.arrival_time}
                            </div>
                            <div className="tr-station-name">{train.to}</div>
                          </div>

                          {/* spacer for grid */}
                          <div />
                        </div>

                        {/* ACTION */}
                        <div className="tr-card-action">
                          <div className="tr-avail-tag">
                            <div className="tr-avail-dot" />
                            Available
                          </div>
                          <button
                            className="tr-book-btn"
                            onClick={() =>
                              navigate(`/ticket/${train.train_number}`, {
                                state: { from, to },
                              })
                            }
                          >
                            <div className="tr-book-btn-dot">→</div>
                            View Ticket
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                ),
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TrainResults;
