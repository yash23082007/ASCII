import { motion } from "framer-motion";
import { GlassCard } from "../components/ui/GlassCard";
import { staggerContainer, fadeUp } from "../lib/motion-variants";

const overviewMetrics = [
  { value: "1,248", label: "Total Conversions", detail: "Studio renders completed this session", accent: "var(--accent-glow)" },
  { value: "0.43ms", label: "Avg Proc Time", detail: "Browser-side vector rasterizer speed", accent: "var(--text-primary)" },
  { value: "389", label: "Exports Done", detail: "Downloads in TXT, HTML, PNG formats", accent: "var(--accent-dim)" },
  { value: "ASCII", label: "Top Mode", detail: "Most active filter configuration", accent: "var(--success)" },
];

const modeData = [
  { label: "ASCII", value: 88, detail: "Classic typography" },
  { label: "Unicode", value: 72, detail: "Sharp block elements" },
  { label: "Braille", value: 61, detail: "2x4 dot density" },
  { label: "Emoji", value: 49, detail: "Multi-color symbols" },
];

export function AnalyticsPage() {
  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={fadeUp} style={{ borderBottom: "1px solid var(--border-muted)", paddingBottom: "var(--space-4)", marginBottom: "var(--space-4)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
            TELEMETRY NODE
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-3xl)", letterSpacing: "var(--tracking-tight)", margin: 0 }}>
            Performance & Ingestion Logs
          </h1>
        </motion.div>
      </motion.div>

      {/* Grid of metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--space-4)" }}>
        {overviewMetrics.map((m) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card"
            style={{
              padding: "var(--space-4)",
              display: "grid",
              gap: "0.3rem",
              borderColor: "var(--border-muted)",
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "var(--text-3xl)", color: m.accent }}>
              {m.value}
            </span>
            <span style={{ fontSize: "var(--text-sm)", color: "var(--text-primary)", fontWeight: 600 }}>
              {m.label}
            </span>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.4 }}>
              {m.detail}
            </span>
          </motion.div>
        ))}
      </div>

      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)", flexWrap: "wrap" }}>
        {/* Left Side: Progress bars */}
        <GlassCard style={{ padding: "var(--space-5)", display: "grid", gap: "var(--space-4)", borderColor: "var(--border-muted)" }}>
          <div>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              INGESTION DISTRIBUTION
            </span>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-base)", margin: 0, marginTop: "0.2rem" }}>
              Active mode usage ratio
            </h3>
          </div>
          <div style={{ display: "grid", gap: "var(--space-4)" }}>
            {modeData.map((item) => (
              <div key={item.label} style={{ display: "grid", gridTemplateColumns: "100px 1fr 40px", alignItems: "center", gap: "var(--space-3)" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "var(--text-xs)", fontFamily: "var(--font-mono)" }}>{item.label}</div>
                  <div style={{ fontSize: "10px", color: "var(--text-secondary)" }}>{item.detail}</div>
                </div>
                <div style={{ height: 6, borderRadius: 999, background: "var(--bg-raised)", border: "1px solid var(--border-muted)", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 999,
                      width: `${item.value}%`,
                      background: "var(--accent-primary)",
                      boxShadow: "0 0 10px rgba(255, 255, 255, 0.4)",
                    }}
                  />
                </div>
                <span style={{ fontSize: "var(--text-xs)", fontFamily: "var(--font-mono)", color: "var(--text-primary)", fontWeight: 600, textAlign: "right" }}>
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Right Side: Optimizations */}
        <GlassCard style={{ padding: "var(--space-5)", display: "grid", gap: "var(--space-4)", borderColor: "var(--border-muted)" }}>
          <div>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              CORE METRICS
            </span>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-base)", margin: 0, marginTop: "0.2rem" }}>
              Hardware optimizations active
            </h3>
          </div>
          <div style={{ display: "grid", gap: "var(--space-3)" }}>
            {[
              { label: "Downsampled Canvas buffers", desc: "Adaptive source sizing prevents thread starvation." },
              { label: "Hardware accelerated canvas mapping", desc: "Offloads standard pixel filtering to browser Canvas 2D engine." },
              { label: "Mathematical Auto-Tuning", desc: "Auto contrast expansion based on standard deviation brightness values." },
              { label: "Fast WebRTC hook integration", desc: "Low memory foot-print frame ingestion at 60 FPS." },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: "var(--space-3)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-raised)",
                  border: "1px solid var(--border-muted)",
                }}
              >
                <span style={{ fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-mono)", display: "block" }}>
                  {item.label}
                </span>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-primary)", fontWeight: 500, marginTop: "0.15rem" }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
