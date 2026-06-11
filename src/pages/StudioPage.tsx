import { useEffect, useRef, useState } from "react";
import { GlowButton } from "../components/ui/GlowButton";
import { GlassCard } from "../components/ui/GlassCard";
import { StatusDot } from "../components/ui/StatusDot";
import { StudioSlider } from "../components/ui/StudioSlider";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeUp } from "../lib/motion-variants";
import { useStudioStore } from "../store/studioStore";
import { useWebcam } from "../hooks/useWebcam";
import {
  renderAscii,
  copyAsciiToClipboard,
  downloadTextArt,
  downloadHtmlArt,
  downloadPngArt,
  qualityScore,
  edgeDensity,
  autoTune,
  buildAsciiString,
  getModeLabel,
  getPaletteLabel
} from "../lib/ascii";
import type { RenderMode, PaletteKey, SourceKind } from "../types/studio";
import { Camera, Upload, RefreshCw, Copy, Check, Download, Video } from "lucide-react";

const MODE_OPTIONS: { value: RenderMode; label: string; desc: string }[] = [
  { value: "ascii", label: "ASCII", desc: "Classic characters" },
  { value: "unicode", label: "Unicode", desc: "Block output" },
  { value: "braille", label: "Braille", desc: "2x4 dot render" },
  { value: "emoji", label: "Emoji", desc: "Symbol art" },
];

const PALETTE_OPTIONS: { value: PaletteKey; label: string; sample: string }[] = [
  { value: "classic", label: "Classic", sample: "@%#*+=-:. " },
  { value: "bold", label: "Bold", sample: "█▓▒░ " },
  { value: "soft", label: "Soft", sample: "⣿⣷⣯⣟⡿⠿⠛⠉ " },
  { value: "terminal", label: "Terminal", sample: "▇█▆▅▄▃▂▁ " },
];

export function StudioPage() {
  const {
    settings,
    setSettings,
    sourceKind,
    setSourceKind,
    sourceLabel,
    setSourceLabel,
    status,
    setStatus,
    error,
    setError,
    isRendering,
    setIsRendering,
  } = useStudioStore();

  const [asciiResult, setAsciiResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [fps, setFps] = useState(0);

  // Hidden references for processing
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const videoFileRef = useRef<HTMLVideoElement | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);

  // Webcam hook
  const {
    isActive: isWebcamActive,
    error: webcamError,
    startWebcam,
    stopWebcam,
    videoRef: webcamVideoRef,
  } = useWebcam();

  // 3D Wireframe Demo Scene State (when idle/demo mode)
  const demoAngleRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Handle errors from webcam hook
  useEffect(() => {
    if (webcamError) {
      setError(webcamError);
      setStatus("Error acquiring camera");
      setSourceKind("demo");
    }
  }, [webcamError, setError, setStatus, setSourceKind]);

  // Clean up animation loop
  const stopAnimationLoop = () => {
    if (frameIdRef.current !== null) {
      cancelAnimationFrame(frameIdRef.current);
      frameIdRef.current = null;
    }
  };

  // Convert canvas contents to ASCII and update state
  const processFrame = (source: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement) => {
    if (!source) return;
    setIsRendering(true);

    let activeSettings = { ...settings };

    // Auto Optimize option
    if (settings.autoOptimize) {
      const stats = autoTune(source, settings.mode);
      // Update store settings without triggering infinite loop by checking difference
      if (
        stats.density !== settings.density ||
        stats.brightness !== settings.brightness ||
        stats.contrast !== settings.contrast
      ) {
        setSettings(stats);
        activeSettings = { ...activeSettings, ...stats };
      }
    }

    const result = renderAscii(source, activeSettings);
    setAsciiResult(result);
    setIsRendering(false);
  };

  // Start rendering frame loop for real-time sources
  const startAnimationLoop = () => {
    stopAnimationLoop();

    const loop = (timestamp: number) => {
      // Calculate FPS
      if (lastFrameTimeRef.current > 0) {
        const delta = timestamp - lastFrameTimeRef.current;
        setFps(Math.round(1000 / delta));
      }
      lastFrameTimeRef.current = timestamp;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (canvas && ctx) {
        if (sourceKind === "webcam" && webcamVideoRef.current && isWebcamActive) {
          // Draw video to hidden canvas
          if (webcamVideoRef.current.readyState === webcamVideoRef.current.HAVE_ENOUGH_DATA) {
            canvas.width = webcamVideoRef.current.videoWidth;
            canvas.height = webcamVideoRef.current.videoHeight;
            ctx.drawImage(webcamVideoRef.current, 0, 0, canvas.width, canvas.height);
            processFrame(canvas);
          }
        } else if (sourceKind === "video" && videoFileRef.current) {
          // Draw video file to hidden canvas
          if (videoFileRef.current.readyState >= videoFileRef.current.HAVE_CURRENT_DATA) {
            canvas.width = videoFileRef.current.videoWidth;
            canvas.height = videoFileRef.current.videoHeight;
            ctx.drawImage(videoFileRef.current, 0, 0, canvas.width, canvas.height);
            processFrame(canvas);
          }
        } else if (sourceKind === "demo") {
          // Render a rotating 3D shape as a demo background inside the canvas
          canvas.width = 320;
          canvas.height = 240;
          ctx.fillStyle = "#000000";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 2;

          ctx.save();
          ctx.translate(canvas.width / 2, canvas.height / 2);

          const scale = 70;
          const points: [number, number, number][] = [
            [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
          ];

          // Rotate X & Y
          const angle = demoAngleRef.current;
          angle.x += 0.01;
          angle.y += 0.015;

          const rotatedPoints = points.map(([x, y, z]) => {
            // Rot X
            let c = Math.cos(angle.x);
            let s = Math.sin(angle.x);
            let y1 = y * c - z * s;
            let z1 = y * s + z * c;

            // Rot Y
            c = Math.cos(angle.y);
            s = Math.sin(angle.y);
            let x2 = x * c + z1 * s;
            let z2 = -x * s + z1 * c;

            return [x2 * scale, y1 * scale, z2];
          });

          // Draw cube lines
          const edges = [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7]
          ];

          edges.forEach(([p1, p2]) => {
            ctx.beginPath();
            ctx.moveTo(rotatedPoints[p1][0], rotatedPoints[p1][1]);
            ctx.lineTo(rotatedPoints[p2][0], rotatedPoints[p2][1]);
            ctx.stroke();
          });

          ctx.restore();
          processFrame(canvas);
        }
      }

      frameIdRef.current = requestAnimationFrame(loop);
    };

    frameIdRef.current = requestAnimationFrame(loop);
  };

  // React to source changes or webcam state changes
  useEffect(() => {
    setError(null);
    if (sourceKind === "webcam") {
      setStatus("Starting webcam...");
      startWebcam()
        .then(() => setStatus("Webcam active"))
        .catch((err) => {
          setError("Webcam failed: " + err.message);
          setSourceKind("demo");
        });
    } else {
      stopWebcam();
      if (sourceKind === "demo") {
        setSourceLabel("Demo scene");
        setStatus("Running demo scene");
      }
    }

    // Trigger loop if source changes to animated
    if (sourceKind === "webcam" || sourceKind === "video" || sourceKind === "demo") {
      startAnimationLoop();
    } else {
      stopAnimationLoop();
    }

    return () => {
      stopAnimationLoop();
    };
  }, [sourceKind]);

  // If static image is loaded, process it when settings change
  useEffect(() => {
    if (sourceKind === "image" && imageRef.current) {
      processFrame(imageRef.current);
    }
  }, [settings, sourceKind]);

  // Load image or video file
  const handleFileUpload = (file: File) => {
    setError(null);
    stopAnimationLoop();

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      setError("Supported formats: Images or Videos");
      return;
    }

    setSourceLabel(file.name);

    if (isImage) {
      setSourceKind("image");
      setStatus("Processing image...");

      const img = new Image();
      img.onload = () => {
        imageRef.current = img;
        processFrame(img);
        setStatus("Image loaded");
      };
      img.onerror = () => {
        setError("Failed to load image");
        setStatus("Error loading image");
        setSourceKind("demo");
      };
      img.src = URL.createObjectURL(file);
    } else if (isVideo) {
      setSourceKind("video");
      setStatus("Buffering video...");

      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.autoplay = true;

      video.oncanplay = () => {
        videoFileRef.current = video;
        video.play().catch(console.error);
        setStatus("Rendering video");
        startAnimationLoop();
      };

      video.onerror = () => {
        setError("Failed to load video file");
        setStatus("Error loading video");
        setSourceKind("demo");
      };
    }
  };

  const selectFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,video/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) handleFileUpload(file);
    };
    input.click();
  };

  // Export handlers
  const handleCopy = () => {
    if (!asciiResult) return;
    const text = buildAsciiString(asciiResult.rows);
    copyAsciiToClipboard(text)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Clipboard write failed:", err);
      });
  };

  const handleDownloadTxt = () => {
    if (!asciiResult) return;
    const text = buildAsciiString(asciiResult.rows);
    downloadTextArt(text, `ascii-vision-${Date.now()}.txt`);
  };

  const handleDownloadHtml = () => {
    if (!asciiResult) return;
    const text = buildAsciiString(asciiResult.rows);
    downloadHtmlArt(text, `ascii-vision-${Date.now()}.html`);
  };

  const handleDownloadPng = () => {
    if (!asciiResult) return;
    const text = buildAsciiString(asciiResult.rows);
    downloadPngArt(text, {
      fileName: `ascii-vision-${Date.now()}.png`,
      background: "#000000",
      foreground: "#ffffff",
      fontSize: settings.mode === "braille" ? 11 : 9,
    });
  };

  // Derive quality details
  const stats = asciiResult ? qualityScore(asciiResult) : { overall: 0, detail: { brightness: 0, contrast: 0, complexity: 0 } };
  const currentEdgeDensity = canvasRef.current && settings ? edgeDensity(canvasRef.current, settings) : 0;

  return (
    <div className="page" style={{ paddingTop: 0 }}>
      {/* Hidden processing nodes */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {sourceKind === "webcam" && (
        <video
          ref={webcamVideoRef}
          style={{ display: "none" }}
          playsInline
          muted
        />
      )}

      {/* Header section */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "var(--space-4)",
          flexWrap: "wrap",
          paddingTop: "var(--space-4)",
          borderBottom: "1px solid var(--border-muted)",
          paddingBottom: "var(--space-4)",
        }}
      >
        <motion.div variants={fadeUp}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-glow)", fontWeight: 500, letterSpacing: "var(--tracking-widest)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
            ASC-V1 RASTER STUDIO
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-3xl)", letterSpacing: "var(--tracking-tight)", margin: 0 }}>
            Real-Time Processing Console
          </h1>
        </motion.div>

        <motion.div variants={fadeUp} style={{ display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
          {error && (
            <span style={{ fontSize: "var(--text-xs)", color: "var(--error)", fontFamily: "var(--font-mono)", padding: "0.25rem 0.5rem", borderRadius: "var(--radius-xs)", background: "rgba(255,138,138,0.08)", border: "1px solid rgba(255,138,138,0.2)" }}>
              {error}
            </span>
          )}
          <GlassCard style={{ padding: "0.5rem 1rem", display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <StatusDot status={error ? "error" : sourceKind !== "demo" ? "success" : "info"} pulse={sourceKind !== "demo"} />
            <span style={{ fontSize: "var(--text-xs)", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", textTransform: "uppercase" }}>
              {status}
            </span>
          </GlassCard>
        </motion.div>
      </motion.div>

      {/* Main Grid */}
      <div
        className="studio-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr 280px",
          gap: "var(--space-4)",
          alignItems: "start",
        }}
      >
        {/* Left Sidebar: Controls */}
        <GlassCard style={{ padding: "var(--space-4)", display: "grid", gap: "var(--space-4)" }}>
          {/* Source options */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-2)" }}>
              <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Active Source</span>
              <span style={{ fontSize: "var(--text-xs)", fontFamily: "var(--font-mono)", color: "var(--accent-glow)" }}>
                {sourceKind.toUpperCase()}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-2)" }}>
              <button
                onClick={() => setSourceKind("webcam")}
                style={{
                  padding: "0.5rem",
                  borderRadius: "var(--radius-md)",
                  border: `1px solid ${sourceKind === "webcam" ? "var(--accent-primary)" : "var(--border-muted)"}`,
                  background: sourceKind === "webcam" ? "var(--accent-primary)" : "var(--bg-raised)",
                  color: sourceKind === "webcam" ? "#000" : "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.35rem",
                  transition: "all 0.15s",
                }}
              >
                <Camera size={14} /> Webcam
              </button>
              <button
                onClick={selectFile}
                style={{
                  padding: "0.5rem",
                  borderRadius: "var(--radius-md)",
                  border: `1px solid ${sourceKind === "image" || sourceKind === "video" ? "var(--accent-primary)" : "var(--border-muted)"}`,
                  background: sourceKind === "image" || sourceKind === "video" ? "var(--accent-primary)" : "var(--bg-raised)",
                  color: sourceKind === "image" || sourceKind === "video" ? "#000" : "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.35rem",
                  transition: "all 0.15s",
                }}
              >
                <Upload size={14} /> File Import
              </button>
            </div>
          </div>

          <hr style={{ border: 0, borderTop: "1px solid var(--border-muted)", margin: 0 }} />

          {/* Mode Selector */}
          <div>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "var(--space-2)" }}>
              Raster Mode
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-2)" }}>
              {MODE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSettings({ mode: opt.value })}
                  style={{
                    padding: "var(--space-2)",
                    borderRadius: "var(--radius-md)",
                    textAlign: "left",
                    cursor: "pointer",
                    background: settings.mode === opt.value ? "var(--accent-primary)" : "var(--bg-raised)",
                    color: settings.mode === opt.value ? "#000" : "var(--text-secondary)",
                    border: `1px solid ${settings.mode === opt.value ? "var(--accent-primary)" : "var(--border-muted)"}`,
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: "var(--text-xs)", textTransform: "uppercase" }}>{opt.label}</div>
                  <div style={{ fontSize: "10px", opacity: 0.8 }}>{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <hr style={{ border: 0, borderTop: "1px solid var(--border-muted)", margin: 0 }} />

          {/* Parameter Sliders */}
          <div style={{ display: "grid", gap: "var(--space-3)" }}>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block" }}>
              Filter Parameters
            </span>
            <StudioSlider
              label="Grid Density"
              value={settings.density}
              min={30}
              max={150}
              onChange={(v) => setSettings({ density: v })}
              formatValue={(v) => `${v} cols`}
            />
            <StudioSlider
              label="Brightness Offset"
              value={settings.brightness}
              min={-40}
              max={40}
              onChange={(v) => setSettings({ brightness: v })}
              formatValue={(v) => (v > 0 ? `+${v}` : `${v}`)}
            />
            <StudioSlider
              label="Contrast Ratio"
              value={settings.contrast}
              min={0.8}
              max={1.8}
              step={0.02}
              onChange={(v) => setSettings({ contrast: v })}
              formatValue={(v) => `${v.toFixed(2)}x`}
            />
          </div>

          <hr style={{ border: 0, borderTop: "1px solid var(--border-muted)", margin: 0 }} />

          {/* Palette Selector */}
          <div>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "var(--space-2)" }}>
              Char Palette
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-2)" }}>
              {PALETTE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSettings({ palette: opt.value })}
                  style={{
                    padding: "var(--space-2) var(--space-1)",
                    borderRadius: "var(--radius-sm)",
                    textAlign: "center",
                    cursor: "pointer",
                    background: settings.palette === opt.value ? "rgba(255, 255, 255, 0.08)" : "var(--bg-raised)",
                    border: `1px solid ${settings.palette === opt.value ? "var(--border-accent)" : "var(--border-muted)"}`,
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: settings.palette === opt.value ? "var(--text-primary)" : "var(--text-secondary)" }}>
                    {opt.sample.slice(0, 4)}...
                  </div>
                  <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "0.15rem", textTransform: "uppercase" }}>{opt.label}</div>
                </button>
              ))}
            </div>
          </div>

          <hr style={{ border: 0, borderTop: "1px solid var(--border-muted)", margin: 0 }} />

          {/* Toggle Switches */}
          <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
            {[
              { key: "colorize", label: "Colorize" },
              { key: "invert", label: "Invert" },
              { key: "autoOptimize", label: "Auto Tune" }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSettings({ [key]: !settings[key as keyof typeof settings] })}
                style={{
                  padding: "0.4rem 0.8rem",
                  borderRadius: 999,
                  fontSize: "10px",
                  cursor: "pointer",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  background: settings[key as keyof typeof settings] ? "rgba(255,255,255,0.08)" : "var(--bg-raised)",
                  color: settings[key as keyof typeof settings] ? "var(--text-primary)" : "var(--text-muted)",
                  border: `1px solid ${settings[key as keyof typeof settings] ? "var(--border-accent)" : "var(--border-muted)"}`,
                  transition: "all 0.15s",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Center Preview Display */}
        <div style={{ display: "grid", gap: "var(--space-4)" }}>
          <GlassCard
            style={{
              padding: "var(--space-4)",
              position: "relative",
              minHeight: 520,
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-4)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Canvas Preview
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-base)", margin: 0 }}>
                  Active Render Feed
                </h3>
              </div>

              {/* Toolbar */}
              <div style={{ display: "flex", gap: "var(--space-2)" }}>
                <button
                  onClick={handleCopy}
                  style={{
                    padding: "0.4rem 0.8rem",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "var(--text-xs)",
                    fontFamily: "var(--font-mono)",
                    background: "var(--bg-raised)",
                    border: "1px solid var(--border-muted)",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--border-accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border-muted)"; }}
                >
                  {copied ? <Check size={12} style={{ color: "var(--success)" }} /> : <Copy size={12} />}
                  {copied ? "Copied" : "Copy ASCII"}
                </button>
              </div>
            </div>

            {/* ASCII Output Box */}
            <div
              style={{
                flex: 1,
                background: "var(--mono-bg)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-muted)",
                display: "grid",
                placeItems: "center",
                padding: "var(--space-6)",
                fontFamily: "var(--font-mono)",
                fontSize: settings.mode === "braille" ? 11 : 9,
                lineHeight: 1.15,
                color: "var(--mono-fg)",
                position: "relative",
                overflow: "auto",
                minHeight: 400,
                maxHeight: 500,
                boxShadow: "inset 0 0 24px rgba(0,0,0,0.9)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  whiteSpace: "pre",
                  textShadow: "0 0 10px var(--mono-glow)",
                  color: settings.colorize ? "inherit" : "var(--mono-fg)",
                }}
              >
                {asciiResult ? (
                  settings.colorize ? (
                    asciiResult.rows.map((row: any, rIdx: number) => (
                      <div key={rIdx} style={{ display: "block" }}>
                        {row.cells.map((cell: any, cIdx: number) => (
                          <span key={cIdx} style={{ color: cell.color }}>
                            {cell.char}
                          </span>
                        ))}
                      </div>
                    ))
                  ) : (
                    asciiResult.rows.map((row: any) => row.text).join("\n")
                  )
                ) : (
                  <div style={{ color: "var(--text-muted)", textAlign: "center" }}>Initializing rasterizer...</div>
                )}
              </div>

              {/* HUD statistics overlay */}
              <div
                className="hud-overlay"
                style={{
                  position: "absolute",
                  bottom: 12,
                  right: 12,
                  display: "grid",
                  gap: "0.2rem",
                  minWidth: 140,
                  background: "rgba(0,0,0,0.78)",
                  backdropFilter: "blur(6px)",
                  padding: "0.4rem 0.6rem",
                  borderRadius: "var(--radius-xs)",
                  border: "1px solid var(--border-muted)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px" }}>
                  <span style={{ color: "var(--text-muted)", textTransform: "uppercase" }}>Mode</span>
                  <span style={{ color: "var(--accent-glow)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                    {settings.mode.toUpperCase()}
                  </span>
                </div>
                {(sourceKind === "webcam" || sourceKind === "video" || sourceKind === "demo") && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px" }}>
                    <span style={{ color: "var(--text-muted)", textTransform: "uppercase" }}>FPS</span>
                    <span style={{ color: "var(--success)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                      {fps}
                    </span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px" }}>
                  <span style={{ color: "var(--text-muted)", textTransform: "uppercase" }}>Cols</span>
                  <span style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                    {asciiResult?.outputWidth ?? 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Summary details */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "var(--text-xs)", color: "var(--text-secondary)", flexWrap: "wrap", gap: "var(--space-2)" }}>
              <span>Source Label: <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{sourceLabel}</strong></span>
              <span>
                Summary:{" "}
                <strong style={{ color: "var(--text-primary)" }}>
                  {asciiResult ? `${asciiResult.outputWidth} cols · ${asciiResult.outputHeight} rows · ${getModeLabel(settings.mode)}` : "Computing..."}
                </strong>
              </span>
            </div>
          </GlassCard>

          {/* Export Action Card */}
          <GlassCard style={{ padding: "var(--space-4)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--space-4)", flexWrap: "wrap" }}>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-sm)", margin: 0, color: "var(--text-primary)" }}>
                Export Artwork
              </h4>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: 0 }}>
                Compile the current canvas grid into high-fidelity code configurations or graphic vector layers.
              </p>
            </div>

            <div style={{ display: "flex", gap: "var(--space-2)" }}>
              <button
                onClick={handleDownloadTxt}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-raised)",
                  border: "1px solid var(--border-muted)",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: "var(--text-xs)",
                  fontFamily: "var(--font-mono)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--border-accent)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border-muted)"; }}
              >
                <Download size={12} /> TXT
              </button>
              <button
                onClick={handleDownloadHtml}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-raised)",
                  border: "1px solid var(--border-muted)",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: "var(--text-xs)",
                  fontFamily: "var(--font-mono)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--border-accent)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border-muted)"; }}
              >
                <Download size={12} /> HTML
              </button>
              <button
                onClick={handleDownloadPng}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-raised)",
                  border: "1px solid var(--border-muted)",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: "var(--text-xs)",
                  fontFamily: "var(--font-mono)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--border-accent)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border-muted)"; }}
              >
                <Download size={12} /> PNG
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Right Sidebar: Analysis */}
        <GlassCard style={{ padding: "var(--space-4)", display: "grid", gap: "var(--space-4)", alignSelf: "start" }}>
          <div>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Analytics Node
            </span>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-base)", margin: 0 }}>
              Live Raster Quality
            </h3>
          </div>

          <div
            style={{
              padding: "var(--space-6) 0",
              textAlign: "center",
              background: "rgba(255, 255, 255, 0.02)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-subtle)",
              display: "grid",
              gap: "0.25rem",
            }}
          >
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Fidelity Score
            </span>
            <span style={{ fontSize: "var(--text-5xl)", fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--accent-glow)" }}>
              {stats.overall}%
            </span>
          </div>

          <div style={{ display: "grid", gap: "var(--space-2)" }}>
            {[
              { label: "Brightness Fit", value: `${stats.detail.brightness}%`, color: "var(--accent-glow)" },
              { label: "Contrast Span", value: `${stats.detail.contrast}%`, color: "var(--text-primary)" },
              { label: "Edge Density", value: `${currentEdgeDensity}%`, color: "var(--text-secondary)" },
              { label: "Complexity", value: `${stats.detail.complexity}%`, color: "var(--success)" },
            ].map((m) => (
              <div
                key={m.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "var(--space-2) var(--space-3)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-raised)",
                  border: "1px solid var(--border-muted)",
                }}
              >
                <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}>{m.label}</span>
                <span style={{ fontSize: "var(--text-xs)", fontFamily: "var(--font-mono)", fontWeight: 600, color: m.color }}>
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          <hr style={{ border: 0, borderTop: "1px solid var(--border-muted)", margin: 0 }} />

          <button
            onClick={() => {
              if (canvasRef.current) {
                const opt = autoTune(canvasRef.current, settings.mode);
                setSettings(opt);
                setStatus("Auto-tuned successfully");
              }
            }}
            style={{
              padding: "0.6rem",
              borderRadius: "var(--radius-md)",
              background: "var(--accent-primary)",
              color: "#000",
              fontWeight: 600,
              fontSize: "var(--text-xs)",
              textTransform: "uppercase",
              cursor: "pointer",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.35rem",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            <RefreshCw size={12} /> Auto Tune Settings
          </button>
        </GlassCard>
      </div>
    </div>
  );
}
