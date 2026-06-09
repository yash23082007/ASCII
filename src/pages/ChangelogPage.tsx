import { motion } from "framer-motion";
import { GlassCard } from "../components/ui/GlassCard";
import { PillBadge } from "../components/ui/PillBadge";

const entries = [
  { date: "2025-03-15", title: "Webcam Streaming Beta", type: "Feature" as const, desc: "Live webcam conversion with real-time FPS feedback and automatic quality tuning." },
  { date: "2025-03-10", title: "SSIM Quality Scoring", type: "ML" as const, desc: "Structural similarity scoring between source and output for quantifiable quality tracking." },
  { date: "2025-03-05", title: "Braille Rendering Fix", type: "Fix" as const, desc: "Corrected dot positioning in 2x4 braille block renderer for sharper output at small sizes." },
  { date: "2025-02-28", title: "Auto-Optimize Engine", type: "ML" as const, desc: "Heuristic auto-tuning for density, brightness, and contrast based on source image statistics." },
  { date: "2025-02-20", title: "Studio Slider Overhaul", type: "Feature" as const, desc: "Custom range sliders with live value tooltips, keyboard support, and ARIA compliance." },
  { date: "2025-02-12", title: "PNG Export Pipeline", type: "Feature" as const, desc: "Server-side PNG rendering with configurable padding, font size, and color themes." },
];

const badgeVariant: Record<string, "accent" | "success" | "violet"> = {
  Feature: "accent",
  Fix: "success",
  ML: "violet",
};

export function ChangelogPage() {
  return (
    <div className="page">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
          CHANGELOG
        </span>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-4xl)", letterSpacing: "var(--tracking-tight)" }}>
          What's new.
        </h1>
      </motion.div>

      <div style={{ display: "grid", gap: "var(--space-3)" }}>
        {entries.map((entry, i) => (
          <motion.div key={entry.title} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.05 }}>
            <GlassCard style={{ padding: "var(--space-4)", display: "grid", gridTemplateColumns: "140px 1fr", gap: "var(--space-4)", alignItems: "start" }}>
              <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{entry.date}</span>
              <div style={{ display: "grid", gap: "0.3rem" }}>
                <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-base)" }}>{entry.title}</h3>
                  <PillBadge variant={badgeVariant[entry.type]}>{entry.type}</PillBadge>
                </div>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.5 }}>{entry.desc}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
