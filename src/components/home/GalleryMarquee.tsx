import { useReducedMotion } from "../../hooks/useReducedMotion";

const samples = [
  { chars: "@@@###***+++==--::..", mode: "ASCII", color: "var(--accent-glow)" },
  { chars: "⣿⣷⣯⣟⡿⠿⠛⠉", mode: "Braille", color: "var(--accent-secondary)" },
  { chars: "🟥🟧🟨🟩🟦🟪⬛⬜", mode: "Emoji", color: "var(--warning)" },
  { chars: "▇█▆▅▄▃▂▁", mode: "Unicode", color: "var(--accent-tertiary)" },
  { chars: "▓▒░", mode: "Bold", color: "var(--success)" },
  { chars: "@@@###***+++==--::..", mode: "ASCII", color: "var(--accent-glow)" },
  { chars: "⣿⣷⣯⣟⡿⠿⠛⠉", mode: "Braille", color: "var(--accent-secondary)" },
];

function MarqueeRow({ items, reverse }: { items: typeof samples; reverse?: boolean }) {
  const reduced = useReducedMotion();

  return (
    <div style={{ overflow: "hidden", display: "flex", gap: "var(--space-4)" }}>
      <div
        style={{
          display: "flex", gap: "var(--space-4)", flexShrink: 0,
          animation: reduced ? "none" : `marquee-scroll ${reverse ? "52s" : "40s"} linear infinite`,
          willChange: "transform",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="glass-card"
            style={{
              padding: "var(--space-3) var(--space-4)", minWidth: 220, display: "grid", gap: "0.3rem",
              fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)",
            }}
          >
            <span style={{ color: item.color, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.chars}</span>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", letterSpacing: "0.08em" }}>{item.mode}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GalleryMarquee() {
  return (
    <div style={{ display: "grid", gap: "var(--space-3)" }}>
      <MarqueeRow items={samples} />
      <MarqueeRow items={[...samples].reverse()} reverse />
    </div>
  );
}
