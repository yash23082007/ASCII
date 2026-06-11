import { motion } from "framer-motion";
import { GlassCard } from "../components/ui/GlassCard";
import { staggerContainer, fadeUp } from "../lib/motion-variants";

const sections = [
  { eyebrow: "// 01  PIPELINE", title: "The Conversion Pipeline", content: "Image Input → Resize → Grayscale → Normalize → Map → Render → Export. Each frame is processed through a deterministic brightness-to-character mapping pipeline that preserves aspect ratio and detail." },
  { eyebrow: "// 02  OPTIMIZATION ENGINE", title: "Parameter Tuning", content: "Mathematical statistics analyze incoming canvas frames for brightness standard deviation and contrast. A lightweight calculation automatically tunes optimal density, brightness, and contrast values in real-time." },
  { eyebrow: "// 03  REAL-TIME ARCHITECTURE", title: "Real-Time Ingestion", content: "WebRTC streams camera feed bytes directly to the browser-side canvas. Long file conversion requests are queued and processed asynchronously, bypassing main thread blockages." },
  { eyebrow: "// 04  PERFORMANCE RATIO", title: "Performance Notes", content: "Client-side ASCII renders complete in <1ms per frame. Web-worker rendering runs asynchronously on sub-threads to ensure the UI remains smooth and responsive at 60 FPS." },
];

const techItems = [
  { name: "React + TS", role: "Component state rendering", color: "var(--accent-glow)" },
  { name: "Vite", role: "Fast development compilation", color: "var(--accent-dim)" },
  { name: "Framer Motion", role: "Sleek hardware-accelerated animations", color: "var(--text-primary)" },
  { name: "FastAPI", role: "Fast asynchronous API backend", color: "var(--accent-glow)" },
  { name: "Canvas API", role: "Sub-pixel image buffer acquisition", color: "var(--accent-dim)" },
  { name: "Web Workers", role: "Thread-isolated ASCII rasterization", color: "var(--text-primary)" },
];

export function AboutPage() {
  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={fadeUp} style={{ borderBottom: "1px solid var(--border-muted)", paddingBottom: "var(--space-4)", marginBottom: "var(--space-4)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
            ABOUT THE ENGINE
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-3xl)", letterSpacing: "var(--tracking-tight)", margin: 0 }}>
            Technical Architecture Story
          </h1>
        </motion.div>
        <motion.p variants={fadeUp} style={{ fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "64ch", marginTop: "var(--space-3)" }}>
          ASCII Vision Studio AI merges client-side media processing, lightweight analytical calculations, and highly polished user interface structures to deliver a premium tool for typography creation.
        </motion.p>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)", flexWrap: "wrap" }}>
        {sections.map((sec) => (
          <motion.section key={sec.eyebrow} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: "grid", gap: "var(--space-2)" }}>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", fontWeight: 600, letterSpacing: "var(--tracking-wider)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
              {sec.eyebrow}
            </span>
            <GlassCard style={{ padding: "var(--space-5)", height: "100%", borderColor: "var(--border-muted)" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-lg)", letterSpacing: "var(--tracking-tight)", marginBottom: "var(--space-2)" }}>
                {sec.title}
              </h2>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {sec.content}
              </p>
            </GlassCard>
          </motion.section>
        ))}
      </div>

      <section style={{ display: "grid", gap: "var(--space-4)" }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
            // 05 TECH STACK
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-xl)", letterSpacing: "var(--tracking-tight)", margin: 0, marginTop: "0.2rem" }}>
            Systems Configuration
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--space-3)" }}>
          {techItems.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="glass-card"
              style={{
                padding: "var(--space-4)",
                display: "grid",
                gap: "0.25rem",
                borderColor: "var(--border-muted)",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: tech.color }}>
                {tech.name}
              </span>
              <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}>
                {tech.role}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
