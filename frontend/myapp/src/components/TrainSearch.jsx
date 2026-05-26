// import React from "react";
// import axios from "axios";
// import "./TrainSearch.css";
// import { useNavigate } from "react-router-dom";

// const TrainSearch = () => {
//   const navigate = useNavigate();
//   const [fromInput, setFromInput] = React.useState("");
//   const [toInput, setToInput] = React.useState("");
//   const [date, setDate] = React.useState("");

//   const [fromSugg, setFromSugg] = React.useState([]);
//   const [toSugg, setToSugg] = React.useState([]);

//   const fetchStations = async (query, type) => {
//     if (!query) {
//       type === "from" ? setFromSugg([]) : setToSugg([]);
//       return;
//     }

//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/stations?q=${query}`
//       );

//       if (type === "from") setFromSugg(res.data);
//       else setToSugg(res.data);
//     } catch (err) {
//       console.log(err);
//       type === "from" ? setFromSugg([]) : setToSugg([]);
//     }
//   };

//   const handleSearch = () => {
//     if (!fromInput || !toInput) {
//       alert("Please enter both From and To stations.");
//       return;
//     }

//     navigate("/results", {
//       state: { from: fromInput, to: toInput, date: date },
//     });
//   };

//   return (
//     <div className="train-search-container">
//       <h2>Search Trains</h2>

//       <h3>
//         Quickly find trains between your desired stations. Enter departure and
//         arrival cities, choose your date, and get instant results.
//       </h3>

//       <div className="search-form">
//         <form>
//           {/* FROM INPUT */}
//           <div className="fromdata">
//             <label htmlFor="from">From</label>
//             <input
//               type="text"
//               id="from"
//               value={fromInput}
//               onChange={(e) => {
//                 setFromInput(e.target.value);
//                 fetchStations(e.target.value, "from");
//               }}
//               placeholder="Enter departure station"
//             />
//           </div>

//           {/* FROM SUGGESTIONS */}
//           {fromSugg.length > 0 && (
//             <ul className="suggestions-dropdown">
//               {fromSugg.map((station) => (
//                 <li
//                   key={station.station_id}
//                   onClick={() => {
//                     setFromInput(station.station_name);
//                     setFromSugg([]);
//                   }}
//                 >
//                   {station.station_name} ({station.station_code})
//                 </li>
//               ))}
//             </ul>
//           )}

//           {/* TO INPUT */}
//           <div className="todate">
//             <label htmlFor="to">To</label>
//             <input
//               type="text"
//               id="to"
//               value={toInput}
//               onChange={(e) => {
//                 setToInput(e.target.value);
//                 fetchStations(e.target.value, "to");
//               }}
//               placeholder="Enter arrival station"
//             />
//           </div>

//           {/* TO SUGGESTIONS */}
//           {toSugg.length > 0 && (
//             <ul className="suggestions-dropdown">
//               {toSugg.map((station) => (
//                 <li
//                   key={station.station_id}
//                   onClick={() => {
//                     setToInput(station.station_name);
//                     setToSugg([]);
//                   }}
//                 >
//                   {station.station_name} ({station.station_code})
//                 </li>
//               ))}
//             </ul>
//           )}

//           {/* DATE PICKER */}
//           <div className="searchdate">
//             <label>Select Date</label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//           </div>

//           {/* BUTTON */}
//           <div className="searchbtn">
//             <button type="button" onClick={handleSearch}>
//               Search Trains
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TrainSearch;

import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TrainSearch = () => {
  const navigate = useNavigate();
  const [fromInput, setFromInput] = React.useState("");
  const [toInput, setToInput] = React.useState("");
  const [date, setDate] = React.useState("");
  const [fromSugg, setFromSugg] = React.useState([]);
  const [toSugg, setToSugg] = React.useState([]);

  const fetchStations = async (query, type) => {
    if (!query) {
      type === "from" ? setFromSugg([]) : setToSugg([]);

      return;
    }
    try {
      const res = await axios.get(
        `https://railway-management-0pvq.onrender.com/api/stations?q=${query}`,
      );
      type === "from" ? setFromSugg(res.data) : setToSugg(res.data);
    } catch (err) {
      console.log(err);
      type === "from" ? setFromSugg([]) : setToSugg([]);
    }
  };

  const handleSearch = () => {
    if (!fromInput || !toInput) {
      alert("Please enter both From and To stations.");
      return;
    }
    navigate("/results", { state: { from: fromInput, to: toInput, date } });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        .ts-hero {
          min-height: calc(100vh - 67px);
          background: #1a2332;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 24px;
        }

        /* diagonal stripe bg */
        .ts-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            -55deg,
            transparent, transparent 40px,
            rgba(255,255,255,0.018) 40px,
            rgba(255,255,255,0.018) 41px
          );
        }

        /* orange glow bottom */
        .ts-hero::after {
          content: '';
          position: absolute;
          bottom: -80px; left: 50%;
          transform: translateX(-50%);
          width: 600px; height: 200px;
          background: radial-gradient(ellipse, rgba(249,115,22,0.18), transparent 70%);
          pointer-events: none;
        }

        .ts-content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 820px;
          text-align: center;
        }

        .ts-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(249,115,22,0.12);
          border: 1px solid rgba(249,115,22,0.25);
          border-radius: 100px;
          padding: 5px 16px 5px 10px;
          margin-bottom: 28px;
        }

        .ts-badge-dot {
          width: 6px; height: 6px;
          background: #f97316;
          border-radius: 50%;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.25);
        }

        .ts-badge-text {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #f97316;
        }

        .ts-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 8vw, 88px);
          line-height: 0.92;
          color: #fff;
          letter-spacing: 0.03em;
          margin-bottom: 8px;
        }

        .ts-title span { color: #f97316; }

        .ts-subtitle {
          color: rgba(255,255,255,0.4);
          font-size: 15px;
          font-weight: 300;
          line-height: 1.6;
          max-width: 480px;
          margin: 16px auto 48px;
        }

        /* SEARCH CARD */
        .ts-card {
          background: #fff;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.4);
          text-align: left;
        }

        .ts-card-top {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
        }

        .ts-card-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #9a9186;
        }

        .ts-card-line {
          flex: 1;
          height: 1px;
          background: #e0d9d0;
        }

        /* FIELDS ROW */
        .ts-fields {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 0;
          align-items: end;
          margin-bottom: 20px;
          background: #f7f4f0;
          border-radius: 14px;
          border: 1.5px solid #e0d9d0;
          overflow: visible;
        }

        .ts-field {
          padding: 14px 18px;
          position: relative;
        }

        .ts-field-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #9a9186;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ts-field-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #1a2332;
        }

        .ts-field-input::placeholder {
          color: #c4bcb3;
          font-weight: 400;
          font-size: 14px;
        }

        .ts-swap {
          width: 40px; height: 40px;
          background: #fff;
          border: 2px solid #e0d9d0;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          cursor: pointer;
          color: #9a9186;
          flex-shrink: 0;
          align-self: center;
          transition: border-color 0.2s, color 0.2s;
          z-index: 2;
          margin: 0 -4px;
        }

        .ts-swap:hover { border-color: #f97316; color: #f97316; }

        .ts-divider-v {
          width: 1px;
          background: #e0d9d0;
          align-self: stretch;
          margin: 12px 0;
        }

        /* SUGGESTIONS */
        .ts-sugg {
          position: absolute;
          top: calc(100% + 4px);
          left: 0; right: 0;
          background: #fff;
          border: 1.5px solid #e0d9d0;
          border-radius: 12px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.12);
          z-index: 50;
          overflow: hidden;
          max-height: 220px;
          overflow-y: auto;
        }

        .ts-sugg-item {
          padding: 11px 16px;
          font-size: 13.5px;
          color: #1a2332;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: background 0.15s;
          border-bottom: 1px solid #f0ece4;
        }

        .ts-sugg-item:last-child { border-bottom: none; }
        .ts-sugg-item:hover { background: #fff8f3; }

        .ts-sugg-code {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #f97316;
          background: rgba(249,115,22,0.1);
          padding: 2px 7px;
          border-radius: 5px;
          margin-left: auto;
          flex-shrink: 0;
        }

        /* DATE + BUTTON ROW */
        .ts-bottom {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 14px;
          align-items: end;
        }

        .ts-date-wrap { }

        .ts-date-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #6b6358;
          margin-bottom: 7px;
          display: flex; align-items: center; gap: 6px;
        }

        .ts-date-input {
          width: 100%;
          background: #fff;
          border: 1.5px solid #e0d9d0;
          border-radius: 10px;
          padding: 12px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #1a2332;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .ts-date-input:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.1);
        }

        .ts-search-btn {
          background: #1a2332;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 13px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.05em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: background 0.2s, transform 0.15s;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ts-search-btn:hover { background: #243044; transform: translateY(-1px); }
        .ts-search-btn:active { transform: translateY(0); }

        .ts-search-btn-accent {
          width: 28px; height: 28px;
          background: #f97316;
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
        }

        /* STATS BAR */
        .ts-stats {
          display: flex;
          justify-content: center;
          gap: 48px;
          margin-top: 48px;
          position: relative;
          z-index: 1;
        }

        .ts-stat { text-align: center; }

        .ts-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          color: #fff;
          letter-spacing: 0.04em;
          line-height: 1;
        }

        .ts-stat-num span { color: #f97316; }

        .ts-stat-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-top: 4px;
        }

        .ts-stat-divider {
          width: 1px;
          background: rgba(255,255,255,0.08);
          align-self: stretch;
        }

        @media (max-width: 640px) {
          .ts-fields { grid-template-columns: 1fr; }
          .ts-swap { display: none; }
          .ts-bottom { grid-template-columns: 1fr; }
          .ts-search-btn { justify-content: center; }
          .ts-stats { gap: 24px; }
          .ts-stat-num { font-size: 24px; }
        }
      `}</style>

      <section className="ts-hero">
        <div className="ts-content">
          {/* BADGE */}
          <div className="ts-badge">
            <div className="ts-badge-dot" />
            <span className="ts-badge-text">Live Train Availability</span>
          </div>

          {/* HEADLINE */}
          <h1 className="ts-title">
            Search <span>Trains</span>
            <br />
            Across India
          </h1>
          <p className="ts-subtitle">
            Quickly find trains between your desired stations. Enter departure
            and arrival cities, choose your date.
          </p>

          {/* SEARCH CARD */}
          <div className="ts-card">
            <div className="ts-card-top">
              <span className="ts-card-label">Plan Your Journey</span>
              <div className="ts-card-line" />
              {/* <span style={{ fontSize: 18 }}>🚆</span> */}
            </div>

            {/* FROM — SWAP — TO */}
            <div className="ts-fields">
              {/* FROM */}
              <div className="ts-field" style={{ position: "relative" }}>
                <div className="ts-field-label">
                  <span></span> From
                </div>
                <input
                  type="text"
                  value={fromInput}
                  onChange={(e) => {
                    setFromInput(e.target.value);
                    fetchStations(e.target.value, "from");
                  }}
                  placeholder="Departure station"
                  className="ts-field-input"
                />
                {fromSugg.length > 0 && (
                  <div className="ts-sugg">
                    {fromSugg.map((s) => (
                      <div
                        key={s.station_id}
                        className="ts-sugg-item"
                        onClick={() => {
                          setFromInput(s.station_name);
                          setFromSugg([]);
                        }}
                      >
                        <span>{s.station_name}</span>
                        <span className="ts-sugg-code">{s.station_code}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SWAP BTN */}
              <button
                type="button"
                className="ts-swap"
                onClick={() => {
                  setFromInput(toInput);
                  setToInput(fromInput);
                }}
              >
                ⇄
              </button>

              {/* TO */}
              <div className="ts-field" style={{ position: "relative" }}>
                <div className="ts-field-label">
                  <span></span> To
                </div>
                <input
                  type="text"
                  value={toInput}
                  onChange={(e) => {
                    setToInput(e.target.value);
                    fetchStations(e.target.value, "to");
                  }}
                  placeholder="Arrival station"
                  className="ts-field-input"
                />
                {toSugg.length > 0 && (
                  <div className="ts-sugg">
                    {toSugg.map((s) => (
                      <div
                        key={s.station_id}
                        className="ts-sugg-item"
                        onClick={() => {
                          setToInput(s.station_name);
                          setToSugg([]);
                        }}
                      >
                        <span>{s.station_name}</span>
                        <span className="ts-sugg-code">{s.station_code}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* DATE + SEARCH */}
            <div className="ts-bottom">
              <div className="ts-date-wrap">
                <div className="ts-date-label">
                  <span></span> Journey Date
                </div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="ts-date-input"
                />
              </div>

              <button
                type="button"
                onClick={handleSearch}
                className="ts-search-btn"
              >
                <div className="ts-search-btn-accent">→</div>
                Search Trains
              </button>
            </div>
          </div>
        </div>

        {/* STATS BAR */}
        <div className="ts-stats">
          <div className="ts-stat">
            <div className="ts-stat-num">
              13<span>K+</span>
            </div>
            <div className="ts-stat-label">Daily Trains</div>
          </div>
          <div className="ts-stat-divider" />
          <div className="ts-stat">
            <div className="ts-stat-num">
              7<span>K+</span>
            </div>
            <div className="ts-stat-label">Stations</div>
          </div>
          <div className="ts-stat-divider" />
          <div className="ts-stat">
            <div className="ts-stat-num">
              2<span>M+</span>
            </div>
            <div className="ts-stat-label">Daily Passengers</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrainSearch;
