import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../components/ui/GlassCard";
import { GlowButton } from "../components/ui/GlowButton";
import { staggerContainer, fadeUp } from "../lib/motion-variants";
import { Download, Heart, Share2 } from "lucide-react";

interface GalleryItem {
  title: string;
  format: "ASCII" | "Unicode" | "Braille" | "Emoji";
  desc: string;
  stats: string;
  art: string[];
}

const galleryItems: GalleryItem[] = [
  {
    title: "Vector Sphere Study",
    format: "ASCII",
    desc: "A mathematical sphere rasterized onto a high-density character grid.",
    stats: "92 cols · 16 rows",
    art: [
      "        .--------.",
      "     .-/  .==.   \\-.",
      "    /  :  #  #   :  \\",
      "   /  .   +==+   .   \\",
      "  |  :  .      .  :   |",
      "  |  .   :    :   .   |",
      "  |  :  .      .  :   |",
      "   \\  .   +==+   .   /",
      "    \\  :  #  #   :  /",
      "     '-\\  '=='   /-'",
      "        '--------'"
    ]
  },
  {
    title: "Dense Matrix Wave",
    format: "Braille",
    desc: "Fourier sine waves mapped using fine-grain Webrtc Braille dots.",
    stats: "80 cols · 20 rows",
    art: [
      "⡇⠑⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠤⠊⢸",
      "⡇⠀⠈⠑⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠔⠁⠀⠀⢸",
      "⡇⠀⠀⠀⠃⠑⢄⠀⠀⠀⠀⠀⠀⠀⢀⠔⠁⠀⠀⠀⠀⢸",
      "⡇⠀⠀⠀⠀⠀⠈⠑⢄⠀⠀⠀⢀⠔⠁⠀⠀⠀⠀⠀⠀⢸",
      "⡇⠀⠀⠀⠀⠀⠀⠀⠀⠑⢄⠔⠁⠀⠀⠀⠀⠀⠀⠀⠀⢸",
      "⡇⠀⠀⠀⠀⠀⠀⠀⠀⢀⠔⠑⢄⠀⠀⠀⠀⠀⠀⠀⠀⢸",
      "⡇⠀⠀⠀⠀⠀⠀⠀⢀⠔⠁⠀⠀⠑⢄⠀⠀⠀⠀⠀⠀⢸",
      "⡇⠀⠀⠀⠀⠀⠀⢀⠔⠁⠀⠀⠀⠀⠀⠑⢄⠀⠀⠀⠀⢸",
      "⡇⠀⠀⠀⠀⢀⠔⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⢄⠀⠀⢸",
      "⡇⠀⠀⠀⢀⠔⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠑⢄⢸",
      "⡇⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈"
    ]
  },
  {
    title: "Halftone Skull",
    format: "Unicode",
    desc: "Light and shadow mapping utilizing dense block symbols.",
    stats: "64 cols · 12 rows",
    art: [
      "  ▄██████▄  ",
      " ▐████████▌ ",
      " ▐█▄ ▐█ ▄█▌ ",
      "  ▐██████▌  ",
      "   ▄████▄   ",
      "  ▐█ ▐█ ▐█  ",
      "   ▀  ▀  ▀  "
    ]
  },
  {
    title: "Chroma Emoji Grid",
    format: "Emoji",
    desc: "Dithering analysis output rendered as multi-colored blocks.",
    stats: "32 cols · 12 rows",
    art: [
      "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
      "⬛⬛🟩🟩🟩🟩🟩🟩⬛⬛",
      "⬛🟩⬜⬜⬜⬜⬜⬜🟩⬛",
      "⬛🟩⬜⬛⬜⬜⬛⬜🟩⬛",
      "⬛🟩⬜⬜⬜⬜⬜⬜🟩⬛",
      "⬛🟩⬜⬛████⬛⬜🟩⬛",
      "⬛🟩⬜⬜▀▀▀▀⬜⬜🟩⬛",
      "⬛⬛🟩🟩🟩🟩🟩🟩⬛⬛",
      "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛"
    ]
  },
  {
    title: "Cyberpunk Glitch",
    format: "ASCII",
    desc: "Scanline distortion simulation rendered via typographical layouts.",
    stats: "78 cols · 14 rows",
    art: [
      "__/\\[\\_   __ _ _",
      "  \\_  \\/_  /  \\ \\",
      "  /   /\\_  \\__/ /",
      " _\\__/_/ \\_\\___/",
      " /       \\      ",
      " |   [>]  |     ",
      " \\_______/      "
    ]
  },
  {
    title: "Topographic Grid",
    format: "Unicode",
    desc: "Slices of elevations visualized using custom contour symbols.",
    stats: "84 cols · 15 rows",
    art: [
      " ▃▅▇██▇▅▃ ",
      "▅████████▅",
      "██████████",
      "██████████",
      "▅████████▅",
      " ▃▅▇██▇▅▃ "
    ]
  }
];

const FILTERS = ["All", "ASCII", "Unicode", "Braille", "Emoji"];

export function GalleryPage() {
  const [filter, setFilter] = useState("All");

  const visible = useMemo(() => {
    return filter === "All"
      ? galleryItems
      : galleryItems.filter((i) => i.format.toUpperCase() === filter.toUpperCase());
  }, [filter]);

  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={fadeUp} style={{ borderBottom: "1px solid var(--border-muted)", paddingBottom: "var(--space-4)", marginBottom: "var(--space-4)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
            SHOWCASE ARCHIVE
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-3xl)", letterSpacing: "var(--tracking-tight)", margin: 0 }}>
            Curated ASCII Masterpieces
          </h1>
        </motion.div>
      </motion.div>

      {/* Filters */}
      <GlassCard style={{ padding: "var(--space-3) var(--space-4)", display: "flex", gap: "var(--space-2)", flexWrap: "wrap", borderColor: "var(--border-muted)" }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "0.4rem 0.9rem",
              borderRadius: 999,
              fontSize: "var(--text-xs)",
              cursor: "pointer",
              fontWeight: 600,
              textTransform: "uppercase",
              background: filter === f ? "var(--accent-primary)" : "transparent",
              color: filter === f ? "#000" : "var(--text-secondary)",
              border: `1px solid ${filter === f ? "var(--accent-primary)" : "var(--border-muted)"}`,
              transition: "all 0.15s",
            }}
          >
            {f}
          </button>
        ))}
      </GlassCard>

      {/* Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "var(--space-4)" }}
      >
        {visible.map((item) => (
          <motion.article
            key={item.title}
            variants={fadeUp}
            className="glass-card"
            style={{
              padding: "var(--space-4)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
              cursor: "default",
              borderColor: "var(--border-muted)",
            }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  padding: "0.25rem 0.6rem",
                  borderRadius: 999,
                  fontSize: "10px",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  background: "var(--bg-raised)",
                  border: "1px solid var(--border-visible)",
                  color: "var(--text-primary)",
                }}
              >
                {item.format}
              </span>
              <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                {item.stats}
              </span>
            </div>

            {/* ASCII Preview Box */}
            <div
              style={{
                height: 180,
                borderRadius: "var(--radius-md)",
                overflow: "auto",
                background: "var(--mono-bg)",
                border: "1px solid var(--border-muted)",
                display: "grid",
                placeItems: "center",
                padding: "var(--space-4)",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                lineHeight: "1.2",
                color: "var(--mono-fg)",
                whiteSpace: "pre",
                boxShadow: "inset 0 0 16px rgba(0,0,0,0.85)",
              }}
            >
              <div style={{ textShadow: "0 0 4px var(--mono-glow)" }}>
                {item.art.join("\n")}
              </div>
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-base)", margin: 0, color: "var(--text-primary)" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.5, marginTop: "0.25rem" }}>
                {item.desc}
              </p>
            </div>

            <div style={{ display: "flex", gap: "var(--space-2)", marginTop: "auto", paddingTop: "var(--space-2)" }}>
              <GlowButton variant="secondary" size="sm">
                <Heart size={12} /> Favorite
              </GlowButton>
              <GlowButton variant="ghost" size="sm">
                <Download size={12} />
              </GlowButton>
              <GlowButton variant="ghost" size="sm">
                <Share2 size={12} />
              </GlowButton>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
