import { motion } from "framer-motion";
import { GlassCard } from "../components/ui/GlassCard";
import { staggerContainer, fadeUp } from "../lib/motion-variants";

const savedProjects = [
  { title: "Cyber Terminal", meta: "Favorite", detail: "High-density monochrome render with a crisp floating panel layout." },
  { title: "Ember Frame", meta: "Shared", detail: "Warm palette study for screenshots, posters, and cover art." },
  { title: "Signal Loop", meta: "Draft", detail: "Animated webcam frame with smooth brightness normalization." },
];

const historyItems = [
  { title: "Aurora launch poster", meta: "PNG export · 4 min ago", summary: "Converted a 4K source into a monochrome print-ready ASCII poster." },
  { title: "Retro gif loop", meta: "GIF export · 13 min ago", summary: "Generated a looping character animation for a portfolio header." },
  { title: "Webcam demo", meta: "Live stream · 28 min ago", summary: "Used the webcam pipeline to produce a real-time terminal mirror." },
];

export function ProfilePage() {
  return (
    <div className="page">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.span variants={fadeUp} style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
          PROFILE
        </motion.span>
        <motion.h1 variants={fadeUp} style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-4xl)", letterSpacing: "var(--tracking-tight)" }}>
          A personal workspace for saved renders and history.
        </motion.h1>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
        <GlassCard style={{ padding: "var(--space-5)", display: "grid", gap: "var(--space-4)" }}>
          <div style={{ width: 70, height: 70, borderRadius: "var(--radius-lg)", background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))", display: "grid", placeItems: "center", fontFamily: "var(--font-mono)", fontWeight: 800, color: "#04111d", fontSize: "var(--text-xl)" }}>
            AV
          </div>
          <div>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Workspace owner</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-2xl)" }}>ASCII Vision Studio</h2>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>Premium text-art creator, exporter, and future project dashboard.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-2)" }}>
            {[
              { num: "48", label: "Saved" },
              { num: "12", label: "Favorites" },
              { num: "7", label: "Shared" },
            ].map((s) => (
              <div key={s.label} style={{ padding: "var(--space-3)", borderRadius: "var(--radius-md)", background: "var(--bg-raised)", border: "1px solid var(--border-muted)", textAlign: "center" }}>
                <div style={{ fontWeight: 700, fontSize: "var(--text-xl)" }}>{s.num}</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard style={{ padding: "var(--space-5)", display: "grid", gap: "var(--space-3)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Saved projects</span>
          {savedProjects.map((p) => (
            <div key={p.title} style={{ padding: "var(--space-3)", borderRadius: "var(--radius-md)", background: "var(--bg-raised)", border: "1px solid var(--border-muted)" }}>
              <div style={{ fontWeight: 600, fontSize: "var(--text-sm)" }}>{p.title}</div>
              <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{p.meta}</span>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginTop: "0.2rem" }}>{p.detail}</p>
            </div>
          ))}
        </GlassCard>
      </div>

      <section>
        <div style={{ marginBottom: "var(--space-4)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>Recent history</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-2xl)", letterSpacing: "var(--tracking-tight)" }}>The last few exports.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-3)" }}>
          {historyItems.map((item) => (
            <GlassCard key={item.title} style={{ padding: "var(--space-4)", display: "grid", gap: "0.3rem" }}>
              <div style={{ fontWeight: 600, fontSize: "var(--text-sm)" }}>{item.title}</div>
              <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{item.meta}</span>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.5 }}>{item.summary}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
