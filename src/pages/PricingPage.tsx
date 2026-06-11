import { motion } from "framer-motion";
import { GlowButton } from "../components/ui/GlowButton";
import { SpinBorderPanel } from "../components/ui/SpinBorderPanel";
import { Check, X } from "lucide-react";

const tiers = [
  {
    name: "Standard License",
    price: "$0",
    desc: "For local creative exploration",
    features: [
      "Full raster rendering pipeline",
      "Static image file uploading",
      "Direct TXT/ASCII art downloading",
      "Access to public archive gallery",
    ],
    locked: [
      "Live camera stream conversion",
      "High-speed video rendering loops",
      "Auto-Tune image parameters",
      "HTML & PNG high-res exporting",
      "Multiple simultaneous setups",
    ],
    accent: "var(--text-secondary)",
  },
  {
    name: "Professional Studio",
    price: "$9",
    period: "/mo",
    desc: "For digital creators and developers",
    popular: true,
    features: [
      "All active conversion modes",
      "WebRTC camera feed conversion",
      "Video & GIF loop processing",
      "Smart Auto-Tune presets",
      "Export as TXT, HTML, and PNG",
      "Local setup config history",
    ],
    locked: [],
    accent: "var(--accent-glow)",
  },
  {
    name: "Enterprise Core",
    price: "Custom",
    desc: "For dedicated pipeline integration",
    features: [
      "REST API access credentials",
      "Server-side batch rasterization",
      "Isolated GPU pipelines",
      "Custom symbol map files",
      "24/7 dedicated system support",
      "On-premise offline deployment",
    ],
    locked: [],
    accent: "var(--text-primary)",
  },
];

export function PricingPage() {
  return (
    <div className="page" style={{ placeItems: "center", paddingTop: 0 }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", display: "grid", gap: "var(--space-2)", borderBottom: "1px solid var(--border-muted)", paddingBottom: "var(--space-4)", marginBottom: "var(--space-4)", width: "100%" }}
      >
        <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
          LICENSE REGISTRY
        </span>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-3xl)", margin: 0 }}>
          Choose your licensing model
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", margin: 0 }}>
          Get started instantly on standard hardware. Scale up as your rendering complexity increases.
        </p>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-4)", width: "100%" }}>
        {tiers.map((tier, i) => {
          const inner = (
            <>
              {tier.popular && (
                <span
                  style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "0.3rem 1rem",
                    borderRadius: 999,
                    background: "var(--accent-primary)",
                    color: "#000000",
                    fontSize: "10px",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    boxShadow: "0 0 12px rgba(255,255,255,0.4)",
                  }}
                >
                  MOST POPULAR
                </span>
              )}
              <div style={{ display: "grid", gap: "0.25rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-lg)", color: "var(--text-primary)", margin: 0 }}>
                  {tier.name}
                </h3>
                <div style={{ fontSize: "var(--text-4xl)", fontWeight: 700, color: tier.accent, letterSpacing: "var(--tracking-tight)", display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
                  {tier.price}
                  {tier.period && (
                    <span style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", fontWeight: 400 }}>
                      {tier.period}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", margin: 0 }}>
                  {tier.desc}
                </p>
              </div>

              <hr style={{ border: 0, borderTop: "1px solid var(--border-muted)", width: "100%" }} />

              <div style={{ display: "grid", gap: "0.6rem" }}>
                {tier.features.map((f) => (
                  <div key={f} style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "var(--text-xs)", color: "var(--text-primary)" }}>
                    <Check size={12} color="var(--success)" style={{ flexShrink: 0 }} />
                    <span style={{ lineHeight: 1.3 }}>{f}</span>
                  </div>
                ))}
                {tier.locked.map((f) => (
                  <div key={f} style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                    <X size={12} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                    <span style={{ lineHeight: 1.3 }}>{f}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "auto", paddingTop: "var(--space-4)" }}>
                <GlowButton
                  variant={tier.popular ? "primary" : "secondary"}
                  size="md"
                  onClick={() => {}}
                  style={{ width: "100%", textAlign: "center" }}
                >
                  {tier.name.includes("Standard") ? "Launch Studio" : tier.name.includes("Professional") ? "Acquire License" : "Contact Sales"}
                </GlowButton>
              </div>
            </>
          );

          if (tier.popular) {
            return (
              <SpinBorderPanel
                key={tier.name}
                style={{
                  padding: "var(--space-6)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-4)",
                  position: "relative",
                  height: "100%",
                }}
              >
                {inner}
              </SpinBorderPanel>
            );
          }

          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card"
              style={{
                padding: "var(--space-6)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
                position: "relative",
                borderColor: "var(--border-muted)",
              }}
            >
              {inner}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
