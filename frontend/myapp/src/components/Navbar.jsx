// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// const Navbar = () => {
//   const location = useLocation();

//   const activeLink = (path) =>
//     location.pathname === path
//       ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
//       : "text-gray-700 hover:text-blue-500";

//   return (
//     <div className="w-full bg-white/80 backdrop-blur-lg shadow-lg py-3 px-10 sticky top-0 z-50">
//       <div className="flex justify-between items-center max-w-7xl mx-auto">
//         {/* LEFT: LOGO */}
//         <div className="flex items-center gap-3">
//           <img
//             src="/logo image.png"
//             alt="Logo"
//             className="h-12 w-auto object-contain"
//           />
//           <span className="text-xl font-bold tracking-wide text-gray-800">
//             Railway Express
//           </span>
//         </div>

//         {/* CENTER MENU */}
//         <div className="hidden md:flex gap-10 text-[17px] font-medium">
//           <Link className={activeLink("/")} to="/">
//             Home
//           </Link>
//           <Link className={activeLink("/PnrCheck")} to="/PnrCheck">
//             PNR Check
//           </Link>
//           <Link className={activeLink("/contact")} to="/contact">
//             Contact
//           </Link>
//           <Link className={activeLink("/services")} to="/services">
//             Services
//           </Link>
//           <Link className={activeLink("/MyTickets")} to="/MyTickets">
//             View Ticket
//           </Link>
//         </div>

//         {/* RIGHT BUTTONS */}
//         <div className="hidden md:flex gap-5">
//           <Link to="/login">
//             <button className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md font-semibold hover:bg-blue-700 transition">
//               Login
//             </button>
//           </Link>

//           <Link to="/register">
//             <button className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-sm font-semibold hover:bg-gray-300 transition">
//               Register
//             </button>
//           </Link>
//         </div>

//         {/* MOBILE MENU ICON */}
//         <div className="md:hidden block text-3xl cursor-pointer text-gray-800">
//           ☰
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        .nav-root {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #1a2332;
          font-family: 'DM Sans', sans-serif;
          border-bottom: 3px solid #f97316;
        }

        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* LOGO */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .nav-logo-icon {
          width: 36px; height: 36px;
          background: #f97316;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .nav-logo-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 0.06em;
          color: #fff;
          line-height: 1;
        }

        .nav-logo-sub {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          display: block;
          margin-top: 1px;
        }

        /* CENTER LINKS */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .nav-link {
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.55);
          padding: 6px 14px;
          border-radius: 8px;
          transition: color 0.2s, background 0.2s;
          position: relative;
        }

        .nav-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.06);
        }

        .nav-link.active {
          color: #f97316;
          background: rgba(249,115,22,0.1);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 14px; right: 14px;
          height: 2px;
          background: #f97316;
          border-radius: 2px;
        }

        /* RIGHT BUTTONS */
        .nav-actions { display: flex; align-items: center; gap: 10px; }

        .nav-btn-login {
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          padding: 7px 18px;
          border: 1.5px solid rgba(255,255,255,0.15);
          border-radius: 8px;
          transition: all 0.2s;
          letter-spacing: 0.04em;
        }

        .nav-btn-login:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.06);
        }

        .nav-btn-register {
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          color: #1a2332;
          background: #f97316;
          padding: 7px 18px;
          border-radius: 8px;
          transition: background 0.2s, transform 0.15s;
          letter-spacing: 0.04em;
        }

        .nav-btn-register:hover {
          background: #fb923c;
          transform: translateY(-1px);
        }

        /* MOBILE TOGGLE */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 4px;
        }

        .nav-hamburger span {
          display: block;
          width: 24px; height: 2px;
          background: rgba(255,255,255,0.7);
          border-radius: 2px;
          transition: all 0.3s;
        }

        /* MOBILE DRAWER */
        .nav-mobile {
          display: none;
          flex-direction: column;
          background: #1e2b3c;
          padding: 16px 24px 24px;
          gap: 4px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        .nav-mobile.open { display: flex; }

        .nav-mobile-link {
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          padding: 10px 12px;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .nav-mobile-link:hover,
        .nav-mobile-link.active {
          color: #f97316;
          background: rgba(249,115,22,0.08);
        }

        .nav-mobile-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 8px 0;
        }

        .nav-mobile-actions { display: flex; gap: 10px; padding: 4px 12px 0; }

        .nav-mobile-login {
          flex: 1; text-align: center;
          text-decoration: none;
          font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,0.7);
          padding: 9px;
          border: 1.5px solid rgba(255,255,255,0.15);
          border-radius: 8px;
        }

        .nav-mobile-register {
          flex: 1; text-align: center;
          text-decoration: none;
          font-size: 13px; font-weight: 600;
          color: #1a2332;
          background: #f97316;
          padding: 9px;
          border-radius: 8px;
        }

        @media (max-width: 768px) {
          .nav-links, .nav-actions { display: none; }
          .nav-hamburger { display: flex; }
        }
      `}</style>

      <nav className="nav-root">
        <div className="nav-inner">
          {/* LOGO */}
          <Link to="/" className="nav-logo">
            {/* <div className="nav-logo-icon">🚆</div> */}
            <div>
              <span className="nav-logo-text">Railway Express</span>
              <span className="nav-logo-sub">Ministry of Railways</span>
            </div>
          </Link>

          {/* CENTER LINKS */}
          <div className="nav-links">
            {[
              { path: "/", label: "Home" },
              { path: "/Pnr", label: "PNR Check" },
              { path: "/services", label: "Services" },
              { path: "/MyTickets", label: "My Tickets" },
              { path: "/ContactPage", label: "Contact" },
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link ${isActive(path) ? "active" : ""}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="nav-actions">
            {user ? (
              <button
                onClick={handleLogout}
                className="nav-btn-register"
                style={{
                  cursor: "pointer",
                  border: "none",
                  padding: "7px 18px",
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="nav-btn-login">
                  Sign In
                </Link>
                <Link to="/register" className="nav-btn-register">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* HAMBURGER */}
          <div className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span />
            <span />
            <span />
          </div>
        </div>

        {/* MOBILE DRAWER */}
        <div className={`nav-mobile ${menuOpen ? "open" : ""}`}>
          {[
            { path: "/", label: "Home" },
            { path: "/Pnr", label: "PNR Check" },
            { path: "/services", label: "Services" },
            { path: "/MyTickets", label: "My Tickets" },
            { path: "/ContactPage", label: "Contact" },
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`nav-mobile-link ${isActive(path) ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="nav-mobile-divider" />
          <div className="nav-mobile-actions">
            {user ? (
              <button
                onClick={handleLogout}
                className="nav-mobile-register"
                style={{ cursor: "pointer", border: "none", width: "100%" }}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="nav-mobile-login"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="nav-mobile-register"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
