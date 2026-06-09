export type RenderMode = "ascii" | "unicode" | "braille" | "emoji";
export type PaletteKey = "classic" | "bold" | "soft" | "terminal";
export type SourceKind = "demo" | "image" | "video" | "webcam";

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
