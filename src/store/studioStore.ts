import { create } from "zustand";
import type { StudioSettings, RenderMode, PaletteKey, SourceKind } from "../types/studio";

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

interface StudioState {
  settings: StudioSettings;
  sourceKind: SourceKind;
  sourceLabel: string;
  status: string;
  error: string | null;
  isRendering: boolean;
  setSettings: (settings: Partial<StudioSettings>) => void;
  setSourceKind: (kind: SourceKind) => void;
  setSourceLabel: (label: string) => void;
  setStatus: (status: string) => void;
  setError: (error: string | null) => void;
  setIsRendering: (rendering: boolean) => void;
  reset: () => void;
}

export const useStudioStore = create<StudioState>((set) => ({
  settings: DEFAULT_SETTINGS,
  sourceKind: "demo",
  sourceLabel: "Demo scene",
  status: "Idle",
  error: null,
  isRendering: false,
  setSettings: (partial) =>
    set((state) => ({ settings: { ...state.settings, ...partial } })),
  setSourceKind: (sourceKind) => set({ sourceKind }),
  setSourceLabel: (sourceLabel) => set({ sourceLabel }),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error }),
  setIsRendering: (isRendering) => set({ isRendering }),
  reset: () =>
    set({
      settings: DEFAULT_SETTINGS,
      sourceKind: "demo",
      sourceLabel: "Demo scene",
      status: "Idle",
      error: null,
    }),
}));
