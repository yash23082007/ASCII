import { motion } from "framer-motion";
import { GlowButton } from "../components/ui/GlowButton";
import { SpinBorderPanel } from "../components/ui/SpinBorderPanel";
import { Check, X } from "lucide-react";

const tiers = [
  {
    name: "Free", price: "$0", desc: "For casual exploration", features: ["Basic ASCII conversion", "Image upload only", "TXT export", "Community gallery"],
    locked: ["Video processing", "Webcam streaming", "ML auto-optimize", "PNG/PDF export", "Priority support"],
    accent: "var(--text-muted)",
  },
  {
    name: "Pro", price: "$9", period: "/mo", desc: "For creators and developers", popular: true,
    features: ["All conversion modes", "Video & GIF support", "Webcam streaming", "ML auto-optimize", "PNG, HTML, PDF export", "Project history"],
    locked: [],
    accent: "var(--accent-primary)",
  },
  {
    name: "API", price: "Custom", desc: "For integration into your product",
    features: ["REST API access", "Batch processing", "Custom models", "Dedicated support", "SLA", "On-premise option"],
    locked: [],
    accent: "var(--accent-secondary)",
  },
];

export function PricingPage() {
  return (
    <div className="page" style={{ placeItems: "center" }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", display: "grid", gap: "var(--space-2)" }}>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
          PRICING
        </span>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-4xl)" }}>Choose your plan.</h1>
        <p style={{ color: "var(--text-secondary)", maxWidth: "48ch" }}>Start free. Upgrade when you need more power.</p>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-4)", width: "100%" }}>
        {tiers.map((tier, i) => {
          const inner = (
            <>
              {tier.popular && (
                <span style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "0.3rem 1rem", borderRadius: 999, background: "var(--accent-primary)", color: "#fff", fontSize: "var(--text-xs)", fontWeight: 600, letterSpacing: "0.08em" }}>
                  MOST POPULAR
                </span>
              )}
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-xl)" }}>{tier.name}</h3>
                <div style={{ fontSize: "var(--text-hero)", fontWeight: 700, color: tier.accent, letterSpacing: "var(--tracking-tight)" }}>
                  {tier.price}<span style={{ fontSize: "var(--text-base)", color: "var(--text-muted)", fontWeight: 400 }}>{tier.period || ""}</span>
                </div>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{tier.desc}</p>
              </div>
              <div style={{ display: "grid", gap: "var(--space-2)" }}>
                {tier.features.map((f) => (
                  <div key={f} style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>
                    <Check size={14} color="var(--success)" />
                    {f}
                  </div>
                ))}
                {tier.locked.map((f) => (
                  <div key={f} style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
                    <X size={14} color="var(--text-muted)" />
                    {f}
                  </div>
                ))}
              </div>
              <GlowButton variant={tier.popular ? "primary" : "secondary"} size="lg" onClick={() => {}}>
                {tier.name === "Free" ? "Get Started" : tier.name === "Pro" ? "Subscribe" : "Contact Us"}
              </GlowButton>
            </>
          );

          if (tier.popular) {
            return <SpinBorderPanel key={tier.name} style={{ padding: "var(--space-6)", display: "grid", gap: "var(--space-4)", position: "relative" } as React.CSSProperties}>{inner}</SpinBorderPanel>;
          }

          return (
            <motion.div key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
              className="glass-card"
              style={{ padding: "var(--space-6)", display: "grid", gap: "var(--space-4)", position: "relative" } as React.CSSProperties}
            >
              {inner}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
