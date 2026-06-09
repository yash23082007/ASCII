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
        <span>{formatValue ? formatValue(value) : value}</span>
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
          position: "relative", height: 6, borderRadius: 999, background: "var(--bg-raised)", cursor: "pointer", touchAction: "none",
        }}
        onPointerDown={(e) => { handlePointer(e.clientX); (e.target as HTMLElement).setPointerCapture(e.pointerId); }}
        onPointerMove={(e) => { if (e.buttons > 0) handlePointer(e.clientX); }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowUp") onChange(Math.min(max, value + step));
          if (e.key === "ArrowLeft" || e.key === "ArrowDown") onChange(Math.max(min, value - step));
        }}
      >
        <div style={{ height: "100%", borderRadius: 999, background: "linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))", width: `${pct}%`, transition: "width 0.08s ease" }} />
        <div
          style={{
            position: "absolute", top: "50%", left: `${pct}%`, width: 18, height: 18, borderRadius: "50%",
            background: "#fff", transform: "translate(-50%, -50%)", boxShadow: "0 0 0 3px var(--accent-primary)",
            transition: "left 0.08s ease",
          }}
        />
      </div>
    </div>
  );
}
