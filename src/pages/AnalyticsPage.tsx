import { motion } from "framer-motion";
import { GlassCard } from "../components/ui/GlassCard";
import { staggerContainer, fadeUp } from "../lib/motion-variants";

const overviewMetrics = [
  { value: "1,248", label: "Total Conversions", detail: "Studio renders completed during the demo period", accent: "var(--accent-glow)" },
  { value: "0.43ms", label: "Avg Proc Time", detail: "Browser-side conversion speed on the current machine", accent: "var(--accent-secondary)" },
  { value: "389", label: "Exports", detail: "Downloads across TXT, HTML, PNG formats", accent: "var(--accent-tertiary)" },
  { value: "ASCII", label: "Top Mode", detail: "Most frequently used rendering mode", accent: "var(--success)" },
];

const modeData = [
  { label: "ASCII", value: 88, detail: "Most exported format" },
  { label: "Unicode", value: 72, detail: "Sharp block output" },
  { label: "Braille", value: 61, detail: "Compact dense rendering" },
  { label: "Emoji", value: 49, detail: "Best for social snippets" },
];

export function AnalyticsPage() {
  return (
    <div className="page">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.span variants={fadeUp} style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
          ANALYTICS
        </motion.span>
        <motion.h1 variants={fadeUp} style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-4xl)", letterSpacing: "var(--tracking-tight)" }}>
          Signals that make the project feel production-minded.
        </motion.h1>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-4)" }}>
        {overviewMetrics.map((m) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card-accent" style={{ padding: "var(--space-4)", display: "grid", gap: "0.3rem" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-3xl)", color: m.accent }}>{m.value}</span>
            <span style={{ fontSize: "var(--text-sm)", color: "var(--text-primary)", fontWeight: 600 }}>{m.label}</span>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: 1.4 }}>{m.detail}</span>
          </motion.div>
        ))}
      </div>

      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
        <GlassCard style={{ padding: "var(--space-5)", display: "grid", gap: "var(--space-4)" }}>
          <div>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>EXPORT PREFERENCE</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-lg)" }}>What users choose most often</h3>
          </div>
          <div style={{ display: "grid", gap: "var(--space-3)" }}>
            {modeData.map((item) => (
              <div key={item.label} style={{ display: "grid", gridTemplateColumns: "120px 1fr 50px", alignItems: "center", gap: "var(--space-3)" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "var(--text-sm)" }}>{item.label}</div>
                  <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{item.detail}</div>
                </div>
                <div style={{ height: 10, borderRadius: 999, background: "var(--bg-raised)", border: "1px solid var(--border-muted)", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 999, width: `${item.value}%`, background: "linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))", boxShadow: "0 0 12px var(--mono-glow)" }} />
                </div>
                <span style={{ fontSize: "var(--text-sm)", fontFamily: "var(--font-mono)", color: "var(--text-primary)", fontWeight: 600 }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard style={{ padding: "var(--space-5)", display: "grid", gap: "var(--space-4)" }}>
          <div>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>PERFORMANCE</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-lg)" }}>Optimizations that matter</h3>
          </div>
          <div style={{ display: "grid", gap: "var(--space-3)" }}>
            {[
              { label: "Canvas scaling", desc: "Responsive and adaptive" },
              { label: "Deferred rendering", desc: "Prevents slider jitter" },
              { label: "Smart defaults", desc: "Auto-tuned from source stats" },
              { label: "Export workflow", desc: "TXT, HTML, and PNG-ready" },
            ].map((item) => (
              <div key={item.label} style={{ padding: "var(--space-3)", borderRadius: "var(--radius-md)", background: "var(--bg-raised)", border: "1px solid var(--border-muted)" }}>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{item.label}</span>
                <div style={{ fontSize: "var(--text-sm)", color: "var(--text-primary)", fontWeight: 500 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
