import { motion } from "framer-motion";
import { GlassCard } from "../components/ui/GlassCard";
import { PillBadge } from "../components/ui/PillBadge";
import { staggerContainer, fadeUp } from "../lib/motion-variants";

const entries = [
  { date: "2026-06-11", title: "Complete Reconstruction V1.0", type: "Feature" as const, desc: "Reconstructed the entire engine to build a premium monochrome black/white dark-themed application. Added live WebRTC webcam ingestion and interactive rotating 3D vector shape preview grids." },
  { date: "2026-03-15", title: "Webcam Streaming Ingestion", type: "Feature" as const, desc: "Live webcam conversion with real-time FPS feedback and automatic quality tuning." },
  { date: "2026-03-10", title: "SSIM Quality Scoring", type: "ML" as const, desc: "Structural similarity scoring between source and output for quantifiable quality tracking." },
  { date: "2026-03-05", title: "Braille Rendering Optimization", type: "Fix" as const, desc: "Corrected dot positioning in 2x4 braille block renderer for sharper output at small sizes." },
  { date: "2026-02-28", title: "Auto-Tune Parameters", type: "ML" as const, desc: "Heuristic auto-tuning for density, brightness, and contrast based on source image statistics." },
  { date: "2026-02-20", title: "Studio Slider Parameter Overhaul", type: "Feature" as const, desc: "Custom range sliders with live value tooltips, keyboard support, and ARIA compliance." },
  { date: "2026-02-12", title: "High-Res HTML Export", type: "Feature" as const, desc: "Server-side HTML rendering with configurable padding, font size, and color themes." },
];

const badgeVariant: Record<string, "accent" | "success" | "violet"> = {
  Feature: "accent",
  Fix: "success",
  ML: "violet",
};

export function ChangelogPage() {
  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={fadeUp} style={{ borderBottom: "1px solid var(--border-muted)", paddingBottom: "var(--space-4)", marginBottom: "var(--space-4)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
            ENGINE UPDATES
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-3xl)", margin: 0 }}>
            Systems Changelog
          </h1>
        </motion.div>
      </motion.div>

      <div style={{ display: "grid", gap: "var(--space-3)" }}>
        {entries.map((entry, i) => (
          <motion.div
            key={entry.title}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
          >
            <GlassCard
              style={{
                padding: "var(--space-4)",
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                gap: "var(--space-4)",
                alignItems: "start",
                borderColor: "var(--border-muted)",
              }}
            >
              <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                {entry.date}
              </span>
              <div style={{ display: "grid", gap: "0.25rem" }}>
                <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-base)", margin: 0, color: "var(--text-primary)" }}>
                    {entry.title}
                  </h3>
                  <PillBadge variant={badgeVariant[entry.type]}>{entry.type}</PillBadge>
                </div>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                  {entry.desc}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
