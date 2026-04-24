import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .tc-root *, .tc-root *::before, .tc-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .tc-root {
    min-height: 100vh;
    background: #f0ece4;
    font-family: 'DM Sans', sans-serif;
    color: #1a2332;
  }

  /* ══ HEADER ══ */
  .tc-header {
    background: #1a2332;
    position: relative; overflow: hidden;
    padding: 40px 32px 52px;
  }
  .tc-header::before {
    content: '';
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      -55deg, transparent, transparent 28px,
      rgba(255,255,255,0.02) 28px, rgba(255,255,255,0.02) 29px
    );
  }
  .tc-header::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, #f97316, #fb923c, #fdba74);
  }
  .tc-header-inner {
    max-width: 860px; margin: 0 auto;
    position: relative; z-index: 1;
    display: flex; align-items: center; gap: 24px;
  }

  /* Success icon */
  .tc-success-icon {
    width: 68px; height: 68px; flex-shrink: 0;
    background: #f97316;
    border-radius: 18px;
    display: flex; align-items: center; justify-content: center;
    font-size: 30px;
    box-shadow: 0 8px 24px rgba(249,115,22,0.4);
    animation: tc-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  }
  @keyframes tc-pop {
    from { transform: scale(0.5); opacity: 0; }
    to   { transform: scale(1);   opacity: 1; }
  }

  .tc-header-text {}
  .tc-header-tag {
    font-size: 10px; font-weight: 700; letter-spacing: 0.18em;
    text-transform: uppercase; color: #f97316; margin-bottom: 6px;
  }
  .tc-header-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(28px, 4vw, 46px);
    color: #fff; letter-spacing: 0.04em; line-height: 1;
  }
  .tc-header-sub {
    font-size: 13px; color: rgba(255,255,255,0.4); font-weight: 300; margin-top: 4px;
  }

  /* ══ BODY ══ */
  .tc-body {
    max-width: 860px; margin: 0 auto;
    padding: 36px 32px 64px;
  }

  /* Section label */
  .tc-section-label {
    font-size: 10px; font-weight: 600; letter-spacing: 0.16em;
    text-transform: uppercase; color: #9a9186;
    margin-bottom: 16px; margin-top: 28px;
    display: flex; align-items: center; gap: 12px;
  }
  .tc-section-label::after { content: ''; flex: 1; height: 1px; background: #e0d9d0; }
  .tc-section-label:first-child { margin-top: 0; }

  /* ══ BIG TICKET CARD ══ */
  .tc-ticket {
    background: #fff;
    border: 1.5px solid #e8e2da;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 32px rgba(0,0,0,0.08);
    margin-bottom: 20px;
  }

  /* Ticket top bar */
  .tc-ticket-top {
    background: #1a2332;
    padding: 20px 28px;
    display: flex; align-items: center; justify-content: space-between;
    position: relative; overflow: hidden;
  }
  .tc-ticket-top::before {
    content: '';
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      -55deg, transparent, transparent 28px,
      rgba(255,255,255,0.02) 28px, rgba(255,255,255,0.02) 29px
    );
  }
  .tc-ticket-top::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #f97316, #fb923c, #fdba74);
  }
  .tc-ticket-top-left { position: relative; z-index: 1; }
  .tc-ticket-top-right { position: relative; z-index: 1; text-align: right; }

  .tc-train-name-tag {
    font-size: 10px; font-weight: 700; letter-spacing: 0.16em;
    text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 3px;
  }
  .tc-train-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px; color: #fff; letter-spacing: 0.04em; line-height: 1;
  }

  .tc-status-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(74,222,128,0.12);
    border: 1.5px solid rgba(74,222,128,0.3);
    border-radius: 8px; padding: 6px 14px;
  }
  .tc-status-dot {
    width: 7px; height: 7px; background: #4ade80;
    border-radius: 50%; box-shadow: 0 0 0 3px rgba(74,222,128,0.2);
  }
  .tc-status-text {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px; letter-spacing: 0.06em; color: #4ade80;
  }

  /* PNR strip */
  .tc-pnr-strip {
    background: #f0ece4;
    border-bottom: 1.5px dashed #e0d9d0;
    padding: 14px 28px;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 12px;
  }
  .tc-pnr-block {}
  .tc-pnr-label {
    font-size: 9px; font-weight: 700; letter-spacing: 0.16em;
    text-transform: uppercase; color: #b8b0a5; margin-bottom: 3px;
  }
  .tc-pnr-value {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px; color: #1a2332; letter-spacing: 0.08em;
  }

  /* Route row */
  .tc-route-row {
    display: flex; align-items: stretch;
    padding: 24px 28px;
    gap: 0;
    border-bottom: 1.5px solid #f5f2ee;
  }
  .tc-route-station { flex: 1; }
  .tc-route-label {
    font-size: 9px; font-weight: 700; letter-spacing: 0.16em;
    text-transform: uppercase; color: #b8b0a5; margin-bottom: 6px;
  }
  .tc-route-city {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 30px; color: #1a2332; letter-spacing: 0.04em; line-height: 1;
  }
  .tc-route-time {
    font-size: 13px; color: #9a9186; font-weight: 400; margin-top: 4px;
  }

  .tc-route-mid {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 0 28px; gap: 6px;
  }
  .tc-route-dist {
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: #f97316;
  }
  .tc-route-arrow-wrap { display: flex; align-items: center; gap: 0; }
  .tc-route-line {
    width: 50px; height: 2px;
    background: linear-gradient(90deg, rgba(249,115,22,0.3), #f97316);
    border-radius: 2px; position: relative;
  }
  .tc-route-line::after {
    content: '▶'; position: absolute; right: -9px; top: 50%;
    transform: translateY(-50%); color: #f97316; font-size: 9px;
  }

  /* Info grid */
  .tc-info-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 0;
  }
  .tc-info-cell {
    padding: 18px 24px;
    border-right: 1.5px solid #f5f2ee;
  }
  .tc-info-cell:last-child { border-right: none; }
  .tc-info-label {
    font-size: 9px; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: #b8b0a5; margin-bottom: 6px;
  }
  .tc-info-value {
    font-size: 14px; font-weight: 600; color: #1a2332; line-height: 1.3;
  }
  .tc-info-sub { font-size: 11px; color: #9a9186; font-weight: 300; margin-top: 2px; }

  /* Category badge */
  .tc-cat-badge {
    display: inline-flex; align-items: center; gap: 6px;
    border-radius: 8px; padding: 5px 10px; border: 1.5px solid;
    font-size: 12px; font-weight: 700; letter-spacing: 0.04em;
  }

  /* Price */
  .tc-price {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 30px; letter-spacing: 0.04em; line-height: 1; color: #f97316;
  }

  /* ══ PASSENGER CARD ══ */
  .tc-passenger-card {
    background: #fff;
    border: 1.5px solid #e8e2da;
    border-radius: 16px; overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    margin-bottom: 20px;
  }
  .tc-pass-head {
    background: #1a2332;
    padding: 14px 24px;
    display: flex; align-items: center; gap: 12px;
    position: relative; overflow: hidden;
  }
  .tc-pass-head::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #f97316, #fb923c, #fdba74);
  }
  .tc-pass-head-icon {
    width: 36px; height: 36px; border-radius: 9px;
    background: #f97316;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; flex-shrink: 0;
  }
  .tc-pass-head-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px; letter-spacing: 0.04em; color: #fff;
  }
  .tc-pass-body {
    display: grid; grid-template-columns: repeat(2, 1fr);
  }
  .tc-pass-cell {
    padding: 16px 24px;
    border-right: 1.5px solid #f5f2ee;
    border-bottom: 1.5px solid #f5f2ee;
  }
  .tc-pass-cell:nth-child(2n) { border-right: none; }
  .tc-pass-cell:nth-last-child(-n+2) { border-bottom: none; }

  .tc-pass-label {
    font-size: 9px; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: #b8b0a5; margin-bottom: 5px;
  }
  .tc-pass-value { font-size: 14px; font-weight: 600; color: #1a2332; }

  /* ══ PAYMENT CARD ══ */
  .tc-payment-card {
    background: #fff;
    border: 1.5px solid #e8e2da;
    border-radius: 16px; overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    margin-bottom: 28px;
  }
  .tc-pay-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 13px 24px;
    border-bottom: 1px solid #f5f2ee;
    font-size: 13px; color: #9a9186;
  }
  .tc-pay-row:last-child { border-bottom: none; }
  .tc-pay-row span:last-child { color: #1a2332; font-weight: 600; font-size: 13px; }
  .tc-pay-total {
    background: #f0ece4;
    padding: 16px 24px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .tc-pay-total-label {
    font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: #9a9186;
  }
  .tc-pay-total-price {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 34px; letter-spacing: 0.04em; color: #f97316;
  }

  /* ══ ACTIONS ══ */
  .tc-actions {
    display: flex; gap: 14px; flex-wrap: wrap;
  }
  .tc-btn-home {
    flex: 1; min-width: 160px;
    background: #1a2332;
    border: none; border-radius: 12px;
    padding: 14px 24px; font-size: 14px; font-weight: 700;
    color: #fff; cursor: pointer;
    font-family: 'DM Sans', sans-serif; letter-spacing: 0.04em;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    transition: background 0.2s, transform 0.15s;
    position: relative; overflow: hidden;
  }
  .tc-btn-home::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #f97316, #fb923c);
  }
  .tc-btn-home:hover { background: #243044; transform: translateY(-2px); }

  .tc-btn-trips {
    flex: 1; min-width: 160px;
    background: #fff;
    border: 1.5px solid #e8e2da; border-radius: 12px;
    padding: 14px 24px; font-size: 14px; font-weight: 700;
    color: #1a2332; cursor: pointer;
    font-family: 'DM Sans', sans-serif; letter-spacing: 0.04em;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    transition: all 0.2s;
  }
  .tc-btn-trips:hover { border-color: #f97316; color: #f97316; transform: translateY(-2px); }

  /* Confetti dots */
  .tc-confetti {
    position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    pointer-events: none; overflow: hidden;
  }
  .tc-confetti-dot {
    position: absolute;
    width: 6px; height: 6px; border-radius: 50%;
    animation: tc-fall linear infinite;
    opacity: 0;
  }
  @keyframes tc-fall {
    0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(120px) rotate(360deg); opacity: 0; }
  }

  @media (max-width: 700px) {
    .tc-info-grid { grid-template-columns: repeat(2, 1fr); }
    .tc-info-cell:nth-child(2n) { border-right: none; }
    .tc-info-cell { border-bottom: 1.5px solid #f5f2ee; }
    .tc-route-row { flex-direction: column; gap: 16px; }
    .tc-route-mid { flex-direction: row; padding: 0; }
    .tc-body { padding: 24px 16px 48px; }
    .tc-header { padding: 28px 20px 40px; }
    .tc-header-inner { flex-direction: column; align-items: flex-start; gap: 16px; }
    .tc-pnr-strip { flex-direction: column; }
    .tc-pass-body { grid-template-columns: 1fr; }
    .tc-pass-cell:nth-child(2n) { border-right: none; }
    .tc-pass-cell:nth-last-child(-n+2) { border-bottom: 1.5px solid #f5f2ee; }
    .tc-pass-cell:last-child { border-bottom: none; }
  }
`;

const TicketConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticket } = location.state || {};

  /* ── Category color ── */
  const getCatStyle = (cat = "") => {
    const c = cat.toLowerCase();
    if (c.includes("1a") || c.includes("first ac")) return { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)", icon: "👑" };
    if (c.includes("2a") || c.includes("second ac")) return { color: "#6366f1", bg: "rgba(99,102,241,0.1)", border: "rgba(99,102,241,0.25)", icon: "⭐" };
    if (c.includes("3a") || c.includes("third ac")) return { color: "#0ea5e9", bg: "rgba(14,165,233,0.1)", border: "rgba(14,165,233,0.25)", icon: "🔵" };
    if (c.includes("sl") || c.includes("sleeper")) return { color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)", icon: "🌙" };
    if (c.includes("cc") || c.includes("chair")) return { color: "#f97316", bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.25)", icon: "💺" };
    return { color: "#9a9186", bg: "rgba(154,145,134,0.1)", border: "rgba(154,145,134,0.25)", icon: "🎫" };
  };

  /* ── Error state ── */
  if (!ticket) {
    return (
      <>
        <style>{STYLES}</style>
        <div style={{ minHeight: "100vh", background: "#f0ece4", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", border: "1.5px solid #e8e2da", borderRadius: 16, padding: "48px 56px", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🚂</div>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, letterSpacing: "0.04em", color: "#1a2332", margin: "0 0 10px" }}>
              No Ticket Found
            </h2>
            <p style={{ color: "#9a9186", marginBottom: 24, fontSize: 14 }}>Ticket details are missing. Please try booking again.</p>
            <button
              onClick={() => navigate("/")}
              style={{ background: "#1a2332", border: "none", borderRadius: 10, padding: "12px 28px", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}
            >
              Go Home
            </button>
          </div>
        </div>
      </>
    );
  }

  const catStyle = getCatStyle(ticket.category);
  const maskedAadhar = ticket.passenger?.aadhar
    ? `XXXX XXXX ${String(ticket.passenger.aadhar).slice(-4)}`
    : "XXXX XXXX XXXX";

  /* confetti dots config */
  const dots = [
    { left: "10%", delay: "0s", dur: "2.2s", color: "#f97316" },
    { left: "25%", delay: "0.3s", dur: "1.8s", color: "#fb923c" },
    { left: "40%", delay: "0.6s", dur: "2.5s", color: "#4ade80" },
    { left: "55%", delay: "0.1s", dur: "2.0s", color: "#f97316" },
    { left: "70%", delay: "0.4s", dur: "1.6s", color: "#fdba74" },
    { left: "85%", delay: "0.8s", dur: "2.3s", color: "#4ade80" },
    { left: "18%", delay: "1.0s", dur: "2.1s", color: "#fb923c" },
    { left: "62%", delay: "0.2s", dur: "1.9s", color: "#f97316" },
  ];

  return (
    <>
      <style>{STYLES}</style>
      <div className="tc-root">

        {/* ══ HEADER ══ */}
        <div className="tc-header">
          {/* confetti */}
          <div className="tc-confetti">
            {dots.map((d, i) => (
              <div key={i} className="tc-confetti-dot" style={{
                left: d.left, background: d.color,
                animationDelay: d.delay, animationDuration: d.dur,
              }} />
            ))}
          </div>

          <div className="tc-header-inner">
            {/* <div className="tc-success-icon">✅</div> */}
            <div className="tc-header-text">
              <div className="tc-header-tag">Booking Successful</div>
              <div className="tc-header-title">Ticket Confirmed!</div>
              <div className="tc-header-sub">Your journey is all set — have a great trip </div>
            </div>
          </div>
        </div>

        {/* ══ BODY ══ */}
        <div className="tc-body">

          {/* ─ TICKET CARD ─ */}
          <div className="tc-section-label">Your Ticket</div>

          <div className="tc-ticket">

            {/* Top: Train name + Status */}
            <div className="tc-ticket-top">
              <div className="tc-ticket-top-left">
                <div className="tc-train-name-tag">Train No. {ticket.train?.number}</div>
                <div className="tc-train-name">{ticket.train?.name || "—"}</div>
              </div>
              <div className="tc-ticket-top-right">
                <div className="tc-status-badge">
                  <div className="tc-status-dot" />
                  <div className="tc-status-text">{ticket.status || "CONFIRMED"}</div>
                </div>
              </div>
            </div>

            {/* PNR + Payment ID */}
            <div className="tc-pnr-strip">
              <div className="tc-pnr-block">
                <div className="tc-pnr-label">PNR Number</div>
                <div className="tc-pnr-value">{ticket.pnr}</div>
              </div>
              <div className="tc-pnr-block">
                <div className="tc-pnr-label">Payment ID</div>
                <div className="tc-pnr-value" style={{ fontSize: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, letterSpacing: 0 }}>
                  {ticket.payment_id}
                </div>
              </div>
              <div className="tc-pnr-block">
                <div className="tc-pnr-label">Order ID</div>
                <div className="tc-pnr-value" style={{ fontSize: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, letterSpacing: 0 }}>
                  {ticket.order_id}
                </div>
              </div>
            </div>

            {/* Route */}
            <div className="tc-route-row">
              <div className="tc-route-station">
                <div className="tc-route-label">From</div>
                <div className="tc-route-city">{ticket.train?.from || "—"}</div>
                <div className="tc-route-time">Departure · {ticket.train?.start_time || "—"}</div>
              </div>

              <div className="tc-route-mid">
                <div className="tc-route-dist">{ticket.train?.distance} KM</div>
                <div className="tc-route-arrow-wrap">
                  <div className="tc-route-line" />
                </div>
              </div>

              <div className="tc-route-station" style={{ textAlign: "right" }}>
                <div className="tc-route-label" style={{ textAlign: "right" }}>To</div>
                <div className="tc-route-city">{ticket.train?.to || "—"}</div>
                <div className="tc-route-time">Arrival · {ticket.train?.end_time || "—"}</div>
              </div>
            </div>

            {/* Info Grid: Class, Distance, Dep, Arr */}
            <div className="tc-info-grid">
              <div className="tc-info-cell">
                <div className="tc-info-label">Class</div>
                <div className="tc-cat-badge" style={{ color: catStyle.color, background: catStyle.bg, borderColor: catStyle.border }}>
                  {catStyle.icon} {ticket.category}
                </div>
              </div>
              <div className="tc-info-cell">
                <div className="tc-info-label">Distance</div>
                <div className="tc-info-value">{ticket.train?.distance} KM</div>
                <div className="tc-info-sub">Total journey</div>
              </div>
              <div className="tc-info-cell">
                <div className="tc-info-label">Departure</div>
                <div className="tc-info-value">{ticket.train?.start_time || "—"}</div>
                <div className="tc-info-sub">From {ticket.train?.from}</div>
              </div>
              <div className="tc-info-cell">
                <div className="tc-info-label">Fare Paid</div>
                <div className="tc-price">₹{ticket.price}</div>
                <div className="tc-info-sub">Per passenger</div>
              </div>
            </div>

          </div>

          {/* ─ PASSENGER DETAILS ─ */}
          <div className="tc-section-label">Passenger Details</div>

          <div className="tc-passenger-card">
            <div className="tc-pass-head">
              {/* <div className="tc-pass-head-icon">👤</div> */}
              <div className="tc-pass-head-title">Passenger Information</div>
            </div>
            <div className="tc-pass-body">
              <div className="tc-pass-cell">
                <div className="tc-pass-label">Full Name</div>
                <div className="tc-pass-value">{ticket.passenger?.name || "—"}</div>
              </div>
              <div className="tc-pass-cell">
                <div className="tc-pass-label">Mobile Number</div>
                <div className="tc-pass-value">{ticket.passenger?.phone || "—"}</div>
              </div>
              <div className="tc-pass-cell">
                <div className="tc-pass-label">Age / Gender</div>
                <div className="tc-pass-value">
                  {ticket.passenger?.age} yrs &nbsp;·&nbsp;
                  <span style={{ textTransform: "capitalize" }}>{ticket.passenger?.gender}</span>
                </div>
              </div>
              <div className="tc-pass-cell">
                <div className="tc-pass-label">Aadhar (Masked)</div>
                <div className="tc-pass-value">{maskedAadhar}</div>
              </div>
            </div>
          </div>

          {/* ─ PAYMENT SUMMARY ─ */}
          <div className="tc-section-label">Payment Summary</div>

          <div className="tc-payment-card">
            <div className="tc-pay-row"><span>Train</span><span>{ticket.train?.name}</span></div>
            <div className="tc-pay-row"><span>Route</span><span>{ticket.train?.from} → {ticket.train?.to}</span></div>
            <div className="tc-pay-row"><span>Category</span><span>{ticket.category}</span></div>
            <div className="tc-pay-row"><span>Distance</span><span>{ticket.train?.distance} KM</span></div>
            <div className="tc-pay-row"><span>Payment Status</span>
              <span style={{ color: "#4ade80", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, background: "#4ade80", borderRadius: "50%", display: "inline-block" }} />
                Paid
              </span>
            </div>
            <div className="tc-pay-total">
              <div className="tc-pay-total-label">Total Paid</div>
              <div className="tc-pay-total-price">₹{ticket.price}</div>
            </div>
          </div>

          {/* ─ ACTIONS ─ */}
          <div className="tc-actions">
            <button className="tc-btn-home" onClick={() => navigate("/")}>
              Back to Home
            </button>
            <button className="tc-btn-trips" onClick={() => navigate("/Mytickets")}>
              View My Tickets
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default TicketConfirm;