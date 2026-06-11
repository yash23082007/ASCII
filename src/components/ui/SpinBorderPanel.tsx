import type { ReactNode, CSSProperties } from "react";

interface SpinBorderPanelProps {
  children: ReactNode;
  style?: CSSProperties;
  id?: string;
}

export function SpinBorderPanel({ children, style, id }: SpinBorderPanelProps) {
  return (
    <div
      id={id}
      style={{
        position: "relative",
        borderRadius: "var(--radius-xl)",
        padding: "1px",
        background: `conic-gradient(from var(--angle, 0deg), transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)`,
        animation: "spin-border 4s linear infinite",
        ...style,
      }}
    >
      <div style={{
        background: "var(--bg-base)",
        borderRadius: "calc(var(--radius-xl) - 1px)",
        padding: "var(--space-8)",
        position: "relative",
      }}>
        {children}
      </div>
    </div>
  );
}
