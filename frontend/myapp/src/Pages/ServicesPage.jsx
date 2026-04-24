import { useState, useEffect, useRef } from "react";

// ─── Google Fonts ────────────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Nunito:wght@400;500;600;700&display=swap');`}</style>
);

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
      { threshold: 0.08 },
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
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ${delay}ms ease, transform 0.6s ${delay}ms ease`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Animated Counter ────────────────────────────────────────────────────────
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useReveal();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);
  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Service Card ────────────────────────────────────────────────────────────
function ServiceCard({
  icon,
  title,
  description,
  badge,
  accentColor,
  bgColor,
  delay,
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        // className="bg-white rounded-2xl border border-[#e0d8c8] shadow-sm overflow-hidden cursor-default h-full flex flex-col"
        className="bg-white rounded-2xl border border-[#e0d8c8] shadow-sm overflow-hidden cursor-default h-full flex flex-col w-full min-w-0"
        style={{
          transition: "box-shadow 0.3s ease, transform 0.3s ease",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 12px 32px rgba(0,0,0,0.10)"
            : "0 1px 4px rgba(0,0,0,0.05)",
        }}
      >
        {/* Top accent bar */}
        <div className="h-1" style={{ background: accentColor }} />

        <div className="p-6 flex flex-col flex-grow">
          {/* Icon + Badge row */}
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: bgColor }}
            >
              <span style={{ color: accentColor }}>{icon}</span>
            </div>
            {badge && (
              <span
                className="text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full"
                style={{
                  background: bgColor,
                  color: accentColor,
                  fontFamily: "Rajdhani, sans-serif",
                }}
              >
                {badge}
              </span>
            )}
          </div>

          {/* Title */}
          {/* <h3
            className="text-lg font-bold text-[#0E3264] mb-2 tracking-wide"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          > */}
          <h3 className="text-base sm:text-lg font-bold text-[#0E3264] mb-2 tracking-wide break-words">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed flex-grow break-words">
            {" "}
            {description}
          </p>

          {/* CTA */}
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span
              className="text-xs font-semibold"
              style={{ color: accentColor, fontFamily: "Rajdhani, sans-serif" }}
            >
              LEARN MORE
            </span>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: bgColor, transition: "background 0.2s" }}
            >
              <svg
                className="w-3.5 h-3.5"
                style={{ color: accentColor }}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ value, suffix, label, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="text-center">
        <div
          className="text-3xl sm:text-4xl font-bold text-white mb-1"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          <Counter target={value} suffix={suffix} />
        </div>
        <div
          className="text-blue-300 text-xs tracking-widest uppercase"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          {label}
        </div>
      </div>
    </Reveal>
  );
}

// ─── Process Step ────────────────────────────────────────────────────────────
function ProcessStep({ number, title, description, isLast, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="flex gap-5">
        {/* Number + Line */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#FF9933] flex items-center justify-center flex-shrink-0 shadow-md">
            <span
              className="text-[#1b2333] font-bold text-sm"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              {number}
            </span>
          </div>
          {!isLast && (
            <div
              className="w-0.5 flex-1 bg-[#e0d8c8] mt-2 mb-0"
              style={{ minHeight: "40px" }}
            />
          )}
        </div>
        {/* Content */}
        <div className="pb-8">
          <h4
            className="font-bold text-[#0E3264] text-base tracking-wide mb-1"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            {title}
          </h4>
          <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </Reveal>
  );
}

// ─── FAQ Item ────────────────────────────────────────────────────────────────
function FaqItem({ question, answer, delay }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={delay}>
      <div className="border border-[#e0d8c8] rounded-2xl overflow-hidden bg-white">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
        >
          <span
            className="font-bold text-[#0E3264] text-sm pr-4 tracking-wide"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            {question}
          </span>
          <div
            className={`w-8 h-8 rounded-full bg-[#f5f0e8] flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          >
            <svg
              className="w-4 h-4 text-[#FF9933]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        </button>
        <div
          style={{
            maxHeight: open ? "300px" : "0",
            overflow: "hidden",
            transition: "max-height 0.35s ease",
          }}
        >
          <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-[#f0ebe0] pt-3">
            {answer}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Main Services Page ──────────────────────────────────────────────────────
export default function ServicesPage() {
  const services = [
    {
      title: "Online Ticket Booking",
      description:
        "Book train tickets instantly from anywhere — general, sleeper, AC, and premium classes. Real-time seat availability, PNR confirmation, and e-ticket download.",
      badge: "MOST POPULAR",
      accentColor: "#0E3264",
      bgColor: "#EEF2FF",
      delay: 0,
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
          />
        </svg>
      ),
    },
    {
      title: "PNR Status & Live Tracking",
      description:
        "Check your reservation status in real-time. Track your train live on map, get platform details, and receive automatic delay notifications on your phone.",
      badge: "LIVE",
      accentColor: "#138808",
      bgColor: "#ECFDF5",
      delay: 80,
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      ),
    },
    {
      title: "Cancellation & Refund",
      description:
        "Cancel your tickets hassle-free online. Automatic refund processed within 5–7 working days directly to your bank account or UPI.",
      badge: null,
      accentColor: "#FF9933",
      bgColor: "#FFF7ED",
      delay: 160,
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
          />
        </svg>
      ),
    },
    {
      title: "Tatkal & Premium Tatkal",
      description:
        "Need to travel urgently? Book Tatkal tickets up to 1 day in advance. Premium Tatkal seats available with dynamic pricing and guaranteed confirmation.",
      badge: "URGENT",
      accentColor: "#DC2626",
      bgColor: "#FEF2F2",
      delay: 240,
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Meals & Pantry Car",
      description:
        "Pre-order fresh meals from IRCTC's e-catering service. Choose from local cuisine, thali, snacks, and beverages — delivered right to your seat.",
      badge: null,
      accentColor: "#7C3AED",
      bgColor: "#F5F3FF",
      delay: 0,
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      ),
    },
    {
      title: "Rail Tourism & Packages",
      description:
        "Explore India with curated Bharat Darshan, Buddhist Circuit, and Pilgrimage tour packages. All-inclusive trips with stay, meals, and guided tours.",
      badge: "NEW",
      accentColor: "#0891B2",
      bgColor: "#ECFEFF",
      delay: 80,
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Divyaang & Senior Services",
      description:
        "Special quota and fare concession for differently-abled passengers and senior citizens. Wheelchair accessibility, escort facilities, and priority boarding.",
      badge: null,
      accentColor: "#059669",
      bgColor: "#ECFDF5",
      delay: 160,
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      title: "Parcel & Freight Services",
      description:
        "Send parcels, cargo, and goods across India via Indian Railways Parcel Service. Faster than road, cost-effective, and fully trackable end-to-end.",
      badge: null,
      accentColor: "#B45309",
      bgColor: "#FFFBEB",
      delay: 240,
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
  ];

  const stats = [
    { value: 13000, suffix: "+", label: "Trains Daily", delay: 0 },
    { value: 8000, suffix: "+", label: "Stations", delay: 100 },
    { value: 23, suffix: "M+", label: "Passengers Daily", delay: 200 },
    { value: 67000, suffix: "km", label: "Route Network", delay: 300 },
  ];

  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description:
        "Register on IRCTC with your mobile number and email. Verification takes less than 2 minutes.",
    },
    {
      number: "02",
      title: "Search Your Train",
      description:
        "Enter source, destination, and travel date. Filter by class, quota, and train type.",
    },
    {
      number: "03",
      title: "Select Seats & Class",
      description:
        "Choose from Sleeper, AC 3-Tier, AC 2-Tier, First Class, or Executive Chair Car.",
    },
    {
      number: "04",
      title: "Pay Securely",
      description:
        "Pay via UPI, Net Banking, Credit/Debit Card, or Online Payment. 100% secure and instant confirmation.",
    },
    {
      number: "05",
      title: "Get Your e-Ticket",
      description:
        "Receive PNR and e-ticket on SMS & email instantly. No printing required — just show on phone.",
    },
  ];

  const faqs = [
    {
      question: "How early can I book train tickets?",
      answer:
        "You can book tickets up to 120 days in advance (excluding the date of journey) for most trains. Tatkal booking opens 1 day before the journey date.",
    },
    {
      question: "What is the cancellation and refund policy?",
      answer:
        "Refund amount depends on how early you cancel. Cancelling more than 48 hours before departure gives maximum refund. Tatkal tickets have different rules — usually no refund except in case of train cancellation.",
    },
    {
      question: "How do I check my PNR status?",
      answer:
        "Visit the PNR Status page on IRCTC or our website, enter your 10-digit PNR number, and get real-time confirmation, coach, and berth details.",
    },
    {
      question: "Can I book tickets for senior citizens with concession?",
      answer:
        "Yes. Senior citizens (male 60+, female 58+) get fare concession of 40% (male) and 50% (female) on most train categories. Select the Senior Citizen option while booking.",
    },
    {
      question: "What happens if my train is cancelled?",
      answer:
        "If Indian Railways cancels a train, you will receive a full refund automatically within 5–7 working days. No manual cancellation needed from your side.",
    },
    {
      question: "Is Tatkal booking available for all trains?",
      answer:
        "Tatkal quota is available on most express and superfast trains but not all. Availability is shown during booking. Tatkal charges are additional on top of base fare.",
    },
  ];

  return (
    <div
      className="bg-[#f5f0e8] min-h-screen"
      style={{ fontFamily: "Nunito, sans-serif" }}
    >
      <FontLoader />

      {/* ════ HERO ════ */}
      <section className="relative bg-[#1b2333] overflow-hidden">
        {/* Dot texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Decorative train track lines */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
          {/* <div className="max-w-3xl"> */}
          <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl">
            {/* Breadcrumb */}

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              Our <span className="text-[#FF9933]">Services</span>
            </h1>
            <p className="text-blue-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mb-8">
              From booking your first ticket to tracking your train live —
              Indian Railways offers a complete suite of passenger services,
              designed to make every journey smooth and comfortable.
            </p>

            {/* Pills */}
          </div>
        </div>
      </section>

      <section className="bg-[#0E3264]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ════ SERVICES GRID ════ */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Section Header */}
        <Reveal>
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              {/* <div className="h-6 w-1 rounded-full bg-[#FF9933]" /> */}
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#0E3264] tracking-wide"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              All Passenger Services
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mt-2 max-w-2xl">
              Explore the complete range of services available for Indian
              Railways passengers — everything you need before, during, and
              after your journey.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </section>

      {/* ════ HOW IT WORKS + FAQ ════ */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* How It Works */}
          <div>
            <Reveal>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-6 w-1 rounded-full bg-[#FF9933]" />
                  <span
                    className="text-[10px] font-bold tracking-widest text-gray-400 uppercase"
                    style={{ fontFamily: "Rajdhani, sans-serif" }}
                  >
                    STEP BY STEP
                  </span>
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#0E3264] tracking-wide"
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                >
                  How to Book a Ticket
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mt-2">
                  Book your train ticket in under 3 minutes. Here's how:
                </p>
              </div>
            </Reveal>
            <div>
              {steps.map((step, i) => (
                <ProcessStep
                  key={step.number}
                  {...step}
                  isLast={i === steps.length - 1}
                  delay={i * 80}
                />
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <Reveal>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-6 w-1 rounded-full bg-[#138808]" />
                  <span
                    className="text-[10px] font-bold tracking-widest text-gray-400 uppercase"
                    style={{ fontFamily: "Rajdhani, sans-serif" }}
                  >
                    COMMON QUESTIONS
                  </span>
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#0E3264] tracking-wide"
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                >
                  FAQ
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mt-2">
                  Answers to the most common passenger questions.
                </p>
              </div>
            </Reveal>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <FaqItem key={faq.question} {...faq} delay={i * 60} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ CTA BANNER ════ */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <Reveal>
          <div className="bg-[#1b2333] rounded-3xl overflow-hidden relative">
            {/* Dot texture */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            {/* <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 px-8 sm:px-12 py-10">
              <div>
                <div
                  className="text-[10px] text-[#FF9933] font-bold tracking-widest mb-2"
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                >
                  READY TO TRAVEL?
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-bold text-white tracking-wide mb-2"
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                >
                  Book Your Journey Today
                </h3>
                <p className="text-blue-300 text-sm max-w-lg leading-relaxed">
                  Millions of passengers trust Indian Railways every day. Join
                  them — book your ticket in minutes.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 flex-shrink-0">
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 bg-[#FF9933] text-[#1b2333] font-bold text-sm tracking-widest px-7 py-3.5 rounded-2xl hover:bg-[#ffb366] active:scale-95 transition-all shadow-lg"
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                  BOOK TICKET
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold text-sm tracking-widest px-7 py-3.5 rounded-2xl hover:bg-white/20 active:scale-95 transition-all"
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                >
                  <svg
                    className="w-4 h-4 text-[#FF9933]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  CALL 139
                </a>
              </div>
            </div> */}

            {/* Bottom tricolor strip */}
            {/* <div className="flex h-1">
              <div className="flex-1 bg-[#FF9933]" />
              <div className="flex-1 bg-white/30" />
              <div className="flex-1 bg-[#138808]" />
            </div> */}
          </div>
        </Reveal>
      </section>

      {/* ════ FOOTER ════ */}
      {/* <footer className="bg-[#1b2333] mt-4">
        <div className="flex h-1">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-white/30" />
          <div className="flex-1 bg-[#138808]" />
        </div>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-6">
          <p className="text-blue-300 text-xs text-center sm:text-left">
            © 2025 Indian Railways — Ministry of Railways, Government of India.
            All Rights Reserved.
          </p>
        </div>
      </footer> */}
    </div>
  );
}
