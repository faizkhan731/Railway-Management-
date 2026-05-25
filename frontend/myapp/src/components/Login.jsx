// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext.jsx";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   // Step 1: Form state banaya

//   const [formData, setFormData] = useState({
//     one: "",
//     two: "",
//   });

//   // Step 2: Input change handle karne ka function
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value, // name ke base par state update
//     });
//   };

//   // Step 3: Form submit handle karna
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/login",
//         {
//           email: formData.one,
//           password: formData.two,
//         },

//         { withCredentials: true },
//       );

//       if (response.data.success) {
//         login(response.data.user); // ✔ user saved in context
//         alert("Login Successful");
//         navigate("/"); // ✔ navigate once only
//         return;
//       }

//       alert("Invalid email or password");
//     } catch (error) {
//       console.error(error);
//       alert("Login Failed ❌");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Login Page</h1>

//       <form
//         onSubmit={handleLogin}
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           width: "300px",
//           margin: "0 auto",
//           gap: "10px",
//         }}
//       >
//         <input
//           type="email"
//           name="one"
//           placeholder="Enter your email"
//           value={formData.one}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="two"
//           placeholder="Enter your password"
//           value={formData.two}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit" style={{ padding: "8px", cursor: "pointer" }}>
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ one: "", two: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",

        { email: formData.one, password: formData.two },
        { withCredentials: true },
      );
      if (response.data.success) {
        login(response.data.user);
        alert("Login Successful");
        navigate("/");
        return;
      }
      alert("Invalid email or password");
    } catch (error) {
      console.error(error);
      alert("Login Failed ❌");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .rms-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #f0ece4;
        }

        .rms-left {
          width: 45%;
          background: #1a2332;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px 52px;
          overflow: hidden;
        }

        .rms-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 28px,
            rgba(255,255,255,0.025) 28px,
            rgba(255,255,255,0.025) 29px
          );
        }

        .rms-left::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 5px;
          background: linear-gradient(90deg, #f97316, #fb923c, #fdba74);
        }

        .rms-logo-area { position: relative; z-index: 1; }

        .rms-logo-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          padding: 8px 16px 8px 12px;
          margin-bottom: 52px;
        }

        .rms-logo-dot {
          width: 28px; height: 28px;
          background: #f97316;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
        }

        .rms-logo-text {
          color: rgba(255,255,255,0.7);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .rms-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 6vw, 76px);
          line-height: 0.95;
          color: #fff;
          letter-spacing: 0.02em;
        }

        .rms-headline span {
          color: #f97316;
          display: block;
        }

        .rms-sub {
          color: rgba(255,255,255,0.4);
          font-size: 13px;
          font-weight: 300;
          margin-top: 20px;
          line-height: 1.7;
          max-width: 280px;
        }

        .rms-track { position: relative; z-index: 1; }

        .rms-track-rails {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .rms-rail {
          height: 2px;
          background: linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0.04));
          border-radius: 2px;
        }

        .rms-rail:nth-child(2) { width: 70%; opacity: 0.6; }
        .rms-rail:nth-child(3) { width: 45%; opacity: 0.3; }

        .rms-year {
          color: rgba(255,255,255,0.2);
          font-size: 11px;
          letter-spacing: 0.1em;
          margin-top: 28px;
        }

        .rms-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 64px;
          background: #f0ece4;
        }

        .rms-form-box { width: 100%; max-width: 360px; }

        .rms-form-header { margin-bottom: 40px; }

        .rms-welcome {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #f97316;
          margin-bottom: 8px;
        }

        .rms-form-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 40px;
          color: #1a2332;
          letter-spacing: 0.04em;
          line-height: 1;
        }

        .rms-form-desc {
          color: #9a9186;
          font-size: 13px;
          font-weight: 300;
          margin-top: 10px;
        }

        .rms-divider {
          width: 36px; height: 3px;
          background: #f97316;
          border-radius: 2px;
          margin: 20px 0 36px;
        }

        .rms-field { margin-bottom: 22px; }

        .rms-label {
          display: block;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #6b6358;
          margin-bottom: 8px;
        }

        .rms-input-wrap { position: relative; }

        .rms-input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #b8b0a5;
          font-size: 15px;
          pointer-events: none;
          line-height: 1;
        }

        .rms-input {
          width: 100%;
          background: #fff;
          border: 1.5px solid #e0d9d0;
          border-radius: 10px;
          padding: 13px 16px 13px 42px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1a2332;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .rms-input::placeholder { color: #c4bcb3; }

        .rms-input:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.1);
        }

        .rms-forgot {
          text-align: right;
          margin-top: -14px;
          margin-bottom: 28px;
        }

        .rms-forgot a {
          font-size: 12px;
          color: #9a9186;
          text-decoration: none;
          font-weight: 400;
          transition: color 0.2s;
        }

        .rms-forgot a:hover { color: #f97316; }

        .rms-btn {
          width: 100%;
          background: #1a2332;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 15px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.06em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: background 0.25s, transform 0.15s;
        }

        .rms-btn:hover { background: #243044; transform: translateY(-1px); }
        .rms-btn:active { transform: translateY(0); }

        .rms-btn-accent {
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 52px;
          background: #f97316;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
        }

        .rms-btn-label { padding-right: 40px; display: block; }

        .rms-footer-note {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #e0d9d0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rms-footer-dot {
          width: 6px; height: 6px;
          background: #4ade80;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 0 3px rgba(74,222,128,0.2);
        }

        .rms-footer-text {
          font-size: 11px;
          color: #b8b0a5;
          font-weight: 300;
        }

        /* ── NEW: Register row ── */
        .rms-register-row {
          margin-top: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .rms-register-row span {
          font-size: 13px;
          color: #9a9186;
          font-weight: 300;
        }

        .rms-register-link {
          font-size: 13px;
          font-weight: 600;
          color: #f97316;
          text-decoration: none;
          letter-spacing: 0.02em;
          position: relative;
          transition: color 0.2s;
        }

        .rms-register-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: -1px; right: 0;
          height: 1px;
          background: #f97316;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.2s;
        }

        .rms-register-link:hover::after { transform: scaleX(1); }

        @media (max-width: 768px) {
          .rms-left { display: none; }
          .rms-right { padding: 40px 28px; }
        }
      `}</style>

      <div className="rms-root">
        {/* LEFT PANEL */}
        <div className="rms-left">
          <div className="rms-logo-area">
            {/* <div className="rms-logo-badge"> */}
            {/* <div className="rms-logo-dot">🚆</div> */}
            {/* <span className="rms-logo-text">Indian Railways</span> */}
            {/* </div> */}
            <h1 className="rms-headline">
              Railway<span>Management </span>System
            </h1>
            <p className="rms-sub">
              Integrated platform for scheduling, operations & staff management
              across all zones.
            </p>
          </div>

          <div className="rms-track">
            <div className="rms-track-rails">
              <div className="rms-rail" />
              <div className="rms-rail" />
              <div className="rms-rail" />
            </div>
            <p className="rms-year">EST. 1853 · MINISTRY OF RAILWAYS</p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="rms-right">
          <div className="rms-form-box">
            <div className="rms-form-header">
              <p className="rms-welcome">Staff Portal</p>
              <h2 className="rms-form-title">Sign In</h2>
              <p className="rms-form-desc">
                Enter your credentials to access the dashboard
              </p>
            </div>
            <div className="rms-divider" />

            <form onSubmit={handleLogin}>
              <div className="rms-field">
                <label className="rms-label">Email Address</label>
                <div className="rms-input-wrap">
                  <span className="rms-input-icon">✉</span>
                  <input
                    type="email"
                    name="one"
                    placeholder="you@railways.gov.in"
                    value={formData.one}
                    onChange={handleChange}
                    required
                    className="rms-input"
                  />
                </div>
              </div>

              <div className="rms-field">
                <label className="rms-label">Password</label>
                <div className="rms-input-wrap">
                  <span className="rms-input-icon">⬤</span>
                  <input
                    type="password"
                    name="two"
                    placeholder="••••••••"
                    value={formData.two}
                    onChange={handleChange}
                    required
                    className="rms-input"
                  />
                </div>
              </div>

              <div className="rms-forgot">
                <a href="#">Forgot password?</a>
              </div>

              <button type="submit" className="rms-btn">
                <span className="rms-btn-label">Continue</span>
                <span className="rms-btn-accent">→</span>
              </button>
            </form>

            {/* Secure badge */}
            <div className="rms-footer-note">
              <div className="rms-footer-dot" />
              <span className="rms-footer-text">
                Secure access · Authorized personnel only
              </span>
            </div>

            {/* ── REGISTER LINK (naya add kiya) ── */}
            <div className="rms-register-row">
              <span>Don't have an account?</span>
              <Link to="/register" className="rms-register-link">
                Create Account →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
