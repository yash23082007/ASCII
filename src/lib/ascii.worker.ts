import type { RenderMode, PaletteKey, AsciiRow } from "./ascii";

interface WorkerMessage {
  imageData: ImageData;
  settings: {
    mode: RenderMode;
    palette: PaletteKey;
    density: number;
    brightness: number;
    contrast: number;
    colorize: boolean;
    invert: boolean;
  };
  sourceWidth: number;
  sourceHeight: number;
}

interface WorkerResult {
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

const PALETTES: Record<string, readonly string[]> = {
  classic: ["@", "%", "#", "*", "+", "=", "-", ":", ".", " "],
  bold: ["█", "▓", "▒", "░", " "],
  soft: ["⣿", "⣷", "⣯", "⣟", "⡿", "⠿", "⠛", "⠉", " "],
  terminal: ["▇", "█", "▆", "▅", "▄", "▃", "▂", "▁", " "],
};

const BRAILLE_BITS: readonly [number, number][] = [
  [1, 8],
  [2, 16],
  [4, 32],
  [64, 128],
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function sampleLuminance(r: number, g: number, b: number) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function adjustLuminance(
  luminance: number,
  contrast: number,
  brightness: number,
) {
  const contrasted = (luminance - 128) * contrast + 128;
  return clamp(contrasted + brightness, 0, 255);
}

function paletteCharacters(mode: RenderMode, palette: PaletteKey) {
  if (mode === "emoji") {
    return ["⬛", "🟥", "🟧", "🟨", "🟩", "🟦", "🟪", "⬜"];
  }
  return PALETTES[palette] ?? PALETTES.classic;
}

function rgb(r: number, g: number, b: number) {
  return `rgb(${Math.round(clamp(r, 0, 255))} ${Math.round(clamp(g, 0, 255))} ${Math.round(clamp(b, 0, 255))})`;
}

self.onmessage = (e: MessageEvent<WorkerMessage>) => {
  const { imageData, settings, sourceWidth, sourceHeight } = e.data;

  if (!imageData || !imageData.data) {
    self.postMessage({
      rows: [],
      sourceWidth,
      sourceHeight,
      outputWidth: 0,
      outputHeight: 0,
      averageBrightness: 0,
      brightnessVariance: 0,
      estimatedQuality: 0,
      charCount: 0,
      summary: "No image data",
    } satisfies WorkerResult);
    return;
  }

  const data = imageData.data;
  const renderWidth = imageData.width;
  const renderHeight = imageData.height;

  const columns = clamp(Math.round(settings.density), 24, 180);
  const rowScale = settings.mode === "braille" ? 0.46 : 0.52;
  const rowCount = Math.max(1, Math.round((sourceHeight / Math.max(1, sourceWidth)) * columns * rowScale));

  const columnStep = renderWidth / columns;
  const rowStep = renderHeight / rowCount;

  const palette = paletteCharacters(settings.mode, settings.palette);
  const rowsOut: AsciiRow[] = [];
  const charsUsed = new Set<string>();

  let brightnessSum = 0;
  let brightnessSquares = 0;
  let sampleCount = 0;

  for (let row = 0; row < rowCount; row++) {
    const cells: { char: string; color: string; brightness: number }[] = [];
    const chars: string[] = [];

    if (settings.mode === "braille") {
      for (let col = 0; col < columns; col++) {
        let dots = 0;
        let avgR = 0;
        let avgG = 0;
        let avgB = 0;
        let localBrightness = 0;
        let localCount = 0;

        for (let dy = 0; dy < 4; dy++) {
          for (let dx = 0; dx < 2; dx++) {
            const sx = Math.round(col * 2 + dx);
            const sy = Math.round(row * 4 + dy);
            if (sx >= renderWidth || sy >= renderHeight) continue;
            const idx = (sy * renderWidth + sx) * 4;
            const r = data[idx] ?? 0;
            const g = data[idx + 1] ?? 0;
            const b = data[idx + 2] ?? 0;
            const lum = adjustLuminance(sampleLuminance(r, g, b), settings.contrast, settings.brightness);
            const bit = BRAILLE_BITS[dy][dx];

            brightnessSum += lum;
            brightnessSquares += lum * lum;
            sampleCount++;

            avgR += r;
            avgG += g;
            avgB += b;
            localBrightness += lum;
            localCount++;

            if (lum < 156 - settings.brightness * 0.75 - (settings.contrast - 1) * 18) {
              dots |= bit;
            }
          }
        }

        const char = String.fromCharCode(0x2800 + dots);
        charsUsed.add(char);
        cells.push({
          char,
          color: settings.colorize ? rgb(avgR / localCount, avgG / localCount, avgB / localCount) : "var(--text)",
          brightness: localCount > 0 ? localBrightness / localCount : 0,
        });
        chars.push(char);
      }
    } else {
      for (let col = 0; col < columns; col++) {
        const sx = Math.round(col * columnStep);
        const sy = Math.round(row * rowStep);
        if (sx >= renderWidth || sy >= renderHeight) continue;
        const idx = (sy * renderWidth + sx) * 4;
        const r = data[idx] ?? 0;
        const g = data[idx + 1] ?? 0;
        const b = data[idx + 2] ?? 0;
        const lum = sampleLuminance(r, g, b);
        const adjusted = adjustLuminance(lum, settings.contrast, settings.brightness);
        const normalized = settings.invert ? 255 - adjusted : adjusted;
        const paletteIdx = clamp(Math.round((normalized / 255) * (palette.length - 1)), 0, palette.length - 1);
        const char = palette[paletteIdx] ?? " ";

        brightnessSum += normalized;
        brightnessSquares += normalized * normalized;
        sampleCount++;
        charsUsed.add(char);

        cells.push({
          char,
          color: settings.colorize ? rgb(r, g, b) : "var(--text)",
          brightness: normalized,
        });
        chars.push(char);
      }
    }

    rowsOut.push({ cells, text: chars.join("") });
  }

  const averageBrightness = sampleCount ? brightnessSum / sampleCount : 0;
  const brightnessVariance = sampleCount ? brightnessSquares / sampleCount - averageBrightness * averageBrightness : 0;
  const estimatedQuality = clamp(
    Math.round(
      50 +
        Math.min(18, columns / 7) +
        Math.min(18, brightnessVariance / 12) +
        (settings.colorize ? 5 : 0) +
        8,
    ),
    0,
    100,
  );

  self.postMessage({
    rows: rowsOut,
    sourceWidth,
    sourceHeight,
    outputWidth: columns,
    outputHeight: rowCount,
    averageBrightness,
    brightnessVariance,
    estimatedQuality,
    charCount: charsUsed.size,
    summary: `${columns} columns · ${rowCount} rows · ${settings.mode} · ${settings.palette}`,
  } satisfies WorkerResult);
};
