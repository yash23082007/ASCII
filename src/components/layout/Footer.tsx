import { Link } from "react-router-dom";
import { Logo } from "../ui/Logo";
import { StatusDot } from "../ui/StatusDot";
import { Mail, ArrowUpRight } from "lucide-react";

const productLinks = [
  { label: "Studio", to: "/studio" },
  { label: "Gallery", to: "/gallery" },
  { label: "Analytics", to: "/analytics" },
  { label: "Pricing", to: "/pricing" },
];

const resourceLinks = [
  { label: "About", to: "/about" },
  { label: "Changelog", to: "/changelog" },
  { label: "Documentation", to: "/about" },
  { label: "API Reference", to: "/about" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "#" },
  { label: "Terms of Service", to: "#" },
  { label: "Cookie Policy", to: "#" },
];

const techStack = ["React", "Vite", "FastAPI", "Canvas API", "Framer Motion", "Zustand"];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="main-footer" style={{ borderTop: "1px solid var(--border-muted)", marginTop: "var(--space-12)" }}>
      {/* ASCII art separator */}
      <div style={{
        textAlign: "center",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-2xs)",
        color: "var(--text-muted)",
        padding: "var(--space-3) 0",
        letterSpacing: "0.3em",
        opacity: 0.4,
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}>
        ─────────── ◇ ─── [&gt;_] ─── ◇ ───────────
      </div>

      {/* Main footer grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
        gap: "var(--space-8)",
        padding: "var(--space-8) 0",
      }}>
        {/* Brand column */}
        <div style={{ display: "grid", gap: "var(--space-4)", alignContent: "start" }}>
          <Logo size="sm" animated={false} />
          <p style={{
            fontSize: "var(--text-sm)",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            maxWidth: "28ch",
          }}>
            See the world in characters. Transform any visual media into intelligent text art.
          </p>

          {/* System status */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            padding: "var(--space-2) var(--space-3)",
            background: "var(--bg-elevated)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-muted)",
            width: "fit-content",
          }}>
            <StatusDot status="success" label="Systems Online" />
          </div>

          {/* Social */}
          <div style={{ display: "flex", gap: "var(--space-3)" }}>
            {[
              {
                renderIcon: () => (
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                ),
                href: "#",
                label: "GitHub"
              },
              {
                renderIcon: () => (
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                ),
                href: "#",
                label: "Twitter"
              },
              {
                renderIcon: () => <Mail size={16} />,
                href: "#",
                label: "Email"
              },
            ].map(({ renderIcon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{
                  width: 36, height: 36, borderRadius: "var(--radius-md)",
                  background: "var(--bg-elevated)", border: "1px solid var(--border-muted)",
                  display: "grid", placeItems: "center", color: "var(--text-muted)",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--border-visible)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border-muted)"; }}
              >
                {renderIcon()}
              </a>
            ))}
          </div>
        </div>

        {/* Product */}
        <div style={{ display: "grid", gap: "var(--space-3)", alignContent: "start" }}>
          <span style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Product
          </span>
          {productLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              style={{
                fontSize: "var(--text-sm)", color: "var(--text-muted)",
                textDecoration: "none", transition: "color 0.15s",
                display: "flex", alignItems: "center", gap: "0.3rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Resources */}
        <div style={{ display: "grid", gap: "var(--space-3)", alignContent: "start" }}>
          <span style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Resources
          </span>
          {resourceLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              style={{
                fontSize: "var(--text-sm)", color: "var(--text-muted)",
                textDecoration: "none", transition: "color 0.15s",
                display: "flex", alignItems: "center", gap: "0.3rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {link.label}
              <ArrowUpRight size={11} style={{ opacity: 0.5 }} />
            </Link>
          ))}
        </div>

        {/* Legal */}
        <div style={{ display: "grid", gap: "var(--space-3)", alignContent: "start" }}>
          <span style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Legal
          </span>
          {legalLinks.map((link) => (
            <a
              key={link.label}
              href={link.to}
              style={{
                fontSize: "var(--text-sm)", color: "var(--text-muted)",
                textDecoration: "none", transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid var(--border-subtle)",
        padding: "var(--space-5) 0 var(--space-6)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "var(--space-4)",
      }}>
        {/* Tech badges */}
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {techStack.map((tech) => (
            <span key={tech} style={{
              padding: "0.2rem 0.55rem",
              borderRadius: "var(--radius-full)",
              fontSize: "var(--text-2xs)",
              fontFamily: "var(--font-mono)",
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-muted)",
              color: "var(--text-muted)",
              letterSpacing: "0.04em",
            }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Copyright + tagline */}
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            Made with ♡ and ASCII
          </span>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
            © {year} ASCII Vision Studio
          </span>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          #main-footer > div:nth-child(2) {
            grid-template-columns: 1fr 1fr !important;
            gap: var(--space-6) !important;
          }
        }
        @media (max-width: 480px) {
          #main-footer > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
