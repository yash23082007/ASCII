import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { staggerContainer, fadeUp } from "../../lib/motion-variants";

const testimonials = [
  {
    quote: "ASCII Vision Studio AI completely transformed how we build terminal interfaces. The real-time Braille mapping is insanely detailed, far beyond basic luminance matching.",
    author: "Elena Rostova",
    role: "Lead Creative Technologist at NeoGlow",
  },
  {
    quote: "The black and white interface of the Studio page feels premium, fast, and highly developer-focused. Exporting PNGs and copy-pasting HTML outputs is seamless.",
    author: "Marcus Vance",
    role: "Indie Game Designer & ASCII Artist",
  },
  {
    quote: "I integrated the camera-based rendering feed in an installation. The client-side Canvas processing was so optimized that it ran at a locked 60 FPS on basic mobile tablets.",
    author: "Sarah Lin",
    role: "Interactive Media Artist",
  },
];

export function Testimonials() {
  return (
    <div style={{ margin: "var(--space-12) 0" }}>
      <div style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
          // TESTIMONIALS
        </span>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-4xl)", letterSpacing: "var(--tracking-tight)", marginTop: "var(--space-1)" }}>
          What developers & creators say
        </h2>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-4)" }}
      >
        {testimonials.map((t, idx) => (
          <motion.div key={idx} variants={fadeUp}>
            <GlassCard
              style={{
                padding: "var(--space-6)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                gap: "var(--space-4)",
                borderColor: "var(--border-muted)",
              }}
            >
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--text-primary)",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                }}
              >
                "{t.quote}"
              </p>

              <div style={{ display: "grid", gap: "var(--space-1)" }}>
                <span
                  style={{
                    fontSize: "var(--text-sm)",
                    fontWeight: 600,
                    color: "var(--accent-glow)",
                  }}
                >
                  {t.author}
                </span>
                <span
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {t.role}
                </span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
