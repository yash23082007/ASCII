import { motion } from "framer-motion";
import { GlassCard } from "../components/ui/GlassCard";
import { staggerContainer, fadeUp } from "../lib/motion-variants";

const sections = [
  { eyebrow: "// 01  PIPELINE", title: "The Conversion Pipeline", content: "Image Input → Resize → Grayscale → Normalize → Map → Render → Export. Each frame is processed through a deterministic brightness-to-character mapping pipeline that preserves aspect ratio and detail." },
  { eyebrow: "// 02  ML LAYER", title: "ML Integration", content: "SSIM, PSNR, and perceptual metrics score output quality. A lightweight regression model predicts optimal density, brightness, and contrast from source statistics — no GPU required." },
  { eyebrow: "// 03  REAL-TIME", title: "Real-Time Architecture", content: "WebSocket connections stream webcam frames to the browser-side ASCII engine. Long video jobs are dispatched to Celery workers via Redis, with status updates pushed through SSE." },
  { eyebrow: "// 04  PERFORMANCE", title: "Performance Notes", content: "Client-side ASCII renders complete in <2ms per frame. API image conversions finish in <400ms for sub-1MP images. All charts use transparent backgrounds with indigo accent fills." },
];

const techItems = [
  { name: "React", role: "UI rendering & state", color: "var(--accent-tertiary)" },
  { name: "Vite", role: "Fast dev & build tooling", color: "var(--accent-glow)" },
  { name: "Framer Motion", role: "Premium animations", color: "var(--accent-secondary)" },
  { name: "FastAPI", role: "Python API layer", color: "var(--success)" },
  { name: "OpenCV", role: "Image preprocessing", color: "var(--accent-tertiary)" },
  { name: "PyTorch", role: "ML inference pipeline", color: "var(--warning)" },
];

export function AboutPage() {
  return (
    <div className="page">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.span variants={fadeUp} style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
          ABOUT THE PROJECT
        </motion.span>
        <motion.h1 variants={fadeUp} style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-4xl)", letterSpacing: "var(--tracking-tight)", maxWidth: "16ch" }}>
          A technical product story that sounds credible in a review.
        </motion.h1>
        <motion.p variants={fadeUp} style={{ fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "64ch" }}>
          The value of this project is not just the output. It is the combination of product design, media processing, smart defaults, and a system architecture that can grow into a full-stack platform.
        </motion.p>
      </motion.div>

      {sections.map((sec) => (
        <motion.section key={sec.eyebrow} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} style={{ display: "grid", gap: "var(--space-4)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>{sec.eyebrow}</span>
          <GlassCard style={{ padding: "var(--space-6)", maxWidth: "var(--max-width-prose)" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-2xl)", letterSpacing: "var(--tracking-tight)", marginBottom: "var(--space-3)" }}>{sec.title}</h2>
            <p style={{ fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: 1.7 }}>{sec.content}</p>
          </GlassCard>
        </motion.section>
      ))}

      <section>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>// 05  STACK</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-2xl)", letterSpacing: "var(--tracking-tight)", marginBottom: "var(--space-4)" }}>
            Technology choices with rationale.
          </h2>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-3)" }}>
          {techItems.map((tech, i) => (
            <motion.div key={tech.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.05 }} className="glass-card" style={{ padding: "var(--space-4)", display: "grid", gap: "0.3rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: tech.color }}>{tech.name}</span>
              <span style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{tech.role}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
