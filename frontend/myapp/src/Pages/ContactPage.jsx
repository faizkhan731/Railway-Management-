import { useState, useEffect, useRef } from "react";

// ─── Scroll Reveal Hook ──────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ${delay}ms ease, transform 0.55s ${delay}ms ease`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Quick Card ──────────────────────────────────────────────────────────────
function QuickCard({ icon, label, value, sub, iconBg, iconColor, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="bg-white rounded-2xl p-6 border border-[#e0d8c8] shadow-sm hover:shadow-md transition-all h-full flex flex-col">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}
        >
          <span className={iconColor}>{icon}</span>
        </div>
        <p
          className="text-[10px] font-bold tracking-widest text-gray-400 mb-1 uppercase"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          {label}
        </p>
        <h3
          className="font-bold text-[#0E3264] text-base leading-tight break-words"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          {value}
        </h3>
        <p className="text-gray-400 text-xs mt-2">{sub}</p>
      </div>
    </Reveal>
  );
}

// ─── Helpline Row ────────────────────────────────────────────────────────────
function HelplineRow({ label, number, tel, border }) {
  return (
    <div
      className={`flex items-center justify-between ${border ? "border-t border-white/10 pt-3" : ""}`}
    >
      <div>
        <div
          className="text-[10px] text-blue-300 tracking-wider"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          {label}
        </div>
        <div
          className="font-bold text-[#FF9933] text-xl"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          {number}
        </div>
      </div>
      <a
        href={`tel:${tel}`}
        className="bg-[#FF9933] text-[#0E3264] text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#ffb366] transition-colors tracking-wider"
        style={{ fontFamily: "Rajdhani, sans-serif" }}
      >
        CALL
      </a>
    </div>
  );
}

// ─── Main Contact Page ───────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    pnr: "",
    type: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: "" }));
    setSubmitError("");
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email.";
    if (!form.type) e.type = "Please select a query type.";
    if (form.message.trim().length < 6)
      e.message = "Please enter your message.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setSubmitError("");

    try {
      // ── API call — same pattern jaise tera baaki frontend karta hai ──
      const res = await fetch(
        "https://railway-management-0pvq.onrender.com/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // tera cors credentials:true match karta hai
          body: JSON.stringify({
            name: form.name,
            phone: form.phone,
            email: form.email,
            pnr: form.pnr,
            query_type: form.type, // backend "query_type" expect karta hai
            message: form.message,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setSubmitError(data.message || "Submission failed. Please try again.");
        return;
      }

      setSuccess(true);
      setForm({
        name: "",
        phone: "",
        email: "",
        pnr: "",
        type: "",
        message: "",
      });
    } catch {
      setSubmitError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full border rounded-xl px-4 py-3 text-sm text-gray-800 bg-gray-50 placeholder-gray-400 transition-all outline-none focus:bg-white focus:border-[#0E3264] focus:ring-2 focus:ring-[#0E3264]/10 ${
      errors[field] ? "border-red-400" : "border-gray-200 hover:border-gray-300"
    }`;

  return (
    <div
      className="bg-[#f5f0e8] min-h-screen"
      style={{ fontFamily: "Nunito, sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Nunito:wght@400;500;600;700&display=swap');`}</style>

      {/* ════ NAVBAR ════ */}

      {/* ════ HERO ════ */}
      <section className="relative bg-[#1b2333] overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16 relative z-10">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            Get In <span className="text-[#FF9933]">Touch</span>
          </h1>
          <p className="text-blue-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
            Have a question about your booking, train status, or refund? Our
            support team is available round the clock.
          </p>
        </div>
      </section>

      {/* ════ QUICK CARDS ════ */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <QuickCard
            delay={0}
            label="HELPLINE"
            value="139"
            sub="Toll free · 24×7"
            iconBg="bg-blue-50"
            iconColor="text-[#0E3264]"
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            }
          />
          <QuickCard
            delay={80}
            label="EMAIL US"
            value="care@irctc.co.in"
            sub="Reply within 2 hours"
            iconBg="bg-orange-50"
            iconColor="text-[#FF9933]"
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            }
          />
          <QuickCard
            delay={160}
            label="HQ ADDRESS"
            value="Rail Bhavan, New Delhi"
            sub="Raisina Road – 110001"
            iconBg="bg-green-50"
            iconColor="text-[#138808]"
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            }
          />
          <QuickCard
            delay={240}
            label="OFFICE HOURS"
            value="Mon – Sat"
            sub="9:00 AM – 6:00 PM"
            iconBg="bg-purple-50"
            iconColor="text-purple-700"
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
        </div>
      </section>

      {/* ════ FORM + SIDEBAR ════ */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* ── FORM ── */}
          <Reveal className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-[#e0d8c8] shadow-sm p-6 sm:p-8">
              <div className="mb-7">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-6 w-1 rounded-full bg-[#FF9933]" />
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-[#0E3264] tracking-wide"
                    style={{ fontFamily: "Rajdhani, sans-serif" }}
                  >
                    Send Us a Message
                  </h2>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed pl-4 max-w-lg">
                  Fill in the details below and our team will respond at the
                  earliest.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-[11px] font-bold tracking-widest text-[#0E3264]/70"
                      style={{ fontFamily: "Rajdhani, sans-serif" }}
                    >
                      FULL NAME <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh Kumar"
                      className={inputClass("name")}
                    />
                    {errors.name && (
                      <span className="text-[11px] text-red-500">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-[11px] font-bold tracking-widest text-[#0E3264]/70"
                      style={{ fontFamily: "Rajdhani, sans-serif" }}
                    >
                      MOBILE NUMBER
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      type="tel"
                      className={inputClass("phone")}
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label
                      className="text-[11px] font-bold tracking-widest text-[#0E3264]/70"
                      style={{ fontFamily: "Rajdhani, sans-serif" }}
                    >
                      EMAIL ADDRESS <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      type="email"
                      className={inputClass("email")}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-500">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* PNR */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-[11px] font-bold tracking-widest text-[#0E3264]/70"
                      style={{ fontFamily: "Rajdhani, sans-serif" }}
                    >
                      PNR NUMBER{" "}
                      <span className="text-[10px] text-gray-400">
                        (if applicable)
                      </span>
                    </label>
                    <input
                      name="pnr"
                      value={form.pnr}
                      onChange={handleChange}
                      placeholder="10-digit PNR"
                      maxLength={10}
                      className={inputClass("pnr")}
                    />
                  </div>

                  {/* Query Type */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-[11px] font-bold tracking-widest text-[#0E3264]/70"
                      style={{ fontFamily: "Rajdhani, sans-serif" }}
                    >
                      QUERY TYPE <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className={
                          inputClass("type") +
                          " appearance-none pr-10 cursor-pointer"
                        }
                      >
                        <option value="">Select a category...</option>
                        {[
                          "Ticket Booking Issue",
                          "PNR / Reservation Status",
                          "Cancellation & Refund",
                          "Train Schedule / Delay",
                          "Complaint / Feedback",
                          "Lost & Found",
                          "Divyaang / Disability Services",
                          "Other",
                        ].map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                      <svg
                        className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    {errors.type && (
                      <span className="text-[11px] text-red-500">
                        {errors.type}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label
                      className="text-[11px] font-bold tracking-widest text-[#0E3264]/70"
                      style={{ fontFamily: "Rajdhani, sans-serif" }}
                    >
                      YOUR MESSAGE <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Describe your issue or question in detail..."
                      className={
                        inputClass("message") + " resize-none leading-relaxed"
                      }
                    />
                    {errors.message && (
                      <span className="text-[11px] text-red-500">
                        {errors.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Server Error */}
                {submitError && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                    {submitError}
                  </div>
                )}

                {/* Submit */}
                <div className="mt-7">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto sm:min-w-[220px] flex items-center justify-center gap-3 bg-[#1b2333] text-white font-bold text-sm tracking-widest px-8 py-3.5 rounded-2xl hover:bg-[#1a4a8a] active:scale-95 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed group"
                    style={{ fontFamily: "Rajdhani, sans-serif" }}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="w-5 h-5 animate-spin text-[#FF9933]"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        SENDING...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5 text-[#FF9933]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                        SEND MESSAGE
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Success */}
              {success && (
                <div className="mt-6 flex items-start gap-4 bg-green-50 border border-green-200 rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <div
                      className="font-bold text-green-800 text-base tracking-wide"
                      style={{ fontFamily: "Rajdhani, sans-serif" }}
                    >
                      Message Sent Successfully!
                    </div>
                    <p className="text-green-700 text-sm mt-1 leading-relaxed">
                      Thank you for contacting Indian Railways. Our support team
                      will get back to you within 2 hours.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          {/* ── SIDEBAR ── */}
          <div className="space-y-5 lg:sticky lg:top-24">
            <Reveal delay={180}>
              <div className="bg-[#1b2333] rounded-2xl p-6 text-white">
                <div
                  className="text-[10px] text-[#FF9933] tracking-widest mb-1"
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                >
                  EMERGENCY
                </div>
                <h3
                  className="font-bold text-white text-lg tracking-wide mb-5"
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                >
                  Helpline Numbers
                </h3>
                <div className="space-y-4">
                  <HelplineRow
                    label="GENERAL ENQUIRY"
                    number="139"
                    tel="139"
                    border={false}
                  />
                  <HelplineRow
                    label="IRCTC CARE"
                    number="1800-110-139"
                    tel="1800110139"
                    border={true}
                  />
                  <HelplineRow
                    label="SECURITY / RPF"
                    number="182"
                    tel="182"
                    border={true}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
