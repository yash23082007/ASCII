interface PillBadgeProps {
  children: string;
  variant?: "default" | "accent" | "success" | "violet";
}

const colors = {
  default: { bg: "rgba(255,255,255,0.02)", border: "var(--border-muted)", color: "var(--text-secondary)" },
  accent: { bg: "rgba(255,255,255,0.06)", border: "var(--border-accent)", color: "var(--accent-glow)" },
  success: { bg: "rgba(138,255,138,0.06)", border: "rgba(138,255,138,0.18)", color: "var(--success)" },
  violet: { bg: "rgba(255,255,255,0.04)", border: "var(--border-visible)", color: "var(--text-primary)" },
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
