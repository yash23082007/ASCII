interface PillBadgeProps {
  children: string;
  variant?: "default" | "accent" | "success" | "violet";
}

const colors = {
  default: { bg: "rgba(255,255,255,0.04)", border: "var(--border-muted)", color: "var(--text-secondary)" },
  accent: { bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.24)", color: "var(--accent-glow)" },
  success: { bg: "rgba(52,211,153,0.10)", border: "rgba(52,211,153,0.22)", color: "var(--success)" },
  violet: { bg: "rgba(167,139,250,0.10)", border: "rgba(167,139,250,0.22)", color: "var(--accent-secondary)" },
};

export function PillBadge({ children, variant = "default" }: PillBadgeProps) {
  const c = colors[variant];
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.3rem",
        padding: "0.3rem 0.65rem", borderRadius: 999,
        background: c.bg, border: `1px solid ${c.border}`,
        color: c.color, fontSize: "var(--text-xs)",
        fontFamily: "var(--font-mono)", letterSpacing: "0.06em",
        textTransform: "uppercase", whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
