import { motion } from "framer-motion";
import { GlassCard } from "../components/ui/GlassCard";
import { staggerContainer, fadeUp } from "../lib/motion-variants";

const savedProjects = [
  { title: "Cyber Sphere", meta: "Saved Preset", detail: "High-density monochrome sphere render with a custom character palette." },
  { title: "Matrix Waves", meta: "Shared Gallery Item", detail: "Wave matrix study using fine Braille dots for terminal output." },
  { title: "Ingestion Mirror", meta: "Draft Preset", detail: "Real-time webcam ingestion filter with extreme contrast calibration." },
];

const historyItems = [
  { title: "Vector poster render", meta: "PNG export · 4 min ago", summary: "Converted a 3D vector shape into a monochrome print-ready ASCII poster." },
  { title: "Rotator cube loop", meta: "HTML export · 13 min ago", summary: "Generated a looping HTML character page for a site integration." },
  { title: "Terminal console mirror", meta: "Live stream · 28 min ago", summary: "Connected the WebRTC webcam pipeline to test local FPS performance." },
];

export function ProfilePage() {
  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={fadeUp} style={{ borderBottom: "1px solid var(--border-muted)", paddingBottom: "var(--space-4)", marginBottom: "var(--space-4)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
            WORKSPACE CONSOLE
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-3xl)", margin: 0 }}>
            Saved Configurations
          </h1>
        </motion.div>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "var(--space-4)", flexWrap: "wrap" }}>
        {/* User Card */}
        <GlassCard style={{ padding: "var(--space-5)", display: "grid", gap: "var(--space-4)", borderColor: "var(--border-muted)" }}>
          <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "center" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "var(--radius-md)",
                background: "var(--accent-primary)",
                color: "#000000",
                display: "grid",
                placeItems: "center",
                fontFamily: "var(--font-mono)",
                fontWeight: 800,
                fontSize: "var(--text-lg)",
                boxShadow: "0 0 16px rgba(255,255,255,0.3)",
              }}
            >
              AV
            </div>
            <div>
              <span style={{ fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
                Studio Owner
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-xl)", margin: 0, color: "var(--text-primary)" }}>
                ASCII Creative Technologist
              </h2>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", margin: 0 }}>
                Owner ID: usr_99a8f4c2
              </p>
            </div>
          </div>

          <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
            This profile manages your local workstation assets. Upgrading to a Pro license unlocks remote cloud syncing and high-speed API keys.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-2)" }}>
            {[
              { num: "48", label: "Saved" },
              { num: "12", label: "Favorites" },
              { num: "7", label: "Shared" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  padding: "var(--space-3)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-raised)",
                  border: "1px solid var(--border-muted)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "var(--text-lg)", fontFamily: "var(--font-display)" }}>{s.num}</div>
                <div style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "0.1rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Saved Projects */}
        <GlassCard style={{ padding: "var(--space-5)", display: "grid", gap: "var(--space-3)", borderColor: "var(--border-muted)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
            Saved Presets
          </span>
          {savedProjects.map((p) => (
            <div
              key={p.title}
              style={{
                padding: "var(--space-3)",
                borderRadius: "var(--radius-md)",
                background: "var(--bg-raised)",
                border: "1px solid var(--border-muted)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 600, fontSize: "var(--text-xs)", color: "var(--text-primary)" }}>{p.title}</span>
                <span
                  style={{
                    fontSize: "9px",
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    padding: "0.1rem 0.35rem",
                    borderRadius: "var(--radius-xs)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border-muted)",
                  }}
                >
                  {p.meta}
                </span>
              </div>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginTop: "0.2rem", margin: 0, lineHeight: 1.4 }}>
                {p.detail}
              </p>
            </div>
          ))}
        </GlassCard>
      </div>

      <section style={{ display: "grid", gap: "var(--space-4)" }}>
        <div>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
            TRANSACTION LOGS
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-xl)", letterSpacing: "var(--tracking-tight)", margin: 0, marginTop: "0.2rem" }}>
            Recent Render Outputs
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--space-3)" }}>
          {historyItems.map((item) => (
            <GlassCard key={item.title} style={{ padding: "var(--space-4)", display: "grid", gap: "0.2rem", borderColor: "var(--border-muted)" }}>
              <div style={{ fontWeight: 600, fontSize: "var(--text-xs)", color: "var(--text-primary)" }}>{item.title}</div>
              <span style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                {item.meta}
              </span>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0, marginTop: "0.2rem" }}>
                {item.summary}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
