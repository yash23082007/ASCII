import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../lib/motion-variants";
import { Camera, Zap, Download, Scan, BarChart3, Palette } from "lucide-react";

const features = [
  { icon: Camera, title: "Real-Time Webcam", desc: "Capture and convert live frames from any webcam with sub-millisecond latency.", tag: "Webcam · Live" },
  { icon: Zap, title: "AI Auto-Optimize", desc: "Smart defaults from source statistics — brightness, contrast, and density tuned automatically.", tag: "ML · Heuristics" },
  { icon: Download, title: "12+ Export Formats", desc: "Download as TXT, HTML, PNG, PDF, or animated GIF. Ready for any platform.", tag: "TXT · PNG · HTML" },
  { icon: Scan, title: "Edge & Face Preservation", desc: "Detail-aware rendering that preserves important regions with higher fidelity.", tag: "CV · Detection" },
  { icon: BarChart3, title: "Quality Scoring", desc: "SSIM, PSNR, and perceptual metrics give real-time feedback on output quality.", tag: "Metrics · SSIM" },
  { icon: Palette, title: "8 Art Style Modes", desc: "ASCII, Emoji, Braille, Unicode, retro terminal, cyberpunk, and more coming.", tag: "ASCII · Emoji · Braille" },
];

export function FeatureCards() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-4)" }}
    >
      {features.map((f) => (
        <motion.article
          key={f.title}
          variants={fadeUp}
          className="glass-card-accent"
          style={{ padding: "var(--space-5)", display: "grid", gap: "var(--space-3)", cursor: "default" }}
          whileHover={{ y: -6 }}
        >
          <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "rgba(99,102,241,0.12)", display: "grid", placeItems: "center" }}>
            <f.icon size={20} color="var(--accent-glow)" />
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-lg)" }}>{f.title}</h3>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>{f.desc}</p>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.08em", marginTop: "auto" }}>{f.tag}</span>
        </motion.article>
      ))}
    </motion.div>
  );
}
