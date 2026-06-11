import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../lib/motion-variants";
import { Camera, Zap, Download, Scan, BarChart3, Palette } from "lucide-react";

const features = [
  { icon: Camera, title: "Real-Time Webcam", desc: "Capture live frames from any webcam and convert them to text art with sub-millisecond latency.", tag: "LIVE · WEBCAM" },
  { icon: Zap, title: "AI Auto-Optimize", desc: "Smart defaults tuned from source statistics — brightness, contrast, and density adjusted automatically.", tag: "ML · HEURISTICS" },
  { icon: Download, title: "12+ Export Formats", desc: "Download as TXT, HTML, or PNG. Ready for any platform, any project, any audience.", tag: "TXT · PNG · HTML" },
  { icon: Scan, title: "Edge Preservation", desc: "Detail-aware rendering that preserves important visual regions with higher character fidelity.", tag: "CV · DETECTION" },
  { icon: BarChart3, title: "Quality Scoring", desc: "Real-time feedback on output quality with brightness, contrast, and complexity metrics.", tag: "METRICS · SCORE" },
  { icon: Palette, title: "8 Art Style Modes", desc: "ASCII, Emoji, Braille, Unicode, retro terminal, cyberpunk, and more modes available.", tag: "ASCII · EMOJI · BRAILLE" },
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
          whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div style={{
            width: 42, height: 42, borderRadius: "var(--radius-md)",
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid var(--border-muted)",
            display: "grid", placeItems: "center",
          }}>
            <f.icon size={20} color="var(--text-primary)" strokeWidth={1.5} />
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-lg)" }}>{f.title}</h3>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>{f.desc}</p>
          <span style={{
            fontSize: "var(--text-2xs)", color: "var(--text-muted)",
            fontFamily: "var(--font-mono)", letterSpacing: "0.1em", marginTop: "auto",
          }}>
            {f.tag}
          </span>
        </motion.article>
      ))}

      <style>{`
        @media (max-width: 900px) {
          article { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.div>
  );
}
