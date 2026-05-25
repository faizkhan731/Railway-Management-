import React, { useState } from "react";
import axios from "axios";

const Pnr = () => {
  const [pnr, setPnr] = useState("");
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const checkPNR = async () => {
    if (!pnr.trim()) {
      setError("Fill PNR number to check.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setTicket(null);
      const res = await axios.get(
        "http://localhost:5000/api/tickets/check-pnr",
        {
          withCredentials: true,
          params: { pnr: pnr.trim() },
        },
      );
      setTicket(res.data.ticket);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid PNR. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .pnr-wrap {
          font-family: 'DM Sans', sans-serif;
          background: #f0ece4;
          min-height: 100vh;
          color: #1a2332;
        }

        .pnr-hdr {
          background: #1a2332;
          padding: 36px 28px 30px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .pnr-hdr::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            -55deg, transparent, transparent 28px,
            rgba(255,255,255,0.025) 28px, rgba(255,255,255,0.025) 29px
          );
        }
        .pnr-hdr::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #f97316, #fb923c, #fdba74);
        }

        .pnr-badge {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 20px;
          padding: 6px 16px 6px 10px;
          margin-bottom: 16px;
        }
        .pnr-badge-dot {
          width: 22px; height: 22px;
          background: #f97316;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px;
        }
        .pnr-badge-txt {
          color: rgba(255,255,255,0.7);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
        }
        .pnr-hdr-title {
          position: relative;
          z-index: 1;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          color: #fff;
          letter-spacing: .04em;
          line-height: 1;
          margin-bottom: 8px;
        }
        .pnr-hdr-title span { color: #f97316; }
        .pnr-hdr-sub {
          position: relative;
          z-index: 1;
          color: rgba(255,255,255,0.4);
          font-size: 13px;
          font-weight: 300;
        }

        .pnr-body {
          max-width: 620px;
          margin: 0 auto;
          padding: 28px 20px 48px;
        }

        .pnr-card {
          background: #fff;
          border-radius: 14px;
          border: 1px solid #e0d9d0;
          padding: 20px;
          margin-bottom: 22px;
        }

        .pnr-field-label {
          display: block;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #6b6358;
          margin-bottom: 10px;
        }

        .pnr-input-row { display: flex; gap: 10px; }

        .pnr-input {
          flex: 1;
          background: #f8f5f0;
          border: 1.5px solid #e0d9d0;
          border-radius: 10px;
          padding: 13px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #1a2332;
          outline: none;
          letter-spacing: 2px;
          transition: border-color .2s, box-shadow .2s;
        }
        .pnr-input::placeholder { color: #c4bcb3; letter-spacing: 1px; font-size: 13px; }
        .pnr-input:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249,115,22,.1);
        }

        .pnr-btn {
          background: #1a2332;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 13px 22px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: background .2s, transform .15s;
          white-space: nowrap;
        }
        .pnr-btn:hover { background: #243044; transform: translateY(-1px); }
        .pnr-btn:active { transform: translateY(0); }
        .pnr-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .pnr-btn-acc {
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 40px;
          background: #f97316;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
        }
        .pnr-btn-lbl { padding-right: 32px; display: block; }

        .pnr-err {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          font-size: 13px;
          padding: 10px 14px;
          border-radius: 8px;
          margin-top: 12px;
        }

        /* TICKET */
        .pnr-ticket {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #e0d9d0;
          overflow: hidden;
          animation: pnrSlideUp .4s ease;
          margin-bottom: 22px;
        }
        @keyframes pnrSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .pnr-t-head {
          background: #1a2332;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          overflow: hidden;
        }
        .pnr-t-head::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            -55deg, transparent, transparent 28px,
            rgba(255,255,255,0.025) 28px, rgba(255,255,255,0.025) 29px
          );
        }
        .pnr-t-head::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #f97316, #fb923c);
        }
        .pnr-status-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #4ade80;
          flex-shrink: 0;
          box-shadow: 0 0 0 3px rgba(74,222,128,0.2);
          position: relative; z-index: 1;
        }
        .pnr-status-txt {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.85);
          position: relative; z-index: 1;
        }
        .pnr-status-badge {
          margin-left: auto;
          background: rgba(74,222,128,0.15);
          border: 1px solid rgba(74,222,128,0.35);
          color: #4ade80;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 20px;
          letter-spacing: .5px;
          position: relative; z-index: 1;
        }

        .pnr-t-body { padding: 20px 20px 24px; }

        .pnr-num-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .pnr-num-lbl {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #9a9186;
          background: #f8f5f0;
          border: 1px solid #e0d9d0;
          padding: 4px 10px;
          border-radius: 6px;
        }
        .pnr-num-val {
          font-size: 22px;
          font-weight: 600;
          color: #1a2332;
          letter-spacing: 3px;
        }

        .pnr-route {
          background: #1a2332;
          border-radius: 12px;
          padding: 16px 20px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .pnr-route::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            -55deg, transparent, transparent 28px,
            rgba(255,255,255,0.025) 28px, rgba(255,255,255,0.025) 29px
          );
        }
        .pnr-station {
          flex: 1;
          text-align: center;
          position: relative; z-index: 1;
        }
        .pnr-sta-code {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          color: #f97316;
          line-height: 1;
        }
        .pnr-sta-sub {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          margin-top: 4px;
          font-weight: 300;
        }
        .pnr-route-mid {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          position: relative; z-index: 1;
        }
        .pnr-train-num {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          font-size: 10px;
          padding: 3px 10px;
          border-radius: 10px;
          color: rgba(255,255,255,0.5);
          font-weight: 500;
          letter-spacing: .5px;
          white-space: nowrap;
        }
        .pnr-line-row {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 4px;
        }
        .pnr-line { flex: 1; height: 1px; background: rgba(255,255,255,0.15); }
        .pnr-rdot {
          width: 6px; height: 6px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.3);
          flex-shrink: 0;
        }
        .pnr-rdot.orange { background: #f97316; border-color: #f97316; }

        .pnr-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 16px;
        }
        .pnr-info-blk {
          background: #f8f5f0;
          border: 1px solid #e0d9d0;
          border-radius: 10px;
          padding: 12px 14px;
        }
        .pnr-info-lbl {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #9a9186;
          margin-bottom: 6px;
        }
        .pnr-info-val { font-size: 13px; font-weight: 500; color: #1a2332; }
        .pnr-info-sub { font-size: 12px; color: #9a9186; margin-top: 2px; font-weight: 300; }

        .pnr-divider { height: 1px; background: #e0d9d0; margin: 16px 0; }

        .pnr-pay-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .pnr-pay-lbl {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #9a9186;
          margin-bottom: 6px;
        }
        .pnr-pay-amt {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          color: #f97316;
          line-height: 1;
        }
        .pnr-pay-id { font-size: 11px; color: #b8b0a5; margin-top: 4px; }

        .pnr-conf-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 6px 14px;
          border-radius: 8px;
          margin-top: 4px;
        }
        .pnr-conf-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
        }
        .pnr-conf-txt { font-size: 13px; font-weight: 500; color: #16a34a; }

        .pnr-secure {
          margin-top: 4px;
          padding-top: 16px;
          border-top: 1px solid #e0d9d0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pnr-sec-dot {
          width: 6px; height: 6px;
          background: #4ade80;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 0 3px rgba(74,222,128,0.2);
        }
        .pnr-sec-txt { font-size: 11px; color: #b8b0a5; font-weight: 300; }

        @media (max-width: 480px) {
          .pnr-info-grid { grid-template-columns: 1fr; }
          .pnr-pay-row { flex-direction: column; align-items: flex-start; gap: 12px; }
        }
      `}</style>

      <div className="pnr-wrap">
        {/* HEADER */}
        <div className="pnr-hdr">
          <div className="pnr-badge">
            <div className="pnr-badge-dot">🚆</div>
            <span className="pnr-badge-txt">Indian Railways</span>
          </div>
          <h1 className="pnr-hdr-title">
            PNR <span>Status</span>
          </h1>
          <p className="pnr-hdr-sub">
            Enter your 10-digit PNR number to check ticket details
          </p>
        </div>

        {/* BODY */}
        <div className="pnr-body">
          {/* INPUT CARD */}
          <div className="pnr-card">
            <span className="pnr-field-label">PNR Number</span>
            <div className="pnr-input-row">
              <input
                className="pnr-input"
                value={pnr}
                onChange={(e) => setPnr(e.target.value.replace(/\D/g, ""))}
                placeholder="e.g. 4101234567"
                maxLength={10}
                onKeyDown={(e) => e.key === "Enter" && checkPNR()}
              />
              <button className="pnr-btn" onClick={checkPNR} disabled={loading}>
                <span className="pnr-btn-lbl">
                  {loading ? "Checking…" : "Check PNR"}
                </span>
                <span className="pnr-btn-acc">→</span>
              </button>
            </div>

            {error && (
              <div className="pnr-err">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}
          </div>

          {/* TICKET RESULT */}
          {ticket && (
            <div className="pnr-ticket">
              <div className="pnr-t-head">
                <div className="pnr-status-dot" />
                <div className="pnr-status-txt">Ticket Confirmed</div>
                <div className="pnr-status-badge">{ticket.status || "CNF"}</div>
              </div>

              <div className="pnr-t-body">
                {/* PNR Number */}
                <div className="pnr-num-row">
                  <span className="pnr-num-lbl">PNR</span>
                  <span className="pnr-num-val">{ticket.pnr}</span>
                </div>

                {/* Route */}
                <div className="pnr-route">
                  <div className="pnr-station">
                    <div className="pnr-sta-code">
                      {ticket.train?.from || "—"}
                    </div>
                    <div className="pnr-sta-sub">Departure</div>
                  </div>
                  <div className="pnr-route-mid">
                    <div className="pnr-train-num">
                      {ticket.train?.number || "—"}
                    </div>
                    <div className="pnr-line-row">
                      <div className="pnr-rdot orange" />
                      <div className="pnr-line" />
                      <div className="pnr-rdot" />
                    </div>
                  </div>
                  <div className="pnr-station">
                    <div className="pnr-sta-code">
                      {ticket.train?.to || "—"}
                    </div>
                    <div className="pnr-sta-sub">Arrival</div>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="pnr-info-grid">
                  <div className="pnr-info-blk">
                    <div className="pnr-info-lbl">Train</div>
                    <div className="pnr-info-val">
                      {ticket.train?.name || "—"}
                    </div>
                    <div className="pnr-info-sub">#{ticket.train?.number}</div>
                  </div>
                  <div className="pnr-info-blk">
                    <div className="pnr-info-lbl">Passenger</div>
                    <div className="pnr-info-val">
                      {ticket.passenger?.name || "—"}
                    </div>
                    <div className="pnr-info-sub">
                      {ticket.passenger?.age} yrs · {ticket.passenger?.gender}
                    </div>
                  </div>
                </div>

                <div className="pnr-divider" />

                {/* Payment */}
                <div className="pnr-pay-row">
                  <div>
                    <div className="pnr-pay-lbl">Fare Paid</div>
                    <div className="pnr-pay-amt">₹{ticket.price}</div>
                    <div className="pnr-pay-id">{ticket.payment_id}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="pnr-pay-lbl">Booking Status</div>
                    <div className="pnr-conf-badge">
                      <div className="pnr-conf-dot" />
                      <span className="pnr-conf-txt">Confirmed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECURE BADGE */}
          <div className="pnr-secure">
            <div className="pnr-sec-dot" />
            <span className="pnr-sec-txt">
              Secure access · Authorized personnel only · Indian Railways Portal
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pnr;
