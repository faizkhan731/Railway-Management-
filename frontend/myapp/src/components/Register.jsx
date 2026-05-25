// import React, { useState } from "react";
// import axios from "axios";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     gender: "male", // default male
//     role: "user", // default user
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formData);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/register",
//         formData,
//         { withCredentials: true },
//       );
//       console.log("Server Response:", response.data);
//       alert("Account Created Successfully!");
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Error creating account");
//     }
//   };

//   return (
//     <div className="registercontainer">
//       <h2>Register</h2>
//       <div className="registerdiv">
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="phone"
//             placeholder="Mobile Number"
//             value={formData.phone}
//             onChange={handleChange}
//           />

//           <div>
//             <label>
//               <input
//                 type="radio"
//                 name="gender"
//                 value="male"
//                 checked={formData.gender === "male"}
//                 onChange={handleChange}
//               />{" "}
//               Male
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="gender"
//                 value="female"
//                 checked={formData.gender === "female"}
//                 onChange={handleChange}
//               />{" "}
//               Female
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="gender"
//                 value="other"
//                 checked={formData.gender === "other"}
//                 onChange={handleChange}
//               />{" "}
//               Other
//             </label>
//           </div>

//           <button type="submit">Create Account</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "male",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    try {
      const response = await axios.post(
        "https://railway-management-0pvq.onrender.com/api/auth/register",
        formData,
        { withCredentials: true },
      );
      console.log("Server Response:", response.data);
      alert("Account Created Successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error creating account");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .reg-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #f0ece4;
        }

        /* ── LEFT PANEL ── */
        .reg-left {
          width: 42%;
          background: #1a2332;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px 52px;
          overflow: hidden;
        }

        .reg-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            -55deg,
            transparent, transparent 28px,
            rgba(255,255,255,0.025) 28px,
            rgba(255,255,255,0.025) 29px
          );
        }

        .reg-left::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 5px;
          background: linear-gradient(90deg, #f97316, #fb923c, #fdba74);
        }

        .reg-logo-area { position: relative; z-index: 1; }

        .reg-logo-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          padding: 8px 16px 8px 12px;
          margin-bottom: 44px;
        }

        .reg-logo-dot {
          width: 28px; height: 28px;
          background: #f97316;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
        }

        .reg-logo-text {
          color: rgba(255,255,255,0.7);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .reg-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(46px, 5.5vw, 68px);
          line-height: 0.95;
          color: #fff;
          letter-spacing: 0.02em;
        }

        .reg-headline span { color: #f97316; display: block; }

        .reg-sub {
          color: rgba(255,255,255,0.4);
          font-size: 13px;
          font-weight: 300;
          margin-top: 20px;
          line-height: 1.7;
          max-width: 280px;
        }

        /* steps indicator */
        .reg-steps {
          position: relative; z-index: 1;
        }

        .reg-steps-title {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 16px;
        }

        .reg-step-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .reg-step-num {
          width: 24px; height: 24px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px;
          font-weight: 600;
          color: rgba(255,255,255,0.3);
          flex-shrink: 0;
        }

        .reg-step-num.active {
          background: #f97316;
          border-color: #f97316;
          color: #fff;
        }

        .reg-step-label {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          font-weight: 300;
        }

        .reg-step-label.active {
          color: rgba(255,255,255,0.8);
          font-weight: 500;
        }

        .reg-year {
          color: rgba(255,255,255,0.15);
          font-size: 11px;
          letter-spacing: 0.1em;
          margin-top: 20px;
        }

        /* ── RIGHT PANEL ── */
        .reg-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 60px;
          background: #f0ece4;
          overflow-y: auto;
        }

        .reg-form-box { width: 100%; max-width: 380px; }

        .reg-form-header { margin-bottom: 32px; }

        .reg-welcome {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #f97316;
          margin-bottom: 8px;
        }

        .reg-form-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 40px;
          color: #1a2332;
          letter-spacing: 0.04em;
          line-height: 1;
        }

        .reg-form-desc {
          color: #9a9186;
          font-size: 13px;
          font-weight: 300;
          margin-top: 8px;
        }

        .reg-divider {
          width: 36px; height: 3px;
          background: #f97316;
          border-radius: 2px;
          margin: 18px 0 28px;
        }

        /* 2-col grid for name + phone */
        .reg-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 18px;
        }

        .reg-field { margin-bottom: 18px; }
        .reg-field-inline { margin-bottom: 0; }

        .reg-label {
          display: block;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #6b6358;
          margin-bottom: 7px;
        }

        .reg-input-wrap { position: relative; }

        .reg-input-icon {
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          color: #b8b0a5;
          font-size: 14px;
          pointer-events: none;
          line-height: 1;
        }

        .reg-input {
          width: 100%;
          background: #fff;
          border: 1.5px solid #e0d9d0;
          border-radius: 10px;
          padding: 12px 14px 12px 40px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          color: #1a2332;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .reg-input::placeholder { color: #c4bcb3; }

        .reg-input:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.1);
        }

        /* gender radio pills */
        .reg-gender-wrap {
          display: flex;
          gap: 8px;
        }

        .reg-gender-pill {
          flex: 1;
          position: relative;
        }

        .reg-gender-pill input[type="radio"] {
          position: absolute;
          opacity: 0;
          width: 0; height: 0;
        }

        .reg-gender-pill label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 10px 6px;
          background: #fff;
          border: 1.5px solid #e0d9d0;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 500;
          color: #9a9186;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .reg-gender-pill input[type="radio"]:checked + label {
          background: #fff8f3;
          border-color: #f97316;
          color: #f97316;
        }

        .reg-gender-pill label:hover {
          border-color: #f97316;
          color: #f97316;
        }

        /* submit btn */
        .reg-btn {
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
          margin-top: 6px;
        }

        .reg-btn:hover { background: #243044; transform: translateY(-1px); }
        .reg-btn:active { transform: translateY(0); }

        .reg-btn-accent {
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 52px;
          background: #f97316;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
        }

        .reg-btn-label { padding-right: 40px; display: block; }

        /* login link */
        .reg-login-row {
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .reg-login-row span {
          font-size: 13px;
          color: #9a9186;
          font-weight: 300;
        }

        .reg-login-link {
          font-size: 13px;
          font-weight: 600;
          color: #f97316;
          text-decoration: none;
          letter-spacing: 0.02em;
          position: relative;
          transition: color 0.2s;
        }

        .reg-login-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: -1px; right: 0;
          height: 1px;
          background: #f97316;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.2s;
        }

        .reg-login-link:hover::after { transform: scaleX(1); }

        .reg-secure {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e0d9d0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .reg-secure-dot {
          width: 6px; height: 6px;
          background: #4ade80;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 0 3px rgba(74,222,128,0.2);
        }

        .reg-secure-text {
          font-size: 11px;
          color: #b8b0a5;
          font-weight: 300;
        }

        @media (max-width: 768px) {
          .reg-left { display: none; }
          .reg-right { padding: 36px 24px; }
          .reg-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="reg-root">
        {/* ── LEFT PANEL ── */}
        <div className="reg-left">
          <div className="reg-logo-area">
            {/* <div className="reg-logo-badge"> */}
            {/* <div className="reg-logo-dot">🚆</div> */}
            {/* <span className="reg-logo-text">Indian Railways</span> */}
            {/* </div> */}
            <h1 className="reg-headline">
              New<span>Account.</span>Setup
            </h1>
            <p className="reg-sub">
              Create your staff credentials to get access to the Railway
              Management portal.
            </p>
          </div>

          <div className="reg-steps">
            <p className="reg-steps-title">Registration Steps</p>
            <div className="reg-step-item">
              <div className="reg-step-num active">1</div>
              <span className="reg-step-label active">Personal Details</span>
            </div>
            <div className="reg-step-item">
              <div className="reg-step-num">2</div>
              <span className="reg-step-label">Verify Email</span>
            </div>
            <div className="reg-step-item">
              <div className="reg-step-num">3</div>
              <span className="reg-step-label">Access Dashboard</span>
            </div>
            <p className="reg-year">EST. 1853 · MINISTRY OF RAILWAYS</p>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="reg-right">
          <div className="reg-form-box">
            <div className="reg-form-header">
              <p className="reg-welcome">Staff Registration</p>
              <h2 className="reg-form-title">Create Account</h2>
              <p className="reg-form-desc">
                Fill in your details to get started
              </p>
            </div>
            <div className="reg-divider" />

            <form onSubmit={handleSubmit}>
              {/* Name + Phone — 2 col */}
              <div className="reg-row">
                <div className="reg-field-inline">
                  <label className="reg-label">Full Name</label>
                  <div className="reg-input-wrap">
                    <span className="reg-input-icon">👤</span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Ramesh Kumar"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="reg-input"
                    />
                  </div>
                </div>
                <div className="reg-field-inline">
                  <label className="reg-label">Mobile No.</label>
                  <div className="reg-input-wrap">
                    <span className="reg-input-icon">📞</span>
                    <input
                      type="text"
                      name="phone"
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="reg-input"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="reg-field">
                <label className="reg-label">Email Address</label>
                <div className="reg-input-wrap">
                  <span className="reg-input-icon">✉</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@railways.gov.in"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="reg-input"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="reg-field">
                <label className="reg-label">Password</label>
                <div className="reg-input-wrap">
                  <span className="reg-input-icon">⬤</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="reg-input"
                  />
                </div>
              </div>

              {/* Gender pills */}
              <div className="reg-field">
                <label className="reg-label">Gender</label>
                <div className="reg-gender-wrap">
                  {["male", "female", "other"].map((g) => (
                    <div className="reg-gender-pill" key={g}>
                      <input
                        type="radio"
                        name="gender"
                        id={`gender-${g}`}
                        value={g}
                        checked={formData.gender === g}
                        onChange={handleChange}
                      />
                      <label htmlFor={`gender-${g}`}>
                        {g === "male"
                          ? "♂ Male"
                          : g === "female"
                            ? "♀ Female"
                            : "⚧ Other"}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="reg-btn">
                <span className="reg-btn-label">Create Account</span>
                <span className="reg-btn-accent">→</span>
              </button>
            </form>

            {/* Secure badge */}
            <div className="reg-secure">
              <div className="reg-secure-dot" />
              <span className="reg-secure-text">
                Your data is encrypted · Ministry of Railways
              </span>
            </div>

            {/* Already have account */}
            <div className="reg-login-row">
              <span>Already have an account?</span>
              <Link to="/login" className="reg-login-link">
                Sign In →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
