import { useEffect, useRef, useState } from "react";
import { renderAscii } from "../../lib/ascii";
import { GlassCard } from "../ui/GlassCard";
import { GlowButton } from "../ui/GlowButton";
import { StudioSlider } from "../ui/StudioSlider";
import { motion } from "framer-motion";

export function LiveDemo() {
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);
  const [density, setDensity] = useState(80);
  const [contrast, setContrast] = useState(1.2);
  const [mode, setMode] = useState<"ascii" | "unicode" | "braille" | "emoji">("ascii");
  const [palette, setPalette] = useState<"classic" | "bold" | "soft" | "terminal">("classic");
  const [asciiHtml, setAsciiHtml] = useState("");
  const [shape, setShape] = useState<"cube" | "torus" | "pyramid">("cube");

  useEffect(() => {
    const canvas = hiddenCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let angleX = 0;
    let angleY = 0;
    let animationFrameId: number;

    const renderLoop = () => {
      // Clear canvas
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;

      // Draw rotating 3D shape
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      const scale = 55;
      const points: [number, number, number][] = [];

      if (shape === "cube") {
        // Cube vertices
        for (let x = -1; x <= 1; x += 2) {
          for (let y = -1; y <= 1; y += 2) {
            for (let z = -1; z <= 1; z += 2) {
              points.push([x, y, z]);
            }
          }
        }
      } else if (shape === "pyramid") {
        // Pyramid vertices
        points.push([0, -1.2, 0]); // apex
        points.push([-1, 0.8, -1]);
        points.push([1, 0.8, -1]);
        points.push([1, 0.8, 1]);
        points.push([-1, 0.8, 1]);
      } else {
        // Torus / Ring
        const segments = 16;
        const radius = 1.0;
        const tubeRadius = 0.4;
        for (let i = 0; i < segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          for (let j = 0; j < segments; j++) {
            const phi = (j / segments) * Math.PI * 2;
            const x = (radius + tubeRadius * Math.cos(phi)) * Math.cos(theta);
            const y = (radius + tubeRadius * Math.cos(phi)) * Math.sin(theta);
            const z = tubeRadius * Math.sin(phi);
            points.push([x, y, z]);
          }
        }
      }

      // Rotate points
      const rotatedPoints = points.map(([x, y, z]) => {
        // Rotate X
        let rad = angleX;
        let cos = Math.cos(rad);
        let sin = Math.sin(rad);
        let y1 = y * cos - z * sin;
        let z1 = y * sin + z * cos;

        // Rotate Y
        rad = angleY;
        cos = Math.cos(rad);
        sin = Math.sin(rad);
        let x2 = x * cos + z1 * sin;
        let z2 = -x * sin + z1 * cos;

        return [x2 * scale, y1 * scale, z2];
      });

      // Draw edges
      if (shape === "cube") {
        const edges = [
          [0, 1], [1, 3], [3, 2], [2, 0], // front
          [4, 5], [5, 7], [7, 6], [6, 4], // back
          [0, 4], [1, 5], [2, 6], [3, 7]  // connections
        ];
        edges.forEach(([p1, p2]) => {
          ctx.beginPath();
          ctx.moveTo(rotatedPoints[p1][0], rotatedPoints[p1][1]);
          ctx.lineTo(rotatedPoints[p2][0], rotatedPoints[p2][1]);
          ctx.stroke();
        });
      } else if (shape === "pyramid") {
        const edges = [
          [0, 1], [0, 2], [0, 3], [0, 4], // apex to base
          [1, 2], [2, 3], [3, 4], [4, 1]  // base
        ];
        edges.forEach(([p1, p2]) => {
          ctx.beginPath();
          ctx.moveTo(rotatedPoints[p1][0], rotatedPoints[p1][1]);
          ctx.lineTo(rotatedPoints[p2][0], rotatedPoints[p2][1]);
          ctx.stroke();
        });
      } else {
        // Torus wireframe
        const segments = 16;
        for (let i = 0; i < segments; i++) {
          for (let j = 0; j < segments; j++) {
            const current = i * segments + j;
            const nextTheta = ((i + 1) % segments) * segments + j;
            const nextPhi = i * segments + ((j + 1) % segments);

            ctx.beginPath();
            ctx.moveTo(rotatedPoints[current][0], rotatedPoints[current][1]);
            ctx.lineTo(rotatedPoints[nextTheta][0], rotatedPoints[nextTheta][1]);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(rotatedPoints[current][0], rotatedPoints[current][1]);
            ctx.lineTo(rotatedPoints[nextPhi][0], rotatedPoints[nextPhi][1]);
            ctx.stroke();
          }
        }
      }

      ctx.restore();

      // Convert canvas to ASCII
      const result = renderAscii(canvas, {
        mode,
        palette,
        density,
        brightness: 0,
        contrast,
        colorize: false,
        invert: false,
        autoOptimize: false,
      });

      // Format ASCII rows as string
      const asciiText = result.rows.map(r => r.text).join("\n");
      setAsciiHtml(asciiText);

      angleX += 0.012;
      angleY += 0.016;

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [shape, mode, palette, density, contrast]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "var(--space-6)", alignItems: "center", margin: "var(--space-12) 0" }}>
      <div style={{ display: "grid", gap: "var(--space-4)" }}>
        <div>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
            // LIVE PREVIEW ENGINE
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-4xl)", letterSpacing: "var(--tracking-tight)", marginTop: "var(--space-1)" }}>
            Try it in real time
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-base)", marginTop: "var(--space-2)", lineHeight: 1.6 }}>
            Interact with the client-side vector rasterizer. Watch how the algorithm processes geometric complexity into ASCII grids at 60 FPS.
          </p>
        </div>

        <GlassCard style={{ padding: "var(--space-4)", display: "grid", gap: "var(--space-4)" }}>
          <div>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", textTransform: "uppercase", display: "block", marginBottom: "var(--space-2)" }}>Shape Generator</span>
            <div style={{ display: "flex", gap: "var(--space-2)" }}>
              {(["cube", "pyramid", "torus"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setShape(s)}
                  style={{
                    padding: "var(--space-2) var(--space-3)",
                    borderRadius: "var(--radius-sm)",
                    background: shape === s ? "var(--accent-primary)" : "var(--bg-raised)",
                    color: shape === s ? "#000" : "var(--text-secondary)",
                    border: "1px solid var(--border-muted)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", textTransform: "uppercase", display: "block", marginBottom: "var(--space-2)" }}>Render Mode</span>
            <div style={{ display: "flex", gap: "var(--space-2)" }}>
              {(["ascii", "unicode", "braille"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  style={{
                    padding: "var(--space-2) var(--space-3)",
                    borderRadius: "var(--radius-sm)",
                    background: mode === m ? "var(--accent-primary)" : "var(--bg-raised)",
                    color: mode === m ? "#000" : "var(--text-secondary)",
                    border: "1px solid var(--border-muted)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <StudioSlider label="Density (Columns)" value={density} min={30} max={110} onChange={(v) => setDensity(v)} />
          <StudioSlider label="Raster Contrast" value={contrast} min={0.5} max={2.0} step={0.05} onChange={(v) => setContrast(v)} formatValue={(v) => v.toFixed(2)} />
        </GlassCard>

        <GlowButton to="/studio" variant="primary" size="md">
          Open Studio with Webcam →
        </GlowButton>
      </div>

      <div style={{ position: "relative" }}>
        {/* Hidden Canvas for drawing vector shape */}
        <canvas ref={hiddenCanvasRef} width={240} height={200} style={{ display: "none" }} />

        {/* ASCII View Screen */}
        <div
          style={{
            background: "var(--mono-bg)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-visible)",
            padding: "var(--space-6)",
            fontFamily: "var(--font-mono)",
            fontSize: mode === "braille" ? 11 : 9,
            lineHeight: 1.15,
            color: "var(--mono-fg)",
            whiteSpace: "pre",
            overflow: "hidden",
            height: "440px",
            display: "grid",
            placeItems: "center",
            boxShadow: "var(--shadow-xl)",
            textShadow: "0 0 8px var(--mono-glow)",
          }}
        >
          <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
            {asciiHtml}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "1rem",
            right: "1rem",
            background: "rgba(0,0,0,0.72)",
            backdropFilter: "blur(8px)",
            padding: "0.25rem 0.5rem",
            borderRadius: "var(--radius-xs)",
            border: "1px solid var(--border-muted)",
            fontSize: "10px",
            fontFamily: "var(--font-mono)",
            color: "var(--text-secondary)",
          }}
        >
          RENDER TIME: &lt;1ms | 60FPS
        </div>
      </div>
    </div>
  );
}
