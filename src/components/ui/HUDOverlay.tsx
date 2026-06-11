interface HUDOverlayProps {
  mode: string;
  fps?: number;
  density: number;
  quality: number;
}

export function HUDOverlay({ mode, fps, density, quality }: HUDOverlayProps) {
  return (
    <div className="hud-overlay" style={{ position: "absolute", bottom: 16, right: 16, zIndex: 10, display: "grid", gap: "0.5rem", minWidth: 160 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Mode</span>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{mode.toUpperCase()}</span>
      </div>
      {fps !== undefined && (
        <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>FPS</span>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--success)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{fps.toFixed(0)}</span>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Density</span>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{density}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Quality</span>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{quality}%</span>
      </div>
    </div>
  );
}
