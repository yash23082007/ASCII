import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../components/ui/GlassCard";
import { GlowButton } from "../components/ui/GlowButton";
import { staggerContainer, fadeUp, slideFromLeft, slideFromRight } from "../lib/motion-variants";

const benefits = ["Save project history and favorites.", "Resume long-running video exports later.", "Publish polished galleries from one workspace."];

export function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="page">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-8)", alignItems: "start" }}>
        <motion.div variants={slideFromLeft} style={{ display: "grid", gap: "var(--space-4)", paddingTop: "var(--space-4)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
            ACCOUNT
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-4xl)", letterSpacing: "var(--tracking-tight)" }}>
            Forms that feel polished enough for a product demo.
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "48ch" }}>
            The authentication page rounds out the navigation and makes the app feel like a complete product surface instead of a single-page gimmick.
          </p>
          <div style={{ display: "grid", gap: "var(--space-3)" }}>
            {benefits.map((b) => (
              <div key={b} style={{ display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))", boxShadow: "0 0 0 4px rgba(99,102,241,0.12)", flexShrink: 0 }} />
                <span style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{b}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={slideFromRight}>
          <GlassCard style={{ padding: "var(--space-6)", display: "grid", gap: "var(--space-5)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-2)", padding: "var(--space-1)", borderRadius: 999, background: "var(--bg-raised)", border: "1px solid var(--border-muted)" }}>
              {(["signin", "signup"] as const).map((m) => (
                <button key={m} onClick={() => setMode(m)}
                  style={{
                    padding: "0.65rem 1rem", borderRadius: 999, cursor: "pointer", fontWeight: 500, fontSize: "var(--text-sm)",
                    background: mode === m ? "var(--accent-primary)" : "transparent",
                    color: mode === m ? "#fff" : "var(--text-secondary)",
                    border: "none", transition: "all 0.2s",
                  }}
                >
                  {m === "signin" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            <form style={{ display: "grid", gap: "var(--space-4)" }} onSubmit={(e) => e.preventDefault()}>
              <label style={{ display: "grid", gap: "0.4rem", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
                <span>Email</span>
                <input type="email" placeholder="you@example.com"
                  style={{ padding: "0.85rem 1rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-visible)", background: "var(--bg-input)", color: "var(--text-primary)", outline: "none", fontSize: "var(--text-sm)", transition: "border-color 0.15s, box-shadow 0.15s" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent-primary)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-visible)"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </label>
              <label style={{ display: "grid", gap: "0.4rem", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
                <span>Password</span>
                <input type="password" placeholder="••••••••"
                  style={{ padding: "0.85rem 1rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-visible)", background: "var(--bg-input)", color: "var(--text-primary)", outline: "none", fontSize: "var(--text-sm)", transition: "border-color 0.15s, box-shadow 0.15s" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent-primary)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-visible)"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </label>
              {mode === "signup" && (
                <label style={{ display: "grid", gap: "0.4rem", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
                  <span>Organization</span>
                  <input type="text" placeholder="Studio or team name"
                    style={{ padding: "0.85rem 1rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-visible)", background: "var(--bg-input)", color: "var(--text-primary)", outline: "none", fontSize: "var(--text-sm)", transition: "border-color 0.15s, box-shadow 0.15s" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent-primary)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-visible)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </label>
              )}
              <GlowButton variant="primary" size="lg" type="submit">
                {mode === "signin" ? "Sign In" : "Create Account"}
              </GlowButton>
            </form>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", justifyContent: "center" }}>
              {["OAuth-ready", "Project history", "Secure vault"].map((tag) => (
                <span key={tag} style={{ padding: "0.3rem 0.7rem", borderRadius: 999, fontSize: "var(--text-xs)", background: "var(--bg-raised)", border: "1px solid var(--border-muted)", color: "var(--text-muted)" }}>
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
