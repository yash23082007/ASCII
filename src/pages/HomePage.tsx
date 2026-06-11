import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AsciiMorphCanvas } from "../components/home/AsciiMorphCanvas";
import { HeroHUD } from "../components/home/HeroHUD";
import { FeatureCards } from "../components/home/FeatureCards";
import { ArchDiagram } from "../components/home/ArchDiagram";
import { GalleryMarquee } from "../components/home/GalleryMarquee";
import { CTASection } from "../components/home/CTASection";
import { LiveDemo } from "../components/home/LiveDemo";
import { HowItWorks } from "../components/home/HowItWorks";
import { Testimonials } from "../components/home/Testimonials";
import { staggerContainer, fadeUp, slideFromRight } from "../lib/motion-variants";
import { GlowButton } from "../components/ui/GlowButton";

export function HomePage() {
  return (
    <div className="page" style={{ paddingTop: 0 }}>
      {/* 1. Hero Section */}
      <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-8)", alignItems: "center" }}>
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: "grid", gap: "var(--space-4)" }}>
          <motion.span variants={fadeUp} transition={{ delay: 0.1 }} style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
            REAL-TIME · AI-POWERED · VISUAL ART
          </motion.span>
          <motion.h1 variants={fadeUp} transition={{ delay: 0.2 }} style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-hero)", fontWeight: 700, letterSpacing: "var(--tracking-tight)", lineHeight: 1.05 }}>
            Transform Visual
            <br />
            Media Into
            <br />
            <span style={{ background: "linear-gradient(135deg, var(--accent-primary), var(--accent-dim))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textShadow: "none" }}>
              Intelligent Text Art.
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} transition={{ delay: 0.56 }} style={{ fontSize: "var(--text-lg)", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "48ch" }}>
            Convert images, GIFs, videos, and webcam streams into ASCII, Emoji, Braille, or Unicode art — in real time, with AI-powered optimization.
          </motion.p>
          <motion.div variants={fadeUp} transition={{ delay: 0.68 }} style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
            <GlowButton to="/studio" variant="primary" size="lg">Launch Studio →</GlowButton>
            <GlowButton to="/about" variant="secondary" size="lg">Watch Demo ▷</GlowButton>
          </motion.div>
          <motion.div variants={staggerContainer} transition={{ delay: 0.8 }} style={{ display: "flex", gap: "var(--space-6)", flexWrap: "wrap" }}>
            {[
              { num: "12+", label: "Export Formats" },
              { num: "<1ms", label: "Frame Render" },
              { num: "8", label: "Art Modes" },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-3xl)", color: "var(--text-primary)" }}>{stat.num}</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", letterSpacing: "var(--tracking-widest)", textTransform: "uppercase" }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={slideFromRight} initial="hidden" animate="visible" transition={{ delay: 0.9 }} style={{ position: "relative" }} className="glass-card" >
          <AsciiMorphCanvas />
          <HeroHUD />
        </motion.div>
      </section>

      {/* 2. Value Proposition Section */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-card" style={{ padding: "var(--space-8) var(--space-10)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-8)", alignItems: "center", margin: "var(--space-8) 0" }}>
        <div>
          <p style={{ fontSize: "var(--text-base)", color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.7 }}>
            "Most converters give you monochrome noise with no control."
          </p>
        </div>
        <div>
          <p style={{ fontSize: "var(--text-base)", color: "var(--text-primary)", fontWeight: 600, lineHeight: 1.7 }}>
            ASCII Vision adds <span style={{ color: "var(--accent-glow)", textShadow: "var(--glow-text)" }}>AI, control, and craft.</span>
          </p>
        </div>
      </motion.section>

      {/* 3. Live Interactive Demo Section */}
      <section>
        <LiveDemo />
      </section>

      {/* 4. Features Section */}
      <section style={{ display: "grid", gap: "var(--space-6)" }}>
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>// 01  FEATURES</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-4xl)", letterSpacing: "var(--tracking-tight)", marginTop: "var(--space-2)" }}>
            Everything you need to create stunning text art.
          </h2>
        </motion.div>
        <FeatureCards />
      </section>

      {/* 5. How It Works Section */}
      <section>
        <HowItWorks />
      </section>

      {/* 6. System Architecture Section */}
      <section style={{ display: "grid", gap: "var(--space-6)" }}>
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>// 02  ARCHITECTURE</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-4xl)", letterSpacing: "var(--tracking-tight)", marginTop: "var(--space-2)" }}>
            How the system is built.
          </h2>
        </motion.div>
        <ArchDiagram />
      </section>

      {/* 7. Testimonials Section */}
      <section>
        <Testimonials />
      </section>

      {/* 8. Showcase Gallery Section */}
      <section style={{ display: "grid", gap: "var(--space-6)" }}>
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>// 03  GALLERY</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-4xl)", letterSpacing: "var(--tracking-tight)", marginTop: "var(--space-2)" }}>
            See what the engine can do.
          </h2>
        </motion.div>
        <GalleryMarquee />
      </section>

      {/* 9. CTA & Newsletter Section */}
      <CTASection />
    </div>
  );
}
