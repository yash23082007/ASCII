import { motion } from "framer-motion";

export function HeroHUD() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
      className="hud-overlay"
      style={{ position: "absolute", bottom: 16, right: 16, zIndex: 10, display: "grid", gap: "0.4rem", minWidth: 160 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success)", boxShadow: "0 0 0 0 rgba(52,211,153,0.4)", animation: "pulse-dot 2s infinite", display: "inline-block" }} />
        <span style={{ fontSize: "var(--text-xs)", color: "var(--success)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>LIVE</span>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginLeft: "auto" }}>ASCII</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
        <span>Density</span>
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-glow)" }}>72%</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
        <span>Speed</span>
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-tertiary)" }}>0.4ms / frame</span>
      </div>
    </motion.div>
  );
}
