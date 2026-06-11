import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../components/ui/GlassCard";
import { GlowButton } from "../components/ui/GlowButton";
import { MatrixRain } from "../components/ui/MatrixRain";
import { Logo } from "../components/ui/Logo";
import { staggerContainer, fadeUp, slideFromLeft, slideFromRight } from "../lib/motion-variants";

const benefits = [
  "Save project history and configurations.",
  "Resume long-running video exports in real time.",
  "Publish polished ASCII visual galleries.",
];

export function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "var(--space-8)",
          alignItems: "stretch",
          minHeight: "72vh",
        }}
      >
        {/* Left column: Cyber visual + text */}
        <motion.div
          variants={slideFromLeft}
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-muted)",
            background: "#000000",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "var(--space-8)",
          }}
        >
          {/* Falling Matrix Rain */}
          <MatrixRain opacity={0.12} fontSize={13} speed={1.2} />

          {/* Foreground content */}
          <div style={{ position: "relative", zIndex: 1, display: "grid", gap: "var(--space-4)" }}>
            <Logo size="lg" animated={true} />
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "var(--text-4xl)",
                letterSpacing: "var(--tracking-tight)",
                lineHeight: 1.15,
                marginTop: "var(--space-6)",
              }}
            >
              Access the industrial-grade raster engine.
            </h1>
            <p
              style={{
                fontSize: "var(--text-base)",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                maxWidth: "46ch",
              }}
            >
              Sign up or log in to unleash full control over the client-side WebRTC filters and persist your export configurations.
            </p>
          </div>

          <div style={{ position: "relative", zIndex: 1, display: "grid", gap: "var(--space-3)", marginTop: "var(--space-8)" }}>
            {benefits.map((b) => (
              <div key={b} style={{ display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--accent-primary)",
                    boxShadow: "0 0 10px rgba(255,255,255,0.7)",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>{b}</span>
              </div>
            ))}
          </div>

          <div style={{ position: "relative", zIndex: 1, fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginTop: "var(--space-8)" }}>
            SECURE CLIENT CHANNEL // SHA-256 ENCRYPTED
          </div>
        </motion.div>

        {/* Right column: Auth Form */}
        <motion.div variants={slideFromRight} style={{ display: "flex", alignItems: "center" }}>
          <GlassCard style={{ padding: "var(--space-6)", display: "grid", gap: "var(--space-5)", width: "100%" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--space-2)",
                padding: "var(--space-1)",
                borderRadius: 999,
                background: "var(--bg-raised)",
                border: "1px solid var(--border-muted)",
              }}
            >
              {(["signin", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  style={{
                    padding: "0.65rem 1rem",
                    borderRadius: 999,
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "var(--text-sm)",
                    background: mode === m ? "var(--accent-primary)" : "transparent",
                    color: mode === m ? "#000" : "var(--text-secondary)",
                    border: "none",
                    transition: "all 0.2s",
                  }}
                >
                  {m === "signin" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            <form style={{ display: "grid", gap: "var(--space-4)" }} onSubmit={(e) => e.preventDefault()}>
              <label style={{ display: "grid", gap: "0.4rem", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
                <span>Email address</span>
                <input
                  type="email"
                  placeholder="name@studio.com"
                  style={{
                    padding: "0.85rem 1rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-visible)",
                    background: "var(--bg-input)",
                    color: "var(--text-primary)",
                    outline: "none",
                    fontSize: "var(--text-sm)",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent-primary)";
                    e.currentTarget.style.boxShadow = "0 0 8px rgba(255,255,255,0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-visible)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </label>

              <label style={{ display: "grid", gap: "0.4rem", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
                <span>Security passcode</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  style={{
                    padding: "0.85rem 1rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-visible)",
                    background: "var(--bg-input)",
                    color: "var(--text-primary)",
                    outline: "none",
                    fontSize: "var(--text-sm)",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent-primary)";
                    e.currentTarget.style.boxShadow = "0 0 8px rgba(255,255,255,0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-visible)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </label>

              {mode === "signup" && (
                <label style={{ display: "grid", gap: "0.4rem", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
                  <span>Creative Team Name</span>
                  <input
                    type="text"
                    placeholder="Enter team or studio name"
                    style={{
                      padding: "0.85rem 1rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-visible)",
                      background: "var(--bg-input)",
                      color: "var(--text-primary)",
                      outline: "none",
                      fontSize: "var(--text-sm)",
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--accent-primary)";
                      e.currentTarget.style.boxShadow = "0 0 8px rgba(255,255,255,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "var(--border-visible)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </label>
              )}

              <GlowButton variant="primary" size="lg" type="submit">
                {mode === "signin" ? "Initialize Console Session" : "Create Studio Credentials"}
              </GlowButton>
            </form>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", justifyContent: "center" }}>
              {["Secure Session", "Local Sandbox", "Hardware accelerated"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "0.3rem 0.7rem",
                    borderRadius: 999,
                    fontSize: "10px",
                    fontFamily: "var(--font-mono)",
                    background: "var(--bg-raised)",
                    border: "1px solid var(--border-muted)",
                    color: "var(--text-secondary)",
                    textTransform: "uppercase",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
