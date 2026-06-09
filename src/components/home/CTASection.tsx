import { Link } from "react-router-dom";
import { SpinBorderPanel } from "../ui/SpinBorderPanel";

export function CTASection() {
  return (
    <SpinBorderPanel>
      <div style={{ textAlign: "center", display: "grid", gap: "var(--space-4)", placeItems: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-3xl)", letterSpacing: "var(--tracking-tight)", maxWidth: "18ch" }}>
          Ready to convert your first image?
        </h2>
        <p style={{ fontSize: "var(--text-base)", color: "var(--text-secondary)", maxWidth: "48ch" }}>
          Start with a photo. Walk away with something memorable.
        </p>
        <Link to="/studio" style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          padding: "0.85rem 2rem", borderRadius: 999,
          background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
          color: "#fff", fontWeight: 600, fontSize: "var(--text-base)",
          textDecoration: "none", boxShadow: "0 8px 24px rgba(99,102,241,0.3)",
          transition: "transform 0.16s ease, box-shadow 0.16s ease",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(99,102,241,0.4)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 8px 24px rgba(99,102,241,0.3)"; }}
        >
          Open Studio — It's Free →
        </Link>
      </div>
    </SpinBorderPanel>
  );
}
