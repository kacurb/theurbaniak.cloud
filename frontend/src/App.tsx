import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Target,
  Shield,
  Truck,
  TrendingUp,
} from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import { GlowCard } from "@/components/ui/spotlight-card";
import RadialOrbitalTimeline, {
  type TimelineItem,
} from "@/components/ui/radial-orbital-timeline";

// ─── Portfolio data ────────────────────────────────────────────────────────────
const portfolioData: TimelineItem[] = [
  {
    id: 1,
    title: "HolyMiod",
    date: "2023",
    content:
      "A natural honey producer needed more than a website — they needed presence. Online store, brand identity, built end-to-end.",
    category: "AI · E-commerce",
    icon: ShoppingBag,
    relatedIds: [2],
    status: "completed",
    energy: 90,
    url: "/portfolio/holymiod/",
  },
  {
    id: 2,
    title: "Laser Arena",
    date: "2023",
    content:
      "My own business. I'm not just the builder here — I'm the owner. Online bookings, brand, operations. Product and business in one.",
    category: "AI · Web · Owner",
    icon: Target,
    relatedIds: [1, 3],
    status: "completed",
    energy: 85,
    url: "/portfolio/laserarena/",
  },
  {
    id: 3,
    title: "Cyberthon",
    date: "2024",
    content:
      "Poland's largest cybersecurity hackathon needed a platform to handle the weight of the event. Registration, dashboards, AI integrations.",
    category: "AI · Cybersecurity",
    icon: Shield,
    relatedIds: [2, 4],
    status: "completed",
    energy: 75,
    url: "/portfolio/cyberthon/",
  },
  {
    id: 4,
    title: "Notec TMS",
    date: "2024",
    content:
      "A transport management system built because no existing tool fit the workflow. Contractors, orders, carriers — one system, no spreadsheets.",
    category: "Django · Transport",
    icon: Truck,
    relatedIds: [3, 5],
    status: "completed",
    energy: 80,
    url: "/portfolio/notec-tms/",
  },
  {
    id: 5,
    title: "Trading Analyzer",
    date: "2025",
    content:
      "Upload a chart screenshot. Get an AI-powered position recommendation — long, short, or wait. OpenAI vision reads the chart so you don't have to guess.",
    category: "AI · React · OpenAI",
    icon: TrendingUp,
    relatedIds: [4],
    status: "in-progress",
    energy: 65,
    url: "/portfolio/trading-analyzer/",
  },
];

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(false);
  // Theme persistence
  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  // Cookie banner
  useEffect(() => {
    if (!localStorage.getItem("cookieConsent")) {
      setTimeout(() => setCookieVisible(true), 1000);
    }
  }, []);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Active nav
  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "home";
      sections.forEach((section) => {
        const el = section as HTMLElement;
        if (window.scrollY >= el.offsetTop - 200) {
          current = el.id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* ── NAV ────────────────────────────────────────────────────────────── */}
      <header>
        <nav>
          <div className="logo" onClick={() => scrollTo("home")}>
            theurbaniak
          </div>
          <ul className={`nav-links${mobileMenuOpen ? " active" : ""}`}>
            {["home", "services", "portfolio", "about", "contact"].map((s) => (
              <li key={s}>
                <a
                  href={`#${s}`}
                  className={`nav-link${activeSection === s ? " active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(s);
                  }}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </a>
              </li>
            ))}
          </ul>
          <div className="controls">
            <button className="control-btn" onClick={toggleTheme}>
              <span>{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <section id="home" className="hero">
          {/* Sparkles background */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 1 }}
          >
            <SparklesCore
              id="hero-sparkles"
              background="transparent"
              minSize={0.4}
              maxSize={1.4}
              particleDensity={70}
              className="w-full h-full"
              particleColor="#00ff41"
              speed={1.2}
            />
          </div>

          <div className="container">
            <div className="hero-content">
              <div className="hero-subtitle">Vision-First Builder</div>
              <h1 className="hero-title">
                Making
                <br />
                <span className="highlight">The Invisible</span>
                <br />
                Exist.
              </h1>
              <p className="hero-description">
                The gap between imagination and reality is exactly where I work.
                Not every idea deserves to exist. The ones that do — they find
                me.
              </p>
              <a
                href="#contact"
                className="hero-cta"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("contact");
                }}
              >
                <span>Let's talk</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── SERVICES ───────────────────────────────────────────────────────── */}
        <section id="services">
          <div className="container">
            <div className="section-header reveal">
              <h2 className="section-title">What I Do</h2>
              <p className="section-subtitle">
                Products don't fail for lack of features. They fail for lack of
                vision.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              {[
                {
                  icon: "🎯",
                  title: "Product Vision & Strategy",
                  desc: "Before a single line of code is written, something more important happens. I find the shape of your idea — and make it worth building.",
                  color: "green" as const,
                },
                {
                  icon: "⚡",
                  title: "Rapid MVP",
                  desc: "The fastest way to know if something works is to make it exist. I compress months into days — not by cutting corners, but by seeing clearly what matters.",
                  color: "orange" as const,
                },
                {
                  icon: "🚀",
                  title: "SaaS Development",
                  desc: "From a conversation to a product in production. Full ownership — architecture, development, deployment. No handoffs. No excuses.",
                  color: "blue" as const,
                },
                {
                  icon: "🧠",
                  title: "AI Agents & Automation",
                  desc: "Intelligence isn't the tool. It's what you do with it. I design systems that think — so your team doesn't have to do the work that shouldn't require a human.",
                  color: "purple" as const,
                },
                {
                  icon: "🌐",
                  title: "Web Products",
                  desc: "Digital presence that doesn't apologize for existing. Fast, precise, built to convert — without the noise of tools that get in the way.",
                  color: "blue" as const,
                },
                {
                  icon: "🔧",
                  title: "Infrastructure & Ownership",
                  desc: "What you don't see is doing the most work. VPS, cloud, CI/CD, SSL — I make sure it never fails. Quietly, reliably, completely.",
                  color: "green" as const,
                },
              ].map((s) => (
                <GlowCard
                  key={s.title}
                  glowColor={s.color}
                  customSize
                  className="reveal"
                  style={{ minHeight: 220 }}
                >
                  <div
                    style={{
                      fontSize: 40,
                      lineHeight: 1,
                      marginBottom: 8,
                    }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 18,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "#ffffff",
                        marginBottom: 10,
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.6)",
                        lineHeight: 1.7,
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}
                    >
                      {s.desc}
                    </p>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── PORTFOLIO ──────────────────────────────────────────────────────── */}
        <section id="portfolio" className="portfolio-section">
          <div className="portfolio-section-header reveal">
            <h2 className="section-title" style={{ color: "#fff" }}>
              Work
            </h2>
            <p className="section-subtitle">
              Things that exist now. They didn't before.
            </p>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.4)",
                marginTop: 12,
                fontFamily: "IBM Plex Mono, monospace",
              }}
            >
              Click a node to explore — click again to collapse.
            </p>
          </div>
          <RadialOrbitalTimeline timelineData={portfolioData} />
        </section>

        {/* ── ABOUT ──────────────────────────────────────────────────────────── */}
        <section id="about">
          <div className="container">
            <div className="section-header reveal">
              <h2 className="section-title">Who I Am</h2>
            </div>
            <div className="about-content">
              <div className="about-text reveal">
                <h3>Kacper Urbaniak</h3>
                <p>
                  I'm a Product Owner — but not the kind that runs meetings and
                  writes tickets. I take ownership of an idea from the first
                  conversation to production, and stay accountable for what
                  happens after. I've managed products in defense and banking —
                  sectors where a wrong decision isn't just expensive, it's
                  unacceptable.
                </p>
                <p>
                  I built this practice because I got tired of waiting. Before
                  AI, delivering a quality MVP meant months of design cycles,
                  development sprints, and painful handoffs. That timeline
                  collapsed. What used to require a team and a quarter — I
                  deliver alone, in weeks. Clickable. Quality. Real.
                </p>
                <p>
                  As an Application Engineer, I work close to the metal:
                  PostgreSQL, AWS, Python, Linux, Bash. I've built and deployed
                  private LLMs, designed AI agents, and hosted them on VPS
                  infrastructure — not as experiments, but as working systems.
                </p>
                <p>
                  As owner of Laser Arena Poznań, I know what it means when the
                  product you built is also the business you run. I'm not an
                  agency. I'm not a consultant. I'm the person who takes your
                  idea and makes it real — then sticks around.
                </p>
                <div className="skills-list">
                  {[
                    "Product Ownership",
                    "Claude Code",
                    "Lovable / Cursor / v0",
                    "Private LLMs & AI Agents",
                    "Python / PostgreSQL / AWS",
                    "Linux / Bash",
                  ].map((skill) => (
                    <div className="skill-item" key={skill}>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="about-image reveal">👨‍💻</div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ────────────────────────────────────────────────────────── */}
        <section id="contact">
          <div className="container">
            <div className="section-header reveal">
              <h2 className="section-title">Contact</h2>
              <p className="section-subtitle">
                Have an idea that shouldn't stay invisible?
              </p>
            </div>
            <div className="contact-grid">
              <form
                className="contact-form reveal"
                action="/send-email.php"
                method="POST"
              >
                <input type="text" name="_honey" style={{ display: "none" }} />
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="name" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea name="message" required></textarea>
                </div>
                <div
                  className="form-group"
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 10,
                  }}
                >
                  <input
                    type="checkbox"
                    id="gdprConsent"
                    name="gdpr_consent"
                    required
                    style={{ width: "auto", marginTop: 5 }}
                  />
                  <label
                    htmlFor="gdprConsent"
                    style={{
                      fontSize: 12,
                      textTransform: "none",
                      letterSpacing: 0,
                    }}
                  >
                    I consent to the processing of my personal data in
                    accordance with the{" "}
                    <a
                      href="/polityka-prywatnosci.html"
                      style={{ color: "var(--accent)" }}
                    >
                      Privacy Policy
                    </a>{" "}
                    in order to respond to my inquiry.
                  </label>
                </div>
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
              <div className="contact-info">
                {[
                  {
                    title: "Email",
                    content: (
                      <a href="mailto:theurbaniak@gmail.com">
                        theurbaniak@gmail.com
                      </a>
                    ),
                  },
                  {
                    title: "Phone",
                    content: (
                      <a href="tel:+48691545741">+48 691 545 741</a>
                    ),
                  },
                  { title: "Location", content: <span>Poznań, Poland</span> },
                ].map((item) => (
                  <div className="contact-item reveal" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer>
        <div className="footer-content">
          <div className="footer-text">
            <span>© 2025 Kacper Urbaniak. All rights reserved.</span>
            <span style={{ marginLeft: 20 }}>
              <a
                href="/polityka-prywatnosci.html"
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: 12,
                }}
              >
                Privacy Policy
              </a>
            </span>
          </div>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/kacperurbaniak/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">💼</a>
            <a href="https://github.com/kacurb" aria-label="GitHub" target="_blank" rel="noopener noreferrer">👨‍💻</a>
          </div>
        </div>
      </footer>

      {/* ── COOKIE BANNER ──────────────────────────────────────────────────── */}
      <div className={`cookie-banner${cookieVisible ? " show" : ""}`}>
        <div className="cookie-content">
          <div className="cookie-text">
            <p>
              This website uses cookies for proper functioning and traffic
              analysis. By using the site, you agree to their use.{" "}
              <a href="/polityka-prywatnosci.html">Privacy Policy</a>.
            </p>
          </div>
          <div className="cookie-buttons">
            <button
              className="cookie-btn accept"
              onClick={() => {
                localStorage.setItem("cookieConsent", "accepted");
                setCookieVisible(false);
              }}
            >
              Accept
            </button>
            <button
              className="cookie-btn reject"
              onClick={() => {
                localStorage.setItem("cookieConsent", "rejected");
                setCookieVisible(false);
              }}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
