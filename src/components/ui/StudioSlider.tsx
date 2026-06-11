import { useCallback, useRef } from "react";

interface StudioSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  formatValue?: (v: number) => string;
}

export function StudioSlider({ label, value, min, max, step = 1, onChange, formatValue }: StudioSliderProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const pct = ((value - min) / (max - min)) * 100;

  const handlePointer = useCallback((clientX: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const rect = rail.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * (max - min) + min;
    const stepped = Math.round((Math.min(max, Math.max(min, raw)) - min) / step) * step + min;
    onChange(Math.round(stepped * 100) / 100);
  }, [min, max, step, onChange]);

  return (
    <div style={{ display: "grid", gap: "0.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-xs)", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
        <span>{label}</span>
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>{formatValue ? formatValue(value) : value}</span>
      </div>
      <div
        ref={railRef}
        role="slider"
        tabIndex={0}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label}
        style={{
          position: "relative", height: 4, borderRadius: 999,
          background: "var(--bg-overlay)", cursor: "pointer", touchAction: "none",
        }}
        onPointerDown={(e) => { handlePointer(e.clientX); (e.target as HTMLElement).setPointerCapture(e.pointerId); }}
        onPointerMove={(e) => { if (e.buttons > 0) handlePointer(e.clientX); }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowUp") onChange(Math.min(max, value + step));
          if (e.key === "ArrowLeft" || e.key === "ArrowDown") onChange(Math.max(min, value - step));
        }}
      >
        {/* Filled track */}
        <div style={{
          height: "100%", borderRadius: 999,
          background: "#fff",
          width: `${pct}%`,
          transition: "width 0.06s ease",
          boxShadow: "0 0 8px rgba(255,255,255,0.2)",
        }} />
        {/* Thumb */}
        <div style={{
          position: "absolute", top: "50%", left: `${pct}%`,
          width: 14, height: 14, borderRadius: "50%",
          background: "#fff",
          border: "2px solid var(--bg-void)",
          boxShadow: "0 0 10px rgba(255,255,255,0.3), 0 2px 6px rgba(0,0,0,0.5)",
          transform: "translate(-50%, -50%)",
          transition: "left 0.06s ease",
        }} />
      </div>
    </div>
  );
}
