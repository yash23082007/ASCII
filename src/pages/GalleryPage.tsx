import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../components/ui/GlassCard";
import { GlowButton } from "../components/ui/GlowButton";
import { staggerContainer, fadeUp } from "../lib/motion-variants";
import { Download, Heart, Share2 } from "lucide-react";

const galleryItems = [
  { title: "Neon Portrait", format: "ASCII", mood: "High contrast / terminal-ready", accent: "var(--accent-glow)", stats: "92 cols · 64 rows" },
  { title: "Braille Skyline", format: "Braille", mood: "Dense micro-detail for compact previews", accent: "var(--accent-secondary)", stats: "78 cols · 52 rows" },
  { title: "Emoji Pulse", format: "Emoji", mood: "Playful output for social sharing", accent: "var(--warning)", stats: "88 cols · 60 rows" },
  { title: "Video Frame Study", format: "Unicode", mood: "Animated source with queue-backed processing", accent: "var(--accent-tertiary)", stats: "120 frames · 24 fps" },
  { title: "Cyber Terminal", format: "ASCII", mood: "Monochrome high-density render", accent: "var(--accent-glow)", stats: "112 cols · 72 rows" },
  { title: "Signal Loop", format: "Emoji", mood: "Warm palette for poster art", accent: "var(--warning)", stats: "64 cols · 48 rows" },
];

const FILTERS = ["All", "ASCII", "Unicode", "Braille", "Emoji"];

export function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const visible = useMemo(() => filter === "All" ? galleryItems : galleryItems.filter((i) => i.format === filter), [filter]);

  return (
    <div className="page">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={fadeUp}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>GALLERY</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-4xl)", letterSpacing: "var(--tracking-tight)" }}>
            Showcase of what the engine can do.
          </h1>
        </motion.div>
      </motion.div>

      <GlassCard style={{ padding: "var(--space-3) var(--space-4)", display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            style={{
              padding: "0.5rem 1rem", borderRadius: 999, fontSize: "var(--text-sm)", cursor: "pointer", fontWeight: 500,
              background: filter === f ? "rgba(99,102,241,0.12)" : "transparent",
              color: filter === f ? "var(--accent-glow)" : "var(--text-secondary)",
              border: `1px solid ${filter === f ? "var(--border-accent)" : "var(--border-muted)"}`,
              transition: "all 0.15s",
            }}
          >
            {f}
          </button>
        ))}
      </GlassCard>

      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--space-4)" }}
      >
        {visible.map((item, i) => (
          <motion.article key={item.title} variants={fadeUp} className="glass-card" style={{ padding: "var(--space-4)", display: "grid", gap: "var(--space-3)", cursor: "default" }}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ padding: "0.25rem 0.6rem", borderRadius: 999, fontSize: "var(--text-xs)", fontFamily: "var(--font-mono)", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", color: "var(--accent-glow)" }}>
                {item.format}
              </span>
              <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{item.stats}</span>
            </div>
            <div style={{
              height: 160, borderRadius: "var(--radius-lg)", overflow: "hidden",
              background: `linear-gradient(135deg, ${item.accent}22, transparent)`,
              border: "1px solid var(--border-muted)", position: "relative",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: `repeating-linear-gradient(0deg, transparent 0 2px, ${item.accent}11 2px 3px, transparent 3px 20px)`,
                opacity: 0.4,
              }} />
              <div style={{
                position: "absolute", inset: "30% 20%",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${item.accent}33, transparent 70%)`,
              }} />
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-lg)" }}>{item.title}</h3>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.5 }}>{item.mood}</p>
            <div style={{ display: "flex", gap: "var(--space-2)", marginTop: "auto" }}>
              <GlowButton variant="secondary" size="sm"><Heart size={14} /> Favorite</GlowButton>
              <GlowButton variant="ghost" size="sm"><Download size={14} /></GlowButton>
              <GlowButton variant="ghost" size="sm"><Share2 size={14} /></GlowButton>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
