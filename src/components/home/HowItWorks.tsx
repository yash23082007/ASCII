import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { staggerContainer, fadeUp } from "../../lib/motion-variants";
import { ArrowRight, Sliders, RefreshCw, Cpu, Layers } from "lucide-react";

const steps = [
  {
    icon: RefreshCw,
    step: "01",
    title: "Stream & Frame Capture",
    desc: "Ingests frames from image uploads, HTML5 videos, or WebRTC camera feeds at up to 60 frames per second directly in the browser's main thread.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "Luminance Calculation",
    desc: "Applies a human perception matrix to convert color channels into a single luminance channel: Y = 0.2126R + 0.7152G + 0.0722B.",
  },
  {
    icon: Sliders,
    step: "03",
    title: "Contrast / Brightness Tuning",
    desc: "Enhances the luminance values dynamically using mathematical range expansion: Y' = (Y - 128) * Contrast + 128 + Brightness.",
  },
  {
    icon: Layers,
    step: "04",
    title: "Glyph Grid Mapping",
    desc: "Groups sub-pixels into character matrices, selects matching symbols from the chosen palette, and prints them as raw text or colored CSS blocks.",
  },
];

export function HowItWorks() {
  return (
    <div style={{ margin: "var(--space-12) 0" }}>
      <div style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
          // THE PIPELINE
        </span>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-4xl)", letterSpacing: "var(--tracking-tight)", marginTop: "var(--space-1)" }}>
          How the raster engine works
        </h2>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--space-4)" }}
      >
        {steps.map((s, idx) => {
          const IconComp = s.icon;
          return (
            <motion.div key={s.step} variants={fadeUp}>
              <GlassCard
                style={{
                  padding: "var(--space-6)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-3)",
                  position: "relative",
                  borderColor: "var(--border-muted)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "var(--radius-sm)",
                      background: "rgba(255, 255, 255, 0.05)",
                      display: "grid",
                      placeItems: "center",
                      color: "var(--accent-primary)",
                      border: "1px solid var(--border-muted)",
                    }}
                  >
                    <IconComp size={20} />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-lg)",
                      fontWeight: 700,
                      color: "var(--text-muted)",
                    }}
                  >
                    {s.step}
                  </span>
                </div>

                <div style={{ marginTop: "var(--space-2)" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-lg)",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      marginTop: "var(--space-2)",
                    }}
                  >
                    {s.desc}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div
                    className="desktop-only"
                    style={{
                      position: "absolute",
                      right: "-10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--border-visible)",
                      zIndex: 3,
                      display: "none", // Will be shown via CSS helper
                    }}
                  >
                    <ArrowRight size={16} />
                  </div>
                )}
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
