import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "../ui/Logo";
import { GlowButton } from "../ui/GlowButton";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { to: "/studio", label: "Studio" },
  { to: "/gallery", label: "Gallery" },
  { to: "/analytics", label: "Analytics" },
  { to: "/about", label: "About" },
  { to: "/pricing", label: "Pricing" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      <motion.header
        id="main-navbar"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          height: "var(--nav-height)",
          background: scrolled ? "rgba(0, 0, 0, 0.92)" : "rgba(0, 0, 0, 0.60)",
          backdropFilter: "blur(24px) saturate(150%)",
          WebkitBackdropFilter: "blur(24px) saturate(150%)",
          borderBottom: `1px solid ${scrolled ? "var(--border-muted)" : "transparent"}`,
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div style={{
          maxWidth: "var(--max-width-ui)",
          margin: "0 auto",
          padding: "0 var(--space-6)",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-8)",
        }}>
          {/* Logo */}
          <Logo size="sm" linkTo="/" animated={false} />

          {/* Desktop Nav */}
          <nav
            aria-label="Primary navigation"
            style={{ display: "flex", gap: "var(--space-1)", marginLeft: "auto" }}
            className="nav-desktop"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                style={({ isActive }) => ({
                  padding: "0.45rem 0.85rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 500,
                  color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                  background: isActive ? "rgba(255, 255, 255, 0.08)" : "transparent",
                  transition: "all 0.15s ease",
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                })}
                end={(item.to as string) === "/"}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", flexShrink: 0 }} className="nav-desktop">
            <Link
              to="/auth"
              style={{
                padding: "0.4rem 0.9rem",
                borderRadius: "var(--radius-full)",
                fontSize: "var(--text-sm)",
                fontWeight: 500,
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              Sign In
            </Link>
            <GlowButton to="/studio" variant="primary" size="sm">
              Launch Studio →
            </GlowButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              marginLeft: "auto",
              padding: "0.5rem",
              color: "var(--text-primary)",
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: "var(--nav-height)",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
              background: "rgba(0, 0, 0, 0.96)",
              backdropFilter: "blur(20px)",
              padding: "var(--space-6)",
              display: "grid",
              gap: "var(--space-2)",
              alignContent: "start",
            }}
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                style={({ isActive }) => ({
                  padding: "var(--space-4)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "var(--text-lg)",
                  fontWeight: 500,
                  color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                  background: isActive ? "rgba(255, 255, 255, 0.06)" : "transparent",
                  textDecoration: "none",
                  display: "block",
                  borderBottom: "1px solid var(--border-subtle)",
                })}
              >
                {item.label}
              </NavLink>
            ))}
            <div style={{ marginTop: "var(--space-4)", display: "grid", gap: "var(--space-3)" }}>
              <GlowButton to="/studio" variant="primary" size="lg" onClick={() => setMobileOpen(false)}>
                Launch Studio →
              </GlowButton>
              <GlowButton to="/auth" variant="secondary" size="md" onClick={() => setMobileOpen(false)}>
                Sign In
              </GlowButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}
