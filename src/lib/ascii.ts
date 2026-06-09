export type RenderMode = "ascii" | "unicode" | "braille" | "emoji";
export type PaletteKey = "classic" | "bold" | "soft" | "terminal";

export interface StudioSettings {
  mode: RenderMode;
  palette: PaletteKey;
  density: number;
  brightness: number;
  contrast: number;
  colorize: boolean;
  invert: boolean;
  autoOptimize: boolean;
}

export interface AsciiCell {
  char: string;
  color: string;
  brightness: number;
}

export interface AsciiRow {
  text: string;
  cells: AsciiCell[];
}

export interface AsciiRenderResult {
  rows: AsciiRow[];
  sourceWidth: number;
  sourceHeight: number;
  outputWidth: number;
  outputHeight: number;
  averageBrightness: number;
  brightnessVariance: number;
  estimatedQuality: number;
  charCount: number;
  summary: string;
}

export interface SourceStats {
  width: number;
  height: number;
  averageBrightness: number;
  brightnessVariance: number;
  contrastSpan: number;
}

export interface PngExportOptions {
  background?: string;
  foreground?: string;
  padding?: number;
  fontSize?: number;
  lineHeight?: number;
  fileName?: string;
}

export const MODE_OPTIONS = [
  { value: "ascii", label: "ASCII", description: "Classic character mapping" },
  { value: "unicode", label: "Unicode", description: "Sharper block output" },
  { value: "braille", label: "Braille", description: "2x4 dot rendering" },
  { value: "emoji", label: "Emoji", description: "Playful symbol art" },
] as const;

export const PALETTE_OPTIONS = [
  { value: "classic", label: "Classic", sample: "@%#*+=-:. " },
  { value: "bold", label: "Bold", sample: "█▓▒░ " },
  { value: "soft", label: "Soft", sample: "⣿⣷⣯⣟⡿⠿⠛⠉ " },
  { value: "terminal", label: "Terminal", sample: "▇█▆▅▄▃▂▁ " },
] as const;

export const DEFAULT_SETTINGS: StudioSettings = {
  mode: "ascii",
  palette: "classic",
  density: 92,
  brightness: 0,
  contrast: 1.08,
  colorize: true,
  invert: false,
  autoOptimize: true,
};

const PALETTE_LOOKUP: Record<PaletteKey, readonly string[]> = {
  classic: ["@", "%", "#", "*", "+", "=", "-", ":", ".", " "],
  bold: ["█", "▓", "▒", "░", " "],
  soft: ["⣿", "⣷", "⣯", "⣟", "⡿", "⠿", "⠛", "⠉", " "],
  terminal: ["▇", "█", "▆", "▅", "▄", "▃", "▂", "▁", " "],
};

const BRAILLE_BITS = [
  [1, 8],
  [2, 16],
  [4, 32],
  [64, 128],
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function rgb(r: number, g: number, b: number) {
  return `rgb(${Math.round(clamp(r, 0, 255))} ${Math.round(clamp(g, 0, 255))} ${Math.round(
    clamp(b, 0, 255),
  )})`;
}

function getSourceDimensions(source: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement) {
  if (source instanceof HTMLVideoElement) {
    return {
      width: source.videoWidth,
      height: source.videoHeight,
    };
  }

  if (source instanceof HTMLImageElement) {
    return {
      width: source.naturalWidth,
      height: source.naturalHeight,
    };
  }

  return {
    width: source.width,
    height: source.height,
  };
}

function sampleLuminance(r: number, g: number, b: number) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function adjustLuminance(luminance: number, settings: StudioSettings) {
  const contrasted = (luminance - 128) * settings.contrast + 128;
  const brightened = contrasted + settings.brightness;
  return clamp(brightened, 0, 255);
}

function paletteCharacters(settings: StudioSettings) {
  if (settings.mode === "emoji") {
    return ["⬛", "🟥", "🟧", "🟨", "🟩", "🟦", "🟪", "⬜"];
  }

  if (settings.mode === "unicode") {
    return PALETTE_LOOKUP[settings.palette];
  }

  return PALETTE_LOOKUP[settings.palette];
}

export function getModeLabel(mode: RenderMode) {
  return MODE_OPTIONS.find((option) => option.value === mode)?.label ?? mode.toUpperCase();
}

export function getPaletteLabel(palette: PaletteKey) {
  return PALETTE_OPTIONS.find((option) => option.value === palette)?.label ?? palette;
}

export function buildAsciiString(rows: AsciiRow[]) {
  return rows.map((row) => row.text).join("\n");
}

export function measureSourceStats(
  source: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement,
): SourceStats {
  const { width, height } = getSourceDimensions(source);

  if (!width || !height) {
    return {
      width: 0,
      height: 0,
      averageBrightness: 0,
      brightnessVariance: 0,
      contrastSpan: 0,
    };
  }

  const sampleWidth = clamp(Math.round(Math.max(24, Math.min(48, width / 16))), 16, 64);
  const sampleHeight = Math.max(1, Math.round((height / width) * sampleWidth));
  const canvas = document.createElement("canvas");
  canvas.width = sampleWidth;
  canvas.height = sampleHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return {
      width,
      height,
      averageBrightness: 0,
      brightnessVariance: 0,
      contrastSpan: 0,
    };
  }

  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(source, 0, 0, sampleWidth, sampleHeight);

  const { data } = ctx.getImageData(0, 0, sampleWidth, sampleHeight);
  let sum = 0;
  let sumSquares = 0;
  let min = 255;
  let max = 0;

  for (let index = 0; index < data.length; index += 4) {
    const brightness = sampleLuminance(data[index], data[index + 1], data[index + 2]);
    sum += brightness;
    sumSquares += brightness * brightness;
    min = Math.min(min, brightness);
    max = Math.max(max, brightness);
  }

  const count = data.length / 4;
  const averageBrightness = count ? sum / count : 0;
  const brightnessVariance = count ? sumSquares / count - averageBrightness * averageBrightness : 0;

  return {
    width,
    height,
    averageBrightness,
    brightnessVariance,
    contrastSpan: max - min,
  };
}

export function suggestSettingsFromStats(stats: SourceStats, mode: RenderMode): Partial<StudioSettings> {
  const area = stats.width * stats.height;
  const baseDensity = mode === "braille" ? 70 : 92;
  const densityBoost = clamp(Math.round(Math.log2(Math.max(1, area)) * 3.5), 8, 22);
  const density = clamp(baseDensity + densityBoost, 42, 150);
  const brightness = clamp(Math.round((128 - stats.averageBrightness) * 0.22), -28, 28);
  const contrast = clamp(Number((1.02 + stats.brightnessVariance / 6500).toFixed(2)), 0.84, 1.68);

  return {
    density,
    brightness,
    contrast,
  };
}

export function renderAscii(
  source: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement,
  settings: StudioSettings,
): AsciiRenderResult {
  const { width: sourceWidth, height: sourceHeight } = getSourceDimensions(source);
  const fallback: AsciiRenderResult = {
    rows: [],
    sourceWidth,
    sourceHeight,
    outputWidth: 0,
    outputHeight: 0,
    averageBrightness: 0,
    brightnessVariance: 0,
    estimatedQuality: 0,
    charCount: 0,
    summary: "Source not ready yet",
  };

  if (!sourceWidth || !sourceHeight) {
    return fallback;
  }

  const columns = clamp(Math.round(settings.density), 24, 180);
  const rowScale = settings.mode === "braille" ? 0.46 : 0.52;
  const rows = Math.max(1, Math.round((sourceHeight / sourceWidth) * columns * rowScale));
  const renderWidth = settings.mode === "braille" ? columns * 2 : columns;
  const renderHeight = settings.mode === "braille" ? rows * 4 : rows;

  const canvas = document.createElement("canvas");
  canvas.width = renderWidth;
  canvas.height = renderHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return fallback;
  }

  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(source, 0, 0, renderWidth, renderHeight);

  const { data } = ctx.getImageData(0, 0, renderWidth, renderHeight);
  const rowsOut: AsciiRow[] = [];
  const charsUsed = new Set<string>();
  const palette = paletteCharacters(settings);
  const brightThreshold = clamp(156 - settings.brightness * 0.75 - (settings.contrast - 1) * 18, 88, 198);

  let brightnessSum = 0;
  let brightnessSquares = 0;
  let sampleCount = 0;

  for (let row = 0; row < rows; row += 1) {
    const cells: AsciiCell[] = [];
    const chars: string[] = [];

    if (settings.mode === "braille") {
      for (let column = 0; column < columns; column += 1) {
        let dots = 0;
        let avgR = 0;
        let avgG = 0;
        let avgB = 0;
        let localBrightness = 0;
        let localCount = 0;

        for (let dy = 0; dy < 4; dy += 1) {
          for (let dx = 0; dx < 2; dx += 1) {
            const sampleX = column * 2 + dx;
            const sampleY = row * 4 + dy;
            const index = (sampleY * renderWidth + sampleX) * 4;
            const r = data[index] ?? 0;
            const g = data[index + 1] ?? 0;
            const b = data[index + 2] ?? 0;
            const brightness = adjustLuminance(sampleLuminance(r, g, b), settings);
            const bit = BRAILLE_BITS[dy][dx];

            brightnessSum += brightness;
            brightnessSquares += brightness * brightness;
            sampleCount += 1;

            avgR += r;
            avgG += g;
            avgB += b;
            localBrightness += brightness;
            localCount += 1;

            if (brightness < brightThreshold) {
              dots |= bit;
            }
          }
        }

        const char = String.fromCharCode(0x2800 + dots);
        charsUsed.add(char);
        const color = settings.colorize
          ? rgb(avgR / localCount, avgG / localCount, avgB / localCount)
          : "var(--text)";

        cells.push({
          char,
          color,
          brightness: localBrightness / localCount,
        });
        chars.push(char);
      }
    } else {
      for (let column = 0; column < columns; column += 1) {
        const index = (row * renderWidth + column) * 4;
        const r = data[index] ?? 0;
        const g = data[index + 1] ?? 0;
        const b = data[index + 2] ?? 0;
        const brightness = adjustLuminance(sampleLuminance(r, g, b), settings);
        const normalized = settings.invert ? 255 - brightness : brightness;
        const paletteIndex = clamp(
          Math.round((normalized / 255) * (palette.length - 1)),
          0,
          palette.length - 1,
        );
        const char = palette[paletteIndex] ?? " ";

        brightnessSum += normalized;
        brightnessSquares += normalized * normalized;
        sampleCount += 1;
        charsUsed.add(char);

        cells.push({
          char,
          color: settings.colorize ? rgb(r, g, b) : "var(--text)",
          brightness: normalized,
        });
        chars.push(char);
      }
    }

    rowsOut.push({
      cells,
      text: chars.join(""),
    });
  }

  const averageBrightness = sampleCount ? brightnessSum / sampleCount : 0;
  const brightnessVariance = sampleCount ? brightnessSquares / sampleCount - averageBrightness * averageBrightness : 0;
  const estimatedQuality = clamp(
    Math.round(
      50 +
        Math.min(18, columns / 7) +
        Math.min(18, brightnessVariance / 12) +
        (settings.colorize ? 5 : 0) +
        (settings.autoOptimize ? 8 : 0),
    ),
    0,
    100,
  );
  const modeLabel = getModeLabel(settings.mode);
  const paletteLabel = getPaletteLabel(settings.palette);

  return {
    rows: rowsOut,
    sourceWidth,
    sourceHeight,
    outputWidth: columns,
    outputHeight: rows,
    averageBrightness,
    brightnessVariance,
    estimatedQuality,
    charCount: charsUsed.size,
    summary: `${columns} columns · ${rows} rows · ${modeLabel} · ${paletteLabel}`,
  };
}

function triggerDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  window.setTimeout(() => {
    URL.revokeObjectURL(url);
    anchor.remove();
  }, 1000);
}

export function copyAsciiToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  return Promise.resolve();
}

export function downloadTextArt(text: string, fileName = "ascii-art.txt") {
  triggerDownload(new Blob([text], { type: "text/plain;charset=utf-8" }), fileName);
}

export function downloadHtmlArt(text: string, fileName = "ascii-art.html") {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>ASCII Export</title>
    <style>
      :root { color-scheme: dark; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: radial-gradient(circle at top, #0b1a32, #020617 68%);
        color: #f8fbff;
        font-family: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
      }
      pre {
        padding: 2rem;
        margin: 0;
        background: rgba(8, 15, 28, 0.72);
        border: 1px solid rgba(130, 200, 255, 0.2);
        border-radius: 1.25rem;
        box-shadow: 0 24px 90px rgba(2, 8, 23, 0.5);
        white-space: pre;
        line-height: 1;
        font-size: 13px;
      }
    </style>
  </head>
  <body>
    <pre>${escaped}</pre>
  </body>
</html>`;

  triggerDownload(new Blob([html], { type: "text/html;charset=utf-8" }), fileName);
}

export function downloadPngArt(
  text: string,
  options: PngExportOptions = {},
) {
  const lines = text.split("\n");
  const padding = options.padding ?? 36;
  const fontSize = options.fontSize ?? 14;
  const lineHeight = options.lineHeight ?? Math.round(fontSize * 1.35);
  const background = options.background ?? "#020617";
  const foreground = options.foreground ?? "#f5f7ff";

  const measureCanvas = document.createElement("canvas");
  const measureCtx = measureCanvas.getContext("2d");
  const fontFamily = '"IBM Plex Mono", "SFMono-Regular", Consolas, monospace';
  let longest = 0;

  if (measureCtx) {
    measureCtx.font = `${fontSize}px ${fontFamily}`;
    longest = Math.max(...lines.map((line) => measureCtx.measureText(line).width), 0);
  } else {
    longest = Math.max(...lines.map((line) => line.length * fontSize * 0.62), 0);
  }

  const scale = 2;
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil((longest + padding * 2) * scale);
  canvas.height = Math.ceil((lines.length * lineHeight + padding * 2) * scale);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  ctx.scale(scale, scale);
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.fillStyle = foreground;
  ctx.textBaseline = "top";
  ctx.imageSmoothingEnabled = true;

  lines.forEach((line, index) => {
    ctx.fillText(line, padding, padding + index * lineHeight);
  });

  triggerDownload(dataUrlToBlob(canvas.toDataURL("image/png")), options.fileName ?? "ascii-art.png");
}

function dataUrlToBlob(dataUrl: string) {
  const [header, encoded] = dataUrl.split(",");
  const mimeMatch = header.match(/data:(.*?);base64/);
  const mime = mimeMatch?.[1] ?? "image/png";
  const binary = atob(encoded ?? "");
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new Blob([bytes], { type: mime });
}
