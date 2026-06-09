import { useEffect, useRef } from "react";
import { clamp } from "../../utils/clamp";

const CHARS = ["@", "%", "#", "*", "+", "=", "-", ":", ".", " "];

function buildAsciiFrame(width: number, height: number, tick: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const drift = 0.5 + 0.5 * Math.sin(tick * 0.7);
  const pulse = 0.5 + 0.5 * Math.cos(tick * 0.9);

  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "#040b15");
  bg.addColorStop(0.5, "#07172b");
  bg.addColorStop(1, "#040712");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  const g1 = ctx.createRadialGradient(width * 0.18, height * 0.24, 0, width * 0.18, height * 0.24, width * 0.18);
  g1.addColorStop(0, "rgba(99,102,241,0.6)");
  g1.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g1;
  ctx.beginPath();
  ctx.arc(width * 0.18, height * 0.24, width * 0.18, 0, Math.PI * 2);
  ctx.fill();

  const g2 = ctx.createRadialGradient(width * 0.78, height * 0.2, 0, width * 0.78, height * 0.2, width * 0.14);
  g2.addColorStop(0, "rgba(167,139,250,0.5)");
  g2.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g2;
  ctx.beginPath();
  ctx.arc(width * 0.78, height * 0.2, width * 0.14, 0, Math.PI * 2);
  ctx.fill();

  const cols = 64;
  const rows = 32;
  const cellW = width / cols;
  const cellH = height / rows;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * cellW + cellW / 2;
      const y = row * cellH + cellH / 2;
      const dist = Math.sqrt((x - width / 2) ** 2 + (y - height / 2) ** 2) / (width / 2);
      const wave = 0.5 + 0.5 * Math.sin(dist * 6 - tick * 0.5 + row * 0.3 + col * 0.2);
      const brightness = clamp(Math.round((wave * 0.7 + drift * 0.2 + pulse * 0.1) * 255), 0, 255);
      const idx = Math.round((brightness / 255) * (CHARS.length - 1));
      const char = CHARS[clamp(idx, 0, CHARS.length - 1)];

      ctx.fillStyle = `rgba(129,140,248,${0.3 + wave * 0.5})`;
      ctx.font = `${cellH * 0.9}px "JetBrains Mono", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(char, x, y);
    }
  }

  return canvas;
}

export function AsciiMorphCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    let tick = 0;

    const render = () => {
      if (!alive || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w < 10 || h < 10) return;

      const canvas = buildAsciiFrame(w, h, tick);
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(canvas);
      tick += 1;
    };

    render();
    const interval = setInterval(render, 1500);
    return () => { alive = false; clearInterval(interval); };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 400, overflow: "hidden", borderRadius: "var(--radius-xl)" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      <div className="scanline" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        animation: "scanline-scroll 8s linear infinite",
      }} />
    </div>
  );
}
