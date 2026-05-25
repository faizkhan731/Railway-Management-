// // import React from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import axios from "axios";

// // /* ══════════════════════════════════════════
// //    STYLES — exact TicketPage color palette
// //    Navy #1a2332 | Orange #f97316 | Cream #f0ece4
// //    White cards | Border #e8e2da | Muted #9a9186
// // ══════════════════════════════════════════ */
// // const BASE_STYLES = `
// //   @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

// //   .btp-root *, .btp-root *::before, .btp-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

// //   .btp-root {
// //     min-height: 100vh;
// //     background: #f0ece4;
// //     font-family: 'DM Sans', sans-serif;
// //     color: #1a2332;
// //   }

// //   /* Loading Overlay */
// //   .btp-overlay {
// //     position: fixed; inset: 0;
// //     background: rgba(10,15,28,0.85);
// //     z-index: 9999;
// //     display: flex; flex-direction: column;
// //     align-items: center; justify-content: center; gap: 18px;
// //   }
// //   .btp-overlay-spinner {
// //     width: 52px; height: 52px;
// //     border: 3px solid rgba(249,115,22,0.2);
// //     border-top: 3px solid #f97316;
// //     border-radius: 50%;
// //     animation: btp-spin 0.75s linear infinite;
// //   }
// //   .btp-overlay-title {
// //     font-family: 'Bebas Neue', sans-serif;
// //     font-size: 26px; letter-spacing: 0.06em; color: #fff;
// //   }
// //   .btp-overlay-sub { font-size: 13px; color: rgba(255,255,255,0.4); font-weight: 300; }
// //   @keyframes btp-spin { to { transform: rotate(360deg); } }

// //   /* ══ DARK HEADER (same as TicketPage) ══ */
// //   .btp-header {
// //     background: #1a2332;
// //     position: relative; overflow: hidden;
// //     padding: 36px 32px 48px;
// //   }
// //   .btp-header::before {
// //     content: '';
// //     position: absolute; inset: 0;
// //     background-image: repeating-linear-gradient(
// //       -55deg, transparent, transparent 28px,
// //       rgba(255,255,255,0.02) 28px, rgba(255,255,255,0.02) 29px
// //     );
// //   }
// //   .btp-header::after {
// //     content: '';
// //     position: absolute; bottom: 0; left: 0; right: 0; height: 4px;
// //     background: linear-gradient(90deg, #f97316, #fb923c, #fdba74);
// //   }
// //   .btp-header-inner {
// //     max-width: 1080px; margin: 0 auto;
// //     position: relative; z-index: 1;
// //   }

// //   .btp-nav-back {
// //     display: inline-flex; align-items: center; gap: 8px;
// //     background: rgba(255,255,255,0.07);
// //     border: 1px solid rgba(255,255,255,0.12);
// //     border-radius: 8px; padding: 7px 14px;
// //     color: rgba(255,255,255,0.6); font-size: 12px; font-weight: 500;
// //     cursor: pointer; margin-bottom: 24px;
// //     transition: all 0.2s; font-family: 'DM Sans', sans-serif;
// //   }
// //   .btp-nav-back:hover { background: rgba(255,255,255,0.12); color: #fff; }

// //   .btp-train-identity { margin-bottom: 24px; }
// //   .btp-train-num-tag {
// //     font-size: 10px; font-weight: 700; letter-spacing: 0.16em;
// //     text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 4px;
// //   }
// //   .btp-train-title {
// //     font-family: 'Bebas Neue', sans-serif;
// //     font-size: clamp(28px, 4vw, 44px);
// //     color: #fff; letter-spacing: 0.04em; line-height: 1;
// //   }

// //   /* Route strip */
// //   .btp-route-strip {
// //     display: flex; align-items: stretch;
// //     background: rgba(255,255,255,0.05);
// //     border: 1px solid rgba(255,255,255,0.1);
// //     border-radius: 14px; overflow: hidden;
// //   }
// //   .btp-route-cell { flex: 1; padding: 14px 20px; }
// //   .btp-route-cell--sep { border-left: 1px solid rgba(255,255,255,0.07); flex: 0 0 auto; min-width: 130px; }
// //   .btp-route-label {
// //     font-size: 9px; font-weight: 700; letter-spacing: 0.16em;
// //     text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 5px;
// //   }
// //   .btp-route-value {
// //     font-family: 'Bebas Neue', sans-serif;
// //     font-size: 20px; color: #fff; letter-spacing: 0.04em; line-height: 1;
// //   }
// //   .btp-route-sub { font-size: 11px; color: rgba(255,255,255,0.35); font-weight: 300; margin-top: 2px; }
// //   .btp-route-arrow {
// //     padding: 0 14px;
// //     display: flex; align-items: center; justify-content: center;
// //   }
// //   .btp-arrow-line {
// //     width: 40px; height: 2px;
// //     background: linear-gradient(90deg, rgba(249,115,22,0.4), #f97316);
// //     border-radius: 2px; position: relative;
// //   }
// //   .btp-arrow-line::after {
// //     content: '▶'; position: absolute; right: -8px; top: 50%;
// //     transform: translateY(-50%); color: #f97316; font-size: 9px;
// //   }
// //   .btp-header-price {
// //     font-family: 'Bebas Neue', sans-serif;
// //     font-size: 26px; color: #f97316; letter-spacing: 0.04em; line-height: 1; margin-top: 4px;
// //   }

// //   /* Category badge */
// //   .btp-cat-badge {
// //     display: inline-flex; align-items: center; gap: 6px;
// //     border-radius: 8px; padding: 5px 10px; border: 1.5px solid;
// //     font-size: 12px; font-weight: 700; letter-spacing: 0.04em; margin-top: 4px;
// //   }

// //   /* ══ BODY ══ */
// //   .btp-body {
// //     max-width: 1080px; margin: 0 auto;
// //     padding: 36px 32px 64px;
// //   }
// //   .btp-grid {
// //     display: grid;
// //     grid-template-columns: 1fr 400px;
// //     gap: 24px; align-items: start;
// //   }

// //   /* Section label */
// //   .btp-section-label {
// //     font-size: 10px; font-weight: 600; letter-spacing: 0.16em;
// //     text-transform: uppercase; color: #9a9186;
// //     margin-bottom: 16px;
// //     display: flex; align-items: center; gap: 12px;
// //   }
// //   .btp-section-label::after { content: ''; flex: 1; height: 1px; background: #e0d9d0; }

// //   /* Ticket summary card (same as TicketPage ticket cards) */
// //   .btp-ticket-card {
// //     background: #fff;
// //     border: 1.5px solid #e8e2da;
// //     border-radius: 16px;
// //     display: flex; align-items: stretch; overflow: hidden;
// //     margin-bottom: 20px;
// //     box-shadow: 0 2px 12px rgba(0,0,0,0.05);
// //   }
// //   .btp-ticket-bar { width: 5px; flex-shrink: 0; }
// //   .btp-perf {
// //     width: 24px; flex-shrink: 0;
// //     display: flex; flex-direction: column;
// //     justify-content: space-around; align-items: center;
// //     padding: 8px 0;
// //     background: #faf8f5;
// //     border-right: 1.5px dashed #e0d9d0;
// //   }
// //   .btp-perf-dot {
// //     width: 8px; height: 8px;
// //     background: #f0ece4; border-radius: 50%;
// //     border: 1px solid #e0d9d0;
// //   }
// //   .btp-ticket-body {
// //     flex: 1; display: grid;
// //     grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
// //     align-items: center; padding: 20px 24px;
// //   }
// //   .btp-tc-cell { padding: 0 14px; }
// //   .btp-tc-cell:first-child { padding-left: 0; }
// //   .btp-tc-divider { width: 1px; align-self: stretch; background: #f0ece4; margin: 4px 0; }
// //   .btp-tc-label {
// //     font-size: 9px; font-weight: 700; letter-spacing: 0.14em;
// //     text-transform: uppercase; color: #b8b0a5; margin-bottom: 5px;
// //   }
// //   .btp-tc-value { font-size: 14px; font-weight: 600; color: #1a2332; line-height: 1.3; }
// //   .btp-tc-sub { font-size: 11px; color: #9a9186; font-weight: 300; margin-top: 2px; }
// //   .btp-price {
// //     font-family: 'Bebas Neue', sans-serif;
// //     font-size: 30px; letter-spacing: 0.04em; line-height: 1;
// //   }
// //   .btp-price-sub { font-size: 10px; color: #9a9186; margin-top: 3px; }

// //   /* Info note */
// //   .btp-info-note {
// //     background: #fff; border: 1.5px solid #e8e2da;
// //     border-left: 4px solid #f97316;
// //     border-radius: 12px; padding: 16px 20px; margin-bottom: 16px;
// //   }
// //   .btp-info-note-title { font-size: 13px; font-weight: 700; color: #1a2332; margin-bottom: 8px; }
// //   .btp-info-list { padding-left: 16px; color: #9a9186; font-size: 12px; line-height: 1.9; }

// //   /* Chips */
// //   .btp-chips { display: flex; gap: 10px; flex-wrap: wrap; }
// //   .btp-chip {
// //     display: flex; align-items: center; gap: 6px;
// //     background: #fff; border: 1.5px solid #e8e2da;
// //     border-radius: 40px; padding: 6px 14px;
// //     font-size: 12px; color: #9a9186; font-weight: 500;
// //   }

// //   /* ══ FORM CARD ══ */
// //   .btp-form-card {
// //     background: #fff;
// //     border: 1.5px solid #e8e2da;
// //     border-radius: 16px; overflow: hidden;
// //     position: sticky; top: 24px;
// //     box-shadow: 0 4px 24px rgba(0,0,0,0.07);
// //   }
// //   .btp-form-head {
// //     background: #1a2332;
// //     padding: 20px 24px;
// //     display: flex; align-items: center; gap: 14px;
// //     position: relative; overflow: hidden;
// //   }
// //   .btp-form-head::after {
// //     content: '';
// //     position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
// //     background: linear-gradient(90deg, #f97316, #fb923c, #fdba74);
// //   }
// //   .btp-form-head-icon {
// //     width: 42px; height: 42px; border-radius: 10px;
// //     background: #f97316;
// //     display: flex; align-items: center; justify-content: center;
// //     font-size: 18px; flex-shrink: 0;
// //   }
// //   .btp-form-title {
// //     font-family: 'Bebas Neue', sans-serif;
// //     font-size: 22px; letter-spacing: 0.04em; color: #fff; margin-bottom: 2px;
// //   }
// //   .btp-form-sub { font-size: 12px; color: rgba(255,255,255,0.4); font-weight: 300; }

// //   .btp-form-body { padding: 22px 24px; }

// //   /* Fields */
// //   .btp-field { margin-bottom: 14px; }
// //   .btp-label {
// //     display: block; font-size: 9px; font-weight: 700;
// //     letter-spacing: 0.16em; text-transform: uppercase;
// //     color: #b8b0a5; margin-bottom: 7px;
// //   }
// //   .btp-input-wrap { position: relative; }
// //   .btp-input-icon-el {
// //     position: absolute; left: 12px; top: 50%;
// //     transform: translateY(-50%); font-size: 14px;
// //     color: #b8b0a5; pointer-events: none;
// //   }
// //   .btp-input-wrap .btp-input { padding-left: 38px; }

// //   .btp-input, .btp-select {
// //     width: 100%;
// //     background: #faf8f5;
// //     border: 1.5px solid #e8e2da;
// //     border-radius: 10px; padding: 11px 14px;
// //     font-size: 14px; color: #1a2332;
// //     font-family: 'DM Sans', sans-serif;
// //     outline: none;
// //     transition: border-color 0.2s, box-shadow 0.2s;
// //   }
// //   .btp-input::placeholder { color: #c8c0b8; }
// //   .btp-input:focus, .btp-select:focus {
// //     border-color: #f97316;
// //     box-shadow: 0 0 0 3px rgba(249,115,22,0.1);
// //     background: #fff;
// //   }
// //   .btp-input--err { border-color: #ef4444 !important; }
// //   .btp-select { cursor: pointer; }
// //   .btp-err-txt { font-size: 11px; color: #ef4444; margin-top: 5px; font-weight: 500; }

// //   .btp-divider { height: 1px; background: #f0ece4; margin: 16px 0; }

// //   /* Summary */
// //   .btp-summary-row {
// //     display: flex; justify-content: space-between; align-items: center;
// //     font-size: 13px; padding: 6px 0;
// //     color: #9a9186; border-bottom: 1px solid #f5f2ee;
// //   }
// //   .btp-summary-row span:last-child { color: #1a2332; font-weight: 500; text-align: right; max-width: 55%; }

// //   /* Total */
// //   .btp-total-row {
// //     display: flex; justify-content: space-between; align-items: center;
// //     background: #f0ece4; border: 1.5px solid #e0d9d0;
// //     border-radius: 12px; padding: 14px 16px; margin: 16px 0 18px;
// //   }
// //   .btp-total-label {
// //     font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
// //     text-transform: uppercase; color: #9a9186; margin-bottom: 2px;
// //   }
// //   .btp-total-sub { font-size: 11px; color: #b8b0a5; }
// //   .btp-total-price {
// //     font-family: 'Bebas Neue', sans-serif;
// //     font-size: 36px; letter-spacing: 0.04em; color: #f97316;
// //   }

// //   /* Pay button */
// //   .btp-pay-btn {
// //     width: 100%; background: #1a2332;
// //     border: none; border-radius: 12px;
// //     padding: 15px 24px; font-size: 15px; font-weight: 700;
// //     color: #fff; cursor: pointer;
// //     font-family: 'DM Sans', sans-serif; letter-spacing: 0.04em;
// //     display: flex; align-items: center; justify-content: center; gap: 10px;
// //     transition: background 0.2s, transform 0.15s;
// //     position: relative; overflow: hidden;
// //   }
// //   .btp-pay-btn::after {
// //     content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
// //     background: linear-gradient(90deg, #f97316, #fb923c);
// //   }
// //   .btp-pay-btn:hover:not(:disabled) { background: #243044; transform: translateY(-2px); }
// //   .btp-pay-btn:active:not(:disabled) { transform: translateY(0); }
// //   .btp-pay-btn:disabled { opacity: 0.45; cursor: not-allowed; }
// //   .btp-pay-btn-dot {
// //     width: 22px; height: 22px; background: #f97316;
// //     border-radius: 6px; display: flex; align-items: center;
// //     justify-content: center; font-size: 12px; flex-shrink: 0;
// //   }
// //   .btp-btn-spinner {
// //     width: 18px; height: 18px;
// //     border: 2px solid rgba(255,255,255,0.3);
// //     border-top: 2px solid #fff;
// //     border-radius: 50%;
// //     animation: btp-spin 0.7s linear infinite;
// //   }
// //   .btp-secure-note {
// //     text-align: center; font-size: 11px;
// //     color: #b8b0a5; margin-top: 12px;
// //     display: flex; align-items: center; justify-content: center; gap: 6px;
// //   }

// //   /* Responsive */
// //   @media (max-width: 860px) {
// //     .btp-grid { grid-template-columns: 1fr; }
// //     .btp-form-card { position: static; }
// //     .btp-ticket-body { grid-template-columns: 1fr 1fr; gap: 14px; }
// //     .btp-tc-divider { display: none; }
// //     .btp-route-strip { flex-wrap: wrap; }
// //     .btp-body { padding: 24px 16px 48px; }
// //     .btp-header { padding: 24px 20px 36px; }
// //   }
// // `;

// // /* ══════════════════════════════════════════
// //    COMPONENT
// // ══════════════════════════════════════════ */
// // const BookTicketPage = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { train, ticket } = location.state || {};

// //   const [formData, setFormData] = React.useState({
// //     name: "", phone: "", age: "", gender: "", aadhar: "",
// //   });
// //   const [errors, setErrors] = React.useState({});
// //   const [loading, setLoading] = React.useState(false);

// //   /* ── Category color (same as TicketPage) ── */
// //   const getCatStyle = (cat = "") => {
// //     const c = cat.toLowerCase();
// //     if (c.includes("1a") || c.includes("first ac")) return { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)", icon: "👑" };
// //     if (c.includes("2a") || c.includes("second ac")) return { color: "#6366f1", bg: "rgba(99,102,241,0.1)", border: "rgba(99,102,241,0.25)", icon: "⭐" };
// //     if (c.includes("3a") || c.includes("third ac")) return { color: "#0ea5e9", bg: "rgba(14,165,233,0.1)", border: "rgba(14,165,233,0.25)", icon: "🔵" };
// //     if (c.includes("sl") || c.includes("sleeper")) return { color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)", icon: "🌙" };
// //     if (c.includes("cc") || c.includes("chair")) return { color: "#f97316", bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.25)", icon: "💺" };
// //     return { color: "#9a9186", bg: "rgba(154,145,134,0.1)", border: "rgba(154,145,134,0.25)", icon: "🎫" };
// //   };

// //   /* ── Error page ── */
// //   if (!train || !ticket) {
// //     return (
// //       <>
// //         <style>{BASE_STYLES}</style>
// //         <div style={{ minHeight: "100vh", background: "#f0ece4", display: "flex", alignItems: "center", justifyContent: "center" }}>
// //           <div style={{ background: "#fff", border: "1.5px solid #e8e2da", borderRadius: 16, padding: "48px 56px", textAlign: "center" }}>
// //             <div style={{ fontSize: 48, marginBottom: 16 }}>🚂</div>
// //             <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, letterSpacing: "0.04em", color: "#1a2332", margin: "0 0 10px" }}>
// //               No Ticket Data Found
// //             </h2>
// //             <p style={{ color: "#9a9186", marginBottom: 24, fontSize: 14 }}>Please go back and select a train first.</p>
// //             <button
// //               onClick={() => navigate(-1)}
// //               style={{ background: "#1a2332", border: "none", borderRadius: 10, padding: "12px 28px", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}
// //             >
// //               ← Go Back
// //             </button>
// //           </div>
// //         </div>
// //       </>
// //     );
// //   }

// //   const catStyle = getCatStyle(ticket.category);

// //   /* ── Aadhar mask ── */
// //   const maskedAadhar = formData.aadhar.length === 12
// //     ? `XXXX XXXX ${formData.aadhar.slice(8)}`
// //     : "";

// //   /* ── Validation ── */
// //   const validate = () => {
// //     const e = {};
// //     if (!formData.name.trim()) e.name = "Full name is required";
// //     if (!/^[6-9]\d{9}$/.test(formData.phone)) e.phone = "Enter valid 10-digit mobile number";
// //     if (!formData.age || formData.age < 1 || formData.age > 120) e.age = "Enter a valid age (1–120)";
// //     if (!formData.gender) e.gender = "Please select gender";
// //     if (!/^\d{12}$/.test(formData.aadhar)) e.aadhar = "Enter valid 12-digit Aadhar number";
// //     return e;
// //   };

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //     if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
// //   };

// //   /* ── Payment ── */
// //   const handlePay = async () => {
// //     const errs = validate();
// //     if (Object.keys(errs).length) { setErrors(errs); return; }

// //     setLoading(true);
// //     try {
// //       const res = await axios.post("http://localhost:5000/api/create-order", { amount: ticket.price });
// //       const order = res.data;

// //       if (!window.Razorpay) {
// //         setLoading(false);
// //         alert("Razorpay SDK not loaded. Check your internet connection.");
// //         return;
// //       }

// //       const options = {
// //         key: "rzp_test_RhA9vXVynShhkt",
// //         amount: order.amount,
// //         currency: order.currency,
// //         name: "Railway Reservation System",
// //         description: `${train.train_name} · ${ticket.category}`,
// //         order_id: order.id,
// //         prefill: { name: formData.name, contact: formData.phone },
// //         theme: { color: "#f97316" },
// //         modal: { ondismiss: () => setLoading(false) },
// //         handler: async function (response) {
// //           try {
// //             const verify = await axios.post("http://localhost:5000/api/verify-payment", {
// //               order_id: response.razorpay_order_id,
// //               payment_id: response.razorpay_payment_id,
// //               signature: response.razorpay_signature,
// //               train, ticket, passenger: formData,
// //             });
// //             if (verify.data.success) {
// //               navigate("/ticket-confirm", { state: { ticket: verify.data.ticket } });
// //             } else {
// //               setLoading(false);
// //               alert("⚠️ Payment verified but ticket could not be saved. Contact support.");
// //             }
// //           } catch {
// //             setLoading(false);
// //             alert("❌ Verification failed. Please contact support.");
// //           }
// //         },
// //       };

// //       const rzp = new window.Razorpay(options);
// //       rzp.on("payment.failed", () => { setLoading(false); alert("❌ Payment failed. Please try again."); });
// //       rzp.open();

// //     } catch (err) {
// //       setLoading(false);
// //       console.error("Payment Error:", err);
// //       alert("❌ Could not initiate payment. Please try again.");
// //     }
// //   };

// //   return (
// //     <>
// //       <style>{BASE_STYLES}</style>

// //       {/* Loading Overlay */}
// //       {loading && (
// //         <div className="btp-overlay">
// //           <div className="btp-overlay-spinner" />
// //           <div className="btp-overlay-title">Processing Payment</div>
// //           <div className="btp-overlay-sub">Please do not close this window…</div>
// //         </div>
// //       )}

// //       <div className="btp-root">

// //         {/* ══ DARK HEADER ══ */}
// //         <div className="btp-header">
// //           <div className="btp-header-inner">

// //             <button className="btp-nav-back" onClick={() => navigate(-1)}>
// //               ← Back to Ticket Selection
// //             </button>

// //             <div className="btp-train-identity">
// //               <div className="btp-train-num-tag">Train No. {train.train_number}</div>
// //               <div className="btp-train-title">{train.train_name}</div>
// //             </div>

// //             {/* Route strip */}
// //             <div className="btp-route-strip">
// //               <div className="btp-route-cell">
// //                 <div className="btp-route-label">From</div>
// //                 <div className="btp-route-value">{train.source_station}</div>
// //                 <div className="btp-route-sub">Departure · {train.start_time}</div>
// //               </div>

// //               <div className="btp-route-arrow">
// //                 <div className="btp-arrow-line" />
// //               </div>

// //               <div className="btp-route-cell">
// //                 <div className="btp-route-label">To</div>
// //                 <div className="btp-route-value">{train.destination_station}</div>
// //                 <div className="btp-route-sub">Arrival · {train.end_time}</div>
// //               </div>

// //               <div className="btp-route-cell btp-route-cell--sep">
// //                 <div className="btp-route-label">Class</div>
// //                 <div className="btp-cat-badge" style={{ color: catStyle.color, background: catStyle.bg, borderColor: catStyle.border }}>
// //                   {catStyle.icon} {ticket.category}
// //                 </div>
// //               </div>

// //               <div className="btp-route-cell btp-route-cell--sep">
// //                 <div className="btp-route-label">Fare</div>
// //                 <div className="btp-header-price">₹{ticket.price}</div>
// //                 <div className="btp-route-sub">Per passenger</div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ══ BODY ══ */}
// //         <div className="btp-body">
// //           <div className="btp-grid">

// //             {/* ── LEFT: Journey Summary ── */}
// //             <div>
// //               <div className="btp-section-label">Journey Summary</div>

// //               {/* Ticket card — styled exactly like TicketPage */}
// //               <div className="btp-ticket-card">
// //                 <div className="btp-ticket-bar" style={{ background: catStyle.color }} />
// //                 <div className="btp-perf">
// //                   {[...Array(6)].map((_, i) => <div className="btp-perf-dot" key={i} />)}
// //                 </div>
// //                 <div className="btp-ticket-body">
// //                   <div className="btp-tc-cell">
// //                     <div className="btp-tc-label">Class</div>
// //                     <div className="btp-cat-badge" style={{ color: catStyle.color, background: catStyle.bg, borderColor: catStyle.border }}>
// //                       {catStyle.icon} {ticket.category}
// //                     </div>
// //                   </div>
// //                   <div className="btp-tc-divider" />
// //                   <div className="btp-tc-cell">
// //                     <div className="btp-tc-label">Route</div>
// //                     <div className="btp-tc-value">{train.source_station} → {train.destination_station}</div>
// //                     <div className="btp-tc-sub">{ticket.distance_km} KM total</div>
// //                   </div>
// //                   <div className="btp-tc-divider" />
// //                   <div className="btp-tc-cell">
// //                     <div className="btp-tc-label">Timings</div>
// //                     <div className="btp-tc-value">{train.start_time} → {train.end_time}</div>
// //                     <div className="btp-tc-sub">Dep. → Arr.</div>
// //                   </div>
// //                   <div className="btp-tc-divider" />
// //                   <div className="btp-tc-cell">
// //                     <div className="btp-tc-label">Fare</div>
// //                     <div className="btp-price" style={{ color: catStyle.color }}>₹{ticket.price}</div>
// //                     <div className="btp-price-sub">Per passenger</div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Info note */}
// //               <div className="btp-info-note">
// //                 <div className="btp-info-note-title">📋 Important Information</div>
// //                 <ul className="btp-info-list">
// //                   <li>Aadhar number is required for identity verification during travel</li>
// //                   <li>E-Ticket will be sent to your registered mobile number via SMS</li>
// //                   <li>Carry a valid government-issued photo ID while travelling</li>
// //                   <li>Cancellation policy applies as per railway regulations</li>
// //                 </ul>
// //               </div>

// //               <div className="btp-chips">
// //                 <div className="btp-chip">🎫 E-Ticket</div>
// //                 <div className="btp-chip">✅ Instant Confirmation</div>
// //                 <div className="btp-chip">🔒 Secured by Razorpay</div>
// //                 <div className="btp-chip">📲 SMS Alert</div>
// //               </div>
// //             </div>

// //             {/* ── RIGHT: Passenger Form ── */}
// //             <div className="btp-form-card">
// //               <div className="btp-form-head">
// //                 <div className="btp-form-head-icon">👤</div>
// //                 <div>
// //                   <div className="btp-form-title">Passenger Details</div>
// //                   <div className="btp-form-sub">Fill in your information to continue</div>
// //                 </div>
// //               </div>

// //               <div className="btp-form-body">

// //                 {/* Name */}
// //                 <div className="btp-field">
// //                   <label className="btp-label">Full Name</label>
// //                   <div className="btp-input-wrap">
// //                     <span className="btp-input-icon-el">👤</span>
// //                     <input className={`btp-input ${errors.name ? "btp-input--err" : ""}`}
// //                       type="text" name="name" value={formData.name}
// //                       placeholder="Enter your full name" onChange={handleChange} />
// //                   </div>
// //                   {errors.name && <div className="btp-err-txt">⚠ {errors.name}</div>}
// //                 </div>

// //                 {/* Phone */}
// //                 <div className="btp-field">
// //                   <label className="btp-label">Mobile Number</label>
// //                   <div className="btp-input-wrap">
// //                     <span className="btp-input-icon-el">📱</span>
// //                     <input className={`btp-input ${errors.phone ? "btp-input--err" : ""}`}
// //                       type="tel" name="phone" value={formData.phone}
// //                       placeholder="10-digit mobile number" maxLength={10} onChange={handleChange} />
// //                   </div>
// //                   {errors.phone && <div className="btp-err-txt">⚠ {errors.phone}</div>}
// //                 </div>

// //                 {/* Age + Gender */}
// //                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
// //                   <div className="btp-field">
// //                     <label className="btp-label">Age</label>
// //                     <input className={`btp-input ${errors.age ? "btp-input--err" : ""}`}
// //                       type="number" name="age" min="1" max="120"
// //                       value={formData.age} placeholder="Age" onChange={handleChange} />
// //                     {errors.age && <div className="btp-err-txt">⚠ {errors.age}</div>}
// //                   </div>
// //                   <div className="btp-field">
// //                     <label className="btp-label">Gender</label>
// //                     <select className={`btp-select ${errors.gender ? "btp-input--err" : ""}`}
// //                       name="gender" value={formData.gender} onChange={handleChange}>
// //                       <option value="">Select</option>
// //                       <option value="male">Male</option>
// //                       <option value="female">Female</option>
// //                       <option value="other">Other</option>
// //                     </select>
// //                     {errors.gender && <div className="btp-err-txt">⚠ {errors.gender}</div>}
// //                   </div>
// //                 </div>

// //                 {/* Aadhar */}
// //                 <div className="btp-field">
// //                   <label className="btp-label">Aadhar Card Number</label>
// //                   <div className="btp-input-wrap">
// //                     <span className="btp-input-icon-el">🪪</span>
// //                     <input className={`btp-input ${errors.aadhar ? "btp-input--err" : ""}`}
// //                       type="text" name="aadhar" value={formData.aadhar}
// //                       placeholder="12-digit Aadhar number" maxLength={12} onChange={handleChange} />
// //                   </div>
// //                   {errors.aadhar && <div className="btp-err-txt">⚠ {errors.aadhar}</div>}
// //                   {maskedAadhar && !errors.aadhar && (
// //                     <div style={{ fontSize: 11, color: "#10b981", marginTop: 5, fontWeight: 600 }}>
// //                       ✓ {maskedAadhar}
// //                     </div>
// //                   )}
// //                 </div>

// //                 <div className="btp-divider" />

// //                 {/* Summary */}
// //                 <div className="btp-summary-row"><span>Train</span><span>{train.train_name}</span></div>
// //                 <div className="btp-summary-row"><span>Route</span><span>{train.source_station} → {train.destination_station}</span></div>
// //                 <div className="btp-summary-row"><span>Category</span><span>{ticket.category}</span></div>
// //                 <div className="btp-summary-row"><span>Distance</span><span>{ticket.distance_km} KM</span></div>

// //                 {/* Total */}
// //                 <div className="btp-total-row">
// //                   <div>
// //                     <div className="btp-total-label">Total Amount</div>
// //                     <div className="btp-total-sub">Inclusive of all charges</div>
// //                   </div>
// //                   <div className="btp-total-price">₹{ticket.price}</div>
// //                 </div>

// //                 {/* Pay Button */}
// //                 <button className="btp-pay-btn" onClick={handlePay} disabled={loading}>
// //                   {loading ? (
// //                     <><div className="btp-btn-spinner" /> Processing…</>
// //                   ) : (
// //                     <><div className="btp-pay-btn-dot">→</div> Pay ₹{ticket.price} Securely</>
// //                   )}
// //                 </button>

// //                 <div className="btp-secure-note">
// //                   🛡️ Secured by Razorpay · 256-bit SSL Encrypted
// //                 </div>
// //               </div>
// //             </div>

// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default BookTicketPage;

// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// /* ══════════════════════════════════════════
//    STYLES — exact TicketPage color palette
//    Navy #1a2332 | Orange #f97316 | Cream #f0ece4
//    White cards | Border #e8e2da | Muted #9a9186
// ══════════════════════════════════════════ */
// const BASE_STYLES = `
//   @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

//   .btp-root *, .btp-root *::before, .btp-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   .btp-root {
//     min-height: 100vh;
//     background: #f0ece4;
//     font-family: 'DM Sans', sans-serif;
//     color: #1a2332;
//   }

//   /* Loading Overlay */
//   .btp-overlay {
//     position: fixed; inset: 0;
//     background: rgba(10,15,28,0.85);
//     z-index: 9999;
//     display: flex; flex-direction: column;
//     align-items: center; justify-content: center; gap: 18px;
//   }
//   .btp-overlay-spinner {
//     width: 52px; height: 52px;
//     border: 3px solid rgba(249,115,22,0.2);
//     border-top: 3px solid #f97316;
//     border-radius: 50%;
//     animation: btp-spin 0.75s linear infinite;
//   }
//   .btp-overlay-title {
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: 26px; letter-spacing: 0.06em; color: #fff;
//   }
//   .btp-overlay-sub { font-size: 13px; color: rgba(255,255,255,0.4); font-weight: 300; }
//   @keyframes btp-spin { to { transform: rotate(360deg); } }

//   /* ══ DARK HEADER (same as TicketPage) ══ */
//   .btp-header {
//     background: #1a2332;
//     position: relative; overflow: hidden;
//     padding: 36px 32px 48px;
//   }
//   .btp-header::before {
//     content: '';
//     position: absolute; inset: 0;
//     background-image: repeating-linear-gradient(
//       -55deg, transparent, transparent 28px,
//       rgba(255,255,255,0.02) 28px, rgba(255,255,255,0.02) 29px
//     );
//   }
//   .btp-header::after {
//     content: '';
//     position: absolute; bottom: 0; left: 0; right: 0; height: 4px;
//     background: linear-gradient(90deg, #f97316, #fb923c, #fdba74);
//   }
//   .btp-header-inner {
//     max-width: 1080px; margin: 0 auto;
//     position: relative; z-index: 1;
//   }

//   .btp-nav-back {
//     display: inline-flex; align-items: center; gap: 8px;
//     background: rgba(255,255,255,0.07);
//     border: 1px solid rgba(255,255,255,0.12);
//     border-radius: 8px; padding: 7px 14px;
//     color: rgba(255,255,255,0.6); font-size: 12px; font-weight: 500;
//     cursor: pointer; margin-bottom: 24px;
//     transition: all 0.2s; font-family: 'DM Sans', sans-serif;
//   }
//   .btp-nav-back:hover { background: rgba(255,255,255,0.12); color: #fff; }

//   .btp-train-identity { margin-bottom: 24px; }
//   .btp-train-num-tag {
//     font-size: 10px; font-weight: 700; letter-spacing: 0.16em;
//     text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 4px;
//   }
//   .btp-train-title {
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: clamp(28px, 4vw, 44px);
//     color: #fff; letter-spacing: 0.04em; line-height: 1;
//   }

//   /* Route strip */
//   .btp-route-strip {
//     display: flex; align-items: stretch;
//     background: rgba(255,255,255,0.05);
//     border: 1px solid rgba(255,255,255,0.1);
//     border-radius: 14px; overflow: hidden;
//   }
//   .btp-route-cell { flex: 1; padding: 14px 20px; }
//   .btp-route-cell--sep { border-left: 1px solid rgba(255,255,255,0.07); flex: 0 0 auto; min-width: 130px; }
//   .btp-route-label {
//     font-size: 9px; font-weight: 700; letter-spacing: 0.16em;
//     text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 5px;
//   }
//   .btp-route-value {
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: 20px; color: #fff; letter-spacing: 0.04em; line-height: 1;
//   }
//   .btp-route-sub { font-size: 11px; color: rgba(255,255,255,0.35); font-weight: 300; margin-top: 2px; }
//   .btp-route-arrow {
//     padding: 0 14px;
//     display: flex; align-items: center; justify-content: center;
//   }
//   .btp-arrow-line {
//     width: 40px; height: 2px;
//     background: linear-gradient(90deg, rgba(249,115,22,0.4), #f97316);
//     border-radius: 2px; position: relative;
//   }
//   .btp-arrow-line::after {
//     content: '▶'; position: absolute; right: -8px; top: 50%;
//     transform: translateY(-50%); color: #f97316; font-size: 9px;
//   }
//   .btp-header-price {
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: 26px; color: #f97316; letter-spacing: 0.04em; line-height: 1; margin-top: 4px;
//   }

//   /* Category badge */
//   .btp-cat-badge {
//     display: inline-flex; align-items: center; gap: 6px;
//     border-radius: 8px; padding: 5px 10px; border: 1.5px solid;
//     font-size: 12px; font-weight: 700; letter-spacing: 0.04em; margin-top: 4px;
//   }

//   /* ══ BODY ══ */
//   .btp-body {
//     max-width: 1080px; margin: 0 auto;
//     padding: 36px 32px 64px;
//   }
//   .btp-grid {
//     display: grid;
//     grid-template-columns: 1fr 400px;
//     gap: 24px; align-items: start;
//   }

//   /* Section label */
//   .btp-section-label {
//     font-size: 10px; font-weight: 600; letter-spacing: 0.16em;
//     text-transform: uppercase; color: #9a9186;
//     margin-bottom: 16px;
//     display: flex; align-items: center; gap: 12px;
//   }
//   .btp-section-label::after { content: ''; flex: 1; height: 1px; background: #e0d9d0; }

//   /* Ticket summary card (same as TicketPage ticket cards) */
//   .btp-ticket-card {
//     background: #fff;
//     border: 1.5px solid #e8e2da;
//     border-radius: 16px;
//     display: flex; align-items: stretch; overflow: hidden;
//     margin-bottom: 20px;
//     box-shadow: 0 2px 12px rgba(0,0,0,0.05);
//   }
//   .btp-ticket-bar { width: 5px; flex-shrink: 0; }
//   .btp-perf {
//     width: 24px; flex-shrink: 0;
//     display: flex; flex-direction: column;
//     justify-content: space-around; align-items: center;
//     padding: 8px 0;
//     background: #faf8f5;
//     border-right: 1.5px dashed #e0d9d0;
//   }
//   .btp-perf-dot {
//     width: 8px; height: 8px;
//     background: #f0ece4; border-radius: 50%;
//     border: 1px solid #e0d9d0;
//   }
//   .btp-ticket-body {
//     flex: 1; display: grid;
//     grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
//     align-items: center; padding: 20px 24px;
//   }
//   .btp-tc-cell { padding: 0 14px; }
//   .btp-tc-cell:first-child { padding-left: 0; }
//   .btp-tc-divider { width: 1px; align-self: stretch; background: #f0ece4; margin: 4px 0; }
//   .btp-tc-label {
//     font-size: 9px; font-weight: 700; letter-spacing: 0.14em;
//     text-transform: uppercase; color: #b8b0a5; margin-bottom: 5px;
//   }
//   .btp-tc-value { font-size: 14px; font-weight: 600; color: #1a2332; line-height: 1.3; }
//   .btp-tc-sub { font-size: 11px; color: #9a9186; font-weight: 300; margin-top: 2px; }
//   .btp-price {
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: 30px; letter-spacing: 0.04em; line-height: 1;
//   }
//   .btp-price-sub { font-size: 10px; color: #9a9186; margin-top: 3px; }

//   /* Info note */
//   .btp-info-note {
//     background: #fff; border: 1.5px solid #e8e2da;
//     border-left: 4px solid #f97316;
//     border-radius: 12px; padding: 16px 20px; margin-bottom: 16px;
//   }
//   .btp-info-note-title { font-size: 13px; font-weight: 700; color: #1a2332; margin-bottom: 8px; }
//   .btp-info-list { padding-left: 16px; color: #9a9186; font-size: 12px; line-height: 1.9; }

//   /* Chips */
//   .btp-chips { display: flex; gap: 10px; flex-wrap: wrap; }
//   .btp-chip {
//     display: flex; align-items: center; gap: 6px;
//     background: #fff; border: 1.5px solid #e8e2da;
//     border-radius: 40px; padding: 6px 14px;
//     font-size: 12px; color: #9a9186; font-weight: 500;
//   }

//   /* ══ FORM CARD ══ */
//   .btp-form-card {
//     background: #fff;
//     border: 1.5px solid #e8e2da;
//     border-radius: 16px; overflow: hidden;
//     position: sticky; top: 24px;
//     box-shadow: 0 4px 24px rgba(0,0,0,0.07);
//   }
//   .btp-form-head {
//     background: #1a2332;
//     padding: 20px 24px;
//     display: flex; align-items: center; gap: 14px;
//     position: relative; overflow: hidden;
//   }
//   .btp-form-head::after {
//     content: '';
//     position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
//     background: linear-gradient(90deg, #f97316, #fb923c, #fdba74);
//   }
//   .btp-form-head-icon {
//     width: 42px; height: 42px; border-radius: 10px;
//     background: #f97316;
//     display: flex; align-items: center; justify-content: center;
//     font-size: 18px; flex-shrink: 0;
//   }
//   .btp-form-title {
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: 22px; letter-spacing: 0.04em; color: #fff; margin-bottom: 2px;
//   }
//   .btp-form-sub { font-size: 12px; color: rgba(255,255,255,0.4); font-weight: 300; }

//   .btp-form-body { padding: 22px 24px; }

//   /* Fields */
//   .btp-field { margin-bottom: 14px; }
//   .btp-label {
//     display: block; font-size: 9px; font-weight: 700;
//     letter-spacing: 0.16em; text-transform: uppercase;
//     color: #b8b0a5; margin-bottom: 7px;
//   }
//   .btp-input-wrap { position: relative; }
//   .btp-input-icon-el {
//     position: absolute; left: 12px; top: 50%;
//     transform: translateY(-50%); font-size: 14px;
//     color: #b8b0a5; pointer-events: none;
//   }
//   .btp-input-wrap .btp-input { padding-left: 38px; }

//   .btp-input, .btp-select {
//     width: 100%;
//     background: #faf8f5;
//     border: 1.5px solid #e8e2da;
//     border-radius: 10px; padding: 11px 14px;
//     font-size: 14px; color: #1a2332;
//     font-family: 'DM Sans', sans-serif;
//     outline: none;
//     transition: border-color 0.2s, box-shadow 0.2s;
//   }
//   .btp-input::placeholder { color: #c8c0b8; }
//   .btp-input:focus, .btp-select:focus {
//     border-color: #f97316;
//     box-shadow: 0 0 0 3px rgba(249,115,22,0.1);
//     background: #fff;
//   }
//   .btp-input--err { border-color: #ef4444 !important; }
//   .btp-select { cursor: pointer; }
//   .btp-err-txt { font-size: 11px; color: #ef4444; margin-top: 5px; font-weight: 500; }

//   .btp-divider { height: 1px; background: #f0ece4; margin: 16px 0; }

//   /* Summary */
//   .btp-summary-row {
//     display: flex; justify-content: space-between; align-items: center;
//     font-size: 13px; padding: 6px 0;
//     color: #9a9186; border-bottom: 1px solid #f5f2ee;
//   }
//   .btp-summary-row span:last-child { color: #1a2332; font-weight: 500; text-align: right; max-width: 55%; }

//   /* Total */
//   .btp-total-row {
//     display: flex; justify-content: space-between; align-items: center;
//     background: #f0ece4; border: 1.5px solid #e0d9d0;
//     border-radius: 12px; padding: 14px 16px; margin: 16px 0 18px;
//   }
//   .btp-total-label {
//     font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
//     text-transform: uppercase; color: #9a9186; margin-bottom: 2px;
//   }
//   .btp-total-sub { font-size: 11px; color: #b8b0a5; }
//   .btp-total-price {
//     font-family: 'Bebas Neue', sans-serif;
//     font-size: 36px; letter-spacing: 0.04em; color: #f97316;
//   }

//   /* Pay button */
//   .btp-pay-btn {
//     width: 100%; background: #1a2332;
//     border: none; border-radius: 12px;
//     padding: 15px 24px; font-size: 15px; font-weight: 700;
//     color: #fff; cursor: pointer;
//     font-family: 'DM Sans', sans-serif; letter-spacing: 0.04em;
//     display: flex; align-items: center; justify-content: center; gap: 10px;
//     transition: background 0.2s, transform 0.15s;
//     position: relative; overflow: hidden;
//   }
//   .btp-pay-btn::after {
//     content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
//     background: linear-gradient(90deg, #f97316, #fb923c);
//   }
//   .btp-pay-btn:hover:not(:disabled) { background: #243044; transform: translateY(-2px); }
//   .btp-pay-btn:active:not(:disabled) { transform: translateY(0); }
//   .btp-pay-btn:disabled { opacity: 0.45; cursor: not-allowed; }
//   .btp-pay-btn-dot {
//     width: 22px; height: 22px; background: #f97316;
//     border-radius: 6px; display: flex; align-items: center;
//     justify-content: center; font-size: 12px; flex-shrink: 0;
//   }
//   .btp-btn-spinner {
//     width: 18px; height: 18px;
//     border: 2px solid rgba(255,255,255,0.3);
//     border-top: 2px solid #fff;
//     border-radius: 50%;
//     animation: btp-spin 0.7s linear infinite;
//   }
//   .btp-secure-note {
//     text-align: center; font-size: 11px;
//     color: #b8b0a5; margin-top: 12px;
//     display: flex; align-items: center; justify-content: center; gap: 6px;
//   }

//   /* Responsive */
//   @media (max-width: 860px) {
//     .btp-grid { grid-template-columns: 1fr; }
//     .btp-form-card { position: static; }
//     .btp-ticket-body { grid-template-columns: 1fr 1fr; gap: 14px; }
//     .btp-tc-divider { display: none; }
//     .btp-route-strip { flex-wrap: wrap; }
//     .btp-body { padding: 24px 16px 48px; }
//     .btp-header { padding: 24px 20px 36px; }
//   }
// `;

// /* ══════════════════════════════════════════
//    COMPONENT
// ══════════════════════════════════════════ */
// const BookTicketPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { train, ticket } = location.state || {};

//   const [formData, setFormData] = React.useState({
//     name: "", phone: "", age: "", gender: "", aadhar: "",
//   });
//   const [errors, setErrors] = React.useState({});
//   const [loading, setLoading] = React.useState(false);

//   /* ── Category color (same as TicketPage) ── */
//   const getCatStyle = (cat = "") => {
//     const c = cat.toLowerCase();
//     if (c.includes("1a") || c.includes("first ac")) return { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)", icon: "👑" };
//     if (c.includes("2a") || c.includes("second ac")) return { color: "#6366f1", bg: "rgba(99,102,241,0.1)", border: "rgba(99,102,241,0.25)", icon: "⭐" };
//     if (c.includes("3a") || c.includes("third ac")) return { color: "#0ea5e9", bg: "rgba(14,165,233,0.1)", border: "rgba(14,165,233,0.25)", icon: "🔵" };
//     if (c.includes("sl") || c.includes("sleeper")) return { color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)", icon: "🌙" };
//     if (c.includes("cc") || c.includes("chair")) return { color: "#f97316", bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.25)", icon: "💺" };
//     return { color: "#9a9186", bg: "rgba(154,145,134,0.1)", border: "rgba(154,145,134,0.25)", icon: "🎫" };
//   };

//   /* ── Error page ── */
//   if (!train || !ticket) {
//     return (
//       <>
//         <style>{BASE_STYLES}</style>
//         <div style={{ minHeight: "100vh", background: "#f0ece4", display: "flex", alignItems: "center", justifyContent: "center" }}>
//           <div style={{ background: "#fff", border: "1.5px solid #e8e2da", borderRadius: 16, padding: "48px 56px", textAlign: "center" }}>
//             <div style={{ fontSize: 48, marginBottom: 16 }}>🚂</div>
//             <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, letterSpacing: "0.04em", color: "#1a2332", margin: "0 0 10px" }}>
//               No Ticket Data Found
//             </h2>
//             <p style={{ color: "#9a9186", marginBottom: 24, fontSize: 14 }}>Please go back and select a train first.</p>
//             <button
//               onClick={() => navigate(-1)}
//               style={{ background: "#1a2332", border: "none", borderRadius: 10, padding: "12px 28px", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}
//             >
//               ← Go Back
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   const catStyle = getCatStyle(ticket.category);

//   /* ── Aadhar mask ── */
//   const maskedAadhar = formData.aadhar.length === 12
//     ? `XXXX XXXX ${formData.aadhar.slice(8)}`
//     : "";

//   /* ── Validation ── */
//   const validate = () => {
//     const e = {};
//     if (!formData.name.trim()) e.name = "Full name is required";
//     if (!/^[6-9]\d{9}$/.test(formData.phone)) e.phone = "Enter valid 10-digit mobile number";
//     if (!formData.age || formData.age < 1 || formData.age > 120) e.age = "Enter a valid age (1–120)";
//     if (!formData.gender) e.gender = "Please select gender";
//     if (!/^\d{12}$/.test(formData.aadhar)) e.aadhar = "Enter valid 12-digit Aadhar number";
//     return e;
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
//   };

//   /* ── Fake Payment ── */
//   const handlePay = async () => {
//     const errs = validate();
//     if (Object.keys(errs).length) { setErrors(errs); return; }

//     setLoading(true);

//     // Simulate payment processing delay (2 seconds)
//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     try {
//       // Save ticket to backend after fake payment success
//       const verify = await axios.post("http://localhost:5000/api/verify-payment", {
//         order_id: "fake_order_" + Date.now(),
//         payment_id: "fake_pay_" + Date.now(),
//         signature: "fake_signature",
//         train,
//         ticket,
//         passenger: formData,
//       });

//       if (verify.data.success) {
//         navigate("/ticket-confirm", { state: { ticket: verify.data.ticket } });
//       } else {
//         setLoading(false);
//         alert("⚠️ Ticket could not be saved. Contact support.");
//       }
//     } catch {
//       setLoading(false);
//       alert("❌ Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <>
//       <style>{BASE_STYLES}</style>

//       {/* Loading Overlay */}
//       {loading && (
//         <div className="btp-overlay">
//           <div className="btp-overlay-spinner" />
//           <div className="btp-overlay-title">Processing Payment</div>
//           <div className="btp-overlay-sub">Please do not close this window…</div>
//         </div>
//       )}

//       <div className="btp-root">

//         {/* ══ DARK HEADER ══ */}
//         <div className="btp-header">
//           <div className="btp-header-inner">

//             <button className="btp-nav-back" onClick={() => navigate(-1)}>
//               ← Back to Ticket Selection
//             </button>

//             <div className="btp-train-identity">
//               <div className="btp-train-num-tag">Train No. {train.train_number}</div>
//               <div className="btp-train-title">{train.train_name}</div>
//             </div>

//             {/* Route strip */}
//             <div className="btp-route-strip">
//               <div className="btp-route-cell">
//                 <div className="btp-route-label">From</div>
//                 <div className="btp-route-value">{train.source_station}</div>
//                 <div className="btp-route-sub">Departure · {train.start_time}</div>
//               </div>

//               <div className="btp-route-arrow">
//                 <div className="btp-arrow-line" />
//               </div>

//               <div className="btp-route-cell">
//                 <div className="btp-route-label">To</div>
//                 <div className="btp-route-value">{train.destination_station}</div>
//                 <div className="btp-route-sub">Arrival · {train.end_time}</div>
//               </div>

//               <div className="btp-route-cell btp-route-cell--sep">
//                 <div className="btp-route-label">Class</div>
//                 <div className="btp-cat-badge" style={{ color: catStyle.color, background: catStyle.bg, borderColor: catStyle.border }}>
//                   {catStyle.icon} {ticket.category}
//                 </div>
//               </div>

//               <div className="btp-route-cell btp-route-cell--sep">
//                 <div className="btp-route-label">Fare</div>
//                 <div className="btp-header-price">₹{ticket.price}</div>
//                 <div className="btp-route-sub">Per passenger</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ══ BODY ══ */}
//         <div className="btp-body">
//           <div className="btp-grid">

//             {/* ── LEFT: Journey Summary ── */}
//             <div>
//               <div className="btp-section-label">Journey Summary</div>

//               {/* Ticket card — styled exactly like TicketPage */}
//               <div className="btp-ticket-card">
//                 <div className="btp-ticket-bar" style={{ background: catStyle.color }} />
//                 <div className="btp-perf">
//                   {[...Array(6)].map((_, i) => <div className="btp-perf-dot" key={i} />)}
//                 </div>
//                 <div className="btp-ticket-body">
//                   <div className="btp-tc-cell">
//                     <div className="btp-tc-label">Class</div>
//                     <div className="btp-cat-badge" style={{ color: catStyle.color, background: catStyle.bg, borderColor: catStyle.border }}>
//                       {catStyle.icon} {ticket.category}
//                     </div>
//                   </div>
//                   <div className="btp-tc-divider" />
//                   <div className="btp-tc-cell">
//                     <div className="btp-tc-label">Route</div>
//                     <div className="btp-tc-value">{train.source_station} → {train.destination_station}</div>
//                     <div className="btp-tc-sub">{ticket.distance_km} KM total</div>
//                   </div>
//                   <div className="btp-tc-divider" />
//                   <div className="btp-tc-cell">
//                     <div className="btp-tc-label">Timings</div>
//                     <div className="btp-tc-value">{train.start_time} → {train.end_time}</div>
//                     <div className="btp-tc-sub">Dep. → Arr.</div>
//                   </div>
//                   <div className="btp-tc-divider" />
//                   <div className="btp-tc-cell">
//                     <div className="btp-tc-label">Fare</div>
//                     <div className="btp-price" style={{ color: catStyle.color }}>₹{ticket.price}</div>
//                     <div className="btp-price-sub">Per passenger</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Info note */}
//               <div className="btp-info-note">
//                 <div className="btp-info-note-title">📋 Important Information</div>
//                 <ul className="btp-info-list">
//                   <li>Aadhar number is required for identity verification during travel</li>
//                   <li>E-Ticket will be sent to your registered mobile number via SMS</li>
//                   <li>Carry a valid government-issued photo ID while travelling</li>
//                   <li>Cancellation policy applies as per railway regulations</li>
//                 </ul>
//               </div>

//               <div className="btp-chips">
//                 <div className="btp-chip">🎫 E-Ticket</div>
//                 <div className="btp-chip">✅ Instant Confirmation</div>
//                 <div className="btp-chip">🔒 Secured Payment</div>
//                 <div className="btp-chip">📲 SMS Alert</div>
//               </div>
//             </div>

//             {/* ── RIGHT: Passenger Form ── */}
//             <div className="btp-form-card">
//               <div className="btp-form-head">
//                 <div className="btp-form-head-icon">👤</div>
//                 <div>
//                   <div className="btp-form-title">Passenger Details</div>
//                   <div className="btp-form-sub">Fill in your information to continue</div>
//                 </div>
//               </div>

//               <div className="btp-form-body">

//                 {/* Name */}
//                 <div className="btp-field">
//                   <label className="btp-label">Full Name</label>
//                   <div className="btp-input-wrap">
//                     <span className="btp-input-icon-el">👤</span>
//                     <input className={`btp-input ${errors.name ? "btp-input--err" : ""}`}
//                       type="text" name="name" value={formData.name}
//                       placeholder="Enter your full name" onChange={handleChange} />
//                   </div>
//                   {errors.name && <div className="btp-err-txt">⚠ {errors.name}</div>}
//                 </div>

//                 {/* Phone */}
//                 <div className="btp-field">
//                   <label className="btp-label">Mobile Number</label>
//                   <div className="btp-input-wrap">
//                     <span className="btp-input-icon-el">📱</span>
//                     <input className={`btp-input ${errors.phone ? "btp-input--err" : ""}`}
//                       type="tel" name="phone" value={formData.phone}
//                       placeholder="10-digit mobile number" maxLength={10} onChange={handleChange} />
//                   </div>
//                   {errors.phone && <div className="btp-err-txt">⚠ {errors.phone}</div>}
//                 </div>

//                 {/* Age + Gender */}
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//                   <div className="btp-field">
//                     <label className="btp-label">Age</label>
//                     <input className={`btp-input ${errors.age ? "btp-input--err" : ""}`}
//                       type="number" name="age" min="1" max="120"
//                       value={formData.age} placeholder="Age" onChange={handleChange} />
//                     {errors.age && <div className="btp-err-txt">⚠ {errors.age}</div>}
//                   </div>
//                   <div className="btp-field">
//                     <label className="btp-label">Gender</label>
//                     <select className={`btp-select ${errors.gender ? "btp-input--err" : ""}`}
//                       name="gender" value={formData.gender} onChange={handleChange}>
//                       <option value="">Select</option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                       <option value="other">Other</option>
//                     </select>
//                     {errors.gender && <div className="btp-err-txt">⚠ {errors.gender}</div>}
//                   </div>
//                 </div>

//                 {/* Aadhar */}
//                 <div className="btp-field">
//                   <label className="btp-label">Aadhar Card Number</label>
//                   <div className="btp-input-wrap">
//                     <span className="btp-input-icon-el">🪪</span>
//                     <input className={`btp-input ${errors.aadhar ? "btp-input--err" : ""}`}
//                       type="text" name="aadhar" value={formData.aadhar}
//                       placeholder="12-digit Aadhar number" maxLength={12} onChange={handleChange} />
//                   </div>
//                   {errors.aadhar && <div className="btp-err-txt">⚠ {errors.aadhar}</div>}
//                   {maskedAadhar && !errors.aadhar && (
//                     <div style={{ fontSize: 11, color: "#10b981", marginTop: 5, fontWeight: 600 }}>
//                       ✓ {maskedAadhar}
//                     </div>
//                   )}
//                 </div>

//                 <div className="btp-divider" />

//                 {/* Summary */}
//                 <div className="btp-summary-row"><span>Train</span><span>{train.train_name}</span></div>
//                 <div className="btp-summary-row"><span>Route</span><span>{train.source_station} → {train.destination_station}</span></div>
//                 <div className="btp-summary-row"><span>Category</span><span>{ticket.category}</span></div>
//                 <div className="btp-summary-row"><span>Distance</span><span>{ticket.distance_km} KM</span></div>

//                 {/* Total */}
//                 <div className="btp-total-row">
//                   <div>
//                     <div className="btp-total-label">Total Amount</div>
//                     <div className="btp-total-sub">Inclusive of all charges</div>
//                   </div>
//                   <div className="btp-total-price">₹{ticket.price}</div>
//                 </div>

//                 {/* Pay Button */}
//                 <button className="btp-pay-btn" onClick={handlePay} disabled={loading}>
//                   {loading ? (
//                     <><div className="btp-btn-spinner" /> Processing…</>
//                   ) : (
//                     <><div className="btp-pay-btn-dot">→</div> Pay ₹{ticket.price} Securely</>
//                   )}
//                 </button>

//                 <div className="btp-secure-note">
//                   🛡️ Secured Payment · 256-bit SSL Encrypted
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BookTicketPage;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

/* ══════════════════════════════════════════
   STYLES — exact TicketPage color palette
   Navy #1a2332 | Orange #f97316 | Cream #f0ece4
   White cards | Border #e8e2da | Muted #9a9186
══════════════════════════════════════════ */
const BASE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .btp-root *, .btp-root *::before, .btp-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .btp-root {
    min-height: 100vh;
    background: #f0ece4;
    font-family: 'DM Sans', sans-serif;
    color: #1a2332;
  }

  /* Loading Overlay */
  .btp-overlay {
    position: fixed; inset: 0;
    background: rgba(10,15,28,0.85);
    z-index: 9999;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 18px;
  }
  .btp-overlay-spinner {
    width: 52px; height: 52px;
    border: 3px solid rgba(249,115,22,0.2);
    border-top: 3px solid #f97316;
    border-radius: 50%;
    animation: btp-spin 0.75s linear infinite;
  }
  .btp-overlay-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px; letter-spacing: 0.06em; color: #fff;
  }
  .btp-overlay-sub { font-size: 13px; color: rgba(255,255,255,0.4); font-weight: 300; }
  @keyframes btp-spin { to { transform: rotate(360deg); } }

  /* ══ DARK HEADER (same as TicketPage) ══ */
  .btp-header {
    background: #1a2332;
    position: relative; overflow: hidden;
    padding: 36px 32px 48px;
  }
  .btp-header::before {
    content: '';
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      -55deg, transparent, transparent 28px,
      rgba(255,255,255,0.02) 28px, rgba(255,255,255,0.02) 29px
    );
  }
  .btp-header::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, #f97316, #fb923c, #fdba74);
  }
  .btp-header-inner {
    max-width: 1080px; margin: 0 auto;
    position: relative; z-index: 1;
  }

  .btp-nav-back {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 8px; padding: 7px 14px;
    color: rgba(255,255,255,0.6); font-size: 12px; font-weight: 500;
    cursor: pointer; margin-bottom: 24px;
    transition: all 0.2s; font-family: 'DM Sans', sans-serif;
  }
  .btp-nav-back:hover { background: rgba(255,255,255,0.12); color: #fff; }

  .btp-train-identity { margin-bottom: 24px; }
  .btp-train-num-tag {
    font-size: 10px; font-weight: 700; letter-spacing: 0.16em;
    text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 4px;
  }
  .btp-train-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(28px, 4vw, 44px);
    color: #fff; letter-spacing: 0.04em; line-height: 1;
  }

  /* Route strip */
  .btp-route-strip {
    display: flex; align-items: stretch;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px; overflow: hidden;
  }
  .btp-route-cell { flex: 1; padding: 14px 20px; }
  .btp-route-cell--sep { border-left: 1px solid rgba(255,255,255,0.07); flex: 0 0 auto; min-width: 130px; }
  .btp-route-label {
    font-size: 9px; font-weight: 700; letter-spacing: 0.16em;
    text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 5px;
  }
  .btp-route-value {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px; color: #fff; letter-spacing: 0.04em; line-height: 1;
  }
  .btp-route-sub { font-size: 11px; color: rgba(255,255,255,0.35); font-weight: 300; margin-top: 2px; }
  .btp-route-arrow {
    padding: 0 14px;
    display: flex; align-items: center; justify-content: center;
  }
  .btp-arrow-line {
    width: 40px; height: 2px;
    background: linear-gradient(90deg, rgba(249,115,22,0.4), #f97316);
    border-radius: 2px; position: relative;
  }
  .btp-arrow-line::after {
    content: '▶'; position: absolute; right: -8px; top: 50%;
    transform: translateY(-50%); color: #f97316; font-size: 9px;
  }
  .btp-header-price {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px; color: #f97316; letter-spacing: 0.04em; line-height: 1; margin-top: 4px;
  }

  /* Category badge */
  .btp-cat-badge {
    display: inline-flex; align-items: center; gap: 6px;
    border-radius: 8px; padding: 5px 10px; border: 1.5px solid;
    font-size: 12px; font-weight: 700; letter-spacing: 0.04em; margin-top: 4px;
  }

  /* ══ BODY ══ */
  .btp-body {
    max-width: 1080px; margin: 0 auto;
    padding: 36px 32px 64px;
  }
  .btp-grid {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 24px; align-items: start;
  }

  /* Section label */
  .btp-section-label {
    font-size: 10px; font-weight: 600; letter-spacing: 0.16em;
    text-transform: uppercase; color: #9a9186;
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 12px;
  }
  .btp-section-label::after { content: ''; flex: 1; height: 1px; background: #e0d9d0; }

  /* Ticket summary card (same as TicketPage ticket cards) */
  .btp-ticket-card {
    background: #fff;
    border: 1.5px solid #e8e2da;
    border-radius: 16px;
    display: flex; align-items: stretch; overflow: hidden;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  }
  .btp-ticket-bar { width: 5px; flex-shrink: 0; }
  .btp-perf {
    width: 24px; flex-shrink: 0;
    display: flex; flex-direction: column;
    justify-content: space-around; align-items: center;
    padding: 8px 0;
    background: #faf8f5;
    border-right: 1.5px dashed #e0d9d0;
  }
  .btp-perf-dot {
    width: 8px; height: 8px;
    background: #f0ece4; border-radius: 50%;
    border: 1px solid #e0d9d0;
  }
  .btp-ticket-body {
    flex: 1; display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
    align-items: center; padding: 20px 24px;
  }
  .btp-tc-cell { padding: 0 14px; }
  .btp-tc-cell:first-child { padding-left: 0; }
  .btp-tc-divider { width: 1px; align-self: stretch; background: #f0ece4; margin: 4px 0; }
  .btp-tc-label {
    font-size: 9px; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: #b8b0a5; margin-bottom: 5px;
  }
  .btp-tc-value { font-size: 14px; font-weight: 600; color: #1a2332; line-height: 1.3; }
  .btp-tc-sub { font-size: 11px; color: #9a9186; font-weight: 300; margin-top: 2px; }
  .btp-price {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 30px; letter-spacing: 0.04em; line-height: 1;
  }
  .btp-price-sub { font-size: 10px; color: #9a9186; margin-top: 3px; }

  /* Info note */
  .btp-info-note {
    background: #fff; border: 1.5px solid #e8e2da;
    border-left: 4px solid #f97316;
    border-radius: 12px; padding: 16px 20px; margin-bottom: 16px;
  }
  .btp-info-note-title { font-size: 13px; font-weight: 700; color: #1a2332; margin-bottom: 8px; }
  .btp-info-list { padding-left: 16px; color: #9a9186; font-size: 12px; line-height: 1.9; }

  /* Chips */
  .btp-chips { display: flex; gap: 10px; flex-wrap: wrap; }
  .btp-chip {
    display: flex; align-items: center; gap: 6px;
    background: #fff; border: 1.5px solid #e8e2da;
    border-radius: 40px; padding: 6px 14px;
    font-size: 12px; color: #9a9186; font-weight: 500;
  }

  /* ══ FORM CARD ══ */
  .btp-form-card {
    background: #fff;
    border: 1.5px solid #e8e2da;
    border-radius: 16px; overflow: hidden;
    position: sticky; top: 24px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.07);
  }
  .btp-form-head {
    background: #1a2332;
    padding: 20px 24px;
    display: flex; align-items: center; gap: 14px;
    position: relative; overflow: hidden;
  }
  .btp-form-head::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #f97316, #fb923c, #fdba74);
  }
  .btp-form-head-icon {
    width: 42px; height: 42px; border-radius: 10px;
    background: #f97316;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
  }
  .btp-form-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px; letter-spacing: 0.04em; color: #fff; margin-bottom: 2px;
  }
  .btp-form-sub { font-size: 12px; color: rgba(255,255,255,0.4); font-weight: 300; }

  .btp-form-body { padding: 22px 24px; }

  /* Fields */
  .btp-field { margin-bottom: 14px; }
  .btp-label {
    display: block; font-size: 9px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: #b8b0a5; margin-bottom: 7px;
  }
  .btp-input-wrap { position: relative; }
  .btp-input-icon-el {
    position: absolute; left: 12px; top: 50%;
    transform: translateY(-50%); font-size: 14px;
    color: #b8b0a5; pointer-events: none;
  }
  .btp-input-wrap .btp-input { padding-left: 38px; }

  .btp-input, .btp-select {
    width: 100%;
    background: #faf8f5;
    border: 1.5px solid #e8e2da;
    border-radius: 10px; padding: 11px 14px;
    font-size: 14px; color: #1a2332;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .btp-input::placeholder { color: #c8c0b8; }
  .btp-input:focus, .btp-select:focus {
    border-color: #f97316;
    box-shadow: 0 0 0 3px rgba(249,115,22,0.1);
    background: #fff;
  }
  .btp-input--err { border-color: #ef4444 !important; }
  .btp-select { cursor: pointer; }
  .btp-err-txt { font-size: 11px; color: #ef4444; margin-top: 5px; font-weight: 500; }

  .btp-divider { height: 1px; background: #f0ece4; margin: 16px 0; }

  /* Summary */
  .btp-summary-row {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 13px; padding: 6px 0;
    color: #9a9186; border-bottom: 1px solid #f5f2ee;
  }
  .btp-summary-row span:last-child { color: #1a2332; font-weight: 500; text-align: right; max-width: 55%; }

  /* Total */
  .btp-total-row {
    display: flex; justify-content: space-between; align-items: center;
    background: #f0ece4; border: 1.5px solid #e0d9d0;
    border-radius: 12px; padding: 14px 16px; margin: 16px 0 18px;
  }
  .btp-total-label {
    font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: #9a9186; margin-bottom: 2px;
  }
  .btp-total-sub { font-size: 11px; color: #b8b0a5; }
  .btp-total-price {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 36px; letter-spacing: 0.04em; color: #f97316;
  }

  /* Pay button */
  .btp-pay-btn {
    width: 100%; background: #1a2332;
    border: none; border-radius: 12px;
    padding: 15px 24px; font-size: 15px; font-weight: 700;
    color: #fff; cursor: pointer;
    font-family: 'DM Sans', sans-serif; letter-spacing: 0.04em;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    transition: background 0.2s, transform 0.15s;
    position: relative; overflow: hidden;
  }
  .btp-pay-btn::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #f97316, #fb923c);
  }
  .btp-pay-btn:hover:not(:disabled) { background: #243044; transform: translateY(-2px); }
  .btp-pay-btn:active:not(:disabled) { transform: translateY(0); }
  .btp-pay-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .btp-pay-btn-dot {
    width: 22px; height: 22px; background: #f97316;
    border-radius: 6px; display: flex; align-items: center;
    justify-content: center; font-size: 12px; flex-shrink: 0;
  }
  .btp-btn-spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top: 2px solid #fff;
    border-radius: 50%;
    animation: btp-spin 0.7s linear infinite;
  }
  .btp-secure-note {
    text-align: center; font-size: 11px;
    color: #b8b0a5; margin-top: 12px;
    display: flex; align-items: center; justify-content: center; gap: 6px;
  }

  /* Responsive */
  @media (max-width: 860px) {
    .btp-grid { grid-template-columns: 1fr; }
    .btp-form-card { position: static; }
    .btp-ticket-body { grid-template-columns: 1fr 1fr; gap: 14px; }
    .btp-tc-divider { display: none; }
    .btp-route-strip { flex-wrap: wrap; }
    .btp-body { padding: 24px 16px 48px; }
    .btp-header { padding: 24px 20px 36px; }
  }
`;

/* ══════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════ */
const BookTicketPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, ticket } = location.state || {};

  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    age: "",
    gender: "",
    aadhar: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  /* ── Category color (same as TicketPage) ── */
  const getCatStyle = (cat = "") => {
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

  /* ── Error page ── */
  if (!train || !ticket) {
    return (
      <>
        <style>{BASE_STYLES}</style>
        <div
          style={{
            minHeight: "100vh",
            background: "#f0ece4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              border: "1.5px solid #e8e2da",
              borderRadius: 16,
              padding: "48px 56px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>🚂</div>
            <h2
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: 32,
                letterSpacing: "0.04em",
                color: "#1a2332",
                margin: "0 0 10px",
              }}
            >
              No Ticket Data Found
            </h2>
            <p style={{ color: "#9a9186", marginBottom: 24, fontSize: 14 }}>
              Please go back and select a train first.
            </p>
            <button
              onClick={() => navigate(-1)}
              style={{
                background: "#1a2332",
                border: "none",
                borderRadius: 10,
                padding: "12px 28px",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              ← Go Back
            </button>
          </div>
        </div>
      </>
    );
  }

  const catStyle = getCatStyle(ticket.category);

  /* ── Aadhar mask ── */
  const maskedAadhar =
    formData.aadhar.length === 12
      ? `XXXX XXXX ${formData.aadhar.slice(8)}`
      : "";

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Full name is required";
    if (!/^[6-9]\d{9}$/.test(formData.phone))
      e.phone = "Enter valid 10-digit mobile number";
    if (!formData.age || formData.age < 1 || formData.age > 120)
      e.age = "Enter a valid age (1–120)";
    if (!formData.gender) e.gender = "Please select gender";
    if (!/^\d{12}$/.test(formData.aadhar))
      e.aadhar = "Enter valid 12-digit Aadhar number";
    return e;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  /* ── Fake Payment ── */

  const handlePay = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const verify = await axios.post(
        "https://railway-management-0pvq.onrender.com/api/tickets/verify-payment",
        {
          // ✅ FLAT FORMAT
          razorpay_order_id: "fake_order_" + Date.now(),
          razorpay_payment_id: "fake_pay_" + Date.now(),

          train_no: train.train_number,
          train_name: train.train_name,

          from_station: ticket.from,
          to_station: ticket.to,
          distance_km: ticket.distance_km,
          price: ticket.price,
          category: ticket.category,

          start_time: train.start_time || train.departure_time,
          end_time: train.end_time || train.arrival_time,

          passenger_name: formData.name,
          passenger_phone: formData.phone,
          passenger_age: formData.age,
          passenger_gender: formData.gender,
        },
        { withCredentials: true },
      );

      if (verify.data.success) {
        // ✅ TicketConfirm.jsx ke hisab se format
        navigate("/ticket-confirm", {
          state: {
            ticket: {
              pnr: verify.data.ticket.PNR,
              status: verify.data.ticket.status,
              price: verify.data.ticket.price,
              payment_id: verify.data.ticket.payment_id,
              order_id: verify.data.ticket.order_id,
              category: verify.data.ticket.category,

              train: {
                number: verify.data.ticket.train_no,
                name: verify.data.ticket.train_name,
                from: verify.data.ticket.from_station,
                to: verify.data.ticket.to_station,
                start_time: verify.data.ticket.start_time,
                end_time: verify.data.ticket.end_time,
                distance: verify.data.ticket.distance_km,
              },

              passenger: {
                name: verify.data.ticket.passenger_name,
                phone: verify.data.ticket.passenger_phone,
                age: verify.data.ticket.passenger_age,
                gender: verify.data.ticket.passenger_gender,
              },
            },
          },
        });
      } else {
        setLoading(false);
        alert("⚠️ Ticket could not be saved. Contact support.");
      }
    } catch (err) {
      console.log("ERROR:", err.message);
      setLoading(false);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  //   const errs = validate();
  //   if (Object.keys(errs).length) {
  //     setErrors(errs);
  //     return;
  //   }

  //   setLoading(true);

  //   // Simulate payment processing delay (2 seconds)
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   console.log("URL:", "http://localhost:5000/api/tickets/verify-payment");
  //   console.log("DATA:", "dataJoSendHoRahaHai");

  //   try {
  //     // Save ticket to backend after fake payment success
  //     const token = localStorage.getItem("token");
  //     const verify = await axios.post(
  //       "http://localhost:5000/api/tickets/verify-payment",
  //       {
  //         order_id: "fake_order_" + Date.now(),
  //         payment_id: "fake_pay_" + Date.now(),
  //         signature: "fake_signature",
  //         train,
  //         ticket,
  //         passenger: formData,
  //       },
  //       {
  //         withCredentials: true,
  //       },
  //     );

  //     if (verify.data.success) {
  //       navigate("/ticket-confirm", { state: { ticket: verify.data.ticket } });
  //     } else {
  //       setLoading(false);
  //       alert("⚠️ Ticket could not be saved. Contact support.");
  //     }
  //   } catch {
  //     setLoading(false);
  //     alert("❌ Something went wrong. Please try again.");
  //   }
  // };

  return (
    <>
      <style>{BASE_STYLES}</style>

      {/* Loading Overlay */}
      {loading && (
        <div className="btp-overlay">
          <div className="btp-overlay-spinner" />
          <div className="btp-overlay-title">Processing Payment</div>
          <div className="btp-overlay-sub">
            Please do not close this window…
          </div>
        </div>
      )}

      <div className="btp-root">
        {/* ══ DARK HEADER ══ */}
        <div className="btp-header">
          <div className="btp-header-inner">
            <button className="btp-nav-back" onClick={() => navigate(-1)}>
              ← Back to Ticket Selection
            </button>

            <div className="btp-train-identity">
              <div className="btp-train-num-tag">
                Train No. {train.train_number}
              </div>
              <div className="btp-train-title">{train.train_name}</div>
            </div>

            {/* Route strip */}
            <div className="btp-route-strip">
              <div className="btp-route-cell">
                <div className="btp-route-label">From</div>
                <div className="btp-route-value">{train.source_station}</div>
                <div className="btp-route-sub">
                  Departure · {train.start_time}
                </div>
              </div>

              <div className="btp-route-arrow">
                <div className="btp-arrow-line" />
              </div>

              <div className="btp-route-cell">
                <div className="btp-route-label">To</div>
                <div className="btp-route-value">
                  {train.destination_station}
                </div>
                <div className="btp-route-sub">Arrival · {train.end_time}</div>
              </div>

              <div className="btp-route-cell btp-route-cell--sep">
                <div className="btp-route-label">Class</div>
                <div
                  className="btp-cat-badge"
                  style={{
                    color: catStyle.color,
                    background: catStyle.bg,
                    borderColor: catStyle.border,
                  }}
                >
                  {catStyle.icon} {ticket.category}
                </div>
              </div>

              <div className="btp-route-cell btp-route-cell--sep">
                <div className="btp-route-label">Fare</div>
                <div className="btp-header-price">₹{ticket.price}</div>
                <div className="btp-route-sub">Per passenger</div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ BODY ══ */}
        <div className="btp-body">
          <div className="btp-grid">
            {/* ── LEFT: Journey Summary ── */}
            <div>
              <div className="btp-section-label">Journey Summary</div>

              {/* Ticket card — styled exactly like TicketPage */}
              <div className="btp-ticket-card">
                <div
                  className="btp-ticket-bar"
                  style={{ background: catStyle.color }}
                />
                <div className="btp-perf">
                  {[...Array(6)].map((_, i) => (
                    <div className="btp-perf-dot" key={i} />
                  ))}
                </div>
                <div className="btp-ticket-body">
                  <div className="btp-tc-cell">
                    <div className="btp-tc-label">Class</div>
                    <div
                      className="btp-cat-badge"
                      style={{
                        color: catStyle.color,
                        background: catStyle.bg,
                        borderColor: catStyle.border,
                      }}
                    >
                      {catStyle.icon} {ticket.category}
                    </div>
                  </div>
                  <div className="btp-tc-divider" />
                  <div className="btp-tc-cell">
                    <div className="btp-tc-label">Route</div>
                    <div className="btp-tc-value">
                      {train.source_station} → {train.destination_station}
                    </div>
                    <div className="btp-tc-sub">
                      {ticket.distance_km} KM total
                    </div>
                  </div>
                  <div className="btp-tc-divider" />
                  <div className="btp-tc-cell">
                    <div className="btp-tc-label">Timings</div>
                    <div className="btp-tc-value">
                      {train.start_time} → {train.end_time}
                    </div>
                    <div className="btp-tc-sub">Dep. → Arr.</div>
                  </div>
                  <div className="btp-tc-divider" />
                  <div className="btp-tc-cell">
                    <div className="btp-tc-label">Fare</div>
                    <div
                      className="btp-price"
                      style={{ color: catStyle.color }}
                    >
                      ₹{ticket.price}
                    </div>
                    <div className="btp-price-sub">Per passenger</div>
                  </div>
                </div>
              </div>

              {/* Info note */}
              <div className="btp-info-note">
                <div className="btp-info-note-title">
                  {" "}
                  Important Information
                </div>
                <ul className="btp-info-list">
                  <li>
                    Aadhar number is required for identity verification during
                    travel
                  </li>
                  <li>
                    E-Ticket will be sent to your registered mobile number via
                    SMS
                  </li>
                  <li>
                    Carry a valid government-issued photo ID while travelling
                  </li>
                  <li>
                    Cancellation policy applies as per railway regulations
                  </li>
                </ul>
              </div>

              <div className="btp-chips">
                <div className="btp-chip">🎫 E-Ticket</div>
                <div className="btp-chip">✅ Instant Confirmation</div>
                <div className="btp-chip">🔒 Secured Payment</div>
                <div className="btp-chip">📲 SMS Alert</div>
              </div>
            </div>

            {/* ── RIGHT: Passenger Form ── */}
            <div className="btp-form-card">
              <div className="btp-form-head">
                {/* <div className="btp-form-head-icon">👤</div> */}
                <div>
                  <div className="btp-form-title">Passenger Details</div>
                  <div className="btp-form-sub">
                    Fill in your information to continue
                  </div>
                </div>
              </div>

              <div className="btp-form-body">
                {/* Name */}
                <div className="btp-field">
                  <label className="btp-label">Full Name</label>
                  <div className="btp-input-wrap">
                    <span className="btp-input-icon-el">👤</span>
                    <input
                      className={`btp-input ${errors.name ? "btp-input--err" : ""}`}
                      type="text"
                      name="name"
                      value={formData.name}
                      placeholder="Enter your full name"
                      onChange={handleChange}
                    />
                  </div>
                  {errors.name && (
                    <div className="btp-err-txt">⚠ {errors.name}</div>
                  )}
                </div>

                {/* Phone */}
                <div className="btp-field">
                  <label className="btp-label">Mobile Number</label>
                  <div className="btp-input-wrap">
                    <span className="btp-input-icon-el">📱</span>
                    <input
                      className={`btp-input ${errors.phone ? "btp-input--err" : ""}`}
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.phone && (
                    <div className="btp-err-txt">⚠ {errors.phone}</div>
                  )}
                </div>

                {/* Age + Gender */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <div className="btp-field">
                    <label className="btp-label">Age</label>
                    <input
                      className={`btp-input ${errors.age ? "btp-input--err" : ""}`}
                      type="number"
                      name="age"
                      min="1"
                      max="120"
                      value={formData.age}
                      placeholder="Age"
                      onChange={handleChange}
                    />
                    {errors.age && (
                      <div className="btp-err-txt">⚠ {errors.age}</div>
                    )}
                  </div>
                  <div className="btp-field">
                    <label className="btp-label">Gender</label>
                    <select
                      className={`btp-select ${errors.gender ? "btp-input--err" : ""}`}
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <div className="btp-err-txt">⚠ {errors.gender}</div>
                    )}
                  </div>
                </div>

                {/* Aadhar */}
                <div className="btp-field">
                  <label className="btp-label">Aadhar Card Number</label>
                  <div className="btp-input-wrap">
                    <span className="btp-input-icon-el">🪪</span>
                    <input
                      className={`btp-input ${errors.aadhar ? "btp-input--err" : ""}`}
                      type="text"
                      name="aadhar"
                      value={formData.aadhar}
                      placeholder="12-digit Aadhar number"
                      maxLength={12}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.aadhar && (
                    <div className="btp-err-txt">⚠ {errors.aadhar}</div>
                  )}
                  {maskedAadhar && !errors.aadhar && (
                    <div
                      style={{
                        fontSize: 11,
                        color: "#10b981",
                        marginTop: 5,
                        fontWeight: 600,
                      }}
                    >
                      ✓ {maskedAadhar}
                    </div>
                  )}
                </div>

                <div className="btp-divider" />

                {/* Summary */}
                <div className="btp-summary-row">
                  <span>Train</span>
                  <span>{train.train_name}</span>
                </div>
                <div className="btp-summary-row">
                  <span>Route</span>
                  <span>
                    {train.source_station} → {train.destination_station}
                  </span>
                </div>
                <div className="btp-summary-row">
                  <span>Category</span>
                  <span>{ticket.category}</span>
                </div>
                <div className="btp-summary-row">
                  <span>Distance</span>
                  <span>{ticket.distance_km} KM</span>
                </div>

                {/* Total */}
                <div className="btp-total-row">
                  <div>
                    <div className="btp-total-label">Total Amount</div>
                    <div className="btp-total-sub">
                      Inclusive of all charges
                    </div>
                  </div>
                  <div className="btp-total-price">₹{ticket.price}</div>
                </div>

                {/* Pay Button */}
                <button
                  className="btp-pay-btn"
                  onClick={handlePay}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="btp-btn-spinner" /> Processing…
                    </>
                  ) : (
                    <>
                      <div className="btp-pay-btn-dot">→</div> Pay ₹
                      {ticket.price} Securely
                    </>
                  )}
                </button>

                {/* <div className="btp-secure-note">
                  🛡️ Secured Payment · 256-bit SSL Encrypted
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookTicketPage;
