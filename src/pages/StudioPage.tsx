import { useState } from "react";
import { GlowButton } from "../components/ui/GlowButton";
import { GlassCard } from "../components/ui/GlassCard";
import { StatusDot } from "../components/ui/StatusDot";
import { StudioSlider } from "../components/ui/StudioSlider";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../lib/motion-variants";
import { useStudioStore, DEFAULT_SETTINGS } from "../store/studioStore";
import type { RenderMode, PaletteKey, SourceKind } from "../types/studio";

const MODE_OPTIONS: { value: RenderMode; label: string; desc: string }[] = [
  { value: "ascii", label: "ASCII", desc: "Classic character mapping" },
  { value: "unicode", label: "Unicode", desc: "Sharper block output" },
  { value: "braille", label: "Braille", desc: "2x4 dot rendering" },
  { value: "emoji", label: "Emoji", desc: "Playful symbol art" },
];

const PALETTE_OPTIONS: { value: PaletteKey; label: string; sample: string }[] = [
  { value: "classic", label: "Classic", sample: "@%#*+=-:. " },
  { value: "bold", label: "Bold", sample: "█▓▒░ " },
  { value: "soft", label: "Soft", sample: "⣿⣷⣯⣟⡿⠿⠛⠉ " },
  { value: "terminal", label: "Terminal", sample: "▇█▆▅▄▃▂▁ " },
];

export function StudioPage() {
  const { settings, setSettings, sourceKind, setSourceKind, sourceLabel, setSourceLabel, status, setStatus, error, setError } = useStudioStore();
  const [fps] = useState(28);

  const loadFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,video/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        setSourceLabel(file.name);
        setSourceKind("image");
        setStatus("Processing uploaded media");
      }
    };
    input.click();
  };

  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: "var(--space-4)", flexWrap: "wrap", paddingTop: "var(--space-4)" }}>
        <motion.div variants={fadeUp}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>STUDIO</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-3xl)", letterSpacing: "var(--tracking-tight)" }}>Shape the output like a pro.</h1>
        </motion.div>
        <GlassCard style={{ padding: "var(--space-3) var(--space-5)", display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <StatusDot status="success" label="Active" />
          <span style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{status}</span>
          {error && <span style={{ fontSize: "var(--text-sm)", color: "var(--error)" }}>{error}</span>}
        </GlassCard>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr 280px", gap: "var(--space-4)", alignItems: "start" }}>
        <GlassCard style={{ padding: "var(--space-4)", display: "grid", gap: "var(--space-4)", position: "sticky", top: 88 }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-2)" }}>
              <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Source</span>
              <span style={{ fontSize: "var(--text-xs)", fontFamily: "var(--font-mono)", color: "var(--accent-glow)" }}>{sourceKind.toUpperCase()}</span>
            </div>
            <div onClick={loadFile} style={{ padding: "var(--space-4)", border: "2px dashed var(--border-visible)", borderRadius: "var(--radius-md)", background: "var(--bg-input)", cursor: "pointer", textAlign: "center", transition: "all 0.2s", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-primary)"; e.currentTarget.style.background = "rgba(99,102,241,0.06)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-visible)"; e.currentTarget.style.background = "var(--bg-input)"; }}
            >
              <strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "0.3rem" }}>Drop media here</strong>
              <span>Images, GIFs, videos</span>
            </div>
          </div>

          <div>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "var(--space-3)" }}>Mode</span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-2)" }}>
              {MODE_OPTIONS.map((opt) => (
                <button key={opt.value} onClick={() => setSettings({ mode: opt.value })}
                  style={{
                    padding: "var(--space-2) var(--space-3)", borderRadius: "var(--radius-md)", textAlign: "left", cursor: "pointer",
                    background: settings.mode === opt.value ? "var(--accent-primary)" : "var(--bg-raised)",
                    color: settings.mode === opt.value ? "#fff" : "var(--text-secondary)",
                    border: `1px solid ${settings.mode === opt.value ? "var(--accent-primary)" : "var(--border-muted)"}`,
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: "var(--text-sm)" }}>{opt.label}</div>
                  <div style={{ fontSize: "var(--text-xs)", opacity: 0.7 }}>{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <StudioSlider label="Density" value={settings.density} min={42} max={150} onChange={(v) => setSettings({ density: v })} />
          <StudioSlider label="Brightness" value={settings.brightness} min={-40} max={40} onChange={(v) => setSettings({ brightness: v })} />
          <StudioSlider label="Contrast" value={settings.contrast} min={0.8} max={1.8} step={0.02} onChange={(v) => setSettings({ contrast: v })} formatValue={(v) => v.toFixed(2)} />

          <div>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "var(--space-2)" }}>Palette</span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-2)" }}>
              {PALETTE_OPTIONS.map((opt) => (
                <button key={opt.value} onClick={() => setSettings({ palette: opt.value })}
                  style={{
                    padding: "var(--space-2)", borderRadius: "var(--radius-sm)", textAlign: "center", cursor: "pointer",
                    background: settings.palette === opt.value ? "rgba(99,102,241,0.12)" : "var(--bg-raised)",
                    border: `1px solid ${settings.palette === opt.value ? "var(--border-accent)" : "var(--border-muted)"}`,
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: settings.palette === opt.value ? "var(--accent-glow)" : "var(--text-secondary)" }}>{opt.sample}</div>
                  <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: "0.2rem" }}>{opt.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
            {(["colorize", "invert", "autoOptimize"] as const).map((key) => (
              <button key={key} onClick={() => setSettings({ [key]: !settings[key] })}
                style={{
                  padding: "0.4rem 0.8rem", borderRadius: 999, fontSize: "var(--text-xs)", cursor: "pointer", fontWeight: 500,
                  background: settings[key] ? "rgba(99,102,241,0.12)" : "var(--bg-raised)",
                  color: settings[key] ? "var(--accent-glow)" : "var(--text-secondary)",
                  border: `1px solid ${settings[key] ? "var(--border-accent)" : "var(--border-muted)"}`,
                  transition: "all 0.15s",
                }}
              >
                {key === "autoOptimize" ? "Auto" : key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          <GlowButton variant="secondary" size="sm" onClick={loadFile}>Import Media</GlowButton>
        </GlassCard>

        <GlassCard style={{ padding: "var(--space-4)", minHeight: 520, position: "relative", display: "grid", gap: "var(--space-3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Canvas</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-base)" }}>Preview output</h3>
            </div>
            <div style={{ display: "flex", gap: "var(--space-2)" }}>
              {["TXT", "HTML", "PNG"].map((fmt) => (
                <button key={fmt} style={{ padding: "0.35rem 0.7rem", borderRadius: 999, fontSize: "var(--text-xs)", fontFamily: "var(--font-mono)", background: "var(--bg-raised)", border: "1px solid var(--border-muted)", color: "var(--text-secondary)", cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--border-accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border-muted)"; }}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, background: "var(--mono-bg)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-muted)", display: "grid", placeItems: "center", padding: "var(--space-8)", fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.2, color: "var(--mono-fg)", position: "relative", overflow: "auto", minHeight: 400 }}>
            <div style={{ display: "grid", gap: 0, textShadow: "0 0 14px var(--mono-glow)" }}>
              <div>@ @ @ # * * * + = = - - : . . .</div>
              <div>@ @ # * * * + = = - - : : . .</div>
              <div>@ # # * * + + = = - - : : . .</div>
              <div># # * * + + = = - - : : . . .</div>
              <div># * * + + = = - - : : . . . .</div>
              <div>* * + + = = - - : : . . . . .</div>
              <div>* + + = = - - : : . . . . . .</div>
              <div style={{ color: "var(--accent-glow)" }}>+ + = = - - : : . . . . . . .</div>
              <div>+ = = - - : : . . . . . . . .</div>
              <div>= = - - : : . . . . . . . . .</div>
            </div>

            <div className="hud-overlay" style={{ position: "absolute", bottom: 12, right: 12, display: "grid", gap: "0.3rem", minWidth: 140 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-xs)" }}>
                <span style={{ color: "var(--text-muted)" }}>Mode</span>
                <span style={{ color: "var(--accent-glow)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{settings.mode.toUpperCase()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-xs)" }}>
                <span style={{ color: "var(--text-muted)" }}>FPS</span>
                <span style={{ color: "var(--success)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{fps}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-xs)" }}>
                <span style={{ color: "var(--text-muted)" }}>Density</span>
                <span style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{settings.density}</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
            <span>Source: <strong style={{ color: "var(--text-primary)" }}>{sourceLabel}</strong></span>
            <span>Summary: <strong style={{ color: "var(--text-primary)" }}>{settings.density} cols · {Math.round(settings.density * 0.52)} rows · {settings.mode.toUpperCase()}</strong></span>
          </div>
        </GlassCard>

        <GlassCard style={{ padding: "var(--space-4)", display: "grid", gap: "var(--space-4)", position: "sticky", top: 88, alignSelf: "start" }}>
          <div>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Insights</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-base)" }}>Render quality</h3>
          </div>

          {[
            { label: "Quality", value: "94%", color: "var(--accent-glow)" },
            { label: "Contrast", value: settings.contrast.toFixed(2), color: "var(--accent-secondary)" },
            { label: "Brightness", value: `${settings.brightness}`, color: "var(--accent-tertiary)" },
            { label: "Chars Used", value: "8", color: "var(--success)" },
          ].map((m) => (
            <div key={m.label} style={{ display: "flex", justifyContent: "space-between", padding: "var(--space-2) var(--space-3)", borderRadius: "var(--radius-md)", background: "var(--bg-raised)", border: "1px solid var(--border-muted)" }}>
              <span style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{m.label}</span>
              <span style={{ fontSize: "var(--text-sm)", fontFamily: "var(--font-mono)", fontWeight: 600, color: m.color }}>{m.value}</span>
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}
