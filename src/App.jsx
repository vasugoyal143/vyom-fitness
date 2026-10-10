
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

const programs = [
  {
    icon: "🏋️",
    title: "Strength Training",
    description:
      "Build muscle, improve strength and push your limits with professional equipment.",
    tag: "BUILD MUSCLE",
  },
  {
    icon: "🔥",
    title: "Weight Loss",
    description:
      "Burn calories, improve endurance and work towards your fitness goals.",
    tag: "BURN FAT",
  },
  {
    icon: "🎯",
    title: "Personal Training",
    description:
      "Get personalized workout guidance designed around your individual goals.",
    tag: "YOUR OWN COACH",
  },
  {
    icon: "❤️",
    title: "Cardio Fitness",
    description:
      "Improve stamina, boost energy and build a healthier lifestyle.",
    tag: "BUILD STAMINA",
  },
];

const plans = [
  {
    name: "Monthly",
    price: "1,499",
    duration: "/ month",
    features: [
      "Full gym access",
      "Workout guidance",
      "Locker facility",
      "General fitness support",
    ],
  },
  {
    name: "Quarterly",
    price: "3,999",
    duration: "/ 3 months",
    popular: true,
    features: [
      "Full gym access",
      "Workout guidance",
      "Locker facility",
      "Fitness progress tracking",
    ],
  },
  {
    name: "Yearly",
    price: "11,999",
    duration: "/ year",
    features: [
      "Full gym access",
      "Workout guidance",
      "Locker facility",
      "Long-term fitness planning",
    ],
  },
];

const pageIds = ["home", "about", "programs", "membership", "contact"];

function readPage() {
  const page = window.location.hash.slice(1).toLowerCase();
  return pageIds.includes(page) ? page : "home";
}

function App() {
  const [page, setPage] = useState(readPage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Monthly");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      setPage(readPage());
      setMenuOpen(false);
      setSubmitted(false);
      setFormError("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  function navigate(destination) {
    setMenuOpen(false);

    if (window.location.hash === `#${destination}`) {
      setPage(destination);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.hash = destination;
    }
  }

  function choosePlan(plan) {
    setSelectedPlan(plan);
    navigate("contact");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    if (sending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const templateParams = {
      fullName: String(formData.get("fullName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      plan: String(formData.get("plan") || ""),
      goal: String(formData.get("goal") || "").trim(),
    };

    if (
      !templateParams.fullName ||
      !templateParams.email ||
      !templateParams.phone ||
      !templateParams.goal
    ) {
      setFormError("Please fill in all required fields.");
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    console.log("Template ID:", templateId);
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setFormError(
        "Email configuration is missing. Please check your .env file."
      );
      return;
    }

    setSending(true);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        { publicKey }
      );

      setSubmitted(true);
      form.reset();
      setSelectedPlan("Monthly");
    } catch (error) {
      console.error("EmailJS submission failed:", error);
      setFormError(
        "Email send nahi hua. Please try again or check your EmailJS settings."
      );
    } finally {
      setSending(false);
    }
  }

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Programs", id: "programs" },
    { label: "Membership", id: "membership" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="app">
      <div className="announcement">
        <span>YOUR FITNESS. YOUR RULES.</span>
        <span>START STRONG. STAY STRONG.</span>
      </div>

      <header className="navbar">
        <a
          href="#home"
          className="brand"
          onClick={() => setMenuOpen(false)}
          aria-label="VYOM FITNESS Home"
        >
          <span className="brand-mark">V</span>
          <span className="brand-text">
            VYOM<span>FITNESS</span>
          </span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${page === item.id ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}

          <a
            href="#membership"
            className="nav-cta"
            onClick={() => setMenuOpen(false)}
          >
            JOIN NOW <span>↗</span>
          </a>
        </nav>
      </header>

      <main>
        {page === "home" && (
          <>
            <section className="hero">
              <div className="hero-overlay" />

              <div className="hero-content">
                <div className="eyebrow">
                  <span className="red-dot" />
                  WELCOME TO VYOM FITNESS
                </div>

                <h1>
                  BUILT BY
                  <br />
                  <span>DISCIPLINE.</span>
                  <br />
                  DEFINED BY
                  <br />
                  <span>STRENGTH.</span>
                </h1>

                <p className="hero-description">
                  No shortcuts. No excuses. Just hard work, the right mindset
                  and a stronger version of you.
                </p>

                <div className="hero-actions">
                  <a href="#membership" className="btn btn-red">
                    EXPLORE MEMBERSHIP <span>↗</span>
                  </a>
                  <a href="#programs" className="btn btn-outline">
                    EXPLORE PROGRAMS
                  </a>
                </div>

                <div className="hero-stats">
                  <div>
                    <strong>100%</strong>
                    <span>DEDICATION</span>
                  </div>
                  <div>
                    <strong>01</strong>
                    <span>GOAL: YOUR BEST</span>
                  </div>
                  <div>
                    <strong>24/7</strong>
                    <span>FITNESS MINDSET</span>
                  </div>
                </div>
              </div>

              <div className="hero-badge">
                <span>NO</span>
                <strong>LIMITS</strong>
                <span>ONLY RESULTS</span>
              </div>

              <div className="hero-bottom-label">
                <span>01 / 05</span>
                <span>STRENGTH · DISCIPLINE · RESULTS</span>
              </div>
            </section>

            <section className="intro section-padding">
              <div className="intro-copy">
                <span className="section-label">MORE THAN A GYM</span>
                <h2>
                  YOUR NEXT LEVEL
                  <br />
                  <span>STARTS HERE.</span>
                </h2>
              </div>

              <div className="intro-description">
                <p>
                  VYOM FITNESS is about showing up, staying consistent and
                  becoming stronger every day. Whether you're a beginner or an
                  experienced athlete, your journey starts here.
                </p>
                <a href="#about" className="text-link">
                  DISCOVER OUR STORY <span>↗</span>
                </a>
              </div>
            </section>

            <section className="programs-section section-padding dark-section">
              <div className="section-heading">
                <div>
                  <span className="section-label">TRAIN WITH PURPOSE</span>
                  <h2>
                    FIND YOUR <span>STRENGTH.</span>
                  </h2>
                </div>
                <a href="#programs" className="text-link">
                  ALL PROGRAMS ↗
                </a>
              </div>

              <div className="program-grid">
                {programs.map((program, index) => (
                  <article className="program-card" key={program.title}>
                    <div className="program-top">
                      <span className="program-number">
                        0{index + 1} / 04
                      </span>
                      <span className="program-icon">{program.icon}</span>
                    </div>
                    <span className="program-tag">{program.tag}</span>
                    <h3>{program.title}</h3>
                    <p>{program.description}</p>
                    <a href="#contact" className="program-link">
                      GET STARTED <span>↗</span>
                    </a>
                  </article>
                ))}
              </div>
            </section>

            <section className="join-banner section-padding">
              <span className="section-label">YOUR JOURNEY STARTS TODAY</span>
              <h2>
                STOP WAITING.
                <br />
                <span>START TRAINING.</span>
              </h2>
              <a href="#membership" className="btn btn-red">
                FIND YOUR MEMBERSHIP ↗
              </a>
            </section>
          </>
        )}

        {page === "about" && (
          <section className="inner-page section-padding">
            <div className="page-lead">
              <span className="section-label">WHO WE ARE</span>
              <h1>
                STRONGER
                <br />
                <span>EVERY DAY.</span>
              </h1>
              <p>
                We believe fitness is not just about lifting weights. It's
                about building discipline, confidence and habits that make
                you better every day.
              </p>
            </div>

            <div className="about-grid">
              <article className="info-card">
                <span className="large-icon">🎯</span>
                <h3>OUR MISSION</h3>
                <p>
                  To help people build healthier lifestyles through consistent
                  training, determination and a positive fitness mindset.
                </p>
              </article>

              <article className="info-card">
                <span className="large-icon">⚡</span>
                <h3>OUR APPROACH</h3>
                <p>
                  Focus on your goals, train at your pace and keep improving
                  with a practical and consistent workout routine.
                </p>
              </article>

              <article className="info-card">
                <span className="large-icon">💪</span>
                <h3>OUR COMMUNITY</h3>
                <p>
                  A place for beginners and experienced gym-goers to work
                  towards their fitness goals with confidence.
                </p>
              </article>
            </div>

            <a href="#programs" className="btn btn-red section-button">
              EXPLORE OUR PROGRAMS ↗
            </a>
          </section>
        )}

        {page === "programs" && (
          <section className="inner-page section-padding">
            <div className="page-lead">
              <span className="section-label">TRAIN YOUR WAY</span>
              <h1>
                MADE FOR
                <br />
                <span>YOUR GOALS.</span>
              </h1>
              <p>
                Choose a training focus that matches your goals and build your
                fitness journey one workout at a time.
              </p>
            </div>

            <div className="program-grid">
              {programs.map((program, index) => (
                <article className="program-card" key={program.title}>
                  <div className="program-top">
                    <span className="program-number">
                      0{index + 1} / 04
                    </span>
                    <span className="program-icon">{program.icon}</span>
                  </div>
                  <span className="program-tag">{program.tag}</span>
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                  <a href="#contact" className="program-link">
                    ASK ABOUT THIS <span>↗</span>
                  </a>
                </article>
              ))}
            </div>
          </section>
        )}

        {page === "membership" && (
          <section className="inner-page section-padding">
            <div className="page-lead centered">
              <span className="section-label">INVEST IN YOURSELF</span>
              <h1>
                CHOOSE YOUR
                <br />
                <span>COMMITMENT.</span>
              </h1>
              <p>
                Pick a plan that fits your routine. Take the first step
                towards a stronger and healthier you.
              </p>
            </div>

            <div className="pricing-grid">
              {plans.map((plan) => (
                <article
                  className={`price-card ${plan.popular ? "featured" : ""}`}
                  key={plan.name}
                >
                  {plan.popular && (
                    <span className="popular-label">POPULAR CHOICE</span>
                  )}
                  <h3 className="price-name">{plan.name}</h3>
                  <p className="price-description">
                    For your fitness journey
                  </p>
                  <div className="price">
                    <span>₹</span>
                    {plan.price}
                  </div>
                  <span className="price-duration">{plan.duration}</span>
                  <div className="price-divider" />
                  <ul className="price-features">
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <span>✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`btn full-btn ${
                      plan.popular ? "btn-red" : "btn-outline"
                    }`}
                    onClick={() => choosePlan(plan.name)}
                  >
                    SELECT PLAN ↗
                  </button>
                </article>
              ))}
            </div>

            <p className="price-note">
              Membership prices are illustrative. Confirm the final price and
              facilities before purchasing.
            </p>
          </section>
        )}

        {page === "contact" && (
          <section className="inner-page section-padding">
            <div className="page-lead">
              <span className="section-label">TAKE THE FIRST STEP</span>
              <h1>
                LET'S GET
                <br />
                <span>YOU STARTED.</span>
              </h1>
              <p>
                Tell us about your goals and your preferred membership plan.
              </p>
            </div>

            <div className="contact-layout">
              <div className="contact-details">
                <span className="section-label">WHY WAIT?</span>
                <h2>
                  YOUR FUTURE
                  <br />
                  SELF WILL
                  <br />
                  <span>THANK YOU.</span>
                </h2>
                <p>
                  Complete the form to send your membership inquiry to
                  VYOM FITNESS.
                </p>

                <div className="contact-highlight">
                  <span>01</span>
                  <div>
                    <strong>SET YOUR GOAL</strong>
                    <p>Know what you want to achieve.</p>
                  </div>
                </div>

                <div className="contact-highlight">
                  <span>02</span>
                  <div>
                    <strong>CHOOSE YOUR PLAN</strong>
                    <p>Find the membership that suits you.</p>
                  </div>
                </div>

                <div className="contact-highlight">
                  <span>03</span>
                  <div>
                    <strong>TAKE ACTION</strong>
                    <p>Start building consistent habits.</p>
                  </div>
                </div>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <h3>MEMBERSHIP INQUIRY</h3>
                <p className="form-description">
                  Fill in your details below.
                </p>

                {submitted ? (
                  <div className="success-message" role="status">
                    <span>✓</span>
                    <h3>INQUIRY SENT SUCCESSFULLY!</h3>
                    <p>
                      Your inquiry has been sent. We will review your
                      membership request.
                    </p>
                    <button
                      type="button"
                      className="btn btn-outline full-btn"
                      onClick={() => setSubmitted(false)}
                    >
                      SEND ANOTHER INQUIRY
                    </button>
                  </div>
                ) : (
                  <>
                    <label htmlFor="fullName">FULL NAME</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      required
                    />

                    <label htmlFor="email">EMAIL ADDRESS</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />

                    <label htmlFor="phone">PHONE NUMBER</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      autoComplete="tel"
                      pattern="[0-9]{10}"
                      title="Enter a 10-digit mobile number without spaces"
                      required
                    />

                    <label htmlFor="plan">MEMBERSHIP PLAN</label>
                    <select
                      id="plan"
                      name="plan"
                      value={selectedPlan}
                      onChange={(event) =>
                        setSelectedPlan(event.target.value)
                      }
                      required
                    >
                      {plans.map((plan) => (
                        <option key={plan.name} value={plan.name}>
                          {plan.name} — ₹{plan.price}
                        </option>
                      ))}
                    </select>

                    <label htmlFor="goal">YOUR FITNESS GOAL</label>
                    <textarea
                      id="goal"
                      name="goal"
                      rows="4"
                      placeholder="Build muscle, lose weight, improve stamina..."
                      required
                    />

                    {formError && (
                      <p className="form-error" role="alert">
                        {formError}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="btn btn-red full-btn"
                      disabled={sending}
                    >
                      {sending ? "SENDING..." : "SEND MEMBERSHIP INQUIRY ↗"}
                    </button>

                    <p className="form-note">
                      Your inquiry will be sent to the gym's configured email
                      address.
                    </p>
                  </>
                )}
              </form>
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="footer-main">
          <a href="#home" className="brand footer-brand">
            <span className="brand-mark">V</span>
            <span className="brand-text">
              VYOM<span>FITNESS</span>
            </span>
          </a>

          <p>
            BUILT BY DISCIPLINE.
            <br />
            DEFINED BY STRENGTH.
          </p>

          <div className="footer-links">
            {navItems.map((item) => (
              <a href={`#${item.id}`} key={item.id}>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} VYOM FITNESS.</span>
          <span>KEEP MOVING. KEEP IMPROVING.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
