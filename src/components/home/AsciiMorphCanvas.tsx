import { useEffect, useRef } from "react";
import { clamp } from "../../utils/clamp";

const CHARS = ["@", "#", "%", "*", "+", "=", "-", ":", ".", " "];

function buildAsciiFrame(width: number, height: number, tick: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  // Pure black background
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);

  const cols = 72;
  const rows = 36;
  const cellW = width / cols;
  const cellH = height / rows;
  const t = tick * 0.04;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * cellW + cellW / 2;
      const y = row * cellH + cellH / 2;

      const cx = width / 2;
      const cy = height / 2;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) / (width * 0.5);

      // Multiple wave layers
      const w1 = Math.sin(dist * 5 - t * 1.2 + row * 0.15);
      const w2 = Math.cos(col * 0.12 + t * 0.8);
      const w3 = Math.sin((row + col) * 0.08 + t * 0.5);
      const w4 = Math.cos(dist * 3 + t * 0.3) * 0.5;

      const combined = (w1 * 0.35 + w2 * 0.2 + w3 * 0.25 + w4 * 0.2 + 1) / 2;
      const brightness = clamp(Math.round(combined * 255), 0, 255);
      const idx = clamp(Math.round((brightness / 255) * (CHARS.length - 1)), 0, CHARS.length - 1);
      const char = CHARS[idx];

      // White characters with varying opacity
      const alpha = 0.15 + combined * 0.55;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.font = `${cellH * 0.85}px "JetBrains Mono", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(char, x, y);
    }
  }

  return canvas;
}

export function AsciiMorphCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tickRef = useRef(0);
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;

    const render = () => {
      if (!aliveRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w < 10 || h < 10) {
        requestAnimationFrame(render);
        return;
      }

      const canvas = buildAsciiFrame(w, h, tickRef.current);
      // Replace contents
      const existing = containerRef.current.querySelector("canvas");
      if (existing) {
        containerRef.current.replaceChild(canvas, existing);
      } else {
        containerRef.current.appendChild(canvas);
      }
      tickRef.current += 1;
    };

    render();
    const interval = setInterval(render, 120); // ~8fps for smooth morphing
    return () => { aliveRef.current = false; clearInterval(interval); };
  }, []);

  return (
    <div style={{
      position: "relative", width: "100%", height: "100%", minHeight: 420,
      overflow: "hidden", borderRadius: "var(--radius-xl)",
      border: "1px solid var(--border-muted)",
    }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      {/* Scanline overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 4px)",
      }} />
      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
      }} />
    </div>
  );
}
