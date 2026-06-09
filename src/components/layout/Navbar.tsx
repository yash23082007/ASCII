import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { to: "/studio", label: "Studio" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/analytics", label: "Analytics" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "sticky", top: 0, zIndex: 50, height: 64,
        background: scrolled ? "rgba(3,3,5,0.88)" : "rgba(3,3,5,0.72)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? "var(--border-muted)" : "var(--border-subtle)"}`,
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div style={{ maxWidth: "var(--max-width-ui)", margin: "0 auto", padding: "0 var(--space-6)", height: "100%", display: "flex", alignItems: "center", gap: "var(--space-8)" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: "var(--text-sm)", color: "var(--text-primary)", flexShrink: 0 }}>
          <span style={{ color: "var(--accent-primary)" }}>⬡</span>
          ASCII Vision
        </Link>

        <nav aria-label="Primary navigation" style={{ display: "flex", gap: "var(--space-2)", marginLeft: "auto" }}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                padding: "0.4rem 0.9rem", borderRadius: 999, fontSize: "var(--text-sm)",
                fontWeight: 500, color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                background: isActive ? "rgba(99,102,241,0.12)" : "transparent",
                borderBottom: isActive ? "2px solid var(--accent-primary)" : "2px solid transparent",
                transition: "all 0.15s ease",
                textDecoration: "none",
              })}
              end={true}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", flexShrink: 0 }}>
          <Link to="/auth" style={{ padding: "0.4rem 1rem", borderRadius: 999, fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}>
            Sign In
          </Link>
          <Link to="/studio"
            style={{
              padding: "0.45rem 1.2rem", borderRadius: 999, fontSize: "var(--text-sm)", fontWeight: 600,
              background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
              color: "#fff", textDecoration: "none", boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
              transition: "transform 0.16s ease, box-shadow 0.16s ease",
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(99,102,241,0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 16px rgba(99,102,241,0.3)"; }}
          >
            Launch →
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
