import { motion } from "framer-motion";
import { StatusDot } from "../ui/StatusDot";

export function HeroHUD() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
      className="hud-overlay"
      style={{
        position: "absolute", bottom: 16, right: 16, zIndex: 10,
        display: "grid", gap: "0.5rem", minWidth: 170,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <StatusDot status="success" label="LIVE" />
        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginLeft: "auto", fontFamily: "var(--font-mono)" }}>ASCII</span>
      </div>
      <div style={{ height: 1, background: "var(--border-muted)" }} />
      {[
        { label: "Density", value: "72%", color: "var(--text-primary)" },
        { label: "Speed", value: "0.4ms", color: "var(--text-primary)" },
        { label: "Quality", value: "94%", color: "var(--text-primary)" },
      ].map((item) => (
        <div key={item.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
          <span>{item.label}</span>
          <span style={{ fontFamily: "var(--font-mono)", color: item.color, fontWeight: 500 }}>{item.value}</span>
        </div>
      ))}
    </motion.div>
  );
}
